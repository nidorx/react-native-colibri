import React from 'react'
import {
    ActivityIndicator,
    ButtonProps as ButtonPropsRN,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import SimpleText from './SimpleText';
import Theme, {fontStyle, getTheme, spacingReact, ThemeProps} from "./Theme";

export type ButtonProps = ButtonPropsRN & {
    theme?: Partial<ThemeProps>;
    isLoading?: boolean;
    rounded?: boolean;
    block?: boolean;
    style?: StyleProp<ViewStyle>;
    bgColor?: string;
    fgColor?: string;
    large?: boolean;
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
                    const padding = spacingReact(theme, 'tiny');

                    let fgColor = this.props.fgColor || theme.colorButton;
                    let bgColor = this.props.bgColor || theme.colorPrimary;


                    return (
                        <TouchableOpacity
                            onPress={(ev) => {
                                if (!this.props.disabled && this.props.onPress) {
                                    this.props.onPress(ev);
                                }
                            }}
                            activeOpacity={0.5}
                        >
                            <View
                                style={[
                                    this.props.large ? buttonStyles.buttonBig : buttonStyles.button,
                                    {
                                        backgroundColor: bgColor,
                                        padding: padding,
                                        paddingVertical: this.props.large ? spacingReact(theme, 'small') : spacingReact(theme, 'tiny'),
                                        borderRadius: this.props.rounded ? this.props.large ? 40 : 30 : 0,
                                        opacity: this.props.disabled ? 0.5 : this.props.isLoading ? 0.7 : undefined
                                    },
                                    this.props.style
                                ]}
                            >
                                {
                                    this.props.isLoading
                                        ? (
                                            <ActivityIndicator
                                                color={fgColor}
                                                style={{
                                                    marginRight: padding
                                                }}
                                                size={this.props.large ? 'large' : 'small'}
                                            />
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
                                                style={fontStyle(theme, this.props.large ? theme.fontTitle3 : theme.fontRegular)}
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
                                                style={fontStyle(theme, this.props.large ? theme.fontTitle3 : theme.fontRegular)}
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
