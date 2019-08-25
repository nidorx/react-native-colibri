import React from 'react';
import {StyleProp, View, ViewStyle,} from 'react-native';
import SimpleText from './SimpleText';
import {getTheme} from "./Utils";


/**
 * Permite a um elemento receber texto e dados extras
 */
export type TitleExtra = {
    text: string | JSX.Element;
    extra?: string | JSX.Element
}

export type TitleProps = {
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
    textAlign?: "auto" | "left" | "right" | "center";
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
}

const TitleExtraComponent = (props: TitleExtraProps) => {
    const theme = getTheme();
    return (

        <View style={{flexDirection: 'row'}}>
            {
                (typeof props.item.text === 'string')
                    ? (
                        <SimpleText
                            text={props.item.text}
                            color={props.config.reverse ? theme.colorText : theme.colorTextSecondary}
                            size={props.config.reverse ? theme.fontSize : theme.fontSizeSubline}
                            style={{textAlign: props.config.textAlign || 'left'}}
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
                            text={props.item.extra}
                            color={props.config.reverse ? theme.colorText : theme.colorTextSecondary}
                            size={props.config.reverse ? theme.fontSize : theme.fontSizeSubline}
                            style={{
                                textAlign: props.config.textAlign || 'left',
                                marginLeft: theme.paddingSmall,
                                alignSelf: 'flex-start'
                            }}
                        />
                    )
                    : (
                        <View style={{marginLeft: theme.paddingSmall}}>
                            {props.item.extra}
                        </View>
                    )
            }
        </View>
    )
};

export default class Title extends React.PureComponent<TitleProps> {
    render() {
        const theme = getTheme();
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
                                text={this.props.title}
                                color={this.props.reverse ? theme.colorTextSecondary : theme.colorText}
                                size={this.props.reverse ? theme.fontSizeSubline : theme.fontSize}
                                style={{
                                    textAlign: this.props.textAlign || 'left',
                                    flex: withoutSubtitle ? 1 : undefined
                                }}
                            />
                        )
                        : this.props.title
                }
                {
                    withoutSubtitle
                        ? undefined
                        : typeof this.props.subtitle === 'string'
                        ? (
                            <SimpleText
                                text={this.props.subtitle}
                                color={this.props.reverse ? theme.colorText : theme.colorTextSecondary}
                                size={this.props.reverse ? theme.fontSize : theme.fontSizeSubline}
                                style={{textAlign: this.props.textAlign || 'left'}}
                            />
                        )
                        // Texto com extra, lado a lado
                        : ((this.props.subtitle as TitleExtra).text)
                            ? (
                                <TitleExtraComponent
                                    item={(this.props.subtitle as TitleExtra)}
                                    config={this.props}
                                />
                            )
                            // Array de texto com extra, lado a lado
                            : (Array.isArray(this.props.subtitle))
                                ? (this.props.subtitle as Array<TitleExtra>).map((item, index) => {
                                    return (
                                        <TitleExtraComponent
                                            key={`${index}`}
                                            item={item}
                                            config={this.props}
                                        />
                                    )
                                })
                                // Qualquer componente
                                : this.props.subtitle
                }
            </View>
        )
    }
}
