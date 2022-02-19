import React, {LegacyRef} from 'react';
import {Image, ImageProps, SectionList, SectionListProps, TouchableOpacity, View, ViewStyle} from 'react-native';
import memoize from 'memoize-one';
import {
    TableViewRow,
    TableViewRowSectionCallbackFn,
    TableViewSection,
    TableViewSectionAction,
    TableViewSectionHeaderMixed,
    TableViewSwipeAction,
} from './TableViewConstants';
import TableViewItem from './TableViewItem';
import SimpleText, {Large, Small} from './../SimpleText';
import EmptyState, {EmptyStateProps} from '../EmptyState';
import Theme, {spacing, ThemeProps} from '../Theme';

const EMPTY_STATE_KEY = '__EMPTY_STATE_SPECIAL_KEY__';

export type TableViewProps = SectionListProps<any> & {
    theme?: Partial<ThemeProps>;

    /**
     * Permite definir um cabeçalho global para a View
     */
    header?: React.ComponentType<any> | React.ReactElement | null;
    /**
     * Permite exibir um rodapé global para a View
     */
    footer?: React.ComponentType<any> | React.ReactElement | null;
    /**
     * Seções de exibição dessa lista
     */
    sections: Array<TableViewSection>;
    /**
     * Permite informar ao table view que o mesmo está sendo carregado
     */
    refreshing?: boolean;
    /**
     * Permite definir o empty state
     */
    emptyState?: EmptyStateProps,
    /**
     * O título da seção fica colado ao rolar a tela?
     *
     * Default TRUE
     */
    stickySectionHeadersEnabled?: boolean;
    /**
     * Ações para o gesto de Seipe (arrastar para a esquerda) no item
     */
    swipeActions?: Array<TableViewSwipeAction>;
    onPress?: TableViewRowSectionCallbackFn;
    onSelect?: TableViewRowSectionCallbackFn;
    onLongPress?: TableViewRowSectionCallbackFn;
    /**
     * Permite deixar o fundo do tableview transparente. Util para a aplicação de algum efeito especial
     */
    transparent?: boolean;
    /**
     * Lets you create reference to internal section list
     */
    refSectionList?: LegacyRef<SectionList<any>>;
    /**
     * Lets you create reference to external tableView, fix for Animated.Views ref
     */
    refTableView?: (ref: TableView) => void;
}

/**
 * View para apresentação de dados de forma organizado em lista.
 *
 * Inspirado em https://developer.apple.com/documentation/uikit/uitableview
 */
export default class TableView extends React.PureComponent<TableViewProps> {

    /**
     * Mantém referencia para os itens
     */
    itemRefs: { [key: string]: TableViewItem; } = {};

    /**
     * Faz o processamento das sections quando a referencia é alterada no componente pai
     */
    private parsedSections = memoize((propsSections: Array<TableViewSection>) => {
        let sections: Array<TableViewSection> = [];
        if (propsSections) {
            sections = propsSections
                .map(section => {
                    if (!section.emptyState || (section.data && section.data.length > 0)) {
                        return section;
                    }

                    // Faz deep copy e remove referencias
                    let newSection = {
                        ...section,
                    };

                    // Adiciona empty state para item
                    newSection.data = [
                        {
                            key: EMPTY_STATE_KEY,
                            title: (
                                <EmptyState
                                    {...newSection.emptyState}
                                />
                            ),
                        },
                    ];

                    return newSection;
                })
                .filter(section => {
                    // Remove secoes que não tem conteúdo e não definiu empty state
                    return section.data && section.data.length > 0;
                });

        }
        return sections;
    });

    /**
     * Permite e forçar a renderização de um item específico.
     *
     * Útil em listas extensas para evitar processamento desnecessário.
     *
     * Ex de uso: Em uma lista de chats, atualizar o preview de ultima mensagem de uma sala específica, sem precisar processar toda a lista
     *
     * @param row
     * @param section
     */
    public forceRenderItem(sectionKey: string, rowKey: string, newRow?: { [key: string]: any }) {
        const key = `${sectionKey}__${rowKey}`;
        if (this.itemRefs[key]) {
            this.itemRefs[key].forceRender(newRow);
        }
    }

    componentDidMount() {
        if (this.props.refTableView) {
            this.props.refTableView(this);
        }
    }

