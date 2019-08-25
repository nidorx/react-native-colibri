import React from 'react'
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {getTheme} from "./Utils";


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
        const theme = getTheme();

        const COLOR = theme.colorLink;
        const BORDER_WIDTH = 1;
        const FONT_SIZE = theme.fontSizeSmall;
        const PADDING_TEXT = theme.paddingSmall;
        const PADDING_CONTAINER = theme.paddingSmall;
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
                            <Text
                                key={option.key}
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={[
                                    styles.text,
                                    {
                                        color: isActive ? theme.colorContent : COLOR,
                                        fontSize: FONT_SIZE,
                                        lineHeight: FONT_SIZE,
                                        paddingVertical: PADDING_TEXT,
                                        paddingHorizontal: theme.paddingMinimum
                                    }
                                ]}
                            >
                                {option.text}
                            </Text>
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
                                            borderTopLeftRadius: theme.borderRadius,
                                            borderBottomLeftRadius: theme.borderRadius,
                                        }
                                        : (
                                            index === this.props.options.length - 1
                                                ? {
                                                    borderTopRightRadius: theme.borderRadius,
                                                    borderBottomRightRadius: theme.borderRadius,
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
    }
}
