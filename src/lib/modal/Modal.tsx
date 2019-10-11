import React, {ReactNode} from "react";
import {
    Animated,
    BackHandler,
    Dimensions, Easing, EasingFunction,
    Image,
    Keyboard, LayoutChangeEvent,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {animateGeneric, animateGenericNative, QuinticEaseOut} from "../Utils";
import Theme, {spacing, ThemeProps} from "../Theme";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    animatedContainer: {
        zIndex: 1,
    },
    animatedContainerInner: {
        // backgroundColor: '#FFF',
        // overflow: 'hidden',
        alignContent: 'center',
        justifyContent: 'center'
    },
    closeIconContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2
    }
});

export type ModalTransform = {
    duration?: number;
    delay?: number;
    easing?: EasingFunction;
    perspective?: number;
    opacity?: Animated.InterpolationConfigType;
    translateX?: Animated.InterpolationConfigType;
    translateY?: Animated.InterpolationConfigType;
    scale?: Animated.InterpolationConfigType;
    scaleX?: Animated.InterpolationConfigType;
    scaleY?: Animated.InterpolationConfigType;
    rotate?: Animated.InterpolationConfigType;
    rotateX?: Animated.InterpolationConfigType;
    rotateY?: Animated.InterpolationConfigType;
    skewX?: Animated.InterpolationConfigType;
    skewY?: Animated.InterpolationConfigType;
};

const TRANSFORM_SLIDE_IN_BOTTOM_IN: ModalTransform = {
    duration: 250,
    easing: QuinticEaseOut,
    perspective: 1000,
    translateY: {
        inputRange: [0, 1],
        outputRange: [50, 0]
    }
};

const TRANSFORM_SLIDE_IN_BOTTOM_OUT: ModalTransform = {
    duration: 200,
    easing: QuinticEaseOut,
    perspective: 1000,
    translateY: {
        inputRange: [0, 1],
        outputRange: [100, 1]
    }
};

export type ModalOptions = {
    /**
     * Posicionamento vertical da modal, default CENTER
     */
    ver?: 'top' | 'center' | 'bottom';

    /**
     * Posicionamento horizontal da modal, default CENTER
     */
    hor?: 'left' | 'center' | 'right';

    /**
     * Largura da modal, default MEDIUM
     *
     * Larguras são percentual da largura da tela,  'small' | 'medium' | 'large' = 40, 70, 90
     */
    width?: 'small' | 'medium' | 'large';

    /**
     * Includes a modal-backdrop element. Default true
     */
    backdrop?: boolean;

    /**
     * Includes a close button element. Default true
     */
    close?: boolean; /**
     * Faz animação no conteúdo? Default: true
     */
    animateContent?: boolean;
    /**
     * Permite personalizar apariçao da modal
     */
    transformIn?: ModalTransform;
    /**
     * Permite personalizar desaparecimento da modal
     */
    transformOut?: ModalTransform;
}

export type ModalProps = {
    content?: ReactNode;
    onClose?: () => void;
    onBeforeClose?: () => void;
    options?: ModalOptions;
}

export type ModalState = {
    animation: 'in' | 'out';
    visible: boolean;
    containerActive: boolean;
    contentActive: boolean;
    contentHeight: number;
    content?: ReactNode;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
}

export default class Modal extends React.PureComponent<ModalProps, ModalState> {

    private WIDTH = Dimensions.get('window').width;

    private HEIGHT = Dimensions.get('window').height;

    state: ModalState = {
        animation: 'in',
        visible: false,
        containerActive: false,
        contentActive: false,
        contentHeight: this.HEIGHT * 0.9,
    };

    private animation = new Animated.Value(0);

    private keyboardHeight = 0;

    private keyboardTimeout: any;

    private themeRef?: ThemeProps;

    private step1OnContentLayout = (event: LayoutChangeEvent) => {
        if (this.state.containerActive && !this.state.contentActive) {
            this.updatePositions(() => {
                this.setState({
                    contentActive: true
                });
            });
        }
    };

