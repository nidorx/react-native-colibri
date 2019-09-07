import React, {ReactNode} from 'react'
import {StyleProp, Text, TextProps as RnTextProps, TextStyle} from 'react-native';
import Theme, {FontSpec, fontStyle, getTheme, Spacing, spacingReact, ThemeProps} from "./Theme";

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export type SimpleTextProps = RnTextProps & {
    /**
     * Lets you overwrite the theme
     */
    theme?: Partial<ThemeProps>;
    /**
     *
     */
    font?: Partial<FontSpec>;
    text?: string | ReactNode;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    large?: boolean;
    small?: boolean;
    caption?: boolean;
    reverse?: boolean;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
    margin?: Spacing;
    align?: TextAlign;
    inline?: boolean;
    size?: number;
    color?: string;
}


/**
 * Generic text component, standardizes and facilitates use
 */
export default class SimpleText extends React.PureComponent<SimpleTextProps> {

    render() {
        let render = () => {
            const theme = getTheme(this.props.theme);
            let font = theme.fontRegular;

            if (this.props.h1) {
                font = theme.fontTitle1;
            } else if (this.props.h2) {
                font = theme.fontTitle2;
            } else if (this.props.h3) {
                font = theme.fontTitle3;
            } else if (this.props.large) {
                font = theme.fontLarge;
            } else if (this.props.small) {
                font = theme.fontSmall;
            } else if (this.props.caption) {
                font = theme.fontCaption;
            }

            // Override font
            if (this.props.font) {
                font = {
                    ...font,
                    ...this.props.font
                }
            }

            if (this.props.bold) {
                font.weight = 'bold';
            }

            if (this.props.size) {
                font.size = this.props.size;
            }

            return (
                <Text
                    {...this.props}
                    style={[
                        font.style,
                        fontStyle(font),
                        {
                            textAlignVertical: 'center',
                            fontStyle: this.props.italic ? 'italic' : 'normal',
                            color:
                                this.props.color
                                    ? this.props.color
                                    : (
                                        this.props.reverse
                                            ? theme.colorTextReverse
                                            : theme.colorText
                                    ),
                            textAlign:
                                this.props.align === 'center'
                                    ? 'center'
                                    : (
                                        this.props.align === 'right'
                                            ? 'right'
                                            : (
                                                this.props.align === 'justify'
                                                    ? 'justify'
                                                    : 'left'
                                            )
                                    ),
                            marginVertical: spacingReact(theme, this.props.margin),
                            width: this.props.inline ? undefined : '100%',
                            textDecorationLine:
                                (this.props.underline && this.props.lineThrough)
                                    ? "underline line-through"
                                    : (
                                        this.props.underline
                                            ? 'underline'
                                            : (
                                                this.props.lineThrough
                                                    ? 'line-through'
                                                    : 'none'
                                            )
                                    )
                        } as StyleProp<TextStyle>,
                        this.props.style
                    ] as any}
                >
                    {this.props.text || this.props.children}
                </Text>
            )
        };

        return (<Theme>{render}</Theme>);
    }
}

/**
 * Title 1
 *
 * @param props
 * @constructor
 */
export const H1 = (props: SimpleTextProps) => (
    <SimpleText
        {...props}
        text={props.text || (props as any).children}
        h1={true}
    />
);

/**
 * Title 2
 *
 * @param props
 * @constructor
 */
export const H2 = (props: SimpleTextProps) => (
    <SimpleText
        {...props}
        text={props.text || (props as any).children}
        h2={true}
    />
);

/**
 * Title 3
 *
 * @param props
 * @constructor
 */
export const H3 = (props: SimpleTextProps) => (
    <SimpleText
        {...props}
        text={props.text || (props as any).children}
        h3={true}
    />
);

/**
 * Large text
 *
 * @param props
 * @constructor
 */
export const Large = (props: SimpleTextProps) => (
    <SimpleText
        {...props}
        text={props.text || (props as any).children}
        large={true}
    />
);

/**
 * Small text
 *
 * @param props
 * @constructor
 */
export const Small = (props: SimpleTextProps) => (
    <SimpleText
        {...props}
        text={props.text || (props as any).children}
        small={true}
    />
);

/**
 * Caption
 *
 * @param props
 * @constructor
 */
export const Caption = (props: SimpleTextProps) => (
    <SimpleText
        {...props}
        text={props.text || (props as any).children}
        caption={true}
    />
);
