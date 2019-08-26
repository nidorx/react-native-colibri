import React from 'react';
import {Linking, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Card, getTheme, SimpleText, TableViewRow} from "rn-components-ui";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";


export type IndexPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

export default class CardPage extends React.PureComponent<IndexPageProps> {

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
                title={'Card'}
                description={'This section provides guidance on the base elements of a card.'}
                sections={[
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
                                            subtitle={'by Duminda Perera'}
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
                                                subtitle={'by Duminda Perera'}
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
