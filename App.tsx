import React from 'react';
import {useScreens} from 'react-native-screens';
import {ActivityIndicator, DeviceEventEmitter, EmitterSubscription, StatusBar, View,} from 'react-native';
import {createAppContainer, createStackNavigator, createSwitchNavigator, NavigationScreenProp} from 'react-navigation';
import LoginPage from './src/pages/LoginPage';
import IndexPage from './src/pages/IndexPage';
import AuthService, {AUTH_EVENT_ON_LOGIN, AUTH_EVENT_ON_LOGOUT} from './src/services/AuthService';
import TesteTableViewPage from './src/TesteTableViewPage';
import TesteFormularioPage from './src/TesteFormularioPage';
import AppProdutividade from './src/app-produtividade';
import AnimatedModal from "./src/components/AnimatedModal";
import Camera from "./src/components/Camera";
import NavigationHeader from './src/components/NavigationHeader';
import { Theme } from './src/components/Constants';

// Performance, usa screens nativas
useScreens();

export interface AuthLoadingScreenProps {
    navigation: NavigationScreenProp<any, any>
}

/**
 * Faz a verificação se usuário já está logado
 */
class AuthLoadingScreen extends React.PureComponent<AuthLoadingScreenProps> {

    authLoginSubscription?: EmitterSubscription;
    authLogoutSubscription?: EmitterSubscription;

    constructor(props: any) {
        super(props);
        this.bootstrap();
    }

    componentDidMount() {
        this.authLoginSubscription = DeviceEventEmitter.addListener(AUTH_EVENT_ON_LOGIN, () => {
            // Fez login, redireciona usuario
            this.props.navigation.navigate('App');
        });

        this.authLogoutSubscription = DeviceEventEmitter.addListener(AUTH_EVENT_ON_LOGOUT, () => {
            // Fez login, redireciona usuario
            this.props.navigation.navigate('Auth');
        });

        AuthService.init();
    }

    componentWillUnmount() {
        AuthService.unmount();

        if (this.authLoginSubscription) {
            this.authLoginSubscription.remove();
        }

        if (this.authLogoutSubscription) {
            this.authLogoutSubscription.remove();
        }
    }

    private bootstrap = async () => {
        let user = await AuthService.getUser();
        this.props.navigation.navigate(user ? 'App' : 'Auth', {
            user: user
        });
    };

    render() {
        return (
            <View>
                <ActivityIndicator/>
            </View>
        );
    }
}

/**
 * Todas as rotas do App
 */
const PrivateStackNavigator = createStackNavigator({
    Home: IndexPage,
    TesteTableViewPage: {
        id: 'TesteTableViewPage',
        name: 'TesteTableViewPage',
        description: 'TesteTableViewPage',
        screen: TesteTableViewPage
    },
    TesteFormularioPage: {
        id: 'TesteFormularioPage',
        name: 'TesteFormularioPage',
        description: 'TesteFormularioPage',
        screen: TesteFormularioPage
    },
    // Rotas dos aplicativos
    // @TODO: Verificar duplicidade de rotas
    // @TODO: Definir padrão de nomes de rotas dos aplicativos
    ...AppProdutividade.privateRouteConfigMap
}, {
    defaultNavigationOptions: {
        header: NavigationHeader,
        headerStyle: Theme.headerStyle,
    }
});

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        // @TODO: PublicStackNavigator
        Auth: LoginPage,
        App: PrivateStackNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

/**
 * Classe principal da aplicação
 */
export default class App extends React.PureComponent {
    render() {
        return (
            <Camera>
                <AnimatedModal>
                    <StatusBar backgroundColor={Theme.statusBarColor} barStyle="light-content" />
                    <AppContainer/>
                </AnimatedModal>
            </Camera>
        );
    }
}


