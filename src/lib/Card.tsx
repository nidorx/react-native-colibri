import React from 'react'
import {Image, ImageProps, LayoutChangeEvent, TouchableHighlight, View, ViewProps} from 'react-native';
import {getTheme} from "./Utils";
import SimpleText from "./SimpleText";

export type CardProps = ViewProps & {
    title: string | JSX.Element;
    subtitle?: string | JSX.Element;
    moreText?: string;
    onPressMore?: () => void;
    image?: ImageProps;
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
                            <SimpleText
                                text={this.props.moreText || 'More'}
                                align={'right'}
                                color={theme.colorLink}
                            />
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
