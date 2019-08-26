import React from 'react';
import {View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {CarouselImage, CarouselImageItem, getTheme, SimpleText, TableViewRow, Toast} from "rn-components-ui";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";


export type CarouselImagePageProps = {
    navigation: NavigationScreenProp<any, {}>
}

const APKS: Array<CarouselImageItem> = [
    {
        key: `apk-1`,
        image: {
            source: require('../assets/apk-1.png')
        },
        name: 'Whatsapp'
    },
    {
        key: `apk-2`,
        image: {
            source: require('../assets/apk-2.png')
        },
        name: 'Nox Player'
    },
    {
        key: `apk-3`,
        image: {
            source: require('../assets/apk-3.png')
        },
        name: 'Pinterest'
    },
    {
        key: `apk-4`,
        image: {
            source: require('../assets/apk-4.png')
        },
        name: 'Twitter'
    },
    {
        key: `apk-5`,
        image: {
            source: require('../assets/apk-5.png')
        },
        name: 'Google Chrome'
    },
    {
        key: `apk-6`,
        image: {
            source: require('../assets/apk-6.png')
        },
        name: 'Github'
    },
    {
        key: `apk-7`,
        image: {
            source: require('../assets/apk-7.png')
        },
        name: 'Blender'
    }
];


const BOOKS: Array<CarouselImageItem> = [
    {
        key: `b-1`,
        image: {
            source: require('../assets/book-1.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Android Application Development for the Intel Platform',
        edition: '1st ed. Edition'
    },
    {
        key: `b-2`,
        image: {
            source: require('../assets/book-2.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Learning Python, 5th Edition',
        edition: 'Fifth Edition'
    },
    {
        key: `b-3`,
        image: {
            source: require('../assets/book-3.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Deep Learning with Python',
        edition: '1st Edition'
    },
    {
        key: `b-4`,
        image: {
            source: require('../assets/book-4.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Head First Java, 2nd Edition',
        edition: '2nd Edition'
    },
    {
        key: `b-5`,
        image: {
            source: require('../assets/book-5.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Building Microservices: Designing Fine-Grained Systems',
        edition: '1st Edition'
    },
    {
        key: `b-6`,
        image: {
            source: require('../assets/book-6.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Learning PHP, MySQL & JavaScript: With jQuery, CSS & HTML5',
        edition: '5th Edition'
    },
    {
        key: `b-7`,
        image: {
            source: require('../assets/book-7.jpg'),
            style: {
                resizeMode: 'contain'
            }
        },
        name: 'Linux Pocket Guide: Essential Commands',
        edition: '3rd Edition'
    }
];

export default class CarouselImagePage extends React.PureComponent<CarouselImagePageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'CarouselImage'
        };
    };

    render() {
        const theme = getTheme();
        let SEQ = 1;

        return (
            <GradientHeader
                title={'CarouselImage'}
                description={'A carousel implementation using images to show a collection like Google Play Store. The size of items is defined by "numColumns" property.'}
                sections={[
                    {
                        key: `section-${SEQ++}`,
                        header: 'Import',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <Code src={`import { CarouselImage } from "rn-components-ui";`}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Simple 3 items',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <CarouselImage
                                            numColumns={3}
                                            data={APKS}
                                            onPress={item => {
                                                Toast.show(`Download app ${item.name}`);
                                            }}
                                        />
                                    </View>
                                ),
                                subtitle: (
                                    <Code src={`...`}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Simple 5 items',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <CarouselImage
                                            numColumns={5}
                                            data={APKS}
                                            onPress={item => {
                                                Toast.show(`Download app ${item.name}`);
                                            }}
                                        />
                                    </View>
                                ),
                                subtitle: (
                                    <Code src={`...`}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Custom content',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <CarouselImage
                                            data={APKS}
                                            numColumns={3}
                                            renderContent={item => {
                                                return (
                                                    <View>
                                                        <SimpleText
                                                            text={item.name}
                                                            align={'left'}
                                                            subline={true}
                                                            inline={true}
                                                        />
                                                    </View>
                                                )
                                            }}
                                            onPress={item => {
                                                Toast.show(`Download app ${item.name}`);
                                            }}
                                        />
                                    </View>
                                ),
                                subtitle: (
                                    <Code src={`...`}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    ,
                    {
                        key: `section-${SEQ++}`,
                        header: 'Rectangular images',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <CarouselImage
                                            data={BOOKS}
                                            numColumns={3}
                                            renderContent={item => {
                                                return (
                                                    <View>
                                                        <SimpleText
                                                            text={item.name}
                                                            align={'left'}
                                                            subline={true}
                                                            numberOfLines={2}
                                                            inline={true}
                                                            ellipsizeMode={'tail'}
                                                        />
                                                    </View>
                                                )
                                            }}
                                            onPress={item => {
                                                Toast.show(`Download app ${item.name}`);
                                            }}
                                        />
                                    </View>
                                ),
                                subtitle: (
                                    <Code src={`...`}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Usage',
                        data: [
                            {
                                key: 'issues-feedback',
                                title: (
                                    <View>
                                        <SimpleText align={'justify'}>
                                            {`The Button is used mainly when the action taken is the final step in a process (i.e. submitting an form). However, the Button may also be used for ancillary actions such as the Next button navigating to a new screen in the Walkthrough steps.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`When an action button is tapped if there are required fields that have not been filled out, a Toast should be shown indicating that there are required fields be filled out, and the screen will scroll to the fields in question. If there are mulitiple required fields yet to be filled out, scroll to the topmost one.`}
                                        </SimpleText>
                                    </View>
                                )
                            }
                        ] as Array<TableViewRow>
                    }
                ]}
            />
        );
    }
}
