import React from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, View, ViewStyle} from 'react-native';
import Theme, {ThemeProps} from "./Theme";
import {animateGenericNative} from "./Utils";
import SimpleText from "./SimpleText";
import Spinner from "./Spinner";

const AnimatedSpinner = Animated.createAnimatedComponent(Spinner);

export type LoadingProps = {
    /**
     * Permite definir um tema personalizado para este componente
     */
    theme?: Partial<ThemeProps>;

    /**
     * Informs if spinner should be displayed
     */
    isLoading: boolean;

    /**
     * Lets you display an informational message while loading
     */
    message?: string;

    overlayStyle?: ViewStyle;
}

type LoadingState = {
    visible: boolean;
    isLoading: boolean;
    height: number;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
            requestAnimationFrame(time => {
                this.timeout = setTimeout(() => {
                    requestAnimationFrame(time1 => {
                        animateGenericNative(this.animatedIndicatorValue, 1);
                    })
                }, 400);
            })

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
        return (
            <Theme theme={this.props.theme}>
                {(theme) => {
                    const {visible} = this.state;

                    const translateIndicator = this.animatedIndicatorValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, this.state.height / 4]
                    });

                    const opacityOverlay = this.animatedOpacityValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.9]
                    });

                    const opacityContent = this.animatedOpacityValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.9]
                    });

                    return (
                        <View style={{flex: 1}}>
                            {
                                visible
                                    ? (
                                        <Animated.View
                                            onLayout={this.onLayout}
                                            style={[
                                                styles.container,
                                                {
                                                    backgroundColor: theme.colorBackground,
                                                    opacity: opacityOverlay
                                                },
                                                this.props.overlayStyle
                                            ]}
                                        >
                                            <AnimatedSpinner
                                                color={theme.colorPrimary.background}
                                                style={{
                                                    alignSelf: 'center',
                                                    transform: [
                                                        {
                                                            translateY: translateIndicator
                                                        }
                                                    ]
                                                }}
                                            />
                                            {
                                                this.props.message
                                                    ? (
                                                        <SimpleText
                                                            text={this.props.message}
                                                            small={true}
                                                            align={'center'}
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
                }}
            </Theme>
        );

    }

    private onLayout = (event: LayoutChangeEvent) => {
        this.setState({
            height: event.nativeEvent.layout.height
        });
    };
}
