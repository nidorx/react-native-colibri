import React from 'react';
import {StatusBar,} from 'react-native';
import {createAppContainer, createStackNavigator} from "react-navigation";
import IndexPage from "./src/pages/IndexPage";
import NavigationHeader from "./src/components/NavigationHeader";
import {AnimatedModal, getTheme, Toast} from "rn-components-ui";
import ButtonPage from "./src/pages/ButtonPage";
import CardPage from "./src/pages/CardPage";
import CarouselPage from "./src/pages/CarouselPage";
import CarouselImagePage from "./src/pages/CarouselImagePage";

const AppContainer = createAppContainer(createStackNavigator(
    {
        Index: IndexPage,
        ButtonPage: ButtonPage,
        CardPage: CardPage,
        CarouselPage: CarouselPage,
        CarouselImagePage: CarouselImagePage,
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
                <Toast
                    opacity={0.9}
                />
            </AnimatedModal>
        );
    }
}
