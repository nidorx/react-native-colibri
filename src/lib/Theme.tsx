import {
    DeviceEventEmitter,
    Dimensions,
    EmitterSubscription,
    Platform,
    StyleProp,
    StyleSheet,
    TextStyle
} from "react-native";
import React from "react";

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

export type FontWeightName = 'thin' | 'light' | 'regular' | 'medium' | 'bold' ;

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
        letterSpacing: scale(theme, font.letterSpacing as number)
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
    colorText: string;
    colorTextSecondary: string;
    colorTextReverse: string;
    colorContent: string;
    colorSkeleton: string;
    colorBackground: string;
    colorLink: string;
    colorUnderlay: string;
    colorLine: string;
    colorLineSelected: string;
    colorBase: ColorSystem;
    colorPrimary: ColorSystem;
    colorInfo: ColorSystem;
    colorSuccess: ColorSystem;
    colorWarning: ColorSystem;
    colorDanger: ColorSystem;
    colorSelected: string;
    colorButton: string;
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
    // OLD FONT SIZE
    lineWidth: number;
}

/**
 * Segue
 *    https://v1.designcode.io/iosdesign-guidelines (quando possível)
 *    https://ivomynttinen.com/blog/ios-design-guidelines
 */
export const THEME_DEFAULT: ThemeProps = {
    colorSkeleton: '#D2D2D2',
    colorBackground: '#F2F2F2',
    colorContent: '#FFFFFF',
    colorLine: 'rgba(0, 0, 0, 0.08)',
    colorLineSelected: '#CECED2',
    colorUnderlay: '#CECED2',
    colorText: '#404040',
    colorTextSecondary: '#8E8E93',
    colorTextReverse: '#FFF',
    colorLink: '#007AFF',
    colorSelected: '#F2F2F2',
    colorBase: {
        background: '#FFFFFF',
        text: '#404040',
        border: '#DDDDDD',
        states: {
            active: {
                background: '#F2F2F2',
                text: '#000000',
                border: '#8E8E93',
            },
            disabled: {
                background: '#F2F2F2',
                text: '#8E8E93',
                border: '#DDDDDD',
            }
        }
    },
    colorPrimary: {
        background: '#007AFF',
        text: '#FFF',
        border: '#0071eb',
        states: {
            active: {
                background: '#008fff',
                text: '#e0f0f6',
                border: '#007AFF',
            },
            disabled: {
                background: '#e6ebf2',
                text: '#c4d0e1',
                border: '#c4d0e1',
            }
        }
    },
    colorInfo: {
        background: '#007AFF',
        text: '#FFF',
        border: '#0071eb',
        states: {
            active: {
                background: '#008fff',
                text: '#e0f0f6',
                border: '#007AFF',
            },
            disabled: {
                background: '#e6ebf2',
                text: '#76b7ff',
                border: '#76b7ff',
            }
        }
    },
    colorSuccess: {
        background: '#90C053',
        text: '#FFF',
        border: '#689035',
        states: {
            active: {
                background: '#a3cb70',
                text: '#404040',
                border: '#90C053',
            },
            disabled: {
                background: '#f6faf1',
                text: '#b5d58c',
                border: '#b5d58c',
            }
        }
    },
    colorWarning: {
        background: '#FF9500',
        text: '#FFF',
        border: '#eb8a00',
        states: {
            active: {
                background: '#ffa527',
                text: '#FFEFD8',
                border: '#FF9500',
            },
            disabled: {
                background: '#FFEFD8',
                text: '#ffc676',
                border: '#ffc676',
            }
        }
    },
    colorDanger: {
        background: '#D83434',
        text: '#FFFFFF',
        border: '#af2222',
        states: {
            active: {
                background: '#db4444',
                text: '#FBE9E9',
                border: '#D83434',
            },
            disabled: {
                background: '#FBE9E9',
                text: '#e88686',
                border: '#e88686',
            }
        }
    },
    colorButton: '#FFFFFF',
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
        }
    }),
    // Font Specs
    fontTitle1: {
        size: 25,
        lineHeight: 31,
        letterSpacing: 0.354004,
        weight: 'regular',
        style: {
            // includeFontPadding: false
        }
    },
    fontTitle2: {
        size: 19,
        lineHeight: 24,
        letterSpacing: -0.49,
        weight: 'regular',
        style: {
            includeFontPadding: false
        }
    },
    fontTitle3: {
        size: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
        weight: 'light',
        style: {
            includeFontPadding: false
        }
    },
    fontLarge: {
        size: 14,
        lineHeight: 19,
        letterSpacing: -0.154,
        weight: 'medium',
        style: {
            includeFontPadding: false
        }
    },
    fontRegular: {
        size: 14,
        lineHeight: 19,
        letterSpacing: -0.154,
        weight: 'regular',
        style: {
            includeFontPadding: false
        }
    },
    fontSmall: {
        size: 12,
        lineHeight: 16,
        letterSpacing: 0,
        weight: 'light',
        style: {
            includeFontPadding: false
        }
    },
    fontCaption: {
        size: 11,
        lineHeight: 13,
        letterSpacing: 0.06,
        weight: 'light',
        style: {
            includeFontPadding: false
        }
    },
    spacing: {
        micro: 4,
        tiny: 8,
        small: 16,
        base: 24,
        large: 48,
        xLarge: 64
    },
    lineWidth: StyleSheet.hairlineWidth
};

