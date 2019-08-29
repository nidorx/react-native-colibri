import React from 'react';
import {Image, ImageProps, SectionList, SectionListProps, TouchableOpacity, View, ViewStyle} from 'react-native';
import memoize from 'memoize-one';
import {
    tableViewGetItemIconBigSize,
    tableViewGetItemIconSize,
    TableViewRow,
    TableViewRowSectionCallbackFn,
    TableViewSection,
    TableViewSectionAction,
    TableViewSectionHeaderMixed,
    TableViewSwipeAction
} from './TableViewConstants';
import TableViewItem from './TableViewItem';
import SimpleText from './../SimpleText';
import EmptyState, {EmptyStateProps} from "../EmptyState";
import {getTheme} from "../Utils";

const EMPTY_STATE_KEY = '__EMPTY_STATE_SPECIAL_KEY__';

export type TableViewProps = SectionListProps<any> & {
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
                        ...section
                    };

                    // Adiciona empty state para item
                    newSection.data = [
                        {
                            key: EMPTY_STATE_KEY,
                            title: (
                                <EmptyState
                                    {...newSection.emptyState}
                                />
                            )
                        }
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

    render() {

        const theme = getTheme();
        const sections = this.parsedSections(this.props.sections);

        return (
            <SectionList
                {...this.props}
                contentContainerStyle={[
                    {
                        // flexGrow: 1,
                        backgroundColor: this.props.transparent ? 'transparent' : theme.colorContent,
                    },
                    // ListEmptyComponent
                    sections.length
                        ? null
                        : {
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: this.props.transparent ? 'transparent' : theme.colorBackground
                        }
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
                renderSectionFooter={this.renderSectionFooter}
                ItemSeparatorComponent={this.renderItemSeparator}
                stickySectionHeadersEnabled={this.props.stickySectionHeadersEnabled === false ? false : true}
                style={[
                    {
                        flex: 1,
                        backgroundColor: this.props.transparent ? 'transparent' : theme.colorContent
                    },
                    this.props.style
                ]}

            />
        );
    }

    /**
     *
     * @param info
     */
    private renderSectionHeader(info: any) {
        const theme = getTheme();
        const section = info.section as TableViewSection;

        if (section.header === undefined) {
            return null;
        }

        const styleContainer: ViewStyle = {
            width: '100%',
            flexDirection: 'row',
            backgroundColor: theme.colorBackground,
            borderBottomColor: theme.colorLine,
            borderBottomWidth: theme.lineWidth,
            paddingHorizontal: theme.padding
        };

        const styleLeft: ViewStyle = {
            flex: 1,
            paddingTop: theme.padding,
            paddingBottom: theme.paddingSmall
        };

        const styleRight: ViewStyle = {
            flexDirection: 'row',
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center'
        };

        const HEIGHT = theme.padding + theme.paddingSmall + theme.fontSize;
        // const ICON_HEIGHT = HEIGHT - Theme.paddingSmall * 2;
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
                                        <SimpleText
                                            color={theme.colorTextSecondary}
                                            subline={true}
                                        >
                                            {section.header.toLocaleUpperCase()}
                                        </SimpleText>
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
                                                                    <SimpleText
                                                                        text={header.title.toLocaleUpperCase()}
                                                                        color={theme.colorTextSecondary}
                                                                        subline={true}
                                                                    />
                                                                )
                                                                : header.title
                                                        }
                                                        {
                                                            // @TODO: Align center
                                                            header.subtitle
                                                                ? (
                                                                    <View style={{paddingTop: theme.paddingMinimum}}>
                                                                        {
                                                                            (typeof header.subtitle === 'string')
                                                                                ? (
                                                                                    <SimpleText
                                                                                        text={header.subtitle}
                                                                                        color={theme.colorTextSecondary}
                                                                                        subline={true}
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
                                        )
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
                                                    style={{alignItems: 'center', flexDirection: 'row', height: HEIGHT}}
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
                                                                        margin: theme.paddingMinimum,
                                                                        marginLeft: theme.paddingSmall
                                                                    },
                                                                    img.style
                                                                ]}
                                                            />
                                                            : action
                                                    }
                                                </TouchableOpacity>
                                            )
                                        })
                                        : section.actions
                                }
                            </View>
                        )
                        : null
                }
            </View>
        )
    }

    private renderItem = (info: any) => {
        const row = info.item as TableViewRow;
        const section = info.section as TableViewSection;
        return (
            <TableViewItem
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

    private renderItemSeparator = (info: any) => {
        const theme = getTheme();
        const leadingItem = info.leadingItem as TableViewRow;
        const trailingItem = info.trailingItem as TableViewRow;
        const selected = leadingItem.selected || trailingItem.selected;
        const hasIcon = !!leadingItem.icon;
        return (
            <View style={{backgroundColor: theme.colorContent}}>
                <View
                    style={{
                        marginLeft: (info.highlighted || selected)
                            ? 0
                            : hasIcon
                                ? (
                                    (theme.padding * 2) + (
                                        leadingItem.iconBig
                                            ? tableViewGetItemIconBigSize()
                                            : tableViewGetItemIconSize()
                                    )
                                )
                                : 0,
                        borderBottomColor: selected ? theme.colorLineSelected : theme.colorLine,
                        borderBottomWidth: theme.lineWidth
                    }}
                />
            </View>
        )
    };

    private renderSectionFooter = (info: any) => {
        const theme = getTheme();
        const section = info.section as TableViewSection;

        // Quando false, não renderiza ultimo separador
        if (section.footer === false) {
            return null;
        }

        const style: ViewStyle = {
            width: '100%',
            backgroundColor: theme.colorBackground,
            borderTopColor: theme.colorLine,
            borderTopWidth: theme.lineWidth
        };

        // Sempre exibe o footer (ultimo item tem marcação, conforme modelo no zeplin)
        if (section.footer && section.footer !== '') {
            style.padding = theme.padding;
            style.paddingTop = theme.paddingSmall;
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
                                subline={true}
                            >
                                {section.footer}
                            </SimpleText>
                        )
                        // JSX.Element
                        : section.footer
                }
            </View>
        )
    };

    private renderEmptyState = () => {
        return (
            <EmptyState
                {...(this.props.emptyState || {})}
            />
        )
    }
}
