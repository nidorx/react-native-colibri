import React from 'react'
import {
    Animated,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    NativeTouchEvent,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from 'react-native';
import SimpleText from './SimpleText';
import Theme, {
    ColorSystem,
    FontSpec,
    fontStyle,
    getTheme,
    scale,
    scaleModerate,
    scaleVertical,
    Spacing,
    spacingReact,
    ThemeProps
} from "./Theme";
import Spinner from "./Spinner";
import {animateGenericNative} from "./Utils";

const AnimatedSimpleText = Animated.createAnimatedComponent(SimpleText);

export type ButtonProps = {
    /**
     * Permite definir um tema personalizado para este componente
     */
    theme?: Partial<ThemeProps>;
    /**
     * Defines button label
     */
    title: string;
    /**
     * Replaces button text with a spinner while a background action is being performed
     */
    loading?: boolean;
    /**
     * Show as rounded button
     */
    rounded?: boolean;
    /**
     * Allows the button to grow to the width of its container
     */
    fullWidth?: boolean;
    /**
     * Disables the button, disallowing user interaction
     */
    disabled?: boolean;
    /**
     * Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops
     */
    outline?: boolean;
    /**
     * Renders a button that looks like a link
     */
    plain?: boolean;
    /**
     * Displays the button with a disclosure icon
     */
    disclosure?: boolean;
    /**
     * Makes `plain` and `outline` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to `plain` Buttons
     */
    monochrome?: boolean;
    /**
     * Change border width
     */
    borderWidth?: number;
    /**
     * Define border radius
     */
    borderRadius?: number;
    /**
     * Provides extra visual weight and identifies the primary action in a set of buttons
     */
    primary?: boolean;
    info?: boolean;
    danger?: boolean;
    warning?: boolean;
    success?: boolean;
    /**
     * Add custom style to button
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Changes the size of the button, giving it more or less padding
     */
    size?: 'micro' | 'tiny' | 'medium' | 'large';
    /**
     * Callback when pressed
     */
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

type ButtonState = {
    minWidth: number;
    minHeight: number;
}

/**
 * Simple button using TouchableOpacity
 */
export default class Button extends React.PureComponent<ButtonProps, ButtonState> {

    state: ButtonState = {
        minWidth: 0,
        minHeight: 0
    };

    private animatedValue = new Animated.Value(0);

    componentDidMount(): void {
        if (this.props.loading) {
            this.animatedValue.setValue(-2);
        } else if (this.props.disabled) {
            this.animatedValue.setValue(-1);
        }
    }

    componentDidUpdate(prevProps: Readonly<ButtonProps>, prevState: Readonly<ButtonState>, snapshot?: any): void {
        if (this.props.loading && !prevProps.loading) {
            animateGenericNative(this.animatedValue, -2, undefined, true, 500);
        } else if (this.props.loading) {
            // still loading
            return;
        } else if ((this.props.loading !== prevProps.loading) || (this.props.disabled !== prevProps.disabled)) {
            if (this.props.disabled) {
                animateGenericNative(this.animatedValue, -1);
            } else if (prevProps.loading) {
                animateGenericNative(this.animatedValue, 0, undefined, true, 500);
            } else {
                animateGenericNative(this.animatedValue, 0);
            }
        }
    }

    render() {

        return (
            <Theme>
                {() => {
                    const theme = getTheme(this.props.theme);

                    let font: Partial<FontSpec>;
                    let spacing: Spacing;

                    switch (this.props.size || 'tiny') {
                        case 'large':
                            spacing = 'base';
                            font = theme.fontTitle3;
                            break;
                        case 'medium':
                            spacing = 'small';
                            font = theme.fontLarge;
                            break;
                        case 'tiny':
                            spacing = 'tiny';
                            font = theme.fontRegular;
                            break;
                        default:
                            spacing = 'micro';
                            font = theme.fontCaption;
                    }


                    const spacingVertical = scaleModerate(theme, spacingReact(theme, spacing) as number);
                    const spacingHorizontal = scale(theme, spacingReact(theme, spacing) as number);
                    const spacingTiny = spacingReact(theme, 'tiny');
                    const spacingMicro = spacingReact(theme, 'micro') as number;

                    let color: ColorSystem = theme.colorBase;


                    if (this.props.danger) {
                        color = theme.colorDanger;
                    } else if (this.props.warning) {
                        color = theme.colorWarning;
                    } else if (this.props.success) {
                        color = theme.colorSuccess;
                    } else if (this.props.info) {
                        color = theme.colorInfo;
                    } else if (this.props.primary) {
                        color = theme.colorPrimary;
                    }

                    const isBaseColor = color === theme.colorBase;

                    let colorActive = color.states.active;
                    let colorDisabled = color.states.disabled;

                    if (this.props.disabled) {
                        // color = (color as ColorSystem).states.disabled;
                    }

                    const lineHeight = scaleVertical(theme, font.lineHeight as number);
                    const height = lineHeight + (spacingVertical * 2);

                    const borderWidth = this.props.borderWidth === undefined ? 1 : this.props.borderWidth;
                    const borderRadius = (
                        this.props.rounded
                            ? (height / 2)
                            : (
                                this.props.borderRadius == undefined
                                    ? (spacingMicro / 2)
                                    : this.props.borderRadius
                            )
                    );


                    const opacity = this.animatedValue.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [0, 1]
                    });

                    const opacityActive = this.animatedValue.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0, 0, 1]
                    });

                    return (
                        <TouchableWithoutFeedback
                            onPressIn={event => {
                                animateGenericNative(this.animatedValue, 1);
                            }}
                            onPressOut={event => {
                                animateGenericNative(this.animatedValue, 0);
                            }}
                            onPress={this.props.onPress}
                            disabled={this.props.disabled || this.props.loading}
                        >
                            <View
                                style={[
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        paddingVertical: spacingVertical,
                                        paddingHorizontal: spacingHorizontal,
                                        borderRadius: borderRadius,
                                        alignSelf: 'flex-start',
                                        width: this.props.fullWidth ? '100%' : undefined,
                                        // minWidth: this.props.loading ? this.state.minWidth : 0,
                                        // height: height,
                                        borderWidth: borderWidth,
                                        borderColor: 'transparent',
                                        // overflow: 'hidden'
                                    },
                                    this.props.plain
                                        ? {
                                            paddingVertical: 0,
                                            paddingHorizontal: 0,
                                            borderWidth: 0,
                                            borderRadius: 0,
                                            // height: lineHeight,
                                        }
                                        : undefined,
                                    this.props.style
                                ]}
                                onLayout={(event: LayoutChangeEvent) => {
                                    if (!this.props.loading) {
                                        this.setState({
                                            minWidth: event.nativeEvent.layout.width,
                                            minHeight: event.nativeEvent.layout.height,
                                        });
                                    }
                                }}
                            >
                                {
                                    // Background and borders as native animated element
                                    (this.props.plain)
                                        ? null
                                        : (
                                            <View style={StyleSheet.absoluteFill}>
                                                <Animated.View
                                                    style={[
                                                        StyleSheet.absoluteFill,
                                                        {
                                                            borderWidth: borderWidth,
                                                            borderRadius: borderRadius,
                                                            backgroundColor: (this.props.outline || this.props.monochrome) ? undefined : color.background,
                                                            borderColor: color.border,
                                                            opacity: opacity
                                                        }
                                                    ]}
                                                />
                                                <Animated.View
                                                    style={[
                                                        StyleSheet.absoluteFill,
                                                        {
                                                            borderWidth: borderWidth,
                                                            borderRadius: borderRadius,
                                                            backgroundColor: (this.props.outline || this.props.monochrome) ? undefined : colorActive.background,
                                                            borderColor: colorActive.border,
                                                            opacity: opacityActive
                                                        }
                                                    ]}
                                                />
                                                <Animated.View
                                                    style={[
                                                        StyleSheet.absoluteFill,
                                                        {
                                                            borderWidth: borderWidth,
                                                            borderRadius: borderRadius,
                                                            backgroundColor: (this.props.outline || this.props.monochrome) ? undefined : colorDisabled.background,
                                                            borderColor: colorDisabled.border,
                                                            opacity: this.animatedValue.interpolate({
                                                                inputRange: [-1, 0, 1],
                                                                outputRange: [1, 0, 0]
                                                            })
                                                        }
                                                    ]}
                                                />
                                            </View>
                                        )
                                }

                                <View>
                                    <AnimatedSimpleText
                                        theme={theme}
                                        inline={true}
                                        color={
                                            this.props.plain
                                                ? (
                                                    isBaseColor
                                                        ? color.text
                                                        : color.background
                                                )
                                                : (
                                                    this.props.monochrome
                                                        ? color.border
                                                        : color.text
                                                )
                                        }
                                        style={[
                                            fontStyle(theme, font),
                                            {
                                                opacity: opacity
                                            }
                                        ]}
                                    >
                                        {this.props.title}
                                    </AnimatedSimpleText>
                                    <AnimatedSimpleText
                                        theme={theme}
                                        inline={true}
                                        color={
                                            this.props.plain
                                                ? (
                                                    isBaseColor
                                                        ? colorActive.text
                                                        : colorActive.background
                                                )
                                                : (
                                                    this.props.monochrome
                                                        ? colorActive.border
                                                        : colorActive.text
                                                )
                                        }
                                        style={[
                                            fontStyle(theme, font),
                                            {
                                                position: 'absolute',
                                                opacity: opacityActive
                                            }
                                        ]}
                                    >
                                        {this.props.title}
                                    </AnimatedSimpleText>
                                    <AnimatedSimpleText
                                        theme={theme}
                                        inline={true}
                                        color={
                                            this.props.plain
                                                ? (
                                                    isBaseColor
                                                        ? colorDisabled.text
                                                        : colorDisabled.background
                                                )
                                                : (
                                                    this.props.monochrome
                                                        ? colorDisabled.border
                                                        : colorDisabled.text
                                                )
                                        }
                                        style={[
                                            fontStyle(theme, font),
                                            {
                                                position: 'absolute',
                                                opacity: this.animatedValue.interpolate({
                                                    inputRange: [-2, -1, 0],
                                                    outputRange: [0, 1, 0]
                                                })
                                            }
                                        ]}
                                    >
                                        {this.props.title}
                                    </AnimatedSimpleText>
                                </View>

                                {
                                    this.props.loading
                                        ? (
                                            <Animated.View
                                                style={{
                                                    position: 'absolute',
                                                    alignSelf: 'center',
                                                    opacity: this.animatedValue.interpolate({
                                                        inputRange: [-2, -1],
                                                        outputRange: [1, 0]
                                                    })
                                                }}
                                            >
                                                <Spinner
                                                    color={colorDisabled.border}
                                                    size={lineHeight}
                                                    opacity={1}
                                                />
                                            </Animated.View>
                                        )
                                        : null
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            </Theme>
        );
    }
}
