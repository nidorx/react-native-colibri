import React from 'react'
import {Animated, Platform, Text as TextRN, TextProps as RnTextProps} from 'react-native';
import {getTheme} from "./Utils";
import {human} from 'react-native-typography';
import {systemWeights} from 'react-native-typography';

export type SimpleTextProps = RnTextProps & {
    text?: string;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    subline?: boolean;
    small?: boolean;
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
                fontSize: theme.fontSizeBig,
                fontWeight: "400"
            };
        } else if (this.props.h3) {
            styleH = {
                fontSize: theme.fontSizeBig,
                fontWeight: "100",
                fontStyle: 'italic'
            };
        }

        return (
            <Type
                {...this.props}
                style={[
                    {

                        textAlignVertical: 'center',
                        fontWeight: this.props.bold
                            ? 'bold'
                            : this.props.subline ? '100' : 'normal',
                        fontStyle: this.props.italic ? 'italic' : 'normal',
                        fontFamily: 'System',
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
                        textAlign: this.props.align === 'center'
                            ? 'center'
                            : this.props.align === 'right'
                                ? 'right'
                                : this.props.align === 'justify'
                                    ? 'justify'
                                    : 'left',
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


export const H1 = (props: SimpleTextProps) => {
    return (
        <SimpleText
            {...props}
            h1={true}
            h2={false}
            h3={false}
            subline={false}
            small={false}
        />
    )
};

export const H2 = (props: SimpleTextProps) => {
    return (
        <SimpleText
            {...props}
            h1={false}
            h2={true}
            h3={false}
            subline={false}
            small={false}
        />
    )
};

export const H3 = (props: SimpleTextProps) => {
    return (
        <SimpleText
            {...props}
            h1={false}
            h2={false}
            h3={true}
            subline={false}
            small={false}
        />
    )
};

export const Subline = (props: SimpleTextProps) => {
    return (
        <SimpleText
            {...props}
            h1={false}
            h2={false}
            h3={false}
            subline={true}
        />
    )
};

export const Small = (props: SimpleTextProps) => {
    return (
        <SimpleText
            {...props}
            h1={false}
            h2={false}
            h3={false}
            subline={false}
            small={true}
        />
    )
};
