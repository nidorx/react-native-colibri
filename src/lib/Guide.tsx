import React from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Theme, {getTheme, scale, spacingReact, ThemeProps} from "./Theme";
import {animateGenericNative} from "./Utils";
import SimpleText, {Caption, H1, H2, Small} from "./SimpleText";
import DiscloruseIcon from "./DisclosureIcon";


const MAGENTA = '#ff4aff';
const CYAN = '#4affff';
const GRAY = '#828282';

export type Guides = Array<{
    position: number;
    orientation: 'horizontal' | 'vertical';
    units?: 'percent' | 'point';
    color?: string;
    opacity?: number;
    width?: number;
}>;

export type GuideProps = {
    /**
     * Add guides on screen. Percentual, points or pixel. Ex. v50%, h50%, v10px, v10p
     */
    guides?: Guides;

    gridTinyVertical?: boolean;
    gridTinyHorizontal?: boolean;
    gridSmallVertical?: boolean;
    gridSmallHorizontal?: boolean;
    gridBaseVertical?: boolean;
    gridBaseHorizontal?: boolean;
    gridLargeVertical?: boolean;
    gridLargeHorizontal?: boolean;
    gridExtraLargeVertical?: boolean;
    gridExtraLargeHorizontal?: boolean;
    /**
     * Unit (p
     */
    gridConfig?: {
        units?: 'percent' | 'point';
        every?: number;
        subdivisions?: number;
        color?: string;
    };
    /**
     * Show rules?
     */
    rules?: boolean;
}

type GuideState = {
    align: 'left' | 'center' | 'right';
    alignV: 'top' | 'middle' | 'bottom';
}

/**
 * Add guidelines on screen
 */
export default class Guide extends React.PureComponent<GuideProps, GuideState> {

    state: GuideState = {
        align: 'left',
        alignV: 'top',
    };

    private animatedValue = new Animated.Value(0);

    private visible = true;

