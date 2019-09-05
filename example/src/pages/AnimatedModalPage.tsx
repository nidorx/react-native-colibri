import React from 'react';
import {View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Button, getTheme, SimpleText, TableViewRow} from "react-native-colibri";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";


export type AnimatedModalPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

export default class AnimatedModalPage extends React.PureComponent<AnimatedModalPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'AnimatedModal'
        };
    };

    render() {
        const theme = getTheme();
        let SEQ = 1;

        return (
            <GradientHeader
                navigation={this.props.navigation}
                description={'A button consists of text that clearly communicates what action will occur when the user touches it. The two main types of buttons used are Process buttons, and Ancillary buttons.'}
                sections={[
                    {
                        key: `section-${SEQ++}`,
                        header: 'Import',
                        data: [
                            {
                                key: `row-${SEQ++}`,
                                title: (
                                    <Code src={`import { Carousel } from "react-native-colibri";`}
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
                                        <Button
                                            title={'Submit Form'}
                                            onPress={() => {
                                            }}
                                        />
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
                        ]
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
                        ]
                    }
                ]}
            />
        );
    }
}
