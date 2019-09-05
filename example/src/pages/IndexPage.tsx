import React from 'react';
import {Animated, Easing, Image, Linking, StyleSheet, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {EmptyState, getTheme, SimpleText, TableView, TableViewRow, TableViewSection} from "react-native-colibri";
import GradientHeader from "../components/GradientHeader";
import {NavigationHeaderOptions} from "../components/NavigationHeader";

export type IndexPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

const COMPONENTS = [
    ['Button', 'A button consists of text that clearly communicates what action will occur when the user touches it.'],
    ['Card', 'This page provides guidance on the base elements of a card'],
    ['Carousel', 'Allows you to display multiple items in a horizontal slide. '],
    ['CarouselImage', 'Allows you to display multiple items in a horizontal slide with images, like Google Play Store.'],
    ['DateFormatted', ''],
    ['DatePicker', ''],
    ['EmptyState', ''],
    ['Loading', ''],
    ['OkCancelView', ''],
    ['Segment', ''],
    ['Separator', ''],
    ['SimpleText', ''],
    ['Title', ''],
    ['AnimatedModal', ''],
    ['TableView', '', {flag: 'danger'}],
    ['Utils', ''],
];

export default class IndexPage extends React.PureComponent<IndexPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'React Native Colibri'
        };
    };

    render() {
        let SEQ = 0;
        const theme = getTheme();

        return (
            <GradientHeader
                navigation={this.props.navigation}
                description={(
                    <View>

                        {/*<ColibriAnimation/>*/}

                        <SimpleText
                            color={'#FFF'}
                            align={'justify'}
                        >
                            {'Welcome to '}
                            <SimpleText
                                bold={true}
                                text={' react-native-colibri '}
                                color={'#4a415c'}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255,0.3)'
                                }}
                            />
                            {' demo application.'}
                        </SimpleText>

                        <SimpleText
                            text={'Colibri is made up of a wide variety of design foundations, components, and patterns that is packaged together in a harmonious library.'}
                            align={'justify'}
                            style={{paddingTop: theme.padding}}
                            color={'#FFF'}
                        />

                        <SimpleText
                            align={'justify'}
                            style={{paddingTop: theme.padding}}
                            color={'#FFF'}
                        >
                            {`In this demo you will find extensive information about color, components, and accessibility to help you to build consistent and engaging React Native applications using `}
                            <SimpleText
                                bold={true}
                                text={' react-native-colibri '}
                                color={'#4a415c'}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255,0.3)'
                                }}
                            />
                            {'.'}
                        </SimpleText>


                    </View>
                )}
                sections={[
                    {
                        key: `${SEQ++}`,
                        header: 'General Concepts',
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: 'Design Principles',
                                subtitle: 'The design principles are the beating heart of Colibri. Find out how these design principles can help you create impactful apps.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/heart.png'),
                                    style: {
                                        tintColor: theme.colorTextSecondary
                                    }
                                },
                                onPress: row => {
                                    this.props.navigation.navigate('DesignPrinciplesPage');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Typography ',
                                subtitle: 'Typography plays a crucial role in establishing hierarchy in the content with great legibility and scalability.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/font-size.png'),
                                    style: {
                                        tintColor: theme.colorTextSecondary
                                    }
                                },
                                onPress: row => {
                                    this.props.navigation.navigate('TypographyPage');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Colors',
                                subtitle: 'Color is essential in setting a delightful Colibri-based user experience that guides the user through the functions of the application in a concise manner. Find out more about the color palette to understand how to use it effectively.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/paint-palette.png'),
                                    style: {
                                        tintColor: theme.colorTextSecondary
                                    }
                                },
                                onPress: row => {
                                    this.props.navigation.navigate('ColorsPage');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Layout',
                                subtitle: 'The layout of the app follows certain logic that makes the app accessible, scalable, and readable. Components are designed in increments that make it easier to scale between different devices. Learn about the rules behind the layout to create an organized and clean interface.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/squared-menu.png'),
                                    style: {
                                        tintColor: theme.colorTextSecondary
                                    }
                                },
                                onPress: row => {
                                    this.props.navigation.navigate('LayoutPage');
                                }
                            }
                        ]
                    },
                    {
                        key: `${SEQ++}`,
                        header: {
                            title: 'Design Guidelines & Miscellaneous',
                            subtitle: (
                                <View>
                                    <SimpleText subline={true} color={theme.colorTextSecondary} align={'left'}>
                                        {'If there is ever a question about how something works in '}
                                        <SimpleText bold={true} color={'#4a415c'} subline={true}>
                                            {'react-native-colibri'}
                                        </SimpleText>
                                        {', the first place to look is the documentation itself. As much as possible, we follow the design principles provided by the platform owners.'}
                                    </SimpleText>
                                    <SimpleText subline={true} color={theme.colorTextSecondary} align={'justify'}
                                                style={{paddingTop: theme.padding}}>
                                        {'Below is a collection of miscellaneous tools to help with the mobile design process.'}
                                    </SimpleText>
                                </View>
                            )
                        },
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: 'iOS Human Interface Guidelines',
                                subtitle: 'Get in-depth information and UI resources for designing great apps that integrate seamlessly with Apple platforms.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/apple.png')
                                },

                                onPress: row => {
                                    Linking.openURL('https://developer.apple.com/design/human-interface-guidelines/ios');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'iPhone Resolution Guide',
                                subtitle: 'The Ultimate Guide To iPhone Resolutions',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/apple.png')
                                },
                                onPress: row => {
                                    Linking.openURL('http://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Android Developer Guidelines',
                                subtitle: 'The following links provide everything you need to design a high quality Android app.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/android.png')
                                },
                                onPress: row => {
                                    Linking.openURL('http://developer.android.com/design/index.html');
                                }
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
                                    Linking.openURL('http://www.google.com/design/spec/material-design/introduction.html');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Device Metrics',
                                subtitle: 'A comprehensive resource for sizing, resolution, and more across multiple devices.',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/android.png')
                                },
                                onPress: row => {
                                    Linking.openURL('https://design.google.com/devices/');
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Android DP/PX Converter',
                                subtitle: 'Calculate pixels (and other units) in DPs. This tool helps you convert pixels to and from DPs (density independent pixels).',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/android.png')
                                },
                                onPress: row => {
                                    Linking.openURL('http://pixplicity.com/dp-px-converter/');
                                }
                            },
                        ]
                    },
                    {
                        key: `${SEQ++}`,
                        header: 'UI Components',
                        data: COMPONENTS.map(component => {
                            let name = component[0];
                            let description = component[1];
                            let props: any = component[2] || {};
                            return {
                                key: `${SEQ++}`,
                                title: name,
                                subtitle: description,
                                disclosure: true,
                                onPress: row => {
                                    this.props.navigation.navigate(name + 'Page');
                                },
                                ...props
                            };
                        })
                    },
                    {
                        key: `${SEQ++}`,
                        header: 'Questions or Comments?',
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: 'Submitting Bugs and Feedback',
                                subtitle: 'react-native-colibri issues on Github',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/github.png')
                                },
                                iconBig: true,
                                onPress: row => {
                                    Linking.openURL('https://github.com/nidorx/react-native-colibri/issues');
                                }
                            }
                        ]
                    }
                ] as Array<TableViewSection>}
            />
        );
    }
}
