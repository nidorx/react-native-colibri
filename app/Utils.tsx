import {Switch, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Caption, Small} from '../src/lib/SimpleText';
import React from 'react';

/**
 * Facilita a documentação de um componente
 *
 * @param instance
 * @param content
 * @param docs
 */
export function componentPropertiesPlayground(
    instance: { state: { props: any }, setState: (s: any) => void },
    content: JSX.Element,
    docs: string
) {
    let props: any = {};
    let current: any;
    docs.split('\n')
        .forEach(line => {
            line = line.replace(/(^\s+)|(\s+$)/g, '');
            if (line.startsWith('/*')) {
                current = {
                    name: '',
                    type: '',
                    optional: false,
                    description: '',
                    component: null,
                };
            } else if (line.startsWith('*/')) {
                return;
            } else if (line.startsWith('*')) {
                current.description += line.replace(/^[*]+\s+/, '');
            } else {
                // isLoading?: boolean;
                let parts = line.match(/([a-z0-9]+)([?])?\s*:\s*([^;]+)/i);
                if (parts) {
                    if (!current) {
                        current = {
                            name: 'Unknown',
                            type: '',
                            optional: false,
                            description: '',
                        };
                    }
                    current.name = parts[1];
                    current.optional = !!parts[2];
                    current.type = parts[3];

                    props[current.name] = current;
                }
                current = undefined;
            }
        });

    let SEQ = Number.MAX_SAFE_INTEGER / 2;

    return {
        key: `${SEQ++}`,
        header: {
            title: 'Props',
            subtitle: content,
        },
        data: Object.keys(props)
            .map(key => {
                let prop = props[key];

                let controlRight = null;
                let controlContent = null;

                if (prop.type === 'boolean') {
                    controlRight = (
                        <Switch
                            value={instance.state.props[key]}
                            onValueChange={value => {
                                instance.setState({
                                    props: {
                                        ...instance.state.props,
                                        [key]: value,
                                    },
                                });
                            }}
                        />
                    );
                } else if (prop.type === 'string') {
                    controlContent = (
                        <TextInput
                            value={instance.state.props['__text' + key] || instance.state.props[key]}
                            onChangeText={text => {
                                instance.setState({
                                    props: {
                                        ...instance.state.props,
                                        ['__text' + key]: text,
                                    },
                                });
                            }}
                            onBlur={e => {
                                instance.setState({
                                    props: {
                                        ...instance.state.props,
                                        [key]: instance.state.props['__text' + key],
                                    },
                                });
                            }}
                            style={{
                                backgroundColor: '#eee',
                                marginTop: 5,
                            }}
                        />
                    );
                } else if (prop.type === 'number') {
                    controlRight = (
                        <TextInput
                            keyboardType={'numeric'}
                            value={instance.state.props['__text' + key]}
                            onChangeText={text => {
                                instance.setState({
                                    props: {
                                        ...instance.state.props,
                                        ['__text' + key]: text,
                                    },
                                });
                            }}
                            onBlur={e => {
                                let value: any = Number.parseFloat(instance.state.props['__text' + key]);
                                if (Number.isNaN(value)) {
                                    value = undefined;
                                }
                                instance.setState({
                                    props: {
                                        ...instance.state.props,
                                        [key]: value,
                                    },
                                });
                            }}
                            style={{
                                backgroundColor: '#eee',
                                width: 50,
                                flex: 1,
                            }}
                        />
                    );
                } else if (prop.type.indexOf('|') > 0) {
                    const options = (prop.type as string)
                        .split('|')
                        .map((option) => {
                            return option.replace(/(^\s+)|(\s+$)/g, '');
                        })
                        .filter((item) => {
                            return item.startsWith("'") || item.startsWith('"');
                        })
                        .map((option) => {
                            return option.replace(/(^['"])|(['"]$)/g, '');
                        });
                    if (options.length > 0) {
                        controlContent = (
                            <Picker
                                selectedValue={instance.state.props[key]}
                                style={{width: '100%', height: 40, backgroundColor: '#eee'}}
                                onValueChange={(value, itemIndex) => {
                                    instance.setState({
                                        props: {
                                            ...instance.state.props,
                                            [key]: value,
                                        },
                                    });
                                }}
                            >
                                <Picker.Item label={'Select...'} key={'__none'}/>
                                {
                                    options.map(value => {
                                        return (
                                            <Picker.Item
                                                key={value}
                                                label={value}
                                                value={value}
                                            />
                                        );
                                    })
                                }
                            </Picker>
                        );

                        //     <Switch
                        // value={instance.state.props[key]}
                        // onValueChange={value => {

                        // }}
                        // />
                    }
                }

                return {
                    key: key,
                    title: prop.name,
                    subtitle: (
                        <View>
                            <Caption
                                text={prop.type}
                            />
                            {
                                (prop.description !== '')
                                    ? (
                                        <Small
                                            secondary={true}
                                            text={prop.description}
                                        />
                                    )
                                    : null
                            }

                            {controlContent}
                        </View>
                    ),
                    right: controlRight,
                };
            }),
    };
}
