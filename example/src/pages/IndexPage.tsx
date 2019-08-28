import React from 'react';
import {Linking, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {EmptyState, getTheme, SimpleText, TableView, TableViewRow} from "rn-components-ui";
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
    ['TableView', ''],
    ['Utils', ''],
];

export default class IndexPage extends React.PureComponent<IndexPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'RN Components UI'
        };
    };

    render() {
        const theme = getTheme();

        return (
            <GradientHeader
                navigation={this.props.navigation}
                description={(
                    <View>
                        <SimpleText
                            color={'#FFF'}
                        >
                            {'Welcome to '}
                            <SimpleText
                                bold={true}
                                text={' rn-components-ui '}
                                color={'#4a415c'}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255,0.3)'
                                }}
                            />
                            {' demo application.'}
                        </SimpleText>
                        <SimpleText
                            align={'justify'}
                            style={{paddingTop: theme.padding}}
                            color={'#FFF'}
                        >
                            {`In this demo you will find extensive information about color, components, and accessibility to help you to build consistent and engaging React Native applications using `}
                            <SimpleText
                                bold={true}
                                text={' rn-components-ui '}
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
                        key: 'question-comments',
                        header: 'Questions or Comments?',
                        data: [
                            {
                                key: 'issues-feedback',
                                title: 'Submitting Bugs and Feedback',
                                subtitle: 'rn-components-ui issues on Github',
                                disclosure: true,
                                icon: {
                                    source: require('../assets/github.png')
                                },
                                iconBig: true,
                                onPress: row => {
                                    Linking.openURL('https://github.com/nidorx/rn-ui-components/issues');
                                }
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: 'guidelines',
                        header: {
                            title: 'Design Guidelines & Miscellaneous',
                            subtitle: (
                                <View>
                                    <SimpleText subline={true} color={theme.colorTextSecondary} align={'justify'}>
                                        {'If there is ever a question about how something works in '}
                                        <SimpleText bold={true} color={'#4a415c'} subline={true}>
                                            {'rn-components-ui'}
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
                                key: 'ios-guidelines',
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
                                key: 'ios-resolution-guide',
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
                                key: 'android-guidelines',
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
                                key: 'android-material',
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
                                key: 'android-device-metrics',
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
                                key: 'android-dp-px-converter',
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
                        ] as Array<TableViewRow>
                    },
                    {
                        key: 'xpto',
                        header: 'Components',
                        data: COMPONENTS.map(component => {
                            let componentName = component[0];
                            return {
                                key: componentName,
                                title: componentName,
                                subtitle: component[1],
                                disclosure: true,
                                onPress: row => {
                                    this.props.navigation.navigate(componentName + 'Page');
                                }
                            } as TableViewRow
                        })
                    }
                ]}
            />
        );
    }
}
