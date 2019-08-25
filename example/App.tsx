/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer, createStackNavigator} from "react-navigation";
import IndexPage from "./src/pages/IndexPage";
import NavigationHeader from "./src/components/NavigationHeader";
import {AnimatedModal, getTheme} from "rn-components-ui/dist";

import Screeen from 'react-native-screens';

const AppContainer = createAppContainer(createStackNavigator(
    {
        Index: IndexPage,
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader
        }
    }
));

/**
 * Classe principal da aplicação
 */
export default class App extends React.PureComponent {
    render() {
        const theme = getTheme();
        return (
            <AnimatedModal>
                <StatusBar backgroundColor={'rgba(0, 0, 0, 0.5)'} barStyle="light-content"/>
                <AppContainer/>
            </AnimatedModal>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
