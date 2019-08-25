import React from 'react';
import {ActivityIndicator, Animated, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {animateGenericNative, getTheme} from "./Utils";
import SimpleText from "./SimpleText";

const AnimatedActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator);

export type LoadingProps = {
    /**
     * Informs if spinner should be displayed
     */
    isLoading: boolean;

    /**
     * Lets you display an informational message while loading
     */
    message?: string;
}

type LoadingState = {
    visible: boolean;
    isLoading: boolean;
    height: number;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    }
});

/**
 * Component to allow interface locking while performing asynchronous operations
 */
export default class Loading extends React.PureComponent<LoadingProps, LoadingState> {

    static defaultProps = {
        isLoading: false
    };

    animatedOpacityValue = new Animated.Value(1);

    animatedIndicatorValue = new Animated.Value(0);

    timeout: any;

    constructor(props: LoadingProps) {
        super(props);
        this.state = {
            height: 10,
            visible: this.props.isLoading,
            isLoading: this.props.isLoading
        };
    }

    private onLayout = (event: LayoutChangeEvent) => {
        this.setState({
            height: event.nativeEvent.layout.height
        });
    };

    componentDidMount() {
        this.animateOpacity();
    }

    componentDidUpdate(prevProps: LoadingProps) {
        const isLoading = this.props.isLoading;
        if (isLoading != prevProps.isLoading) {
            this.setState({
                isLoading: isLoading,
                // Se estiver carregando, o loading é visível
                visible: this.state.visible || isLoading
            }, () => {
                // Mudou o estado ?
                if (prevProps.isLoading !== this.state.isLoading) {
                    this.animateOpacity();
                }
            });
        }
    }

    animateOpacity() {
        clearTimeout(this.timeout);

        if (this.state.isLoading) {
            // Exibe animação de exibição do loading
            animateGenericNative(this.animatedOpacityValue, 1);

            // Se o processo demorar, exibe o indicador de atividade
            this.timeout = setTimeout(() => {
                animateGenericNative(this.animatedIndicatorValue, 1);
            }, 400);

        } else {
            if (this.state.visible) {

                animateGenericNative(this.animatedOpacityValue, 0, result => {
                    // Após finalizar a animação de ocultar o loading, remove o elemento da tela
                    this.setState({
                        visible: false
                    })
                });
            } else {
                this.animatedOpacityValue.setValue(0);
                animateGenericNative(this.animatedIndicatorValue, 0);
            }
        }
    }


    render() {
        const theme = getTheme();
        const {visible} = this.state;

        const trasnlateIndicator = this.animatedIndicatorValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, this.state.height / 4]
        });

        const opacityOverlay = this.animatedOpacityValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const opacityContent = this.animatedOpacityValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.90]
        });

        return (
            <View style={StyleSheet.absoluteFill}>
                {
                    visible ?
                        (
                            <Animated.View
                                onLayout={this.onLayout}
                                style={[
                                    styles.container,
                                    {
                                        opacity: opacityOverlay
                                    }
                                ]}
                            >
                                <AnimatedActivityIndicator
                                    animating={this.state.visible}
                                    size={'small'}
                                    color={theme.colorPrimary}
                                    style={{
                                        transform: [
                                            {
                                                translateY: trasnlateIndicator
                                            }
                                        ]
                                    }}
                                />
                                {
                                    this.props.message
                                        ? (
                                            <SimpleText
                                                text={this.props.message}
                                                subline={true}
                                                style={{
                                                    marginTop: this.state.height / 3,
                                                }}
                                                inline={true}
                                            />
                                        )
                                        : null
                                }
                            </Animated.View>
                        )
                        : null
                }
                <Animated.View
                    style={{
                        opacity: opacityContent,
                        flex: 1
                    }}
                >
                    {this.props.children ? this.props.children : <View/>}
                </Animated.View>
            </View>
        );
    }
}