    private step2OnContentSizeChange = (w: number, h: number) => {
        this.setState({
            contentHeight: h
        }, () => {
            this.updatePositions(() => {
                if (!this.state.visible) {
                    this.setState({
                        visible: true
                    }, () => {
                        // Animate element
                        const modalTransform = this.getTransform();
                        Animated.timing(this.animation, {
                            toValue: 1,
                            duration: modalTransform.duration || 250,
                            delay: modalTransform.delay || 0,
                            easing: modalTransform.easing || QuinticEaseOut,
                            useNativeDriver: true
                        }).start();
                        animateGenericNative(this.animation, 1);
                    });
                }
            });
        });
    };

    private updatePositions = (callback?: () => void) => {
        // Faz animação de posicionamento do elmento
        let {top, left, width, height} = this.getPositions();

        this.setState({
            top: top,
            left: left,
            width: width,
            height: height
        }, callback);
    };

    private onBackButtonPressAndroid = () => {
        this.hide();
        return true;
    };

    /**
     * Faz redimensionamento do conteúdo quando abrir teclado
     */
    private keyboardDidShowHide = (e?: { endCoordinates?: { height: number, screenX: number, screenY: number, width: number } }) => {
        if (e && e.endCoordinates) {
            this.keyboardHeight = e.endCoordinates.height;
        } else {
            this.keyboardHeight = 0;
        }

        clearTimeout(this.keyboardTimeout);
        requestAnimationFrame(() => {
            this.keyboardTimeout = setTimeout(() => {
                requestAnimationFrame(() => {
                    this.updatePositions();
                });
            }, 10);
        })
    };

    private getPositions = () => {
        const options = this.props.options || {};
        const statusBarHeight = getStatusBarHeight();

        const screenWidth = this.WIDTH;
        const screenHeight = (this.HEIGHT * 0.9) - this.keyboardHeight;
        const verticalPosition = options.ver || 'center';
        const horizontalPosition = options.hor || 'center';
        const optWidth = options.width || 'large';

        let width =
            optWidth === 'medium'
                ? screenWidth * 0.7
                : (
                    optWidth === 'small'
                        ? screenWidth * 0.4
                        : screenWidth * 0.9
                );

        const padding = this.themeRef ? spacing(this.themeRef, 'tiny') as number : 8;
        let left =
            horizontalPosition === 'center'
                ? (screenWidth * 0.5 - width * 0.5)
                : (
                    horizontalPosition === 'left'
                        ? padding
                        : screenWidth - (padding as number) - width
                );

        // Altura é conteudo ou 90%da tela
        let height = Math.min(this.state.contentHeight, screenHeight);

        let paddingTop = screenHeight * 0.1;
        let top =
            verticalPosition === 'center'
                ? (screenHeight * 0.5 - height * 0.5) + paddingTop
                : (
                    verticalPosition === 'top'
                        ? paddingTop
                        : screenHeight - height + paddingTop
                );

        return {
            top: top,
            left: left,
            width: width,
            height: height
        };
    };

