import React from 'react';
import {Clipboard, TextInput, TouchableOpacity, View,} from 'react-native';
import {getTheme, SimpleText, Toast} from "rn-components-ui";

export type CodeProps = {
    src: string;
    margin?: boolean;
}

export default class Code extends React.PureComponent<CodeProps> {

    render() {
        const theme = getTheme();
        let code = this.props.src;
        let parts = (code.match(/^(\s+)/) || [''])[0].split('\n');
        if (parts.length > 1) {
            // Formato correto, espera-se quebra de uma linha em todos os exemplos de códigos, afim de obter a identação correta
            const indent = parts[1].length;
            code = code.split('\n')
                .map(line => {
                    return line.substr(Math.min(indent, line.length))
                })
                .join('\n')
                .replace(/(^\s+|\s+$)/g, '');
        }

        return (
            <View style={{paddingHorizontal: this.props.margin ? theme.padding : undefined,}}>
                <TouchableOpacity
                    onPress={(ev) => {
                        Clipboard.setString(code);
                        Toast.show('Code copied to clipboard.');
                    }}
                    style={{
                        width: '100%',
                        position: 'relative',
                        backgroundColor: '#F6F2EF',
                        borderRadius: theme.borderRadiusSmall,
                        padding: theme.paddingMinimum,
                        marginVertical: theme.paddingSmall,
                        borderColor: theme.colorLine,
                        borderWidth: theme.lineWidth
                    }}
                >
                    <TextInput
                        multiline={true}
                        value={code}
                        editable={false}
                        accessibilityIgnoresInvertColors={true}
                        underlineColorAndroid={'transparent'}
                        selectionColor={'#000'}
                        placeholderTextColor={'#000'}
                        contextMenuHidden={true}
                        style={{
                            fontSize: theme.fontSizeSmall,
                            color: '#366C84',
                            padding: 0
                        }}
                    />
                    <SimpleText
                        text={'code'}
                        align={'right'}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            padding: 3,
                            paddingVertical: 1,
                            borderTopRightRadius: theme.borderRadiusSmall,
                            borderBottomLeftRadius: theme.borderRadiusSmall
                        }}
                        small={true}
                        inline={true}
                        color={'#FFF'}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
