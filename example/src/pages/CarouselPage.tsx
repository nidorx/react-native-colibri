import React from 'react';
import {View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Button, Carousel, getTheme, SimpleText, TableViewRow} from "rn-components-ui";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";


export type CarouselPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

export default class CarouselPage extends React.PureComponent<CarouselPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'Carousel'
        };
    };

    render() {
        const theme = getTheme();
        let SEQ = 1;

        return (
            <GradientHeader
                title={'Carousel'}
                description={(
                    <View>
                        <SimpleText align={'justify'} color={'#FFF'}>
                            {'A carousel optimizes screen space by displaying only a subset of items from a collection.'}
                        </SimpleText>

                        <SimpleText align={'justify'} style={{paddingTop: theme.padding}} color={'#FFF'}>
                            {'The navigational controls on a carousel suggests additional content that is not currently visible, this encourages the user to continue exploring. The carousel pattern can in this way be used as an extra incentive for the user to browse through all items of the list, as we as humans do not feel comfortable by not being aware of the “full picture”.'}
                        </SimpleText>
                    </View>
                )}
                sections={[
                    {
                        key: `section-${SEQ++}`,
                        header: 'Import',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <Code src={`import { Carousel } from "rn-components-ui";`}
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
                                        <Carousel
                                            gap={6}
                                        >
                                            {

                                                [
                                                    "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                    "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                                ].map((color, index, all) => (
                                                    <SimpleText
                                                        key={'' + index}
                                                        text={'' + index}
                                                        color={'#FFF'}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                            backgroundColor: color
                                                        }}
                                                    />
                                                ))
                                            }
                                        </Carousel>
                                    </View>
                                ),
                                subtitle: (
                                    <Code src={`
                                                <Carousel
                                                    gap={6}
                                                >
                                                    {

                                                        [
                                                            "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                            "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                                        ].map((color, index, all) => (
                                                            <SimpleText
                                                                key={'' + index}
                                                                text={'' + index}
                                                                color={'#FFF'}
                                                                style={{
                                                                    height: 100,
                                                                    width: 100,
                                                                    backgroundColor: color
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </Carousel>
                                            `}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Dinamic width',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Carousel
                                            gap={6}
                                        >
                                            {
                                                [
                                                    "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                    "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                                ].map((color, index, all) => (
                                                    <SimpleText
                                                        key={`${index}`}
                                                        text={`${index}`}
                                                        color={'#FFF'}
                                                        style={{
                                                            height: 100,
                                                            width: Math.random() > 0.5 ? 100 : 150,
                                                            backgroundColor: color
                                                        }}
                                                    />
                                                ))
                                            }
                                        </Carousel>
                                    </View>
                                ),
                                subtitle: (
                                    <Code src={`
                                                <Button
                                                    title={'Submit Form'}
                                                    onPress={() => {
                                                    }}
                                                />
                                            `}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `section-${SEQ++}`,
                        header: 'Page Style',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <View>
                                        <Carousel
                                            gap={6}
                                            pageStyle={{
                                                borderRadius: 20,
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {

                                                [
                                                    "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                    "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                                ].map((color, index, all) => (
                                                    <SimpleText
                                                        key={'' + index}
                                                        text={'' + index}
                                                        color={'#FFF'}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                            backgroundColor: color
                                                        }}
                                                    />
                                                ))
                                            }
                                        </Carousel>
                                    </View>
                                ),
                                subtitle: (
                                    <Code
                                        src={`
                                                <Carousel
                                                    gap={6}
                                                    pageStyle={{
                                                        borderRadius: 20,
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {

                                                        [
                                                            "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                            "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                                        ].map((color, index, all) => (
                                                            <SimpleText
                                                                key={'' + index}
                                                                text={'' + index}
                                                                color={'#FFF'}
                                                                style={{
                                                                    height: 100,
                                                                    width: 100,
                                                                    backgroundColor: color
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </Carousel>
                                            `}
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
                        ] as Array<TableViewRow>
                    }
                ]}
            />
        );
    }
}
