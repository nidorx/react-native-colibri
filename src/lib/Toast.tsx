/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 */
import React from 'react';
import {Animated, Dimensions, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle,} from 'react-native'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white'
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
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    defaultCloseDelay: 250,
    opacity: 1
};

const {height, width} = Dimensions.get('window');

export default class Toast extends React.PureComponent<ToastProps, ToastState> {


    private timer: any;
    private duration?: number;
    private isShow: boolean = false;
    private callback?: () => void;
    private animation?: Animated.CompositeAnimation;

    constructor(props: ToastProps) {
        super(props);
        this.state = {
            text: '',
            isShow: false,
            opacityValue: new Animated.Value(this.props.opacity || DEFAULTS.opacity),
        }
    }

    /**
     * Show a toast,unit is millisecond，and do callback
     *
     * @param text
     * @param duration
     * @param callback
     */
    show(text: string, duration?: number, callback?: () => void) {
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

    /**
     * Start the close timer
     *
     * @param duration
     */
    close(duration?: number) {
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

    componentWillUnmount() {
        if (this.animation) {
            this.animation.stop();
        }

        clearTimeout(this.timer);
    }

    render() {
        let pos;
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
                        style={[styles.content, {opacity: this.state.opacityValue}, this.props.style]}
                    >
                        {
                            React.isValidElement(this.state.text)
                                ? this.state.text
                                : (
                                    <Text style={this.props.textStyle || DEFAULTS.textStyle}>
                                        {this.state.text}
                                    </Text>
                                )
                        }
                    </Animated.View>
                </View>
            )
            : null;
    }
}