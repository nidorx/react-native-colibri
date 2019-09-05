import React from 'react';
import {View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {CarouselImage, CarouselImageItem, getTheme, SimpleText, TableViewRow, Toast} from "react-native-colibri";
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
                navigation={this.props.navigation}
                description={'A carousel implementation using images to show a collection like Google Play Store. The size of items is defined by "numColumns" property.'}
                sections={[
                    {
                        key: `section-${SEQ++}`,
                        header: 'Import',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <Code src={`import { CarouselImage } from "react-native-colibri";`}
                                    />
                                )
                            }
                        ]
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
                                    <Code
                                        margin={true}
                                        src={`...`}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ]
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
                                    <Code
                                        margin={true}
                                        src={`...`}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ]
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
                                    <Code
                                        margin={true}
                                        src={`...`}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Non-Square images',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <CarouselImage
                                            data={BOOKS}
                                            numColumns={2}
                                            renderContent={item => {
                                                return (
                                                    <View>
                                                        <SimpleText
                                                            text={item.name}
                                                            align={'left'}
                                                            subline={true}
                                                            numberOfLines={2}
                                                            inline={true}
                                                        />
                                                        <SimpleText
                                                            text={item.edition}
                                                            align={'left'}
                                                            subline={true}
                                                            small={true}
                                                            numberOfLines={1}
                                                            inline={true}
                                                        />
                                                    </View>
                                                )
                                            }}
                                            onPress={item => {
                                                Toast.show(item.name);
                                            }}
                                        />
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        margin={true}
                                        src={`...`}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Background',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <CarouselImage
                                            data={BOOKS}
                                            numColumns={3}
                                            image={{
                                                source: require('../assets/book-background.png')
                                            }}
                                            renderContent={item => {
                                                return (
                                                    <View>
                                                        <SimpleText
                                                            text={item.name}
                                                            align={'left'}
                                                            subline={true}
                                                            numberOfLines={1}
                                                            inline={true}
                                                        />
                                                        <SimpleText
                                                            text={item.edition}
                                                            align={'left'}
                                                            subline={true}
                                                            small={true}
                                                            numberOfLines={1}
                                                            inline={true}
                                                        />
                                                    </View>
                                                )
                                            }}
                                            onPress={item => {
                                                Toast.show(item.name);
                                            }}
                                        />
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        margin={true}
                                        src={`...`}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Usage',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <SimpleText align={'justify'}>
                                            {`Use when you have a large set of items to show, but want to let the user concentrate his or her attention only on a select few items at a time.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`Use when you want to tease the user by letting him or her know that there are more items available than what is currently shown.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`Use when you do not have enough space to show all items at once.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`Use when you have highly visual items to display such as movie posters, album covers, products etc.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`Do not use when the items are non-visual such as links to text articles, PDF documents etc.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`Do not use when the content linked to cannot be immediately identified by an image.`}
                                        </SimpleText>
                                    </View>
                                )
                            }
                        ]
                    }
                ]}
            />
        );
    }
}
