import React from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Button, getTheme, SimpleText, TableView, TableViewRow, TableViewSection} from "react-native-colibri";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";
import {Image, Linking, View} from "react-native";


export type TypographyPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

export default class TypographyPage extends React.PureComponent<TypographyPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'Typography'
        };
    };

    render() {

        const theme = getTheme();
        let SEQ = 1;

        return (
            <TableView
                sections={[
                    {
                        key: `${SEQ++}`,
                        header: 'iOS',
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <View>
                                        <SimpleText
                                            text={'The default font for iOS is San Francisco (SF). To learn more about typography, see the iOS Human Interface Guidelines.'}
                                        />
                                        <Image
                                            source={require('../assets/font-sf.png')}
                                            style={{
                                                width: '90%',
                                                alignSelf: 'center',
                                                resizeMode: 'contain'
                                            }}
                                        />
                                    </View>
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'iOS Human Interface Guidelines',
                                subtitle: 'Get in-depth information and UI resources for designing great apps that integrate seamlessly with Apple platforms.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/apple.png')
                                },

                                onPress: row => {
                                    Linking.openURL('https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/');
                                }
                            }
                        ]
                    },
                    {
                        key: `${SEQ++}`,
                        header: 'Android',
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <View>
                                        <SimpleText
                                            text={'The default font for Android is Roboto. To learn more see Android Material Design.'}
                                        />
                                        <Image
                                            source={require('../assets/font-roboto.png')}
                                            style={{
                                                width: '90%',
                                                alignSelf: 'center',
                                                resizeMode: 'contain'
                                            }}
                                        />
                                    </View>
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Android Material Design',
                                subtitle: 'Material is an adaptable system of guidelines, components, and tools that support the best practices of user interface design.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/android.png')
                                },
                                onPress: row => {
                                    Linking.openURL('https://material.io/design/typography/the-type-system.html#type-scale');
                                }
                            },
                        ]
                    },
                    {
                        key: `${SEQ++}`,
                        header: {
                            title: '<SimpleText />',
                            subtitle: 'A React component for displaying text.'
                        },
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <View>
                                        <SimpleText
                                            text={'SimpleText is the default component for rendering text in React Native Colibri. It extends the functionality of Text (react-native), making it easy and standardizing the content of your application.'}
                                        />
                                        <Code src={`import { SimpleText } from "react-native-colibri";`}/>
                                    </View>
                                )
                            }
                        ]
                    },
                    {
                        key: `${SEQ++}`,
                        header: {
                            title: 'Style Category',
                            subtitle: 'To facilitate and standardize components, Colibri\'s type system provides a limited variety of styles and combinations.'
                        },
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'H1'}
                                        h1={true}
                                    />
                                ),
                                right: `${theme.fontSizeBig}`
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'H2'}
                                        h2={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'H3'}
                                        h3={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular bold'}
                                        bold={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular italic'}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular bold italic'}
                                        bold={true}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Subline'}
                                        subline={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Subline bold'}
                                        subline={true}
                                        bold={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Subline italic'}
                                        subline={true}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Subline bold italic'}
                                        subline={true}
                                        bold={true}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Small'}
                                        small={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Small bold'}
                                        small={true}
                                        bold={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Small italic'}
                                        small={true}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Small bold italic'}
                                        small={true}
                                        bold={true}
                                        italic={true}
                                    />
                                )
                            }
                        ]
                    }
                ] as Array<TableViewSection>}
            />
        );
    }
}
