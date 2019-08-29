import React from 'react';
import {Image, Linking, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Card, CarouselImage, CarouselImageItem, getTheme, SimpleText, TableViewRow, Toast} from "rn-components-ui";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";


export type CardPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

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

type CardPageState = {
    carouselImage?: CarouselImage;
}

export default class CardPage extends React.PureComponent<CardPageProps, CardPageState> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'Card'
        };
    };

    state: CardPageState = {};

    private carouselImage?: CarouselImage;

    render() {
        const theme = getTheme();
        let SEQ = 1;

        return (
            <GradientHeader
                navigation={this.props.navigation}
                description={'Cards contain content and actions about a single subject.'}
                sections={[
                    {
                        key: `section-${SEQ++}`,
                        header: 'Import',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <Code src={`import { Card } from "rn-components-ui";`}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Simple',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                        >
                                            <SimpleText
                                                text={'the content of card here...'}
                                                align={'center'}
                                                style={{
                                                    height: 100,
                                                    backgroundColor: theme.colorBackground
                                                }}
                                            />
                                        </Card>
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        src={`
                                            <Card
                                                title={'Recently updated'}
                                                subtitle={'Fresh features & content'}
                                            >
                                                <SimpleText
                                                    text={'the content of card here...'}
                                                    align={'center'}
                                                    style={{
                                                        height: 100,
                                                        backgroundColor: theme.colorBackground
                                                    }}
                                                />
                                            </Card>
                                        `}
                                        margin={true}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'More Link',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={() => {

                                            }}
                                        >
                                            <SimpleText
                                                text={'the content of card here...'}
                                                align={'center'}
                                                style={{
                                                    height: 100,
                                                    backgroundColor: theme.colorBackground
                                                }}
                                            />
                                        </Card>
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        src={`
                                            <Card
                                                title={'Recently updated'}
                                                subtitle={'Fresh features & content'}
                                                onPressMore={() => {

                                                }}
                                            >
                                                <SimpleText
                                                    text={'the content of card here...'}
                                                    align={'center'}
                                                    style={{
                                                        height: 100,
                                                        backgroundColor: theme.colorBackground
                                                    }}
                                                />
                                            </Card>
                                        `}
                                        margin={true}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Image background',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Gradient Tribute Posters'}
                                            subtitle={(
                                                <SimpleText
                                                    text={'by Duminda Perera '}
                                                    small={true}
                                                />
                                            )}
                                            moreText={'View on Behance'}
                                            image={{
                                                source: require('../assets/card_background.jpg')
                                            }}
                                            onPressMore={() => {
                                                Linking.openURL('https://www.behance.net/gallery/38072705/Gradient-Tribute-Posters');
                                            }}
                                        >
                                            <SimpleText
                                                text={'Dumma Branding is licensed under CC BY-NC-ND 4.0'}
                                                style={{
                                                    height: 150,
                                                    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                    width: '60%',
                                                    alignSelf: 'flex-end',
                                                    paddingRight: theme.padding
                                                }}
                                                align={'right'}
                                            />
                                        </Card>
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        src={`
                                            <Card
                                                title={'Gradient Tribute Posters'}
                                                subtitle={(
                                                    <SimpleText
                                                        text={'by Duminda Perera '}
                                                        small={true}
                                                    />
                                                )}
                                                moreText={'View on Behance'}
                                                image={{
                                                    source: require('../assets/card_background.jpg')
                                                }}
                                                onPressMore={() => {
                                                    Linking.openURL('https://www.behance.net/gallery/38072705/Gradient-Tribute-Posters');
                                                }}
                                            >
                                                <SimpleText
                                                    text={'Dumma Branding is licensed under CC BY-NC-ND 4.0'}
                                                    style={{
                                                        height: 150,
                                                        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        width: '60%',
                                                        alignSelf: 'flex-end',
                                                        paddingRight: theme.padding
                                                    }}
                                                    align={'right'}
                                                />
                                            </Card>
                                        `}
                                        margin={true}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Image background & Animation',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
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
                                                paddingBottom: theme.padding,
                                            }}
                                            boxed={true}
                                            shadowPattern={'C'}
                                            // shadowColor={'#5F30C2'}
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
                                        </Card>
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        src={`
                                            <Card
                                                title={'Gradient Tribute Posters'}
                                                subtitle={(
                                                    <SimpleText
                                                        text={'by Duminda Perera '}
                                                        small={true}
                                                    />
                                                )}
                                                moreText={'View on Behance'}
                                                image={{
                                                    source: require('../assets/card_background.jpg')
                                                }}
                                                onPressMore={() => {
                                                    Linking.openURL('https://www.behance.net/gallery/38072705/Gradient-Tribute-Posters');
                                                }}
                                            >
                                                <SimpleText
                                                    text={'Dumma Branding is licensed under CC BY-NC-ND 4.0'}
                                                    style={{
                                                        height: 150,
                                                        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                        width: '60%',
                                                        alignSelf: 'flex-end',
                                                        paddingRight: theme.padding
                                                    }}
                                                    align={'right'}
                                                />
                                            </Card>
                                        `}
                                        margin={true}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0
                                }
                            }
                        ] as Array<TableViewRow>
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
                                            {`Cards are surfaces that display content and actions on a single topic.`}
                                        </SimpleText>

                                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}}>
                                            {`They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.`}
                                        </SimpleText>
                                    </View>
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Principles',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: 'Contained',
                                subtitle: 'A card is identifiable as a single, contained unit.',
                                reverse: true
                            },
                            {
                                key: `row-${SEQ++}`,
                                title: 'Independent',
                                subtitle: 'A card can stand alone, without relying on surrounding elements for context.',
                                reverse: true
                            },
                            {
                                key: `row-${SEQ++}`,
                                title: 'Individual',
                                subtitle: 'A card cannot merge with another card, or divide into multiple cards.',
                                reverse: true
                            }
                        ] as Array<TableViewRow>
                    }
                ]}
            />
        );
    }
}
