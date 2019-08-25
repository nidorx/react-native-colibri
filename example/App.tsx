import React from 'react';
import {StatusBar,} from 'react-native';
import {createAppContainer, createStackNavigator} from "react-navigation";
import IndexPage from "./src/pages/IndexPage";
import NavigationHeader from "./src/components/NavigationHeader";
import {AnimatedModal, getTheme} from "rn-components-ui";

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
                <StatusBar backgroundColor={'transparent'} translucent={true} barStyle="light-content"/>
                <AppContainer/>
            </AnimatedModal>
        );
    }
}
