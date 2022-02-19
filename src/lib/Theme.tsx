import {
    DeviceEventEmitter,
    Dimensions,
    EmitterSubscription,
    Platform,
    StyleProp,
    StyleSheet,
    TextStyle,
} from 'react-native';
import React from 'react';

// from https://github.com/nirsky/react-native-size-matters
const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

export function scale(theme: ThemeProps, size: number) {
    return shortDimension / theme.guidelineBaseWidth * size;
}

export function scaleVertical(theme: ThemeProps, size: number) {
    return longDimension / theme.guidelineBaseHeight * size;
}

export function scaleModerate(theme: ThemeProps, size: number, factor = 0.5) {
    return size + (scale(theme, size) - size) * factor;
}

export type FontWeightName = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

/**
 * Font specification
 */
export type FontProps = {
    size: number;
    lineHeight: number;
    letterSpacing: number;
    weight: FontWeightName;
    italic?: boolean;
    style?: StyleProp<TextStyle>;
}

/**
 * Spatial units
 *
 * Spatial values allow us to create consistent interfaces and a seamless user experience across all our products. These
 * values contribute to a harmonious, coordinated appearance.
 *
 * micro    = 4
 * tiny     = 8
 * small    = 16
 * base     = 24
 * large    = 48
 * x-large  = 64
 */
export type SpacingName = 'micro' | 'tiny' | 'small' | 'base' | 'large' | 'x-large';

/**
 * Theme definition for space
 */
export type SpacingValues = {
    micro: number;
    tiny: number;
    small: number;
    base: number;
    large: number;
    xLarge: number;
}

/**
 *
 * @param value
 */
export function spacing(theme: ThemeProps, value?: SpacingName): number | undefined {
    if (!value) {
        return;
    }

    let prop: any = value;
    if (prop === 'x-large') {
        prop = 'xLarge';
    }
    return scale(theme, (theme.spacing as any)[prop]);
}

/**
 * Get React Native Text style from FontProps
 * @param font
 */
export function fontStyle(theme: ThemeProps, font: Partial<FontProps>) {
    let family = theme.fontFamily.regular;
    switch (font.weight) {
        case 'thin':
            family = font.italic ? theme.fontFamily.thinItalic : theme.fontFamily.thin;
            break;
        case 'light':
            family = font.italic ? theme.fontFamily.lightItalic : theme.fontFamily.light;
            break;
        case 'regular':
            family = font.italic ? theme.fontFamily.regularItalic : theme.fontFamily.regular;
            break;
        case 'medium':
            family = font.italic ? theme.fontFamily.mediumItalic : theme.fontFamily.medium;
            break;
        case 'bold':
            family = font.italic ? theme.fontFamily.boldItalic : theme.fontFamily.bold;
    }

    return {
        fontFamily: family,
        fontSize: scale(theme, font.size as number),
        lineHeight: scaleVertical(theme, font.lineHeight as number),
        letterSpacing: scale(theme, font.letterSpacing as number),
    };
}

export type ColorComponent = {
    background: string;
    text: string;
    border: string;
}

/**
 * Definições para cores
 *
 * http://contrast-grid.eightshapes.com
 * https://material.io/resources/color/
 * https://pinetools.com/change-color-saturation
 */
export type ColorSystem = ColorComponent & {
    states: {
        active: ColorComponent;
        disabled: ColorComponent;
    }
}

/**
 * Propriedades do Tema
 */
export type ThemeProps = {
    /**
     * Largura padrão das linhas dos elementos visuais
     */
    lineWidth: number;
    /**
     * Cor de texto principal do conteúdo
     */
    colorText: string;
    /**
     * Cor de texto secundádio do conteúdo
     */
    colorTextSecondary: string;
    /**
     * Cor de fundo das telas e dos conteúdos
     */
    colorBackground: string;
    /**
     * Cor de fundo dos painéis
     */
    colorPanel: string;
    /**
     * Cor das linhas separadores dos componentes e painéis
     */
    colorLine: string;
    /**
     * Em alguns elementos, a cor da linha é modificada quando o item está selecionado.
     *
     * Ex. bordas de menus, bordas de TableView
     */
    colorLineSelected: string;
    /**
     * Cor de apresentação quando alguns elementos recebe o foco. Ex. itens selecionáveis de menu
     */
    colorFocus: string;
    /**
     * Permite destacar um elemento que recebe a seleção, como itens de menu ou listas
     */
    colorSelected: string;
    /**
     * Cor base para elementos visuais como botões e inputs
     */
    colorBase: ColorSystem;
    /**
     * Cor para elementos de execução primária, como botões e links
     */
    colorPrimary: ColorSystem;
    /**
     * Cores para elementos informativos
     */
    colorInfo: ColorSystem;
    /**
     * Cores para elementos que representam sucesso ou fluxo seguro
     */
    colorSuccess: ColorSystem;
    /**
     * Cores que destacam ações que requerem atenção do usuário
     */
    colorWarning: ColorSystem;
    /**
     * Cores para elementos que representam ações que podem resultar em perdas de dados.
     */
    colorDanger: ColorSystem;
    // Default guideline sizes are based on standard ~5" screen mobile device
    guidelineBaseWidth: number;
    guidelineBaseHeight: number;
    // Definição da fonte usada no sistema
    fontFamily: {
        thin: string;
        thinItalic: string;
        light: string;
        lightItalic: string;
        regular: string;
        regularItalic: string;
        medium: string;
        mediumItalic: string;
        bold: string;
        boldItalic: string;
    },
    // Especificação das fontes usadas no aplicativo
    fontTitle1: Partial<FontProps>;
    fontTitle2: Partial<FontProps>;
    fontTitle3: Partial<FontProps>;
    fontLarge: Partial<FontProps>;
    fontRegular: Partial<FontProps>;
    fontSmall: Partial<FontProps>;
    fontCaption: Partial<FontProps>;
    // Spacing (icon size, padding, margin, borderRadius)
    spacing: Partial<SpacingValues>;
}

