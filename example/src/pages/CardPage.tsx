import React from 'react';
import {Linking, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Card, getTheme, SimpleText, TableViewRow} from "rn-components-ui";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";


export type CardPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

export default class CardPage extends React.PureComponent<CardPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'Card'
        };
    };

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
                                                    text={' by Duminda Perera '}
                                                    color={'#FFF'}
                                                    style={{
                                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                                    }}
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
                                                        text={' by Duminda Perera '}
                                                        color={'#FFF'}
                                                        style={{
                                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                                        }}
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
