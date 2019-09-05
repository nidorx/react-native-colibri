import React from 'react';
import {Image, Linking, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Card, CarouselImage, CarouselImageItem, getTheme, SimpleText, TableViewRow, Toast} from "react-native-colibri";
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

        let onPressMore = () => {
        };
        return (
            <GradientHeader
                navigation={this.props.navigation}
                description={
                    (
                        <View>
                            <SimpleText align={'justify'} color={'#FFF'}>
                                {`Cards are surfaces that display content and actions on a single topic.`}
                            </SimpleText>

                            <SimpleText align={'justify'} style={{paddingTop: theme.padding}} color={'#FFF'}>
                                {`They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.`}
                            </SimpleText>
                        </View>
                    )

                }
                sections={[
                    {
                        key: `section-${SEQ++}`,
                        header: 'Import',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <Code src={`import { Card } from "react-native-colibri";`}
                                    />
                                )
                            }
                        ]
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
                                                    padding: theme.paddingBig
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
                                                        padding: theme.paddingBig
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
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'More Link',
                            subtitle: 'On a card you can add an action button to redirect the user to the content detail screen, or even an external link.'
                        },
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                        >
                                            <SimpleText
                                                text={'the content of card here...'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
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
                                                        padding: theme.paddingBig
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
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'Shadow',
                            subtitle: 'You can add shadows to cards. The implementation of react-native-colibri uses image to apply shadows due to Android compatibility issues.'
                        },
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                        >
                                            <SimpleText
                                                text={'shadow={true}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
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
                                                shadow={true}
                                            >
                                                <SimpleText
                                                    text={'the content of card here...'}
                                                    align={'center'}
                                                    style={{
                                                        padding: theme.paddingBig
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
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'Shadow - Patterns',
                            subtitle: 'There are 4 shadow patterns available for use on cards, represented by the letters A, B, C and D.'
                        },
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'A'}
                                        >
                                            <SimpleText
                                                text={'shadowPattern={\'A\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'B'}
                                        >
                                            <SimpleText
                                                text={'shadowPattern={\'B\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'C'}
                                        >
                                            <SimpleText
                                                text={'shadowPattern={\'C\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'D'}
                                        >
                                            <SimpleText
                                                text={'shadowPattern={\'D\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
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
                                                shadow={true}
                                                shadowPattern={'C'}
                                            >
                                                <SimpleText
                                                    text={'the content of card here...'}
                                                    align={'center'}
                                                    style={{
                                                        padding: theme.paddingBig
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
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'Shadow - Color & Opacity',
                            subtitle: 'In addition to the shadow pattern, you can also set the fill color and opacity. These two settings are very useful for highlighting cards.'
                        },
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'A'}
                                            shadowOpacity={0.3}
                                            shadowColor={'#AE367E'}
                                        >
                                            <SimpleText
                                                text={'shadowOpacity={0.3} \n shadowColor={\'#AE367E\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'B'}
                                            shadowOpacity={0.4}
                                            shadowColor={'#C8ACFF'}
                                        >
                                            <SimpleText
                                                text={'shadowOpacity={0.4} \n shadowColor={\'#C8ACFF\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            shadow={true}
                                            shadowPattern={'C'}
                                            shadowOpacity={0.6}
                                            shadowColor={'#7198FF'}
                                        >
                                            <SimpleText
                                                text={'shadowOpacity={0.6} \n shadowColor={\'#7198FF\'}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
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
                                                onPressMore={onPressMore}
                                                shadow={true}
                                                shadowPattern={'C'}
                                                shadowOpacity={0.6}
                                                shadowColor={'#7198FF'}
                                            >
                                                <SimpleText
                                                    text={'shadowOpacity={0.6} \\n shadowColor={\\'#7198FF\\'}'}
                                                    align={'center'}
                                                    style={{
                                                        padding: theme.paddingBig
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
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'Boxed',
                            subtitle: 'A card can also be displayed as a box, increasing the highlighting of the content. The box mode card is automatically shadowed, but you have the freedom to remove it.'
                        },
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Card
                                            boxed={true}
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            style={{backgroundColor: theme.colorContent}}
                                        >
                                            <SimpleText
                                                text={'boxed={true}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            boxed={true}
                                            shadowPattern={'C'}
                                            style={{backgroundColor: theme.colorContent}}
                                        >
                                            <SimpleText
                                                text={'boxed={true} \n shadowPattern={"C"}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
                                                }}
                                            />
                                        </Card>
                                        <Card
                                            title={'Recently updated'}
                                            subtitle={'Fresh features & content'}
                                            onPressMore={onPressMore}
                                            boxed={true}
                                            shadow={false}
                                            style={{backgroundColor: theme.colorContent}}
                                        >
                                            <SimpleText
                                                text={'boxed={true} \n shadow={false}'}
                                                align={'center'}
                                                style={{
                                                    padding: theme.paddingBig
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
                                                onPressMore={onPressMore}
                                                boxed={true}
                                                shadowPattern={'C'}
                                                style={{backgroundColor: theme.colorContent}}
                                            >
                                                <SimpleText
                                                    text={'boxed={true} \\n shadowPattern={"C"}'}
                                                    align={'center'}
                                                    style={{
                                                        padding: theme.paddingBig
                                                    }}
                                                />
                                            </Card>
                                        `}
                                        margin={true}
                                    />
                                ),
                                style: {
                                    paddingHorizontal: 0,
                                    backgroundColor: '#C8ACFF'
                                }
                            }
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'Image background',
                            subtitle: 'You can also add background image to the card to represent the main theme of this card.'
                        },
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
                                            style={{backgroundColor: theme.colorContent}}
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
                                            style={{backgroundColor: theme.colorContent}}
                                            boxed={true}
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
                                    paddingHorizontal: 0,
                                    backgroundColor: '#FFC96F'
                                }
                            }
                        ]
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: {
                            title: 'Image background & Animation',
                            subtitle: 'Another feature implemented in the card is the animation of the background image. It is useful for use in conjunction with the carousel, decreasing background opacity as the user scrolls the content. This effect is inspired by the Google Play Store.'
                        },
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
                                            onPressMore={onPressMore}
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
                                            onPressMore={onPressMore}
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
                                        `}
                                        margin={true}
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
                        ]
                    }
                ]}
            />
        );
    }
}
