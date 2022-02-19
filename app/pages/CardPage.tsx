import React from 'react';
import {Card, CarouselImage, CarouselImageItem, SimpleText, spacing, TableView, Theme, Toast} from "../../lib";
import {View} from "react-native";


export type CardStoryProps = {}

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

type CardStoryState = {
    carouselImage?: CarouselImage;
}

export default class CardPage extends React.PureComponent<CardStoryProps, CardStoryState> {

    state: CardStoryState = {};

    render() {
        let SEQ = 1;

        let onPressMore = () => {
        };

        return (
            <Theme>
                {(theme) => {

                    return (
                        <TableView
                            sections={[
                                {
                                    key: `section-${SEQ++}`,
                                    data: [
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
                                                <Card
                                                    title={'Recently updated'}
                                                    subtitle={'Fresh features & content'}
                                                >
                                                    <SimpleText
                                                        text={'the content of card here...'}
                                                        align={'center'}
                                                        style={{
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
                                                <Card
                                                    title={'Recently updated'}
                                                    subtitle={'Fresh features & content'}
                                                    onPressMore={onPressMore}
                                                >
                                                    <SimpleText
                                                        text={'the content of card here...'}
                                                        align={'center'}
                                                        style={{
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
                                                <Card
                                                    boxed={true}
                                                    title={'Recently updated'}
                                                    subtitle={'Fresh features & content'}
                                                    onPressMore={onPressMore}
                                                    style={{backgroundColor: theme.colorBackground}}
                                                >
                                                    <SimpleText
                                                        text={'boxed={true}'}
                                                        align={'center'}
                                                        style={{
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0,
                                                backgroundColor: '#C8ACFF'
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
                                                <Card
                                                    title={'Recently updated'}
                                                    subtitle={'Fresh features & content'}
                                                    onPressMore={onPressMore}
                                                    boxed={true}
                                                    shadowPattern={'B'}
                                                    style={{backgroundColor: theme.colorBackground}}
                                                >
                                                    <SimpleText
                                                        text={'boxed={true} \n shadowPattern={"B"}'}
                                                        align={'center'}
                                                        style={{
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0,
                                                backgroundColor: '#C8ACFF'
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
                                                <Card
                                                    title={'Recently updated'}
                                                    subtitle={'Fresh features & content'}
                                                    onPressMore={onPressMore}
                                                    boxed={true}
                                                    shadowPattern={'C'}
                                                    style={{backgroundColor: theme.colorBackground}}
                                                >
                                                    <SimpleText
                                                        text={'boxed={true} \n shadowPattern={"C"}'}
                                                        align={'center'}
                                                        style={{
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0,
                                                backgroundColor: '#C8ACFF'
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
                                                <Card
                                                    title={'Recently updated'}
                                                    subtitle={'Fresh features & content'}
                                                    onPressMore={onPressMore}
                                                    boxed={true}
                                                    shadow={false}
                                                    style={{backgroundColor: theme.colorBackground}}
                                                >
                                                    <SimpleText
                                                        text={'boxed={true} \n shadow={false}'}
                                                        align={'center'}
                                                        style={{
                                                            padding: spacing(theme, 'large')
                                                        }}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0,
                                                backgroundColor: '#C8ACFF'
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                    }}
                                                    style={{backgroundColor: theme.colorBackground}}
                                                    shadow={true}
                                                >
                                                    <SimpleText
                                                        text={'Dumma Branding is licensed under CC BY-NC-ND 4.0'}
                                                        style={{
                                                            height: 150,
                                                            width: '60%',
                                                            alignSelf: 'flex-end',
                                                            paddingRight: spacing(theme, 'base')
                                                        }}
                                                        align={'right'}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0,
                                                backgroundColor: '#FFC96F'
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
                                            title: (
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
                                                    }}
                                                    style={{backgroundColor: theme.colorBackground}}
                                                    boxed={true}
                                                >
                                                    <SimpleText
                                                        text={'Dumma Branding is licensed under CC BY-NC-ND 4.0'}
                                                        style={{
                                                            height: 150,
                                                            // backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                            width: '60%',
                                                            alignSelf: 'flex-end',
                                                            paddingRight: spacing(theme, 'base')
                                                        }}
                                                        align={'right'}
                                                    />
                                                </Card>
                                            ),
                                            style: {
                                                paddingHorizontal: 0,
                                                backgroundColor: '#FFC96F'
                                            }
                                        },
                                        {
                                            key: `row-${SEQ++}`,
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
                                                    onPressMore={onPressMore}
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
                                }
                            ]}
                        />
                    );
                }}
            </Theme>
        );


    }
}