    render() {

        const sections = this.parsedSections(this.props.sections);

        return (
            <Theme>
                {(theme) => {
                    return (
                        <SectionList
                            {...this.props}
                            ref={this.props.refSectionList as any}
                            contentContainerStyle={[
                                {
                                    // flexGrow: 1,
                                    backgroundColor: this.props.transparent ? 'transparent' : theme.colorBackground,
                                },
                                // ListEmptyComponent
                                sections.length
                                    ? null
                                    : {
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                    },
                            ]}
                            // https://github.com/facebook/react-native/issues/16411#issuecomment-367106427
                            removeClippedSubviews={false}
                            sections={sections}
                            renderItem={this.renderItem}
                            refreshing={this.props.refreshing}
                            ListHeaderComponent={this.props.header}
                            ListFooterComponent={this.props.footer}
                            ListEmptyComponent={this.props.refreshing ? null : this.renderEmptyState}
                            renderSectionHeader={this.renderSectionHeader}
                            renderSectionFooter={this.renderSectionFooter.bind(this, theme)}
                            ItemSeparatorComponent={this.renderItemSeparator.bind(this, theme)}
                            stickySectionHeadersEnabled={this.props.stickySectionHeadersEnabled === false ? false : true}
                            style={[
                                {
                                    flex: 1,
                                    backgroundColor: this.props.transparent ? 'transparent' : theme.colorBackground,
                                },
                                this.props.style,
                            ]}

                        />
                    );
                }}
            </Theme>
        );


    }

