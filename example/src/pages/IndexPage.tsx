import React from 'react';
import {ImageBackground, StyleSheet, View,} from 'react-native';
import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {NavigationHeaderOptions} from "../components/NavigationHeader";
import {DiscloruseIcon, EmptyState, SimpleText, TableView, TableViewRow} from "rn-components-ui";

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

const COMPONENTS = [
    ['Button', 'Componente de botão simples'],
    ['Card', ''],
    ['Carousel', ''],
    ['CarouselImage', ''],
    ['DateFormatted', ''],
    ['DatePicker', ''],
    ['EmptyState', ''],
    ['Loading', ''],
    ['OkCancelView', ''],
    ['Segment', ''],
    ['Separator', ''],
    ['SimpleText', ''],
    ['Title', ''],
    ['AnimatedModal', ''],
    ['TableView', ''],
    ['Utils', ''],
];

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
            <ImageBackground
                style={[StyleSheet.absoluteFill, {alignSelf: 'flex-start'}]}
                source={require('./../assets/gradiente.png')}
            >
                <View>
                    <DiscloruseIcon/>
                </View>
                <TableView
                    header={(
                        <EmptyState
                            title={'RN Components UI'}
                            titleProps={{color: '#FFF'}}
                            description={(
                                <SimpleText
                                    color={'#FFF'}
                                    text={'Description'}
                                    subline={true}
                                />
                            )}
                        />
                    )}
                    transparent={true}
                    sections={[
                        {
                            key: 'xpto',
                            header: 'Components',
                            data: COMPONENTS.map(component => {
                                let componentName = component[0];
                                return {
                                    key: componentName,
                                    title: componentName,
                                    subtitle: component[1],
                                    disclosure: true,
                                    right: '33',
                                    icon: {
                                        source: require('./../assets/arrow-back.png')
                                    },
                                    iconBig: true,
                                    onPress: row => {
                                        this.props.navigation.navigate(componentName);
                                    }
                                } as TableViewRow
                            })
                        }
                    ]}
                />
            </ImageBackground>
        );
    }
}
