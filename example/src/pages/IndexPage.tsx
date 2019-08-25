import React from 'react';
import {StyleSheet, View,} from 'react-native';
import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";

var styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export interface Props {
    navigation: NavigationScreenProp<any, {
        showModalProfile: () => void;
    }>
}

export default class IndexPage extends React.PureComponent<Props> {

    static navigationOptions = (config: any): NavigationHeaderOptions => {
        const navigation = config.navigation as NavigationScreenProp<NavigationRoute<any>, any>;
        const showModalProfile: any = navigation.getParam('showModalProfile');

        return {
            title: 'RN Components UI'
        };
    };


    componentDidMount(): void {
    }

    render() {
        return (
            <View style={styles.container}>


            </View>
        );
    }
}
