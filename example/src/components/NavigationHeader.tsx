import React from 'react'
import {
    Dimensions,
    Image,
    ImageProps,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import {HeaderProps, NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {getTheme} from "rn-components-ui";


const ICON_HEIGHT = 24;

const X_WIDTH = 375;
const X_HEIGHT = 812; // iPhone X and XS

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896; // iPhone XR and XS Max

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}

/**
 * Altura da barra de navegação interna do APP
 */
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;

/**
 * Altura da barra de status do sistema operacional
 */
const STATUSBAR_HEIGHT = Platform.select({
    ios: isIPhoneX ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
});

// const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
export const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const styles = StyleSheet.create({
    title: {
        color: '#FFF',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: APPBAR_HEIGHT,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        width: APPBAR_HEIGHT,
        height: APPBAR_HEIGHT
    },
    iconImage: {
        width: ICON_HEIGHT,
        height: ICON_HEIGHT,
        resizeMode: 'contain',
        alignSelf: 'center'
        // tintColor: '#FFFFFF'
    },
    actionsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/**
 * Ícone de ação no Header
 */
export interface HeaderAction {
    onPress: (navigation: NavigationScreenProp<any, any>) => void;
    icon: ImageProps | JSX.Element;
}

/**
 * Definição das opções de navegação
 */
export interface NavigationHeaderOptions extends NavigationStackScreenOptions {
    actions?: Array<HeaderAction>;
}

/**
 * Sobrescreve o Header do react navigation
 */
const NavigationHeader = (props: HeaderProps) => {

    const theme = getTheme();

    const options: NavigationHeaderOptions = (props.scene as any).descriptor.options;

    // Navigation da tela atual
    const navigation: NavigationScreenProp<any, any> = (props.scene as any).descriptor.navigation;

    const actions = options.actions;

    const headerStyle = Object.assign({
        overflow: 'hidden',
        height: HEADER_HEIGHT,
        paddingTop: STATUSBAR_HEIGHT,
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    } as ViewStyle, options.headerStyle);


    return (
        <View style={headerStyle}>

            <View style={StyleSheet.absoluteFill}>
                <Image
                    style={[StyleSheet.absoluteFill, {resizeMode: 'stretch'}]}
                    source={require('./../assets/gradient.png')}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%'
                }}
            >

                {
                    // Botão voltar
                    (props.index > 0)
                        ? (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack()
                                }}
                                style={styles.iconContainer}
                            >
                                <Image
                                    style={[styles.iconImage, {tintColor: '#FFF'}]}
                                    source={require('./../assets/arrow-back.png')}
                                />
                            </TouchableOpacity>
                        ) : null
                }

                {/* Título */}
                <View style={{flex: 1}}>
                    <Text
                        style={[
                            styles.title,
                            {
                                paddingLeft: props.index > 0 ? 0 : theme.padding,
                                fontSize: theme.fontSize
                            }
                        ]}
                    >
                        {options.title}
                    </Text>
                </View>

                {
                    // Botões de ação
                    actions
                        ? (
                            <View style={styles.actionsContainer}>
                                {
                                    actions.map((action, index) => {
                                        const img = (action.icon as ImageProps);
                                        return (
                                            <TouchableOpacity
                                                key={`${index}`}
                                                onPressIn={() => {
                                                    action.onPress(navigation);
                                                }}
                                                style={styles.iconContainer}
                                            >
                                                {
                                                    img.source
                                                        ? <Image {...img} style={[styles.iconImage, img.style]}/>
                                                        : action
                                                }
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                }
            </View>
        </View>
    );
};

export default NavigationHeader;