    /**
     *
     * @param info
     */
    private renderSectionHeader = (info: any) => {
        return (
            <Theme theme={this.props.theme}>
                {(theme) => {
                    const section = info.section as TableViewSection;
                    const padding = spacing(theme, 'tiny') as number;

                    if (section.header === undefined) {
                        return null;
                    }

                    const spacingSmall = spacing(theme, 'small');

                    const styleContainer: ViewStyle = {
                        width: '100%',
                        flexDirection: 'row',
                        backgroundColor: theme.colorPanel,
                        borderBottomColor: theme.colorLine,
                        borderBottomWidth: theme.lineWidth,
                        paddingHorizontal: spacingSmall,
                    };

                    const styleLeft: ViewStyle = {
                        flex: 1,
                        paddingTop: spacingSmall,
                        paddingBottom: padding,
                    };

                    const styleRight: ViewStyle = {
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        justifyContent: 'center',
                    };

                    const fontLargeSize = theme.fontLarge.size as number;

                    const HEIGHT = (spacingSmall as number) + padding + fontLargeSize;
                    // const ICON_HEIGHT = HEIGHT - ThemeProps.paddingSmall * 2;
                    //  @TODO
                    const ICON_HEIGHT = 24;

                    return (
                        <View style={[styleContainer, section.style]}>
                            <View style={styleLeft}>
                                {
                                    (!section.header || section.header === '')
                                        ? null
                                        : (
                                            (typeof section.header === 'string')
                                                ? (
                                                    <Large
                                                        theme={theme}
                                                        text={section.header}
                                                        color={theme.colorTextSecondary}
                                                    />
                                                )
                                                : (() => {
                                                    let header = (section.header as TableViewSectionHeaderMixed);
                                                    return (
                                                        (header.title || header.subtitle)
                                                            ? (
                                                                <View style={{flexDirection: 'column'}}>
                                                                    {
                                                                        (typeof header.title === 'string')
                                                                            ? (
                                                                                <Large
                                                                                    theme={theme}
                                                                                    text={header.title}
                                                                                    color={theme.colorTextSecondary}
                                                                                />
                                                                            )
                                                                            : header.title
                                                                    }
                                                                    {
                                                                        // @TODO: Align center
                                                                        header.subtitle
                                                                            ? (
                                                                                <View
                                                                                    style={{
                                                                                        paddingTop: spacing(theme, 'micro'),
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        (typeof header.subtitle === 'string')
                                                                                            ? (
                                                                                                <Small
                                                                                                    theme={theme}
                                                                                                    text={header.subtitle}
                                                                                                    color={theme.colorTextSecondary}
                                                                                                />
                                                                                            )
                                                                                            : header.subtitle
                                                                                    }
                                                                                </View>
                                                                            )
                                                                            : null

                                                                    }
                                                                </View>
                                                            )
                                                            // JSX.Element
                                                            : section.header
                                                    );
                                                })()
                                        )
                                }
                            </View>
                            {
                                section.actions
                                    ? (
                                        <View style={styleRight}>
                                            {
                                                Array.isArray(section.actions)
                                                    ? section.actions.map((action, index) => {
                                                        action = action as TableViewSectionAction;
                                                        const img = (action.icon as ImageProps);
                                                        return (
                                                            <TouchableOpacity
                                                                key={`${index}`}
                                                                onPress={() => {
                                                                    action.onPress(section);
                                                                }}
                                                                style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    height: HEIGHT,
                                                                }}
                                                            >
                                                                {
                                                                    img.source
                                                                        ? <Image
                                                                            {...img}
                                                                            style={[
                                                                                {
                                                                                    width: ICON_HEIGHT,
                                                                                    height: ICON_HEIGHT,
                                                                                    resizeMode: 'contain',
                                                                                    margin: spacing(theme, 'micro'),
                                                                                    marginLeft: padding,
                                                                                },
                                                                                img.style,
                                                                            ]}
                                                                        />
                                                                        : action
                                                                }
                                                            </TouchableOpacity>
                                                        );
                                                    })
                                                    : section.actions
                                            }
                                        </View>
                                    )
                                    : null
                            }
                        </View>
                    );
                }}
            </Theme>
        );
    }

    private renderItem = (info: any) => {
        const row = info.item as TableViewRow;
        const section = info.section as TableViewSection;
        return (
            <TableViewItem
                theme={this.props.theme}
                info={info}
                row={row}
                section={section}
                ref={(component) => {
                    const key = `${section.key}__${row.key}`;
                    if (component) {
                        this.itemRefs[key] = component;
                    } else {
                        delete this.itemRefs[key];
                    }
                }}
                extraData={this.props.extraData}
                swipeActions={this.props.swipeActions}
                onPress={this.props.onPress}
                onSelect={this.props.onSelect}
                onLongPress={this.props.onLongPress}
            />
        );
    };

    private renderItemSeparator = (theme: ThemeProps, info: any) => {
        const leadingItem = info.leadingItem as TableViewRow;
        const trailingItem = info.trailingItem as TableViewRow;
        const selected = leadingItem.selected || trailingItem.selected;
        const hasIcon = !!leadingItem.icon;
        return (
            <View style={{backgroundColor: theme.colorBackground}}>
                <View
                    style={{
                        marginLeft: (info.highlighted || selected)
                            ? 0
                            : hasIcon
                                ? (
                                    ((spacing(theme, 'small') as number) * 2) + (
                                        leadingItem.iconBig
                                            ? spacing(theme, 'x-large') as number
                                            : spacing(theme, 'large') as number
                                    )
                                )
                                : 0,
                        borderBottomColor: selected ? theme.colorLineSelected : theme.colorLine,
                        borderBottomWidth: theme.lineWidth,
                    }}
                />
            </View>
        );
    };

    private renderSectionFooter = (theme: ThemeProps, info: any) => {
        const section = info.section as TableViewSection;

        // Quando false, não renderiza ultimo separador
        if (section.footer === false) {
            return null;
        }

        const style: ViewStyle = {
            width: '100%',
            backgroundColor: theme.colorPanel,
            borderTopColor: theme.colorLine,
            borderTopWidth: theme.lineWidth,
        };

        // Sempre exibe o footer (ultimo item tem marcação, conforme modelo no zeplin)
        if (section.footer && section.footer !== '') {
            style.padding = spacing(theme, 'small');
            style.paddingTop = spacing(theme, 'tiny');
        }

        return (
            <View style={style}>
                {
                    (!section.footer || section.footer === '')
                        ? null
                        : (typeof section.footer === 'string')
                            ? (
                                <SimpleText
                                    color={theme.colorTextSecondary}
                                    small={true}
                                >
                                    {section.footer}
                                </SimpleText>
                            )
                        // JSX.Element
                            : section.footer
                }
            </View>
        );
    };

    private renderEmptyState = () => {
        return (
            <EmptyState
                {...(this.props.emptyState || {})}
            />
        );
    }
}
