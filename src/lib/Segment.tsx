import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import Theme, {getTheme, spacingReact, ThemeProps} from "./Theme";
import {Caption} from "./SimpleText";


const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    item: {
        overflow: 'hidden',
        borderLeftWidth: 0
    },
    first: {
        borderLeftWidth: 1
    },
    text: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export type SegmentOption = {
    key: string;
    text: string;
    /**
     * Permite definir a largura do item
     */
    width?: number | string;
}

export type SegmentProps = {
    theme?: Partial<ThemeProps>;
    /**
     * A opção ativa (key)
     */
    active: string;
    /**
     * As opções os Segment
     */
    options: Array<SegmentOption>;
    /**
     * Invocado quando alterar a seleção
     */
    onChange: (active: string) => void;
    /**
     * Determina se o conteúdo deve ocupar toda a largura disponível
     *
     * Default true
     */
    block?: boolean;
    /**
     * Determina que o componente está bloqueado
     */
    disabled?: boolean;
}

/**
 * Segment Control
 */
export default class Segment extends React.PureComponent<SegmentProps> {

    render() {
        return (
            <Theme>
                {() => {
                    const theme = getTheme(this.props.theme);
                    const spacingMicro = spacingReact(theme, 'micro');

                    const COLOR = theme.colorLink;
                    const BORDER_WIDTH = 1;
                    const FONT_SIZE = theme.fontCaption.size as number;
                    const PADDING_TEXT = spacingReact(theme, 'tiny') as number;
                    const PADDING_CONTAINER = PADDING_TEXT;
                    const HEIGHT = PADDING_CONTAINER * 2 + PADDING_TEXT * 2 + FONT_SIZE + BORDER_WIDTH * 2;


                    const block = this.props.block === undefined || this.props.block;
                    return (
                        <View
                            style={[
                                styles.container,
                                {
                                    opacity: this.props.disabled ? 0.5 : 1,
                                    paddingVertical: PADDING_CONTAINER,
                                    paddingHorizontal: PADDING_CONTAINER,
                                    height: HEIGHT,
                                    minHeight: HEIGHT
                                }
                            ]}
                        >
                            {
                                this.props.options.map((option, index) => {
                                    const isActive = this.props.active === option.key || (this.props.active === undefined && index === 0);
                                    const text = (
                                        <Caption
                                            key={option.key}
                                            text={option.text}
                                            theme={theme}
                                            numberOfLines={1}
                                            ellipsizeMode={'tail'}
                                            style={[
                                                styles.text,
                                                {
                                                    color: isActive ? theme.colorContent : COLOR,
                                                    paddingVertical: PADDING_TEXT,
                                                    paddingHorizontal: spacingMicro
                                                }
                                            ]}
                                        />
                                    );


                                    return (
                                        <View
                                            key={option.key}
                                            style={[
                                                styles.item,
                                                {
                                                    width: option.width,
                                                    flex: block ? 1 : undefined,
                                                    borderWidth: BORDER_WIDTH,
                                                    backgroundColor: isActive ? COLOR : theme.colorContent,
                                                    borderColor: COLOR
                                                },
                                                index === 0
                                                    ? {
                                                        borderTopLeftRadius: spacingMicro,
                                                        borderBottomLeftRadius: spacingMicro,
                                                    }
                                                    : (
                                                        index === this.props.options.length - 1
                                                            ? {
                                                                borderTopRightRadius: spacingMicro,
                                                                borderBottomRightRadius: spacingMicro,
                                                            }
                                                            : undefined
                                                    )
                                            ]}
                                        >
                                            {
                                                (isActive || this.props.disabled)
                                                    ? (text)
                                                    : (
                                                        <TouchableHighlight
                                                            key={option.key}
                                                            onPress={() => {
                                                                this.props.onChange(option.key);
                                                            }}
                                                            underlayColor={theme.colorUnderlay}
                                                            style={{flex: 1}}
                                                        >
                                                            {text}
                                                        </TouchableHighlight>
                                                    )
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    );
                }}
            </Theme>);
    }
}
