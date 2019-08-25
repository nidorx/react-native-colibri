import React from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewProps,
    ViewStyle
} from 'react-native';

export type CarouselProps = ViewProps & {
    /**
     * Espaçamento entre os elementos
     */
    gap: number;
    /**
     * Permite personalizar o estilo do container de cada elemento
     */
    pageStyle?: StyleProp<ViewStyle>;
    /**
     * Permite receber informações sobre a rolagem no Carousel
     */
    onScroll?: (event?: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    page: {
        flex: 1,
        justifyContent: 'center',
    }
});

/**
 * Paginação de conteudo horizontal
 */
export default class Carousel extends React.PureComponent<CarouselProps> {

    private scrollView: ScrollView | null = null;

    private handledScrollEnd: boolean = false;

    private contentOffsetXStart: number = 0;

    /**
     * Salva a largura de cada filho, usado para determinar a pagina e elemento atual
     */
    private childrenWidth: Array<number> = [];

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <ScrollView
                    ref={r => this.scrollView = r}
                    bounces={true}
                    horizontal={true}
                    // decelerationRate={0.9}
                    overScrollMode={'auto'}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={{
                        paddingLeft: this.props.gap / 2,
                        paddingRight: this.props.gap / 2
                    }}
                    onScroll={this.props.onScroll}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                >
                    {
                        React.Children.map(this.props.children, (item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.page,
                                        {
                                            marginLeft: this.props.gap / 2,
                                            marginRight: this.props.gap / 2
                                        },
                                        this.props.pageStyle
                                    ]}
                                    onLayout={(evt) => {
                                        // Salva a largura do elemento, usado para determinar a posição no handleScrollEnd
                                        this.childrenWidth[index] = evt.nativeEvent.layout.width;
                                    }}
                                >
                                    {item}
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    private onScrollEndDrag = (evt?: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!evt) {
            return;
        }

        if (evt) {
            // https://facebook.github.io/react/docs/events.html#event-pooling
            evt.persist();
        }

        setTimeout(() => {
            if (this.handledScrollEnd) {
                return;
            }

            this.handledScrollEnd = true;

            if (!this.scrollView || !this.props.children) {
                return;
            }

            // select page based on the position of the left of the screen
            let currentPosition = evt.nativeEvent.contentOffset.x;

            let totalOffset = 0;

            let children = React.Children.map(this.props.children, item => item);

            for (let index = 0, l = children.length; index < l; index++) {
                const pageWidth: number = this.childrenWidth[index];

                if (totalOffset + (pageWidth / 2) > currentPosition) {
                    // Este é o ultimo elemento
                    break;
                }

                totalOffset += pageWidth + this.props.gap;
            }

            this.scrollView.scrollTo({y: 0, x: totalOffset});
        }, 5);
    };

    /**
     *  Ignora o Momentum e faz scroll para algum item baseando-se na velocidade aplicada pelo usuario (scroll)
     *
     * @param evt
     */
    private onMomentumScrollBegin = (evt?: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!evt) {
            return;
        }

        if (this.handledScrollEnd) {
            return;
        }

        this.handledScrollEnd = true;

        let velocity = 0;
        if (evt.nativeEvent.velocity) {
            velocity = evt.nativeEvent.velocity.x;
        }

        if (velocity === 0) {
            // true quando movimento do dedo for da esquerda para a direita
            if (this.contentOffsetXStart > evt.nativeEvent.contentOffset.x) {
                velocity = 1;
            } else {
                velocity = -1;
            }
        }

        const scrollToRight = velocity > 0;

        // Rolar quantas páginas?
        let numPages = Math.round(Math.abs(velocity));

        // A posição de cada página
        let offsets: Array<number> = [];

        if (!this.scrollView || !this.props.children) {
            return;
        }

        // select page based on the position of the left of the screen
        let currentPosition = evt.nativeEvent.contentOffset.x;

        let totalOffset = 0;
        let pageIndex = 0;
        let currentPageIndex = -1;

        let children = React.Children.map(this.props.children, item => item);

        for (let index = 0, l = children.length; index < l; index++) {
            const pageWidth: number = this.childrenWidth[index];

            offsets[index] = totalOffset;

            if (totalOffset + (pageWidth / 2) > currentPosition && currentPageIndex === -1) {
                currentPageIndex = index;
            }

            if (scrollToRight) {
                // Para de contar na página atual, já tem as posições das páginas da esquerda
                if (currentPageIndex !== -1) {
                    pageIndex = index - numPages;
                    break;
                }
            } else {
                pageIndex = index;
                if (currentPageIndex !== -1) {
                    if (index - currentPageIndex === numPages) {
                        break;
                    }
                }
            }

            totalOffset += pageWidth + this.props.gap;
        }

        if (pageIndex < 0) {
            pageIndex = 0;
        } else if (pageIndex >= children.length) {
            pageIndex = children.length - 1;
        }

        let finalOffset = offsets[pageIndex];
        this.scrollView.scrollTo({y: 0, x: finalOffset});
    };

    private onScrollBeginDrag = (evt?: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (evt) {
            this.contentOffsetXStart = evt.nativeEvent.contentOffset.x;
        }
        this.handledScrollEnd = false;
    }
}
