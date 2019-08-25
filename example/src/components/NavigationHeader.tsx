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
    View,
    ViewStyle
} from 'react-native';
import {HeaderProps, NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {getTheme} from "rn-components-ui";


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


const defaultHeaderHeight = Platform.select({
    ios: 44,
    android: 56,
    web: 50
});

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
        tintColor: '#FFFFFF'
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

/**
 * Sobrescreve o Header do react navigation
 */
const NavigationHeader = (props: HeaderProps) => {

    const theme = getTheme();

    const options: NavigationHeaderOptions = (props.scene as any).descriptor.options;

    // Navigation da tela atual
    const navigation: NavigationScreenProp<any, any> = (props.scene as any).descriptor.navigation;

    const actions = options.actions;

    const HEADER_PADDING = HEADER_HEIGHT / 2 - theme.fontSize;

    const headerStyle = Object.assign({
        overflow: 'hidden',
        paddingTop: HEADER_PADDING,
        height: HEADER_HEIGHT,
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    } as ViewStyle, options.headerStyle);

    let content = (
        <View style={headerStyle}>

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

                {/* title */}
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

    return (
        <Animated.View
            style={{
                width: '100%',
            }}
        >
            {content}
            {options.subHeader}
        </Animated.View>
    );
};

export default NavigationHeader;
