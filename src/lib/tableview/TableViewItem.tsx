import React from 'react';
import {
    Animated,
    Image,
    ImageProps,
    PanResponder,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {
    DiscloruseIcon,
    tableViewGetItemIconBigSize,
    tableViewGetItemIconSize,
    TableViewRowSectionCallbackFn,
    TableViewSectionListRenderItemInfo,
    TableViewSwipeActions,
    TableViewRow,
    TableViewSection
} from './TableViewConstants';
import Title from '../Title';
import SimpleText from './../SimpleText';
import {animateGeneric, getTheme, Theme} from "../Utils";


export type TableViewItemProps = {
    row: TableViewRow;
    section: TableViewSection;
    extraData?: any;
    info: TableViewSectionListRenderItemInfo<TableViewSection>;
    /**
     * Ações para o gesto de Seipe (arrastar para a esquerda) no item
     */
    swipeActions?: TableViewSwipeActions;
    onPress?: TableViewRowSectionCallbackFn;
    onSelect?: TableViewRowSectionCallbackFn;
    onLongPress?: TableViewRowSectionCallbackFn;
}

type TableViewItemState = {
    extraData: number;
    swipeAnimationOpacityContent?: any;
}

/**
 * Representação de um único item da Table, permitindo maior controle
 */
export default class TableViewItem extends React.PureComponent<TableViewItemProps, TableViewItemState> {

    state: TableViewItemState = {
        extraData: 0
    };

    /**
     * Armazena a largura dos botões de ação de swipe, usado para validar o gesto
     */
    swipeActionsWidth: Array<number> = [];

    animateColorValue = new Animated.Value(0);

    swipeAnimation = new Animated.Value(0);

    swipeTranslateXValue = 0;

    componentDidMount() {
        this.swipeAnimation.addListener((evt) => {
            this.swipeTranslateXValue = evt.value;
        });
    }

    /**
     * Permite forçar a renderização deste elemento
     *
     * @param newProps
     */
    forceRender(newRow?: { [key: string]: any }) {
        if (newRow) {
            Object.assign(this.props.row, newRow);
        }
        this.setState({
            extraData: this.state.extraData++
        });
    }

    render() {
        const row = this.props.row;
        const section = this.props.section;

        const onPress = row.onPress || section.onPress || this.props.onPress;
        const onSelect = section.onSelect || this.props.onSelect;
        const onLongPress = row.onLongPress || section.onLongPress || this.props.onLongPress;
        const swipeActions = row.swipeActions || section.swipeActions || this.props.swipeActions;

        let content = this.renderContent(row);

        if (onSelect && !row.ignoreOnSelect) {
            content = this.renderContentOnSelect(section, row, content, onSelect);
        } else if (onPress || onLongPress) {
            content = this.renderContentOnPress(section, row, content, onPress, onLongPress);
        }

        // Adiciona a funcionalidade de swipe
        if (swipeActions && swipeActions.length > 0) {
            // Swipe
            content = this.renderContentSwipe(section, row, content, swipeActions);
        }

        return content;
    }

    private renderContent(row: TableViewRow) {
        const theme = getTheme();

        const hasSubtitle = (row.subtitle && row.subtitle !== '');

        const backgroundColor = this.animateColorValue.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.colorContent, theme.colorUnderlay]
        });

        /**
         * Altura mínima dos itens, permite uma melhor padronização visual
         */
        const TABLE_VIEW_ITEM_MIN_HEIGHT = theme.paddingSmall * 2 + theme.fontSize;

        return (
            <Animated.View
                style={[
                    {
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: row.selected ? theme.colorSelected : backgroundColor,
                        paddingHorizontal: theme.paddingBig,
                        paddingVertical: (row.large || !hasSubtitle) ? theme.padding : theme.paddingSmall,
                        minHeight: TABLE_VIEW_ITEM_MIN_HEIGHT
                    },
                    row.style
                ]}
            >
                {
                    // left
                    this.renderLeft(row, theme)
                }

                {
                    // icon
                    this.renderIcon(row, theme)
                }

                {
                    // title and subtitle
                    this.renderTitleSubtitle(row)
                }

                {
                    // right
                    this.renderRight(row, theme)
                }
            </Animated.View>
        );
    }

    private renderTitleSubtitle(row: TableViewRow) {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Title
                    title={row.title}
                    subtitle={row.subtitle}
                    reverse={row.reverse}
                    style={{
                        // Quando possui icone, centraliza o título
                        justifyContent: row.icon ? 'center' : undefined,
                    }}
                />
            </View>
        );
    }

    private renderLeft(row: TableViewRow, theme: Theme) {
        return (!row.left || row.left === '')
            ? null
            : (
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'flex-start'
                    }}
                >
                    {
                        (typeof row.left === 'string')
                            ? (
                                <SimpleText
                                    text={row.left}
                                    color={theme.colorTextSecondary}
                                    size={theme.fontSizeSubline}
                                />
                            )
                            // JSX.Element
                            : row.left
                    }
                </View>
            );
    }

    private renderIcon(row: TableViewRow, theme: Theme) {
        const itemIconSize = tableViewGetItemIconSize();
        const itemIconBigSize = tableViewGetItemIconBigSize();

        return (!row.icon)
            ? undefined
            // Ícone é imagem
            : (
                (row.icon.hasOwnProperty('source'))
                    ? ((icon: ImageProps) => (
                        <Image
                            {...icon}
                            style={[
                                icon.style,
                                {
                                    width: row.iconBig ? itemIconBigSize : itemIconSize,
                                    height: row.iconBig ? itemIconBigSize : itemIconSize,
                                    resizeMode: 'center',
                                    borderRadius: theme.paddingSmall,
                                    marginRight: theme.padding
                                }
                            ]}
                        />
                    ))(row.icon as any)
                    // Ícone é JSX.Element
                    : (
                        <View
                            style={{
                                width: row.iconBig ? itemIconBigSize : itemIconSize,
                                height: row.iconBig ? itemIconBigSize : itemIconSize,
                                justifyContent: 'center',
                                alignContent: 'center',
                                marginRight: theme.padding
                            }}
                        >
                            {row.icon}
                        </View>
                    )
            );
    }

    private renderRight(row: TableViewRow, theme: Theme) {
        return ((row.right && row.right !== '') || row.disclosure)
            ? (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        flex: (row.right && row.right !== '' && row.rightFlex) ? 1 : undefined
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            flex: (row.right && row.right !== '' && row.rightFlex) ? 1 : undefined
                        }}
                    >
                        {
                            (!row.right || row.right === '')
                                ? null
                                : (typeof row.right === 'string')
                                ? (
                                    <SimpleText
                                        text={row.right}
                                        color={theme.colorTextSecondary}
                                        size={theme.fontSizeSubline}
                                    />
                                )
                                // JSX.Element
                                : row.right
                        }
                    </View>

                    <View
                        style={{
                            justifyContent: 'center',
                            alignContent: 'flex-end'
                        }}
                    >
                        {/* // Acessories */}

                        {
                            // Disclosure
                            row.disclosure ? DiscloruseIcon : null
                        }
                    </View>
                </View>
            )
            : null;
    }

    /**
     * Renderiza o componente de seleção de item
     *
     * @param section
     * @param row
     * @param onSelect
     * @param content
     */
    private renderContentOnSelect(section: TableViewSection, row: TableViewRow, content: JSX.Element, onSelect: TableViewRowSectionCallbackFn) {

        const onLongPress = row.onLongPress || section.onLongPress || this.props.onLongPress;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    // Marca o item como selecionado, re-renderiza o componente e informa ao interessado
                    row.selected = !row.selected;
                    this.setState({
                        extraData: this.state.extraData++
                    }, () => {
                        onSelect(row, section);
                    });
                }}
                onLongPress={
                    onLongPress
                        ? () => {
                            onLongPress(row, section);
                        }
                        : undefined
                }
                onPressIn={this.props.info.separators.highlight}
                onPressOut={this.props.info.separators.unhighlight}
            >
                {content}
            </TouchableWithoutFeedback>
        );
    }

    private renderContentOnPress(section: TableViewSection, row: TableViewRow, content: JSX.Element, onPress?: TableViewRowSectionCallbackFn, onLongPress?: TableViewRowSectionCallbackFn) {
        return (
            <TouchableWithoutFeedback
                onPressIn={() => {
                    if (Math.abs(this.swipeTranslateXValue) > 0) {
                        // Swipe ativo, ignora press
                        return;
                    }
                    this.props.info.separators.highlight();
                    animateGeneric(this.animateColorValue, 1);
                }}
                onPressOut={() => {
                    this.props.info.separators.unhighlight();
                    animateGeneric(this.animateColorValue, 0);
                }}
                onPress={
                    onPress
                        ? () => {
                            if (Math.abs(this.swipeTranslateXValue) > 0) {
                                // Swipe ativo, ignora press
                                return;
                            }
                            onPress(row, section);
                        }
                        : undefined
                }
                onLongPress={
                    onLongPress
                        ? () => {
                            if (Math.abs(this.swipeTranslateXValue) > 0) {
                                // Swipe ativo, ignora press
                                return;
                            }
                            onLongPress(row, section);
                        }
                        : undefined
                }
            >
                {content}
            </TouchableWithoutFeedback>
        );
    }

    private renderContentSwipe(section: TableViewSection, row: TableViewRow, content: JSX.Element, swipeActions: TableViewSwipeActions) {
        const theme = getTheme();
        let lastGestureX = 0;
        const panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dx < -30 || gestureState.dx > 30;
            },
            onPanResponderMove: (evt, gesture) => {
                const actionsWidth = this.swipeActionsWidth.reduce((prev, curr) => prev + curr, 0);
                const diff = gesture.dx - lastGestureX;
                lastGestureX = gesture.dx;
                // Entre 0 e largura do conteudo + 20%
                this.swipeAnimation.setValue(Math.min(0, Math.max(this.swipeTranslateXValue + diff, -(actionsWidth * 1.2))));
            },
            onPanResponderEnd: (evt, {vx, dx}) => {
                lastGestureX = 0;
                const actionsWidth = this.swipeActionsWidth.reduce((prev, curr) => prev + curr, 0);
                if (Math.abs(this.swipeTranslateXValue) >= 0.5 * actionsWidth) {
                    // Exibiu os botoes de ação
                    animateGeneric(this.swipeAnimation, dx > 0 ? 0 : -actionsWidth);
                } else {
                    // Reverte o movimento de swipe
                    animateGeneric(this.swipeAnimation, 0);
                }
            }
        });

        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        backgroundColor: theme.colorBackground
                    }}
                >
                    {
                        swipeActions.map((action, index) => {
                            let bgColor = action.color === 'primary'
                                ? theme.colorPrimary
                                : action.color === 'success'
                                    ? theme.colorSuccess
                                    : action.color === 'warning'
                                        ? theme.colorWarning
                                        : theme.colorDanger;
                            return (
                                <TouchableHighlight
                                    key={`${index}`}
                                    onLayout={(evt) => {
                                        this.swipeActionsWidth[index] = evt.nativeEvent.layout.width;
                                        const actionsWidth = this.swipeActionsWidth.reduce((prev, curr) => prev + curr, 0);
                                        this.setState({
                                            swipeAnimationOpacityContent: this.swipeAnimation.interpolate({
                                                inputRange: [-actionsWidth, -(actionsWidth / 2), 0],
                                                outputRange: [1, 0.3, 1]
                                            })
                                        })
                                    }}
                                    style={{
                                        position: 'relative',
                                        backgroundColor: bgColor,
                                        height: '100%',
                                        padding: theme.padding,
                                        alignSelf: 'flex-end'
                                    }}
                                    onPress={() => {
                                        action.onPress(row, section);
                                    }}
                                    underlayColor={theme.colorUnderlay}
                                >
                                    <View>
                                        <SimpleText text={action.title} color={theme.colorContent}/>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={{
                        // backgroundColor: backgroundColor,
                        opacity: this.state.swipeAnimationOpacityContent,
                        transform: [
                            {
                                translateX: this.swipeAnimation
                            }
                        ]
                    }}
                >
                    {content}
                </Animated.View>
            </View>
        );
    }


}
