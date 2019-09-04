import {Animated, Dimensions, Easing, StyleSheet} from "react-native";


export type Theme = {
    /**
     * Compoentes não renderizados, durante carregamento
     */
    colorSkeleton: string;
    // Colors
    colorBackground: string;
    colorContent: string;
    colorLine: string;
    /**
     * Cor de fundo do conteúdo quando pressionado (clique)
     */
    colorUnderlay: string;
    colorLineSelected: string;
    colorText: string;
    colorTextSecondary: string;
    colorTextReverse: string;
    colorLink: string;
    /**
     * Cor de fundo para item selecionado
     */
    colorSelected: string;
    colorPrimary: string;
    colorInfo: string;
    colorSuccess: string;
    colorWarning: string;
    colorDanger: string;
    colorButton: string;
    fontSize: number;
    fontSizeSubline: number;
    fontSizeBig: number;
    fontSizeSmall: number;

    lineWidth: number;

    /**
     * Altura e largura comum dos ícones
     */
    iconSize: number;
    buttonHeight: number;
    padding: number;
    paddingBig: number;
    paddingSmall: number;
    paddingMinimum: number;
    borderRadius: number;
    borderRadiusBig: number;
    borderRadiusSmall: number;
}

/**
 * Segue
 *    https://v1.designcode.io/iosdesign-guidelines (quando possível)
 *    https://ivomynttinen.com/blog/ios-design-guidelines
 */
const THEME_DEFAULT: Theme = {
    colorSkeleton: '#D2D2D2',
    colorBackground: '#F2F2F2',
    colorContent: '#FFFFFF',
    colorLine: 'rgba(0, 0, 0, 0.08)',
    colorLineSelected: '#CECED2',
    colorUnderlay: '#CECED2',
    colorText: '#000000',
    colorTextSecondary: '#8E8E93',
    colorTextReverse: '#FFF',
    colorLink: '#007AFF',
    colorSelected: '#F2F2F2',
    colorPrimary: '#007AFF',
    colorInfo: '#007AFF',
    colorSuccess: '#90C053',
    colorWarning: '#FF9500',
    colorDanger: '#D83434',
    colorButton: '#FFFFFF',
    fontSizeBig: 18,
    fontSize: 14,
    fontSizeSubline: 12,
    fontSizeSmall: 10,
    lineWidth: StyleSheet.hairlineWidth,
    iconSize: 24,
    buttonHeight: 44,
    padding: 15,
    paddingBig: 20,
    paddingSmall: 8,
    paddingMinimum: 4,
    borderRadius: 4,
    borderRadiusBig: 10,
    borderRadiusSmall: 2,
};

var theme: Theme = THEME_DEFAULT;

/**
 * Get the default theme of components
 */
export function getTheme(): Theme {
    return theme;
}


/**
 * Allows you to change global component settings
 *
 * @param newTheme
 */
export function setTheme(newTheme: Partial<Theme>) {
    theme = {
        ...theme,
        ...(newTheme || {})
    };

    calculateDimensions();
}


/**
 * Permite obter uma cor hexadecimal de 8 digitos (com opacidade).
 *
 * Ex2. colorOpacity('#FF0000', 0.8) => '#FF0000CC' (CC é a opacidade)
 * Ex2. colorOpacity('#FF0000CC', 0.6) => '#FF000099' (99 é a nova opacidade)
 */
function getColorOpacity(hexColor: string, opacity: number): string {
    if (opacity > 1) {
        opacity = 1;
    }
    return (hexColor.substr(0, 7)) + ((Math.floor(255 * (opacity * 100) / 100)).toString(16));
}

/**
 * Efeito de animação genérica usada nos componentes
 *
 * https://easings.net/#easeOutQuint
 * https://developers.google.com/web/fundamentals/design-and-ux/animations/choosing-the-right-easing
 * https://codepen.io/radialglo/post/understanding-the-intuition-of-easing
 */
export const QuinticEaseOut = Easing.bezier(0.23, 1, 0.32, 1);

/**
 * Animação genérica usada nos componentes
 *
 * @param value
 * @param toValue
 * @param callback
 */
export function animateGeneric(
    value: Animated.Value | Animated.ValueXY,
    toValue: number,
    callback?: Animated.EndCallback,
    native?: boolean,
    start?: boolean,
    duration?: number
): Animated.CompositeAnimation {

    const animation = Animated.timing(value, {
        toValue: toValue,
        duration: duration || 250,
        easing: QuinticEaseOut,
        useNativeDriver: !!native
    });

    if (start === undefined || start === true) {
        animation.start(callback);
    }

    return animation;
}

export function animateGenericNative(
    value: Animated.Value | Animated.ValueXY,
    toValue: number,
    callback?: Animated.EndCallback,
    start?: boolean,
    duration?: number
): Animated.CompositeAnimation {
    return animateGeneric(value, toValue, callback, true, start, duration);
}

//----------------------------------------------------------------------------------------
//
// https://medium.com/@elieslama/responsive-design-in-react-native-876ea9cd72a8#.qw70hogp0
//
//----------------------------------------------------------------------------------------


// Precalculate Device Dimensions for better performance
let WIDTH: number,
    HEIGHT: number,
    RATIO_X: number,
    RATIO_Y: number,
    UNIT: number;

// Precalculate Device Dimensions for better performance
calculateDimensions();

let lastCalc = 0;

/**
 * Faz o calculo das dimensões usadas
 */
function calculateDimensions() {
    let now = +new Date;
    if (lastCalc + 10 > now) {
        return;
    }
    lastCalc = now;

    WIDTH = Dimensions.get('window').width;
    HEIGHT = Dimensions.get('window').height;

    // Calculating ratio from iPhone breakpoints
    RATIO_X = WIDTH < 375 ? (WIDTH < 320 ? 0.75 : 0.875) : 1;
    RATIO_Y = HEIGHT < 568 ? (HEIGHT < 480 ? 0.75 : 0.875) : 1;

    // We set our base font size value
    let BASE_UNIT = getTheme().fontSize;

    // We're simulating EM by changing font size according to Ratio
    UNIT = BASE_UNIT * RATIO_X;
}

// We add an em() shortcut function
function em(value: number) {
    return UNIT * value;
}

export const Style = {

    // Permite usar em fora
    em: em,

    /**
     * Obtém parametros genéricos
     */
    common: function () {
        calculateDimensions();
        return {
            WIDTH,
            HEIGHT,
            RATIO_X,
            RATIO_Y,
            UNIT: em(1),
            PADDING: em(1.25),
        }
    },

    /**
     * Estilo genérico para cards
     */
    card: function () {
        calculateDimensions();
        return {
            width: WIDTH - (em(1.25) * 2),
            paddingVertical: em(1.875),
            paddingHorizontal: em(1.25),
        }
    },

    /**
     * Tamanhos para fontes
     */
    fontSize: function () {
        calculateDimensions();
        return {
            P: em(1),
            H1: em(2.25),
            H2: em(1.25),
            SMALL: em(0.875),
            SMALLER: em(0.75),
        };
    },
};
