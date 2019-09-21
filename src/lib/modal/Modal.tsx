import React, {ReactNode} from "react";
import {
    Animated,
    BackHandler,
    Dimensions,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {animateGeneric, animateGenericNative} from "../Utils";
import {getTheme, spacing} from "../Theme";
import Toast from './../Toast';


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

export type ModalProps = {
    content?: ReactNode;
    onClose?: () => void;
    onBeforeClose?: () => void;
    options?: {
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
         * Larguras são percentual da largura da tela, 'small' | 'medium' | 'large' = 40, 70, 90
         */
        width?: 'small' | 'medium' | 'large';
    };
}

export type ModalState = {
    overlayVisible: boolean;
    contentVisible: boolean;
    contentHeight: number;
    firstContentHeightAnimation: boolean;
    content?: ReactNode;
}

export default class Modal extends React.PureComponent<ModalProps, ModalState> {

    private WIDTH = Dimensions.get('window').width;

    private HEIGHT = Dimensions.get('window').height;

    state: ModalState = {
        overlayVisible: false,
        contentVisible: false,
        contentHeight: this.HEIGHT * 0.9,
        firstContentHeightAnimation: true,
    };

    private animatedShake = new Animated.Value(0);
    private animatedOpacity = new Animated.Value(0);
    private animatedTop = new Animated.Value(0);
    private animatedLeft = new Animated.Value(0);
    private animatedWidth = new Animated.Value(0);
    private animatedHeight = new Animated.Value(0);
    private containerStyle: any;
    private containerInnerStyle: any;
    private keyboardHeight = 0;
    private keyboardTimeout: any;

    private toastRef?: Toast;

    constructor(props: ModalProps) {
        super(props);

        this.containerStyle = {
            position: 'absolute',
            width: '100%',
            opacity: this.animatedOpacity,
            transform: [
                {
                    // Shake
                    translateX: this.animatedShake.interpolate({
                        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
                    })
                },
                {translateY: this.animatedTop},
            ],
        };

        this.containerInnerStyle = {
            position: 'relative',
            left: this.animatedLeft,
            width: this.animatedWidth,
            height: this.animatedHeight,
        };
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHide);
        Keyboard.addListener('keyboardDidHide', this.keyboardDidShowHide);
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this.keyboardDidShowHide);
        Keyboard.removeListener('keyboardDidHide', this.keyboardDidShowHide);
    }

    componentDidUpdate() {
        if (this.state.overlayVisible && !this.state.contentVisible) {
            requestAnimationFrame(() => {
                this.setState({
                    contentVisible: true
                })
            })
        } else {
            requestAnimationFrame(this.animatePosition)
        }
    }

    render() {
        if (!this.state.overlayVisible) {
            return null;
        }

        const theme = getTheme();
        const iconCloseSize = spacing(theme, 'base');
        const borderRadius = spacing(theme, 'micro');
        return (
            <View
                style={styles.container}
                onLayout={this.animatePosition}
            >
                <TouchableWithoutFeedback onPress={this.hide}>
                    <Animated.View style={[styles.overlay, {opacity: this.animatedOpacity}]}/>
                </TouchableWithoutFeedback>

                <Animated.View style={[styles.animatedContainer, this.containerStyle]}>
                    <Animated.View
                        style={[
                            styles.animatedContainerInner,
                            {
                                overflow: 'hidden',
                                borderRadius: borderRadius
                            },
                            this.containerInnerStyle
                        ]}>

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

                        {
                            this.state.contentVisible
                                ? (
                                    <ScrollView
                                        automaticallyAdjustContentInsets={false}
                                        scrollEventThrottle={16}
                                        style={{borderRadius: 3}}
                                        onContentSizeChange={this.onContentSizeChange}
                                    >
                                        {this.state.content || this.props.content || null}
                                    </ScrollView>
                                )
                                : undefined
                        }

                    </Animated.View>
                </Animated.View>
                <Toast
                    ref={(toast: Toast) => this.toastRef = toast}
                    opacity={0.8}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
                    textStyle={{color: '#FFF'}}
                    position="center"
                />
            </View>
        );
    }

    error(message: string) {
        // @TODO: Analisar o comportamento do error, só permitir ser usado em modais
        this.show(() => {

            setTimeout(() => {
                if (this.toastRef) {
                    this.toastRef.show(message);
                }
            }, 400);

            // Animação
            this.animatedShake.setValue(0);
            Animated.timing(this.animatedShake, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }).start(() => {
                this.animatedShake.setValue(0);
            });
        });
    };

    show(callback?: () => void) {

        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

        this.setState({
            overlayVisible: true
        }, callback);
    };

    hide = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

        if (this.props.onBeforeClose) {
            this.props.onBeforeClose();
        }

        let {top, left, width, height} = this.getPositions();
        if (this.props.options && this.props.options.ver === 'bottom') {
            top = top - height / 2;
        } else {
            top = top + height / 2;
        }

        Animated.parallel([
            animateGenericNative(this.animatedOpacity, 0, undefined, false),
            animateGenericNative(this.animatedTop, top, undefined, false),
        ]).start(() => {
            this.setState({
                overlayVisible: false,
                contentVisible: false,
                firstContentHeightAnimation: true
            }, () => {
                requestAnimationFrame(() => {
                    if (this.props.onClose) {
                        this.props.onClose();
                    }
                });
            });
        });
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
        this.keyboardTimeout = setTimeout(this.animatePosition, 10);
    };

    private onContentSizeChange = (w: number, h: number) => {
        if (!this.state.overlayVisible) {
            return;
        }
        this.setState({
            contentHeight: h
        }, () => {
            requestAnimationFrame(() => {
                // Apartir de agora, terá animação no elemento
                this.setState({
                    firstContentHeightAnimation: false
                });
            })
        });
    };

    private animatePosition = () => {
        if (!this.state.overlayVisible) {
            return;
        }

        // Faz animação de posicionamento do elmento
        let {top, left, width, height} = this.getPositions();

        if (this.state.firstContentHeightAnimation) {
            if (this.props.options && this.props.options.ver === 'bottom') {
                top = top - height / 2;
            } else {
                top = top + height / 2;
            }
            this.animatedTop.setValue(top);
            this.animatedLeft.setValue(left);
            this.animatedWidth.setValue(width);
            this.animatedHeight.setValue(height);
        } else {
            Animated
                .parallel([
                    animateGenericNative(this.animatedOpacity, 1, undefined, false),
                    animateGenericNative(this.animatedTop, top, undefined, false),
                    animateGeneric(this.animatedLeft, left, undefined, false, false),
                    animateGeneric(this.animatedWidth, width, undefined, false, false),
                    animateGeneric(this.animatedHeight, height, undefined, false, false),
                ], {stopTogether: false})
                .start();
        }
    };

    private getPositions = () => {
        const theme = getTheme();
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

        const padding = spacing(theme, 'small') as number;
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
}
