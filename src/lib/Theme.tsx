import {DeviceEventEmitter, EmitterSubscription, Platform, StyleProp, StyleSheet, TextStyle} from "react-native";
import React from "react";

type fontWeightReact = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

export type fontWeight = 'thin' | 'light' | 'regular' | 'semibold' | 'bold' ;

const FONT_WEIGHTS = {
    thin: '100',
    light: '300',
    regular: '400',
    semibold: '600',
    bold: '700'
};

/**
 * Font specification
 */
export type FontSpec = {
    size: number;
    lineHeight: number;
    letterSpacing?: number;
    weight: fontWeight;
    family: string;
    style?: StyleProp<TextStyle>;
}

/**
 * Get React Native Text fontWeight from definition
 *
 * @param value
 */
export function fontWeightReact(value?: fontWeight): fontWeightReact {
    if (!value) {
        return FONT_WEIGHTS.regular as any;
    }
    return FONT_WEIGHTS[value] as any;
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
export type Spacing = 'micro' | 'tiny' | 'small' | 'base' | 'large' | 'x-large';

/**
 * Theme definition for space
 */
export type SpacingDef = {
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
export function spacingReact(theme: ThemeProps, value?: Spacing): number | undefined {
    if (!value) {
        return;
    }

    let prop: any = value;
    if (prop === 'x-large') {
        prop = 'xLarge';
    }
    return (theme.spacing as any)[prop];
}

/**
 * Get React Native Text style from FontSpec
 * @param font
 */
export function fontStyle(font: Partial<FontSpec>) {
    let family = font.family;
    if ((family === 'System' || family === 'system') && Platform.OS === 'android') {
        // Roboto workaround -> sans serif
        switch (font.weight) {
            case 'thin':
                family = 'sans-serif-thin';
                break;
            case 'light':
                family = 'sans-serif-light';
                break;
            case 'regular':
                family = 'sans-serif';
                break;
            case 'semibold':
                family = 'sans-serif-medium';
                break;
            case 'bold':
                family = 'sans-serif';
        }
    }

    return {
        fontSize: font.size,
        fontFamily: family,
        lineHeight: font.lineHeight,
        letterSpacing: Platform.select({
            ios: font.letterSpacing,
            default: undefined
        }),
        fontWeight: fontWeightReact(font.weight),
    };
}

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
    colorPrimary: string;
    colorSelected: string;
    colorInfo: string;
    colorSuccess: string;
    colorWarning: string;
    colorDanger: string;
    colorButton: string;
    // Font Specs
    fontTitle1: Partial<FontSpec>;
    fontTitle2: Partial<FontSpec>;
    fontTitle3: Partial<FontSpec>;
    fontLarge: Partial<FontSpec>;
    fontRegular: Partial<FontSpec>;
    fontSmall: Partial<FontSpec>;
    fontCaption: Partial<FontSpec>;
    // Spacing (icon size, padding, margin, borderRadius)
    spacing: Partial<SpacingDef>;
    // OLD FONT SIZE
    lineWidth: number;
}

/**
 * Segue
 *    https://v1.designcode.io/iosdesign-guidelines (quando possível)
 *    https://ivomynttinen.com/blog/ios-design-guidelines
 */
const THEME_DEFAULT: ThemeProps = {
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
    colorPrimary: '#007AFF',
    colorSelected: '#F2F2F2',
    colorInfo: '#007AFF',
    colorSuccess: '#90C053',
    colorWarning: '#FF9500',
    colorDanger: '#D83434',
    colorButton: '#FFFFFF',
    // Font Specs
    fontTitle1: Platform.select({
        android: {
            size: 28,
            lineHeight: 34,
            weight: 'regular',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 28,
            lineHeight: 34,
            letterSpacing: 13,
            weight: 'regular',
            family: 'System'
        }
    }),
    fontTitle2: Platform.select({
        android: {
            size: 22,
            lineHeight: 28,
            weight: 'regular',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 22,
            lineHeight: 28,
            letterSpacing: 16,
            weight: 'regular',
            family: 'System'
        }
    }),
    fontTitle3: Platform.select({
        android: {
            size: 20,
            lineHeight: 25,
            weight: 'regular',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 20,
            lineHeight: 25,
            letterSpacing: 19,
            weight: 'regular',
            family: 'System'
        }
    }),
    fontLarge: Platform.select({
        android: {
            size: 17,
            lineHeight: 22,
            weight: 'semibold',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 17,
            lineHeight: 22,
            letterSpacing: -24,
            weight: 'semibold',
            family: 'System'
        }
    }),
    fontRegular: Platform.select({
        android: {
            size: 17,
            lineHeight: 22,
            weight: 'regular',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 17,
            lineHeight: 22,
            letterSpacing: -24,
            weight: 'regular',
            family: 'System'
        }
    }),
    fontSmall: Platform.select({
        android: {
            size: 14,
            lineHeight: 18,
            weight: 'regular',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 14,
            lineHeight: 18,
            letterSpacing: -16,
            weight: 'regular',
            family: 'System'
        }
    }),
    fontCaption: Platform.select({
        android: {
            size: 12,
            lineHeight: 16,
            weight: 'regular',
            family: 'System',
            style: {
                includeFontPadding: false
            }
        },
        default: {
            size: 12,
            lineHeight: 16,
            letterSpacing: 0,
            weight: 'regular',
            family: 'System'
        }
    }),
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

/**
 * Get the default theme of components
 *
 * @param extra
 */
export function getTheme(extra?: Partial<ThemeProps>): ThemeProps {
    if (extra) {
        return {
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
