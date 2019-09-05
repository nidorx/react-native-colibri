import React from 'react';
import {StatusBar,} from 'react-native';
import {createAppContainer, createStackNavigator} from "react-navigation";
import IndexPage from "./src/pages/IndexPage";
import NavigationHeader from "./src/components/NavigationHeader";
import {AnimatedModal, getTheme, Toast} from "react-native-colibri";
import ButtonPage from "./src/pages/ButtonPage";
import CardPage from "./src/pages/CardPage";
import CarouselPage from "./src/pages/CarouselPage";
import CarouselImagePage from "./src/pages/CarouselImagePage";
import DateFormattedPage from "./src/pages/DateFormattedPage";
import DatePickerPage from "./src/pages/DatePickerPage";
import EmptyStatePage from "./src/pages/EmptyStatePage";
import LoadingPage from "./src/pages/LoadingPage";
import OkCancelViewPage from "./src/pages/OkCancelViewPage";
import SegmentPage from "./src/pages/SegmentPage";
import SeparatorPage from "./src/pages/SeparatorPage";
import SimpleTextPage from "./src/pages/SimpleTextPage";
import TitlePage from "./src/pages/TitlePage";
import AnimatedModalPage from "./src/pages/AnimatedModalPage";
import TableViewPage from "./src/pages/TableViewPage";
import DesignPrinciplesPage from "./src/pages/DesignPrinciplesPage";
import TypographyPage from "./src/pages/TypographyPage";

const AppContainer = createAppContainer(createStackNavigator(
    {
        Index: IndexPage,
        DesignPrinciplesPage: DesignPrinciplesPage,
        TypographyPage: TypographyPage,
        // UI Components
        ButtonPage: ButtonPage,
        CardPage: CardPage,
        CarouselPage: CarouselPage,
        CarouselImagePage: CarouselImagePage,
        DateFormattedPage: DateFormattedPage,
        DatePickerPage: DatePickerPage,
        EmptyStatePage: EmptyStatePage,
        LoadingPage: LoadingPage,
        OkCancelViewPage: OkCancelViewPage,
        SegmentPage: SegmentPage,
        SeparatorPage: SeparatorPage,
        SimpleTextPage: SimpleTextPage,
        TitlePage: TitlePage,
        AnimatedModalPage: AnimatedModalPage,
        TableViewPage: TableViewPage
    },
    {
        defaultNavigationOptions: {
            header: NavigationHeader
        },
        mode: 'card',
        headerTransitionPreset: 'uikit',
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        transparentCard: true,
        headerBackTitleVisible: false
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
