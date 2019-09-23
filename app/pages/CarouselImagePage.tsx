import React from 'react';
import {Card, CarouselImage, getTheme, SimpleText, spacing, TableView, TableViewSection, Toast} from "../../index";
import {CarouselImageItem} from "../../dist/lib";
import {View} from "react-native";


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

type CarouselImagePageState = {
    carouselImage?: CarouselImage;
}

export default class CarouselImagePage extends React.PureComponent<any, CarouselImagePageState> {

    state: CarouselImagePageState = {};

    render() {
        const theme = getTheme();
        let SEQ = 1;

        return (
            <TableView
                sections={[
                    {
                        key: `${SEQ++}`,
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <CarouselImage
                                        numColumns={3}
                                        data={APKS}
                                        onPress={item => {
                                            Toast.show(`Download app ${item.name}`);
                                        }}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <CarouselImage
                                        numColumns={5}
                                        data={APKS}
                                        onPress={item => {
                                            Toast.show(`Download app ${item.name}`);
                                        }}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <CarouselImage
                                        data={APKS}
                                        numColumns={3}
                                        renderContent={item => {
                                            return (
                                                <View>
                                                    <SimpleText
                                                        text={item.name}
                                                        align={'left'}
                                                        small={true}
                                                        inline={true}
                                                    />
                                                </View>
                                            )
                                        }}
                                        onPress={item => {
                                            Toast.show(`Download app ${item.name}`);
                                        }}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <CarouselImage
                                        data={BOOKS}
                                        numColumns={2}
                                        renderContent={item => {
                                            return (
                                                <View>
                                                    <SimpleText
                                                        text={item.name}
                                                        align={'left'}
                                                        small={true}
                                                        numberOfLines={2}
                                                        inline={true}
                                                    />
                                                    <SimpleText
                                                        text={item.edition}
                                                        align={'left'}
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
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Card
                                        title={'Recently updated'}
                                        subtitle={(
                                            <SimpleText
                                                text={'Fresh features & content'}
                                                small={true}
                                            />
                                        )}
                                        moreText={'See more'}
                                        image={{
                                            source: require('../assets/book-background.png')
                                        }}
                                        onPressMore={() => {
                                        }}
                                        imageTranslateXValue={
                                            this.state.carouselImage
                                                ? this.state.carouselImage.animatedValueScroll
                                                : undefined
                                        }
                                        style={{
                                            paddingBottom: spacing(theme, 'base'),
                                        }}
                                        boxed={true}
                                        shadowPattern={'C'}
                                    >
                                        <CarouselImage
                                            skip={2}
                                            numColumns={3}
                                            ref={(carouselImage) => {
                                                this.setState({
                                                    carouselImage: carouselImage || undefined
                                                });
                                            }}
                                            data={BOOKS}
                                            renderContent={item => {
                                                return (
                                                    <View>
                                                        <SimpleText
                                                            text={item.name}
                                                            align={'left'}
                                                            small={true}
                                                            numberOfLines={2}
                                                            inline={true}
                                                        />
                                                        <SimpleText
                                                            text={item.edition}
                                                            align={'left'}
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
                                    </Card>
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ]
                    },
                ] as Array<TableViewSection>}
            />
        );
    }
}