let theme: Partial<ThemeProps> = {};

const THEME_REF_CACHE: Array<any> = [];
const THEME_REF_CACHE_VALUE: Array<any> = [];

/**
 * Get the default theme of components
 *
 * @param merge
 */
export function getTheme(merge?: Partial<ThemeProps>): ThemeProps {
    if (merge && merge !== theme) {
        // avoid processing
        let idx = THEME_REF_CACHE.indexOf(merge);
        if (idx < 0) {
            let newValue = {
                ...theme,
                ...merge,
                fontTitle1: {
                    ...theme.fontTitle1,
                    ...(merge.fontTitle1 || {}),
                },
                fontTitle2: {
                    ...theme.fontTitle2,
                    ...(merge.fontTitle2 || {}),
                },
                fontTitle3: {
                    ...theme.fontTitle3,
                    ...(merge.fontTitle3 || {}),
                },
                fontLarge: {
                    ...theme.fontLarge,
                    ...(merge.fontLarge || {}),
                },
                fontRegular: {
                    ...theme.fontRegular,
                    ...(merge.fontRegular || {}),
                },
                fontSmall: {
                    ...theme.fontSmall,
                    ...(merge.fontSmall || {}),
                },
                fontCaption: {
                    ...theme.fontCaption,
                    ...(merge.fontCaption || {}),
                },
                spacing: {
                    ...theme.spacing,
                    ...(merge.spacing || {}),
                },
            };

            THEME_REF_CACHE.push(merge);
            THEME_REF_CACHE_VALUE.push(newValue);
            idx = THEME_REF_CACHE.length - 1;

            setTimeout(() => {
                let idx = THEME_REF_CACHE.indexOf(merge);
                if (idx >= 0) {
                    THEME_REF_CACHE.splice(idx, 1);
                    THEME_REF_CACHE_VALUE.splice(idx, 1);
                }
            }, 50 * 1000);
        }

        return THEME_REF_CACHE_VALUE[idx];
    }
    return theme as ThemeProps;
}


/**
 * Allows you to change global component settings
 *
 * @param newTheme
 */
export function setTheme(newTheme: Partial<ThemeProps>) {
    theme = getTheme(newTheme);
    DeviceEventEmitter.emit('colibri:changeTheme', theme);
}


/**
 * Segue
 *    https://v1.designcode.io/iosdesign-guidelines (quando possível)
 *    https://ivomynttinen.com/blog/ios-design-guidelines
 */
