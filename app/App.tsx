import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {AnimatedModal, TableView, TableViewSection, ThemeProvider, Toast} from '../lib';
import TypographyPage from './pages/TypographyPage';
import CardPage from './pages/CardPage';
import EmptyStatePage from './pages/EmptyStatePage';
import CarouselPage from './pages/CarouselPage';
import CarouselImagePage from './pages/CarouselImagePage';
import ButtonPage from './pages/ButtonPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const PAGES: { [key: string]: { [key: string]: any } } = {
    'Base': {
        'Typography': TypographyPage,
    },
    'UI Components': {
        'Button': ButtonPage,
        'Card': CardPage,
        'Carousel': CarouselPage,
        'CarouselImage': CarouselImagePage,
        'EmptyState': EmptyStatePage,
    },
};

class IndexPage extends React.PureComponent<any> {
    render() {
        const sections: Array<TableViewSection> = [];

        for (var sectionName in PAGES) {
            if (!PAGES.hasOwnProperty(sectionName)) {
                continue;
            }
            const section: TableViewSection = {
                key: sectionName,
                header: sectionName,

                data: [],
            };


            for (var pageName in PAGES[sectionName]) {
                if (!PAGES[sectionName].hasOwnProperty(pageName)) {
                    continue;
                }

                let title = sectionName + ' - ' + pageName;
                let route = title.replace(/[\s]/g, '');
                section.data.push({
                    key: pageName,
                    title: pageName,
                    disclosure: true,
                    onPress: () => {
                        this.props.navigation.navigate(route);
                    },
                });
            }

            sections.push(section);
        }

        return (<TableView sections={sections}/>);
    }
}

const ROUTE_CONFIG_MAP: any[] = [
    {
        name: 'Index',
        component: IndexPage,
        options: {
            title: 'React Native Colibri',
        },
    },
];

(function () {
    for (let sectionName in PAGES) {
        if (!PAGES.hasOwnProperty(sectionName)) {
            continue;
        }
        for (let pageName in PAGES[sectionName]) {
            if (!PAGES[sectionName].hasOwnProperty(pageName)) {
                continue;
            }

            let title = sectionName + ' - ' + pageName;
            let route = title.replace(/[\s]/g, '');

            ROUTE_CONFIG_MAP.push({
                name: route,
                component: PAGES[sectionName][pageName],
                options: {
                    title: title,
                },
            });
        }
    }
})();

const Stack = createStackNavigator();

export default class App extends React.PureComponent {
    render() {
        return (
            <ThemeProvider>
                <AnimatedModal>
                    <StatusBar backgroundColor={'#FFF'} barStyle="dark-content"/>
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="Index"
                        >
                            {
                                ROUTE_CONFIG_MAP.map(v => (
                                    <Stack.Screen
                                        key={v.name}
                                        name={v.name}
                                        component={v.component}
                                        options={v.options}
                                    />
                                ))
                            }
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Toast opacity={0.9}/>
                </AnimatedModal>
            </ThemeProvider>
        );
    }
}
