import React from 'react'
import {
    Animated,
    Dimensions,
    Image,
    ImageProps,
    Platform,
    PlatformIOSStatic,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {HeaderProps, NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';


const ICON_HEIGHT = 24;

let androidStatusBarHeight = 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const IPHONE_XS_HEIGHT = 812; // iPhone X and XS
const IPHONE_XR_HEIGHT = 896; // iPhone XR and XS Max
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
export const IS_IPHONE_X =
    Platform.OS === 'ios' &&
    !(Platform as PlatformIOSStatic).isPad &&
    !(Platform as PlatformIOSStatic).isTVOS &&
    (WINDOW_HEIGHT === IPHONE_XS_HEIGHT || WINDOW_WIDTH === IPHONE_XS_HEIGHT || WINDOW_HEIGHT === IPHONE_XR_HEIGHT || WINDOW_WIDTH === IPHONE_XR_HEIGHT);


const defaultHeaderHeight = Platform.select({ios: 44, android: 56, web: 50});
let _safeBounceHeight: number;
const getSafeBounceHeight = () => _safeBounceHeight != null ? _safeBounceHeight : Platform.select({
    ios: 300,
    android: 100,
    web: 200
});
export const setSafeBounceHeight = (height: number) => {
    _safeBounceHeight = height
};

const getStatusBarHeight = () => {
    if (Platform.OS === 'ios') {
        return IS_IPHONE_X ? 44 : 20;
    } else {
        return 0
    }
};

const getNavigationHeight = () => {
    return defaultHeaderHeight + getStatusBarHeight();
};


// const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
export const HEADER_HEIGHT = getNavigationHeight();

const getTranslateY = (animatedScrollValue: Animated.AnimatedValue, offset = 0) => {
    if (animatedScrollValue) {
        return Animated.multiply(Animated.diffClamp(animatedScrollValue, 0, HEADER_HEIGHT), -1);
        // return animatedScrollValue.interpolate({
        //    inputRange: [0, HEADER_HEIGHT],
        //    outputRange: [offset, offset - HEADER_HEIGHT],
        //    extrapolate: 'clamp'
        // });
    }

    return 0;
};


const styles = StyleSheet.create({
    title: {
        color: '#FFF',

        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: HEADER_HEIGHT,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        height: HEADER_HEIGHT,
        width: HEADER_HEIGHT,
        alignSelf: 'flex-start'
    },
    iconImage: {
        width: ICON_HEIGHT,
        height: ICON_HEIGHT,
        resizeMode: 'contain',
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
    subHeader?: ImageProps | JSX.Element;
}

const ContentAnimatedHeader = (props: any) => {
    const animatedScrollValue: Animated.Value = props.animatedScrollValue;

    let translateY: Animated.AnimatedInterpolation | number;
    if (animatedScrollValue) {
        // translateY = animatedScrollValue.interpolate({
        //    inputRange: [0, HEADER_SCROLL_DISTANCE],
        //    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        //    extrapolate: 'clamp'
        // });
        translateY = getTranslateY(animatedScrollValue);
        // animatedScrollValue.addListener
    } else {
        translateY = 0;
    }

    return (
        <Animated.View
            style={{
                pa: HEADER_HEIGHT,
                width: '100%',
                position: 'absolute',
                transform: [{translateY: translateY}]
            }}
        >
            {props.children}
        </Animated.View>
    );
};

/**
 * Sobrescreve o Header do react navigation
 */
const NavigationHeader = (props: HeaderProps) => {

    const Theme = getTheme();

    const options: NavigationHeaderOptions = (props.scene as any).descriptor.options;

    // Navigation da tela atual
    const navigation: NavigationScreenProp<any, any> = (props.scene as any).descriptor.navigation;

    // Personalizado, NÃO EXISTE NO react navigation
    // https://reactnavigation.org/docs/en/header-buttons.html
    const actions = options.actions;

    const headerStyle = Object.assign({
        backgroundColor: 'blue',
        overflow: 'hidden',
        height: HEADER_HEIGHT,
        position: 'relative'
    }, options.headerStyle);
    let content = (
        <View
            style={headerStyle}
        >

            {/* Imagem de fundo */}
            <View style={StyleSheet.absoluteFill}>
                <Image
                    style={[StyleSheet.absoluteFill, {resizeMode: 'stretch'}]}
                    source={require('./../assets/gradiente.png')}
                />
            </View>

            <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>

                {
                    // Botão voltar
                    props.index > 0 ? (
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }} style={styles.iconContainer}>
                            <Image
                                style={[styles.iconImage, {tintColor: '#FFF'}]}
                                source={require('./../assets/arrow-back.png')}
                            />
                        </TouchableOpacity>
                    ) : null
                }

                {/* Título */}
                <View style={{flex: 1}}>
                    <Text style={[styles.title, {paddingLeft: props.index > 0 ? 0 : Theme.padding}]}>
                        {options.title}
                    </Text>
                </View>

                {
                    // Botões de ação
                    actions ? (
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

    let translateY: Animated.AnimatedInterpolation | number;
    const animatedScrollValue: Animated.Value = navigation.getParam('animatedScrollValue');

    if (animatedScrollValue) {
        // translateY = animatedScrollValue.interpolate({
        //    inputRange: [0, HEADER_SCROLL_DISTANCE],
        //    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        //    extrapolate: 'clamp'
        // });
        translateY = getTranslateY(animatedScrollValue);
        // animatedScrollValue.addListener
    } else {
        translateY = 0;
    }

    return (
        <Animated.View
            style={{
                width: '100%',
                transform: [{translateY: translateY}]
            }}
        >
            {content}
            {options.subHeader}
        </Animated.View>
    );
};

export default NavigationHeader;
