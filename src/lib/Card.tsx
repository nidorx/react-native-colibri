import React from 'react'
import {
    Animated, Easing,
    Image,
    ImageProps,
    LayoutChangeEvent,
    TouchableHighlight,
    TouchableOpacity,
    View,
    ViewProps
} from 'react-native';
import {getTheme} from "./Utils";
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
}

type CardState = {
    contentHeight?: number;
}

/**
 * Componente de Cartão genérico, semelhante aos agrupadores de categorias do Google Play
 */
export default class Card extends React.PureComponent<CardProps, CardState> {

    state: CardState = {};

    private onLayout = (event: LayoutChangeEvent) => {
        this.setState({
            contentHeight: event.nativeEvent.layout.height
        });
    };

    private onPressMore = () => {
        if (this.props.onPressMore) {
            this.props.onPressMore();
        }
    };

    render() {
        const theme = getTheme();
        const header = (
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: theme.padding
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
                                    subline={true}
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


        return (
            <View
                {...this.props}
                onLayout={this.onLayout}
                style={[
                    {
                        width: '100%',
                        flexDirection: 'column',
                        // backgroundColor: Theme.colorOpacity(Theme.colorBackground, 0.7),
                        paddingBottom: 0,
                        marginBottom: theme.padding * 1.5
                    },
                    this.props.style
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
        );
    }

}
