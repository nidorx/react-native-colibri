import React from 'react';
import {Clipboard, TextInput, TouchableOpacity,} from 'react-native';
import {getTheme, SimpleText} from "rn-components-ui";
import Toast, {DURATION} from "rn-components-ui/src/lib/Toast";

export type CodeProps = {
    src: string;
}

export default class Code extends React.PureComponent<CodeProps> {

    private toast?: Toast;

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
            <TouchableOpacity
                onPress={(ev) => {
                    Clipboard.setString(code);
                    if (this.toast) {
                        this.toast.show('Code copied to clipboard.', DURATION.FOREVER);
                    }
                }}
                activeOpacity={0.5}
                style={{
                    width: '100%',
                    position: 'relative',
                    backgroundColor: '#F6F2EF',
                    borderRadius: theme.borderRadiusSmall,
                    padding: theme.paddingMinimum,
                    marginVertical: theme.paddingSmall
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
                <Toast
                    ref={toast => {
                        this.toast = toast || undefined;
                    }}
                />
            </TouchableOpacity>
        );
    }
}
