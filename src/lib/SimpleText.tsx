import React from 'react'
import {Animated, Text as TextRN, TextProps as RnTextProps} from 'react-native';
import {getTheme} from "./Utils";

export type SimpleTextProps = RnTextProps & {
    text?: string;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    small?: boolean;
    subline?: boolean;
    bold?: boolean;
    italic?: boolean;
    reverse?: boolean;
    margin?: boolean;
    align?: 'left' | 'right' | 'justify' | 'center';
    inline?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
    /**
     * Permite utilizar a API Animated
     */
    animated?: boolean;
    size?: number | Animated.Animated;
    color?: string | Animated.Animated;
}

/**
 * Generic text component, standardizes and facilitates use
 */
export default class SimpleText extends React.PureComponent<SimpleTextProps> {

    render() {

        const theme = getTheme();

        const Type = this.props.animated ? Animated.Text : TextRN;
        let styleH = {};

        if (this.props.h1) {
            styleH = {
                fontSize: theme.fontSizeBig,
                fontWeight: 'bold'
            };
        } else if (this.props.h2) {
            styleH = {
                fontSize: theme.fontSize,
                fontWeight: 'bold'
            };
        } else if (this.props.h3) {
            styleH = {
                fontSize: theme.fontSize,
                fontWeight: 'bold',
                fontStyle: 'italic'
            };
        }

        return (
            <Type
                style={[
                    {

                        textAlignVertical: 'center',
                        fontWeight: this.props.bold ? 'bold' : 'normal',
                        fontStyle: this.props.italic ? 'italic' : 'normal',
                        fontSize: this.props.size ? this.props.size
                            : this.props.small ? theme.fontSizeSmall
                                : this.props.subline ? theme.fontSizeSubline
                                    : theme.fontSize,
                        color: this.props.color
                            ? this.props.color
                            : this.props.reverse
                                ? theme.colorTextReverse
                                : theme.colorText,
                        marginVertical: this.props.margin ? theme.padding : undefined,
                        textAlign: this.props.align === 'left'
                            ? 'left'
                            : this.props.align === 'right'
                                ? 'right'
                                : this.props.align === 'justify'
                                    ? 'justify'
                                    : 'center',
                        width: this.props.inline ? undefined : '100%',
                        textDecorationLine: (this.props.underline && this.props.lineThrough)
                            ? "underline line-through"
                            : this.props.underline
                                ? 'underline'
                                : this.props.lineThrough
                                    ? 'line-through'
                                    : 'none'
                    },
                    // Estilos de Headers
                    styleH,
                    // Permite modificar sobscrever o style
                    this.props.style
                ]}
            >
                {this.props.text || this.props.children}
            </Type>
        );
    }
}
