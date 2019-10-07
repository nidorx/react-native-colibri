import React from 'react';
import {StyleProp, View, ViewStyle,} from 'react-native';
import SimpleText, {TextAlign} from './SimpleText';
import Theme, {fontStyle, spacing, ThemeProps} from "./Theme";

/**
 * Permite a um elemento receber texto e dados extras
 */
export type TitleExtra = {
    text: string | JSX.Element;
    extra?: string | JSX.Element
}

export type TitleProps = {
    theme?: Partial<ThemeProps>;
    /**
     * Título do elemento, texto ou componente personalizado
     */
    title: string | JSX.Element;
    /**
     * Subtítulo do elemento, texto, componente personalizado, texto e extra data, Array de texto e extra data
     */
    subtitle?: string | JSX.Element | TitleExtra | Array<TitleExtra>;
    /**
     * Specifies text alignment.
     * The value 'justify' is only supported on iOS.
     */
    textAlign?: TextAlign;
    /**
     * Permite adicionar estilos ao container
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Inverte a exibição, faz com que o subtítulo tenha uma apresentação mais importante que o título
     */
    reverse?: boolean;
}

export type TitleExtraProps = {
    item: TitleExtra;
    config: TitleProps;
    theme?: Partial<ThemeProps>;
}

const TitleExtraComponent = (props: TitleExtraProps) => {

    return (
        <Theme theme={props.theme}>
            {(theme) => {
                return (
                    <View style={{flexDirection: 'row'}}>
                        {
                            (typeof props.item.text === 'string')
                                ? (
                                    <SimpleText
                                        theme={theme}
                                        text={props.item.text}
                                        align={props.config.textAlign}
                                        color={props.config.reverse ? theme.colorText : theme.colorTextSecondary}
                                        style={[
                                            fontStyle(theme, props.config.reverse ? theme.fontSmall : theme.fontRegular)
                                        ]}
                                    />
                                )
                                : props.item.text
                        }
                        {
                            (!props.item.extra || props.item.extra === '')
                                ? undefined
                                : (typeof props.item.extra === 'string')
                                ? (
                                    <SimpleText
                                        theme={theme}
                                        text={props.item.extra}
                                        align={props.config.textAlign}
                                        color={props.config.reverse ? theme.colorText : theme.colorTextSecondary}
                                        style={[
                                            {
                                                alignSelf: 'flex-start',
                                                marginLeft: spacing(theme, 'tiny')
                                            },
                                            fontStyle(theme, props.config.reverse ? theme.fontSmall : theme.fontRegular)
                                        ]}
                                    />
                                )
                                : (
                                    <View style={{marginLeft: spacing(theme, 'tiny')}}>
                                        {props.item.extra}
                                    </View>
                                )
                        }
                    </View>
                )
            }}
        </Theme>
    );
};

export default class Title extends React.PureComponent<TitleProps> {
    render() {
        return (
            <Theme>
                {(theme) => {
                    const withoutSubtitle = (!this.props.subtitle || this.props.subtitle === '');
                    return (
                        <View
                            style={[
                                {
                                    flexDirection: 'column',
                                    flex: 1,
                                },
                                this.props.style
                            ]}
                        >
                            {
                                (typeof this.props.title === 'string')
                                    ? (
                                        <SimpleText
                                            theme={this.props.theme}
                                            text={this.props.title}
                                            align={this.props.textAlign}
                                            color={this.props.reverse ? theme.colorTextSecondary : theme.colorText}
                                            style={[
                                                {
                                                    flex: withoutSubtitle ? 1 : undefined
                                                },
                                                fontStyle(theme, this.props.reverse ? theme.fontSmall : theme.fontRegular)
                                            ]}
                                        />
                                    )
                                    : this.props.title
                            }
                            {
                                withoutSubtitle
                                    ? undefined
                                    : (
                                        typeof this.props.subtitle === 'string'
                                            ? (
                                                <SimpleText
                                                    theme={this.props.theme}
                                                    text={this.props.subtitle}
                                                    align={this.props.textAlign}
                                                    color={this.props.reverse ? theme.colorText : theme.colorTextSecondary}
                                                    style={[
                                                        fontStyle(theme, this.props.reverse ? theme.fontSmall : theme.fontRegular)
                                                    ]}
                                                />
                                            )
                                            // Texto com extra, lado a lado
                                            : (
                                                (this.props.subtitle as TitleExtra).text
                                                    ? (
                                                        <TitleExtraComponent
                                                            config={this.props}
                                                            theme={this.props.theme}
                                                            item={(this.props.subtitle as TitleExtra)}
                                                        />
                                                    )
                                                    // Array de texto com extra, lado a lado
                                                    : (
                                                        Array.isArray(this.props.subtitle)
                                                            ? (this.props.subtitle as Array<TitleExtra>).map((item, index) => {
                                                                return (
                                                                    <TitleExtraComponent
                                                                        key={`${index}`}
                                                                        item={item}
                                                                        config={this.props}
                                                                        theme={this.props.theme}
                                                                    />
                                                                )
                                                            })
                                                            // Qualquer componente
                                                            : this.props.subtitle
                                                    )
                                            )
                                    )
                            }
                        </View>
                    )
                }}
            </Theme>
        );

    }
}
