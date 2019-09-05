import React from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {Button, getTheme, SimpleText, TableViewRow, TableViewSection} from "react-native-colibri";
import GradientHeader from "../components/GradientHeader";
import Code from "../components/Code";
import {View} from "react-native";


export type DesignPrinciplesPageProps = {
    navigation: NavigationScreenProp<any, {}>
}

export default class DesignPrinciplesPage extends React.PureComponent<DesignPrinciplesPageProps> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        return {
            title: 'Colibri Design Principles'
        };
    };

    render() {

        const theme = getTheme();
        let SEQ = 1;

        return (
            <GradientHeader
                navigation={this.props.navigation}
                description={'React Native Colibri provides a consistent and holistic user experience for Android & iOS mobile applications. By creating visually pleasing designs with a strong focus on ease of use, the experience is intuitive and simple, across all devices.'}
                sections={[
                    {
                        key: `${SEQ++}`,
                        header: 'Design Principles',
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: 'The design philosophy of Colibri library is based on three core principles. React Native Colibri user experience is adaptive, simple and coherent.'
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Adaptive',
                                subtitle: 'The React Native Colibri library lets you create applications for any device. Its components are designed so that they can adapt to make your application development as easy as possible, either through the use of Visual Theme or the wide range of customizable properties.'
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Simple',
                                subtitle: `With Colibri, you can develop your application screens intuitively and quickly. React Native Colibri helps you focus on what's important during development - the essential component functions are easy to use and you can focus your development efforts on relevant tasks and activities.`
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Coherent',
                                subtitle: 'Whether you\'re developing a report dashboard, thumbnail record listing, or user profile screen - React Native Colibri adopts a consistent language of interaction and visual design. Throughout the components you enjoy the same intuitive and consistent experience.'
                            }
                        ]
                    }
                ] as Array<TableViewSection>}
            />
        );
    }
}
