import React from 'react'
import {NativeSyntheticEvent, NativeTouchEvent, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import SimpleText from './SimpleText';
import Theme, {
    ColorComponent,
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

                    let color: ColorComponent = theme.colorBasic;

                    if (this.props.primary) {
                        color = theme.colorPrimary;
                    }

                    if (this.props.disabled) {
                        color = (color as ColorSystem).states.disabled;
                    }

                    const lineHeight = scaleVertical(theme, font.lineHeight as number);
                    const height = lineHeight + (spacingVertical * 2);

                    return (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.props.onPress}
                            disabled={this.props.disabled || this.props.loading}
                        >
                            <View
                                style={[
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        backgroundColor: this.props.outline ? undefined : color.background,
                                        paddingVertical: spacingVertical,
                                        paddingHorizontal: spacingHorizontal,
                                        borderRadius: (
                                            this.props.rounded
                                                ? (height / 2)
                                                : (
                                                    this.props.borderRadius == undefined
                                                        ? (spacingMicro / 2)
                                                        : this.props.borderRadius
                                                )
                                        ),
                                        alignSelf: 'flex-start',
                                        width: this.props.fullWidth ? '100%' : undefined,
                                        minWidth: this.props.loading ? this.state.minWidth : 0,
                                        height: height,
                                        borderWidth: this.props.borderWidth === undefined ? 1 : this.props.borderWidth,
                                        borderColor: this.props.monochrome ? color.text : color.border
                                    },
                                    this.props.plain
                                        ? {
                                            paddingVertical: 0,
                                            paddingHorizontal: 0,
                                            borderWidth: 0,
                                            borderRadius: 0,
                                            height: lineHeight,
                                            backgroundColor: 'transparent'
                                        }
                                        : undefined,
                                    this.props.style
                                ]}
                                onLayout={event => {
                                    if (!this.props.loading) {
                                        this.setState({
                                            minWidth: event.nativeEvent.layout.width,
                                            minHeight: event.nativeEvent.layout.height,
                                        });
                                    }
                                }}
                            >

                                {
                                    this.props.loading
                                        ? (
                                            <View
                                                style={{
                                                    marginRight: spacingTiny,
                                                }}
                                            >
                                                <Spinner
                                                    color={color.text}
                                                    size={lineHeight}
                                                />
                                            </View>
                                        )
                                        : (
                                            this.props.title
                                                ? (
                                                    <SimpleText
                                                        theme={theme}
                                                        inline={true}
                                                        color={color.text}
                                                        style={fontStyle(theme, font)}
                                                    >
                                                        {this.props.title}
                                                    </SimpleText>
                                                )
                                                : (
                                                    (typeof this.props.children === 'string')
                                                        ? (
                                                            <SimpleText
                                                                theme={theme}
                                                                inline={true}
                                                                color={color.text}
                                                                style={fontStyle(theme, font)}
                                                            >
                                                                {this.props.children}
                                                            </SimpleText>
                                                        )
                                                        : this.props.children
                                                )
                                        )
                                }
                            </View>
                        </TouchableOpacity>
                    )
                }}
            </Theme>
        );
    }
}