    private getTransform = (): ModalTransform => {
        let transform: ModalTransform;
        const options = this.props.options || {};
        if (this.state.animation === 'in') {
            transform = {
                ...TRANSFORM_SLIDE_IN_BOTTOM_IN,
                ...(options.transformIn || {})
            };
        } else {
            transform = {
                ...TRANSFORM_SLIDE_IN_BOTTOM_OUT,
                ...(options.transformOut || options.transformIn || {})
            };
        }

        return transform;
    };

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHide);
        Keyboard.addListener('keyboardDidHide', this.keyboardDidShowHide);
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this.keyboardDidShowHide);
        Keyboard.removeListener('keyboardDidHide', this.keyboardDidShowHide);
    }

    render() {
        if (!this.state.containerActive) {
            return null;
        }

        return (
            <Theme>
                {(theme) => {

                    this.themeRef = theme;
                    const iconCloseSize = spacing(theme, 'base');
                    const borderRadius = spacing(theme, 'micro');
                    const options = this.props.options || {};

                    const modalTransform = this.getTransform();

                    const transform = [];

                    if (modalTransform.perspective) {
                        transform.push({perspective: modalTransform.perspective});
                    }

                    if (modalTransform.translateX) {
                        transform.push({translateX: this.animation.interpolate(modalTransform.translateX)});
                    }

                    if (modalTransform.translateY) {
                        transform.push({translateY: this.animation.interpolate(modalTransform.translateY)});
                    }

                    if (modalTransform.scale) {
                        transform.push({scale: this.animation.interpolate(modalTransform.scale)});
                    }

                    if (modalTransform.scaleX) {
                        transform.push({scaleX: this.animation.interpolate(modalTransform.scaleX)});
                    }

                    if (modalTransform.scaleY) {
                        transform.push({scaleY: this.animation.interpolate(modalTransform.scaleY)});
                    }

                    if (modalTransform.rotate) {
                        transform.push({rotate: this.animation.interpolate(modalTransform.rotate)});
                    }

                    if (modalTransform.rotateX) {
                        transform.push({rotateX: this.animation.interpolate(modalTransform.rotateX)});
                    }

                    if (modalTransform.rotateY) {
                        transform.push({rotateY: this.animation.interpolate(modalTransform.rotateY)});
                    }

                    if (modalTransform.skewX) {
                        transform.push({skewX: this.animation.interpolate(modalTransform.skewX)});
                    }

                    if (modalTransform.skewY) {
                        transform.push({skewY: this.animation.interpolate(modalTransform.skewY)});
                    }

                    return (
                        <View
                            style={styles.container}
                            onLayout={this.step1OnContentLayout}
                        >

                            <TouchableWithoutFeedback onPress={this.hide} disabled={options.backdrop === false}>
                                <Animated.View style={[styles.overlay, {opacity: this.animation}]}/>
                            </TouchableWithoutFeedback>

                            <Animated.View
                                style={[
                                    styles.animatedContainer,
                                    {
                                        position: 'absolute',
                                        width: '100%',
                                        opacity: modalTransform.opacity
                                            ? this.animation.interpolate(modalTransform.opacity)
                                            : this.animation,
                                        top: this.state.top,
                                        transform: transform,
                                    }
                                ]}
                            >
                                <Animated.View
                                    style={[
                                        styles.animatedContainerInner,
                                        {
                                            overflow: 'hidden',
                                            borderRadius: borderRadius,
                                            position: 'relative',
                                            left: this.state.left,
                                            width: this.state.width,
                                            height: this.state.height
                                        }
                                    ]}
                                >
                                    {
                                        (options.close !== false)
                                            ? (
                                                <TouchableOpacity onPress={this.hide} style={styles.closeIconContainer}>
                                                    <Image
                                                        style={{
                                                            width: iconCloseSize,
                                                            height: iconCloseSize,
                                                            resizeMode: 'contain',
                                                            tintColor: theme.colorTextSecondary
                                                        }}
                                                        source={require('./../../assets/close.png')}
                                                    />
                                                </TouchableOpacity>
                                            )
                                            : null
                                    }

                                    {
                                        this.state.contentActive
                                            ? (
                                                <ScrollView
                                                    scrollEventThrottle={16}
                                                    style={{borderRadius: 3}}
                                                    automaticallyAdjustContentInsets={false}
                                                    onContentSizeChange={this.step2OnContentSizeChange}
                                                >
                                                    {this.state.content || this.props.content || null}
                                                </ScrollView>
                                            )
                                            : undefined
                                    }

                                </Animated.View>
                            </Animated.View>
                        </View>
                    );
                }}
            </Theme>
        );
    }

    show(callback?: () => void) {

        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

        this.animation.stopAnimation(() => {
            this.setState({
                animation: 'in',
                visible: false,
                containerActive: true,
                contentActive: false,
            }, callback);
        });
    };

    hide = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

        if (this.props.onBeforeClose) {
            this.props.onBeforeClose();
        }

        this.setState({
            animation: 'out'
        }, () => {
            const modalTransform = this.getTransform();

            Animated.timing(this.animation, {
                toValue: 0,
                duration: modalTransform.duration || 250,
                delay: modalTransform.delay || 0,
                easing: modalTransform.easing || QuinticEaseOut,
                useNativeDriver: true
            }).start(() => {
                this.setState({
                    visible: false,
                    containerActive: false,
                    contentActive: false
                }, () => {
                    requestAnimationFrame(() => {
                        if (this.props.onClose) {
                            this.props.onClose();
                        }
                    });
                });
            });
        });
    };
}