let theme: ThemeProps = THEME_DEFAULT;

const THEME_REF_CACHE: Array<any> = [];
const THEME_REF_CACHE_VALUE: Array<any> = [];

/**
 * Get the default theme of components
 *
 * @param extra
 */
export function getTheme(extra?: Partial<ThemeProps>): ThemeProps {
    if (extra && extra !== theme) {
        // avoid processing
        let idx = THEME_REF_CACHE.indexOf(extra);
        if (idx < 0) {
            let newValue = {
                ...theme,
                ...extra,
                fontTitle1: {
                    ...theme.fontTitle1,
                    ...(extra.fontTitle1 || {}),
                },
                fontTitle2: {
                    ...theme.fontTitle2,
                    ...(extra.fontTitle2 || {}),
                },
                fontTitle3: {
                    ...theme.fontTitle3,
                    ...(extra.fontTitle3 || {}),
                },
                fontLarge: {
                    ...theme.fontLarge,
                    ...(extra.fontLarge || {}),
                },
                fontRegular: {
                    ...theme.fontRegular,
                    ...(extra.fontRegular || {}),
                },
                fontSmall: {
                    ...theme.fontSmall,
                    ...(extra.fontSmall || {}),
                },
                fontCaption: {
                    ...theme.fontCaption,
                    ...(extra.fontCaption || {}),
                },
                spacing: {
                    ...theme.spacing,
                    ...(extra.spacing || {}),
                }
            };

            THEME_REF_CACHE.push(extra);
            THEME_REF_CACHE_VALUE.push(newValue);
            idx = THEME_REF_CACHE.length - 1;

            setTimeout(() => {
                let idx = THEME_REF_CACHE.indexOf(extra);
                if (idx >= 0) {
                    THEME_REF_CACHE.splice(idx, 1);
                    THEME_REF_CACHE_VALUE.splice(idx, 1);
                }
            }, 5 * 60 * 1000);
        }

        return THEME_REF_CACHE_VALUE[idx];
    }
    return theme;
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

const ThemeContext = React.createContext<ThemeProps>(theme);

/**
 * Encapsulate your application with ThemeProvider
 */
export class ThemeProvider extends React.PureComponent<any, { theme: ThemeProps }> {

    state = {
        theme: getTheme()
    };

    private subscription?: EmitterSubscription;

    componentDidMount(): void {
        this.subscription = DeviceEventEmitter.addListener('colibri:changeTheme', (theme) => {
            this.setState({
                theme: theme
            })
        })
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

/**
 * Theme consumer
 */
const Theme = ThemeContext.Consumer;

/**
 *
 */
export default Theme;
