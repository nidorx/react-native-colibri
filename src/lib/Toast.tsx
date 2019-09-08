/**
 * Based on react-native-easy-toast (https://github.com/crazycodeboy/react-native-easy-toast)
 * E-mail:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 */
import React from 'react';
import {Animated, Dimensions, StyleProp, StyleSheet, TextStyle, View, ViewStyle,} from 'react-native'
import {Caption} from "./SimpleText";
import {getTheme, spacingReact} from "./Theme";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    }
});

export type ToastProps = {
    /**
     * Custom style toast
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Custom toast position
     */
    position?: 'top' | 'center' | 'bottom';
    /**
     * Custom style text
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * Custom toast position value
     */
    positionValue?: number;
    /**
     * Custom toast show duration
     */
    fadeInDuration?: number;
    /**
     * Custom toast close duration
     */
    fadeOutDuration?: number;
    defaultCloseDelay?: number;
    /**
     * Custom toast opacity
     */
    opacity?: number;
}

type ToastState = {
    isShow: boolean;
    text: string;
    opacityValue: Animated.Value;
}

export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const DEFAULTS = {
    position: 'bottom',
    positionValue: 50,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    defaultCloseDelay: 250,
    opacity: 0.9
};

const {height, width} = Dimensions.get('window');

export default class Toast extends React.PureComponent<ToastProps, ToastState> {

    private static instance?: Toast;
    state = {
        text: '',
        isShow: false,
        opacityValue: new Animated.Value(this.props.opacity || DEFAULTS.opacity),
    };
    private timer: any;
    private duration?: number;
    private callback?: () => void;
    private isShow: boolean = false;
    private animation?: Animated.CompositeAnimation;

    public static show(text: string, duration?: number, callback?: () => void) {
        if (!Toast.instance) {
            throw new Error('Toast instance not found');
        }
        Toast.instance.show(text, duration, callback);
    }

    public static close(duration?: number) {
        if (!Toast.instance) {
            throw new Error('Toast instance not found');
        }
        Toast.instance.close(duration);
    }

    componentDidMount() {
        if (Toast.instance) {
            throw new Error('Allowed only one instance of Toast');
        }
        Toast.instance = this;
    }

    componentWillUnmount() {
        Toast.instance = undefined;
        if (this.animation) {
            this.animation.stop();
        }

        clearTimeout(this.timer);
    }

    render() {
        let pos;
        const theme = getTheme();
        const styleContent = {
            backgroundColor: theme.colorText,
            padding: spacingReact(theme, 'tiny'),
            borderRadius: spacingReact(theme, 'micro'),
        };

        switch (this.props.position || DEFAULTS.position) {
            case 'top':
                pos = this.props.positionValue || DEFAULTS.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - (this.props.positionValue || DEFAULTS.positionValue);
                break;
        }

        return this.state.isShow
            ? (
                <View
                    style={[styles.container, {top: pos}]}
                    pointerEvents="none"
                >
                    <Animated.View
                        style={[
                            styleContent,
                            {
                                opacity: this.state.opacityValue
                            },
                            this.props.style
                        ]}
                    >
                        {
                            React.isValidElement(this.state.text)
                                ? this.state.text
                                : (
                                    <Caption
                                        text={this.state.text}
                                        style={[
                                            {
                                                color: theme.colorContent
                                            },
                                            this.props.textStyle
                                        ]}
                                    />
                                )
                        }
                    </Animated.View>
                </View>
            )
            : null;
        // {/*<Text style={this.props.textStyle || DEFAULTS.textStyle}>*/}
        //     {/*{this.state.text}*/}
        // {/*</Text>*/}
    }

    public show(text: string, duration?: number, callback?: () => void) {
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.callback = callback;
        this.setState({
            isShow: true,
            text: text,
        });

        this.animation = Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity || DEFAULTS.opacity,
                duration: this.props.fadeInDuration || DEFAULTS.fadeInDuration,
            }
        );

        this.animation.start(() => {
            this.isShow = true;
            if (duration !== DURATION.FOREVER) this.close();
        });
    }

    public close(duration?: number) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if (delay === DURATION.FOREVER) {
            delay = this.props.defaultCloseDelay || DEFAULTS.defaultCloseDelay
        }

        if (!this.isShow && !this.state.isShow) {
            return
        }
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.animation = Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration || DEFAULTS.fadeOutDuration,
                }
            );

            this.animation.start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
                if (typeof this.callback === 'function') {
                    this.callback();
                }
            });
        }, delay);
    }
}
