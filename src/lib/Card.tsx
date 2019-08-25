import React from 'react'
import {Image, ImageProps, LayoutChangeEvent, Text, TouchableHighlight, View, ViewProps} from 'react-native';
import {getTheme} from "./Utils";

export type CardProps = ViewProps & {
    title: string;
    subtitle?: string;
    moreText?: string;
    onPressMore?: () => void;
    color?: string;
    /**
     * Permite adicionar uma imagem que representa esse Carousel
     */
    image?: ImageProps;
}

interface CardState {
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
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: theme.padding
                }}
            >

                <View style={{flexDirection: 'column', flex: 1}}>
                    <Text style={{fontSize: theme.fontSize, color: '#000'}}>
                        {this.props.title}
                    </Text>
                    {
                        this.props.subtitle
                            ? (
                                <Text style={{
                                    fontSize: theme.fontSizeSubline,
                                    color: theme.colorTextSecondary // '#555'/*Theme.colorOpacity('#000', 0.8)*/,
                                }}>
                                    {this.props.subtitle}
                                </Text>
                            )
                            : null
                    }
                </View>
                {
                    this.props.onPressMore
                        ? (
                            <Text
                                style={{
                                    fontSize: theme.fontSize,
                                    textAlignVertical: 'center',
                                    color: theme.colorLink,
                                }}
                            >
                                {this.props.moreText || 'More'}
                            </Text>
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
                            <Image
                                {...this.props.image}
                                style={{
                                    width: this.state.contentHeight,
                                    height: this.state.contentHeight,
                                    position: 'absolute',
                                    left: 0,
                                    resizeMode: 'contain'
                                }}
                            />
                        )
                        : undefined
                }
                {
                    this.props.onPressMore
                        ? (
                            <TouchableHighlight
                                onPress={this.onPressMore}
                                underlayColor={theme.colorUnderlay}
                            >
                                {header}
                            </TouchableHighlight>
                        )
                        : header
                }
                {this.props.children}

            </View>
        );
    }


}