    render() {
        return (
            <Theme>
                {() => {

                    const pixelRatio = PixelRatio.get();
                    const {width, height} = Dimensions.get('screen');
                    const theme = getTheme();

                    const tiny = spacingReact(theme, 'tiny') as number;
                    const small = spacingReact(theme, 'small') as number;
                    const base = spacingReact(theme, 'base') as number;
                    const large = spacingReact(theme, 'large') as number;
                    const extra = spacingReact(theme, 'x-large') as number;

                    const guides: Guides = this.props.guides || [
                        // Default guides
                        {
                            position: 50,
                            orientation: 'horizontal',
                            units: 'percent'
                        },
                        {
                            position: 50,
                            orientation: 'vertical',
                            units: 'percent'
                        }
                    ];

                    const addGuides = (
                        max: number,
                        spacing: number,
                        orientation: 'horizontal' | 'vertical',
                        color: string,
                        opacity: number,
                        width?: number
                    ) => {
                        if (orientation === 'vertical') {
                            if (this.state.align === 'left') {
                                for (let a = spacing; a <= max; a += spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                            } else if (this.state.align === 'right') {
                                for (let a = max; a >= 0; a -= spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                            } else {
                                let midle = max / 2;
                                for (let a = midle; a >= 0; a -= spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                                for (let a = midle; a <= max; a += spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                            }
                        } else {
                            if (this.state.alignV === 'top') {
                                for (let a = spacing; a <= max; a += spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                            } else if (this.state.align === 'right') {
                                for (let a = max; a >= 0; a -= spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                            } else {
                                let midle = max / 2;
                                for (let a = midle; a >= 0; a -= spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                                for (let a = midle; a <= max; a += spacing) {
                                    guides.push({
                                        position: a,
                                        orientation: orientation,
                                        units: 'point',
                                        color: color,
                                        opacity: opacity,
                                        width: width
                                    });
                                }
                            }
                        }
                    };

                    if (this.props.gridTinyVertical || this.props.gridTinyVertical === undefined) {
                        addGuides(width, tiny, 'vertical', GRAY, 0.2);
                    }

                    if (this.props.gridTinyHorizontal || this.props.gridTinyHorizontal === undefined) {
                        addGuides(height, tiny, 'horizontal', GRAY, 0.2);
                    }

                    if (this.props.gridSmallVertical) {
                        addGuides(width, small, 'vertical', GRAY, 0.3);
                    }

                    if (this.props.gridSmallHorizontal) {
                        addGuides(height, small, 'horizontal', GRAY, 0.3);
                    }

                    if (this.props.gridBaseVertical || this.props.gridBaseVertical === undefined) {
                        addGuides(width, base, 'vertical', MAGENTA, 0.3);
                    }

                    if (this.props.gridBaseHorizontal || this.props.gridBaseHorizontal === undefined) {
                        addGuides(height, base, 'horizontal', MAGENTA, 0.3);
                    }

                    if (this.props.gridLargeVertical) {
                        addGuides(width, large, 'vertical', GRAY, 0.3);
                    }

                    if (this.props.gridLargeHorizontal) {
                        addGuides(height, large, 'horizontal', GRAY, 0.3);
                    }

                    if (this.props.gridExtraLargeHorizontal) {
                        addGuides(width, extra, 'vertical', GRAY, 0.3, 1);
                    }

                    if (this.props.gridExtraLargeHorizontal) {
                        addGuides(height, extra, 'horizontal', GRAY, 0.3, 1);
                    }

                    return (
                        <Animated.View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    opacity: this.animatedValue
                                }
                            ]}
                            pointerEvents={'box-none'}
                        >
                            {
                                guides.map((guide, index) => {
                                    return (
                                        <View
                                            key={`guide_${index}`}
                                            style={
                                                [
                                                    {
                                                        position: 'absolute',
                                                        opacity: guide.opacity || 1,
                                                        borderColor: guide.color || CYAN
                                                    },
                                                    guide.orientation === 'horizontal'
                                                        ? {
                                                            left: 0,
                                                            right: 0,
                                                            top: guide.units === 'point'
                                                                ? guide.position :
                                                                `${guide.position}%`,
                                                            borderTopWidth: guide.width || StyleSheet.hairlineWidth,
                                                            transform: [
                                                                {translateY: -((guide.width || 1) / 2)}
                                                            ]
                                                        }
                                                        : {
                                                            top: 0,
                                                            bottom: 0,
                                                            left: guide.units === 'point'
                                                                ? guide.position :
                                                                `${guide.position}%`,
                                                            borderLeftWidth: guide.width || StyleSheet.hairlineWidth,
                                                            transform: [
                                                                {translateX: -((guide.width || 1) / 2)}
                                                            ]
                                                        }
                                                ]
                                            }
                                        />
                                    )
                                })
                            }

                            <TouchableOpacity
                                onPress={event => {
                                    if (this.visible) {
                                        this.setState({
                                            align: this.state.align === 'left'
                                                ? 'center'
                                                : this.state.align === 'center' ? 'right' : 'left'
                                        });
                                    }
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: small * 3 + large + extra,
                                    left: -large / 3,
                                    height: large,
                                    width: large,
                                    borderRadius: large,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: CYAN,
                                    opacity: 0.3
                                }}
                            >
                                <DiscloruseIcon
                                    direction={this.state.align === 'left' ? 'right' : this.state.align === 'center' ? 'up' : 'left'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={event => {
                                    if (this.visible) {
                                        animateGenericNative(this.animatedValue, 0);
                                    } else {
                                        animateGenericNative(this.animatedValue, 1);
                                    }

                                    this.visible = !this.visible;
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: small * 2 + large,
                                    left: -extra / 2,
                                    height: extra,
                                    width: extra,
                                    borderRadius: extra,
                                    backgroundColor: MAGENTA,
                                    opacity: 0.2
                                }}
                            />


                            <TouchableOpacity
                                onPress={event => {
                                    if (this.visible) {
                                        this.setState({
                                            alignV: this.state.alignV === 'top'
                                                ? 'middle'
                                                : this.state.alignV === 'middle' ? 'bottom' : 'top'
                                        });
                                    }
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: small,
                                    left: -large / 3,
                                    height: large,
                                    width: large,
                                    borderRadius: large,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: CYAN,
                                    opacity: 0.3
                                }}
                            >
                                <DiscloruseIcon
                                    direction={this.state.alignV === 'top' ? 'down' : this.state.alignV === 'middle' ? 'right' : 'up'}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                    )
                }}
            </Theme>
        )
    }
}
