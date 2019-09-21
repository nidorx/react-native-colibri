import React from 'react'
import {Animated, Easing, Image, ImageProps, LayoutChangeEvent, TouchableOpacity, View, ViewProps} from 'react-native';
import {getTheme, spacing} from "./Theme";
import SimpleText from "./SimpleText";

export type CardProps = ViewProps & {
    /**
     * Title of card
     */
    title: string | JSX.Element;
    /**
     * Subtitle of card
     */
    subtitle?: string | JSX.Element;
    /**
     * More text
     */
    moreText?: string;
    /**
     * Action on press more button
     */
    onPressMore?: () => void;
    /**
     * Background image
     */
    image?: ImageProps;
    /**
     * Allow to add translate effects on background image
     */
    imageTranslateXValue?: Animated.Value;
    /**
     * Render as box (Horizontal margin)
     */
    boxed?: boolean;
    /**
     * Show shadow pattern
     */
    shadow?: boolean;
    /**
     * Change tint color of shadow
     */
    shadowColor?: string;
    /**
     * Select a pattern for shadow
     */
    shadowPattern?: 'A' | 'B' | 'C';
    /**
     * Change opacity of shadow
     */
    shadowOpacity?: number;
}

type CardState = {
    contentHeight?: number;
    contentInnerWidth?: number;
}

const SHADOWS = {
    'A': {
        image: require('./../assets/shadow-a.png'),
        margin: 1.5
    },
    'B': {
        image: require('./../assets/shadow-b.png'),
        margin: 2.5
    },
    'C': {
        image: require('./../assets/shadow-c.png'),
        margin: 2.5
    }
};


/**
 * Componente de Cartão genérico, semelhante aos agrupadores de categorias do Google Play
 */
export default class Card extends React.PureComponent<CardProps, CardState> {

    state: CardState = {};

    render() {
        const theme = getTheme();
        const spacingMicro = spacing(theme, 'micro') as number;
        const spacingSmall = spacing(theme, 'small') as number;
        const spacingBase = spacing(theme, 'base') as number;

        const header = (
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: spacingSmall
                }}
            >

                <View style={{flexDirection: 'column', flex: 1}}>
                    {
                        (typeof this.props.title === 'string')
                            ? (
                                <SimpleText
                                    align={'left'}
                                    text={this.props.title}
                                />
                            )
                            : this.props.title
                    }
                    {
                        (typeof this.props.subtitle === 'string')
                            ? (

                                <SimpleText
                                    small={true}
                                    align={'left'}
                                    color={theme.colorTextSecondary}
                                    text={this.props.subtitle}
                                />
                            )
                            : this.props.subtitle
                    }
                </View>
                {
                    this.props.onPressMore
                        ? (
                            <View style={{justifyContent: 'center'}}>
                                <SimpleText
                                    text={this.props.moreText || 'More'}
                                    align={'right'}
                                    color={theme.colorLink}
                                />
                            </View>
                        )
                        : null
                }

            </View>
        );

        const shadow = this.props.shadow || (this.props.boxed && this.props.shadow !== false)
            ? SHADOWS[this.props.shadowPattern || 'A']
            : null;


        return (
            <View
                {...this.props}
                onLayout={this.onLayout}
                style={[
                    {
                        width: '100%',
                        flexDirection: 'column',
                        padding: 0,
                        marginBottom: spacingBase,
                        zIndex: shadow ? 1 : 0
                    }
                ]}
            >
                <View
                    onLayout={this.onLayoutInner}
                    style={[
                        this.props.boxed
                            ? {
                                overflow: 'hidden',
                                marginHorizontal: spacing(theme, 'tiny'),
                                borderRadius: spacingMicro,
                                borderWidth: theme.lineWidth,
                                borderColor: theme.colorLine,
                            }
                            : undefined,
                        this.props.style,
                        {
                            marginBottom: 0
                        }
                    ]}
                >
                    {
                        this.props.image && this.state.contentHeight
                            ? (
                                <Animated.Image
                                    {...this.props.image}
                                    style={[
                                        this.props.image.style,
                                        {
                                            width: this.state.contentHeight,
                                            height: this.state.contentHeight,
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            resizeMode: 'cover',
                                            // Oculta imagem a medida que o scroll é executado
                                            opacity: this.props.imageTranslateXValue
                                                ? this.props.imageTranslateXValue.interpolate({
                                                    inputRange: [0, this.state.contentHeight * 0.15, this.state.contentHeight * 0.75],
                                                    outputRange: [1, 1, 0.25],
                                                    easing: Easing.bezier(0, 0, 0.58, 1),
                                                    extrapolate: 'clamp'
                                                })
                                                : 1,
                                            // Anima exibição da imagem a medida que o scroll é executado
                                            transform: [
                                                {
                                                    translateX: this.props.imageTranslateXValue
                                                        ? this.props.imageTranslateXValue.interpolate({
                                                            inputRange: [0, this.state.contentHeight * 0.75],
                                                            outputRange: [0, -(this.state.contentHeight * 0.1)],
                                                            extrapolate: 'clamp'
                                                        })
                                                        : 0
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            )
                            : undefined
                    }
                    {
                        this.props.onPressMore
                            ? (
                                <TouchableOpacity
                                    onPress={this.onPressMore}
                                    activeOpacity={0.3}
                                >
                                    {header}
                                </TouchableOpacity>
                            )
                            : header
                    }

                    {this.props.children}

                </View>
                {
                    shadow
                        ? (
                            <Image
                                source={shadow.image}
                                style={{
                                    position: 'absolute',
                                    top: this.state.contentHeight,
                                    width: this.state.contentInnerWidth
                                        ? this.state.contentInnerWidth - (this.props.boxed ? spacingMicro : 0)
                                        : '100%',
                                    alignSelf: 'center',
                                    resizeMode: 'stretch',
                                    opacity: this.props.shadowOpacity || 0.3,
                                    tintColor: this.props.shadowColor
                                }}
                            />
                        )
                        : null
                }
            </View>
        );
    }

    private onLayout = (event: LayoutChangeEvent) => {
        this.setState({
            contentHeight: event.nativeEvent.layout.height
        });
    };

    private onLayoutInner = (event: LayoutChangeEvent) => {
        this.setState({
            contentInnerWidth: event.nativeEvent.layout.width
        });
    };

    private onPressMore = () => {
        if (this.props.onPressMore) {
            this.props.onPressMore();
        }
    };

}
