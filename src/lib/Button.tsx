import React from 'react'
import {
    NativeSyntheticEvent,
    NativeTouchEvent,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import SimpleText from './SimpleText';
import Theme, {
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
    bgColor?: string;
    fgColor?: string;
    large?: boolean;
    color?: string;
    accessibilityLabel?: string;
}

const buttonStyles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonBig: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

/**
 * Simple button using TouchableOpacity
 */
export default class Button extends React.PureComponent<ButtonProps> {

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


                    const spacingH = scale(theme, spacingReact(theme, spacing) as number);
                    const spacingV = scaleModerate(theme, spacingReact(theme, spacing) as number);
                    const spacingTiny = spacingReact(theme, 'tiny');
                    const spacingSmall = spacingReact(theme, 'small');

                    let fgColor = this.props.fgColor || theme.colorButton;
                    let bgColor = this.props.bgColor || theme.colorPrimary;

                    const lineHeight = scaleVertical(theme, font.lineHeight as number);

                    return (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.props.onPress}
                            disabled={this.props.disabled}
                        >
                            <View
                                style={[
                                    this.props.large ? buttonStyles.buttonBig : buttonStyles.button,
                                    {
                                        backgroundColor: bgColor,
                                        // padding: spacingTiny,
                                        paddingVertical: spacingV,
                                        paddingHorizontal: spacingH,
                                        borderRadius: this.props.rounded ? this.props.large ? 40 : 30 : 0,
                                        opacity: this.props.disabled ? 0.5 : this.props.loading ? 0.7 : undefined,
                                        alignSelf: 'flex-start',
                                        width: this.props.fullWidth ? '100%' : undefined
                                    },
                                    this.props.style
                                ]}
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
                                                    color={fgColor}
                                                    size={lineHeight}
                                                />
                                            </View>
                                        )
                                        : null
                                }

                                {
                                    this.props.title
                                        ? (
                                            <SimpleText
                                                theme={theme}
                                                inline={true}
                                                color={fgColor}
                                                style={fontStyle(theme, font)}
                                            >
                                                {this.props.title}
                                            </SimpleText>
                                        )
                                        : (typeof this.props.children === 'string')
                                        ? (
                                            <SimpleText
                                                theme={theme}
                                                inline={true}
                                                color={fgColor}
                                                style={fontStyle(theme, font)}
                                            >
                                                {this.props.children}
                                            </SimpleText>
                                        )
                                        : this.props.children
                                }
                            </View>
                        </TouchableOpacity>
                    )
                }}
            </Theme>
        );
    }
}