export const THEME_DEFAULT: ThemeProps = {
    colorBackground: '#FFFFFF',
    colorPanel: '#F5F5F5',
    colorLine: '#E5E5E5',
    colorLineSelected: '#CECED2',
    colorFocus: '#CECED2',
    colorSelected: '#F5F5F5',
    colorText: '#404040',
    colorTextSecondary: '#555555',
    colorBase: {
        background: '#FFFFFF',
        border: '#DDDDDD',
        text: '#404040',
        states: {
            active: {
                background: '#F2F2F2',
                border: '#8E8E93',
                text: '#000000',
            },
            disabled: {
                background: '#F2F2F2',
                border: '#DDDDDD',
                text: '#555555',
            },
        },
    },
    colorPrimary: {
        background: '#007AFF',
        border: '#0071EB',
        text: '#FFFFFF',
        states: {
            active: {
                background: '#008FFF',
                border: '#007AFF',
                text: '#000036',
            },
            disabled: {
                background: '#E6EBF2',
                border: '#C4D0E1',
                text: '#555555',
            },
        },
    },
    colorInfo: {
        background: '#007AFF',
        border: '#0071eb',
        text: '#FFF',
        states: {
            active: {
                background: '#008fff',
                border: '#007AFF',
                text: '#e0f0f6',
            },
            disabled: {
                background: '#e6ebf2',
                border: '#76b7ff',
                text: '#76b7ff',
            },
        },
    },
    colorSuccess: {
        background: '#90C053',
        border: '#689035',
        text: '#FFF',
        states: {
            active: {
                background: '#a3cb70',
                border: '#90C053',
                text: '#404040',
            },
            disabled: {
                background: '#f6faf1',
                border: '#b5d58c',
                text: '#b5d58c',
            },
        },
    },
    colorWarning: {
        background: '#FF9500',
        border: '#eb8a00',
        text: '#FFF',
        states: {
            active: {
                background: '#ffa527',
                border: '#FF9500',
                text: '#FFEFD8',
            },
            disabled: {
                background: '#FFEFD8',
                border: '#ffc676',
                text: '#ffc676',
            },
        },
    },
    colorDanger: {
        background: '#D83434',
        border: '#af2222',
        text: '#FFFFFF',
        states: {
            active: {
                background: '#db4444',
                border: '#D83434',
                text: '#FBE9E9',
            },
            disabled: {
                background: '#FBE9E9',
                border: '#e88686',
                text: '#e88686',
            },
        },
    },
    guidelineBaseWidth: 375,
    guidelineBaseHeight: 667,
    fontFamily: Platform.select({
        ios: {
            thin: 'HelveticaNeue-Thin',
            thinItalic: 'HelveticaNeue-ThinItalic',
            light: 'HelveticaNeue-Light',
            lightItalic: 'HelveticaNeue-LightItalic',
            regular: 'Helvetica Neue',
            regularItalic: 'HelveticaNeue-Italic',
            medium: 'HelveticaNeue-Medium',
            mediumItalic: 'HelveticaNeue-MediumItalic',
            bold: 'HelveticaNeue-Bold',
            boldItalic: 'HelveticaNeue-BoldItalic',
        },
        default: {
            thin: 'Roboto-Thin',
            thinItalic: 'Roboto-ThinItalic',
            light: 'Roboto-Light',
            lightItalic: 'Roboto-LightItalic',
            regular: 'Roboto-Regular',
            regularItalic: 'Roboto-RegularItalic',
            medium: 'Roboto-Medium',
            mediumItalic: 'Roboto-MediumItalic',
            bold: 'Roboto-Bold',
            boldItalic: 'Roboto-BoldItalic',
        },
    }),
    // Font Specs
    fontTitle1: {
        size: 25,
        lineHeight: 31,
        letterSpacing: 0.354004,
        weight: 'regular',
        style: {
            // includeFontPadding: false
        },
    },
    fontTitle2: {
        size: 19,
        lineHeight: 24,
        letterSpacing: -0.49,
        weight: 'regular',
        style: {
            includeFontPadding: false,
        },
    },
    fontTitle3: {
        size: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
        weight: 'light',
        style: {
            includeFontPadding: false,
        },
    },
    fontLarge: {
        size: 14,
        lineHeight: 19,
        letterSpacing: -0.154,
        weight: 'medium',
        style: {
            includeFontPadding: false,
        },
    },
    fontRegular: {
        size: 14,
        lineHeight: 19,
        letterSpacing: -0.154,
        weight: 'regular',
        style: {
            includeFontPadding: false,
        },
    },
    fontSmall: {
        size: 12,
        lineHeight: 16,
        letterSpacing: 0,
        weight: 'light',
        style: {
            includeFontPadding: false,
        },
    },
    fontCaption: {
        size: 11,
        lineHeight: 13,
        letterSpacing: 0.06,
        weight: 'light',
        style: {
            includeFontPadding: false,
        },
    },
    spacing: {
        micro: 4,
        tiny: 8,
        small: 16,
        base: 24,
        large: 48,
        xLarge: 64,
    },
    lineWidth: StyleSheet.hairlineWidth,
};

// Set default theme
setTheme(THEME_DEFAULT);


const ThemeContext = React.createContext<ThemeProps>(theme as ThemeProps);

export type ThemeProviderProps = {
    /**
     * O tema a ser usado neste contexto
     */
    theme?: ThemeProps;
    /**
     * Quando estático, o tema deste contexto nunca é alterado
     */
    static?: boolean;
}

/**
 * Encapsulate your application with ThemeProvider
 */
export class ThemeProvider extends React.PureComponent<ThemeProviderProps, { theme: ThemeProps }> {

    state = {
        theme: this.props.theme || getTheme(),
    };

    private subscription?: EmitterSubscription;

    componentDidMount(): void {
        if (!this.props.static) {
            this.subscription = DeviceEventEmitter.addListener('colibri:changeTheme', (theme) => {
                this.setState({
                    theme: theme,
                });
            });
        }
    }

    componentWillUnmount(): void {
        if (this.subscription) {
            this.subscription.remove();
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default function Theme(props: { theme?: Partial<ThemeProps>, children: (theme: ThemeProps) => React.ReactNode }) {
    const {children, theme} = props;

    return (
        <ThemeContext.Consumer>
            {(theme) => children(theme)}
        </ThemeContext.Consumer>
    );
}
