import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageProps,
    LayoutChangeEvent,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewProps
} from 'react-native';
import Carousel from './Carousel';
import Theme, {spacing} from "./Theme";

const GAP_DEFAULT = 6;

export type CarouselImageItem = {
    key: string;

    image: ImageProps;

    [key: string]: any;
}

export type CarouselImageProps = ViewProps & {
    /**
     * The elements that will be presented in this Carousel
     */
    data: Array<CarouselImageItem>;

    /**
     * How many elements to display on the screen?
     */
    numColumns: number;

    /**
     * Item Spacing (default 6)
     */
    gap?: number;

    /**
     * How many items to skip at start
     */
    skip?: number;

    /**
     * Informs that images of Carousel items will be displayed as a circle.
     */
    rounded?: boolean;

    /**
     * Invoked when pressing an element
     */
    onPress?: (item: CarouselImageItem) => void;

    /**
     * Allows you to render additional content to the image, such as titles and etc.
     */
    renderContent?: (item: CarouselImageItem) => JSX.Element | null;
}

type CarouselImageState = {
    width: number;
    itemWidth: number;
}

const styles = StyleSheet.create({
    containner: {
        width: '100%'
    },
    image: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    itemContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});

/**
 * Image-implemented carousel component, similar to Google Play Store
 */
export default class CarouselImage extends React.PureComponent<CarouselImageProps, CarouselImageState> {

    animatedValueScroll = new Animated.Value(0);

    state: CarouselImageState = {
        width: Dimensions.get('window').width,
        itemWidth: 0
    };

    render() {
        return (
            <Theme>
                {(theme) => {

                    return (
                        <View style={styles.containner} onLayout={this.onLayout}>
                            {
                                // Só renderiza o carousel após calcular a largura correta
                                this.state.itemWidth
                                    ? (
                                        <Carousel
                                            gap={this.props.gap || GAP_DEFAULT}
                                            onScroll={(evt) => {
                                                if (evt && evt.nativeEvent.contentOffset.x <= this.state.itemWidth * 2) {
                                                    this.animatedValueScroll.setValue(evt.nativeEvent.contentOffset.x);
                                                }
                                            }}
                                        >
                                            {
                                                // Permite adicionar itens vazios no inicio
                                                (this.props.skip && this.props.skip > 0)
                                                    ? (
                                                        <View
                                                            key={'__EMPTY_SKIP__'}
                                                            style={{width: this.state.itemWidth * this.props.skip}}
                                                        />
                                                    )
                                                    : null
                                            }

                                            {
                                                this.props.data.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={item.key}
                                                            style={{flex: 1}}
                                                            onPress={() => {
                                                                if (this.props.onPress) {
                                                                    this.props.onPress(item);
                                                                }
                                                            }}
                                                            activeOpacity={0.7}
                                                        >
                                                            <View
                                                                style={{
                                                                    width: this.state.itemWidth,
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Image
                                                                    {...item.image}
                                                                    style={[
                                                                        item.image.style,
                                                                        {
                                                                            width: this.state.itemWidth,
                                                                            height: this.state.itemWidth,
                                                                            marginBottom: spacing(theme, 'tiny')
                                                                        },
                                                                        this.props.rounded
                                                                            ? {
                                                                                borderRadius: this.state.itemWidth / 2,
                                                                                borderColor: theme.colorLine,
                                                                                borderWidth: theme.lineWidth
                                                                            }
                                                                            : undefined
                                                                    ]}
                                                                />

                                                                {
                                                                    this.props.renderContent
                                                                        ? this.props.renderContent(item)
                                                                        : null
                                                                }
                                                            </View>
                                                        </TouchableOpacity>
                                                    );
                                                })
                                            }

                                            {
                                                // Adiciona um item vazio no fim da lista, para melhorar a navegação
                                                this.state.itemWidth
                                                    ? <View key={'__EMPTY_LAST__'} style={{width: this.state.itemWidth}}/>
                                                    : null
                                            }
                                        </Carousel>
                                    )
                                    : null
                            }
                        </View>
                    );
                }}
            </Theme>
        );

    }

    private onLayout = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        let itemWidth = Math.round((width - (this.props.numColumns * (this.props.gap || GAP_DEFAULT))) / (this.props.numColumns + 0.25));

        this.setState({
            width: width,
            itemWidth: itemWidth
        });
    };
}
