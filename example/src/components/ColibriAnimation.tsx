import React from 'react';
import {Animated, Easing, Image, StyleProp, StyleSheet, View, ViewStyle,} from 'react-native';
import {getTheme} from "react-native-colibri";


// Tempo total das animações (o próprio loop)
const LOOP_TIME_SECONDS = 20;

export default class ColibriAnimation extends React.PureComponent<any> {

    private animatedValue = new Animated.Value(0);

    private animation?: Animated.CompositeAnimation;

    /**
     * Cria uma interpolação na animation que faz o mesmo movimento em um intervalo regular por minuto
     */
    private interpolateRepeat = (duration: number, step0: any, step1: any): Animated.AnimatedInterpolation => {
        const steps = Math.ceil((LOOP_TIME_SECONDS / 2) / Math.max(duration, 0.001));
        const step = 1 / steps;

        // allow easing - simulate unsig many steps
        let parts = [];
        for (var a = 0; a <= steps; a++) {
            parts.push(a * step);
        }
        const length = parts.length;

        return this.animatedValue.interpolate({
            inputRange: parts,
            outputRange: parts.map((value, index) => {
                return index % 2 == 0
                    ? step0
                    : step1;
            })
        })
    };

    componentDidMount() {
        const HALF_TIME = Math.floor(LOOP_TIME_SECONDS * 1000 / 2);
        this.animation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.animatedValue, {
                    toValue: 1,
                    duration: HALF_TIME,
                    useNativeDriver: true,
                    easing: Easing.linear
                }),
                Animated.timing(this.animatedValue, {
                    toValue: 0,
                    duration: HALF_TIME,
                    useNativeDriver: true,
                    easing: Easing.linear
                })
            ])
        );

        this.animation.start();
    }

    componentWillUnmount() {
        if (this.animation) {
            this.animation.stop();
            this.animation = undefined;
        }
    }

    render() {
        const theme = getTheme();

        const color = 'pink';

        const Triangle = (props: any) => (
            <Animated.View style={[{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 120,
                borderRightWidth: 0,
                borderBottomWidth: 60,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'red',
            }, props.style]}/>
        );

        type TrapezoidProps = {
            base: number;
            top: number;
            height: number;
            colors?: Array<string>;
            x: number;
            y: number;
            style?: StyleProp<ViewStyle>
        }


        const Trapezoid = (props: TrapezoidProps) => {
            const base = props.base || 200;
            const top = props.top || 150;
            const height = props.height || 50;
            const colors: Array<string> = props.colors || ['#D956CA', '#29A3AE', '#C8ACFF'];
            let inverted = base < top;
            const side = (
                inverted
                    ? top - base
                    : base - top
            ) / 2;

            return (
                <React.Fragment>
                    {
                        colors.map((color, index, all) => {
                            let opStart = (1 / all.length) * index;
                            let opEnd = (1 / all.length) * (index + 1);
                            // this.interpolateRepeat(2, '-20deg', '20deg')
                            return (
                                <Animated.View
                                    key={`c_${index}`}
                                    style={[
                                        {
                                            position: 'absolute',
                                            left: props.x,
                                            top: props.y,
                                        },
                                        props.style
                                    ]}
                                >
                                    <Animated.View
                                        style={[
                                            {
                                                width: inverted ? top : base,
                                                height: 0,
                                                borderLeftWidth: side,
                                                borderLeftColor: 'transparent',
                                                borderRightWidth: side,
                                                borderRightColor: 'transparent',
                                                borderStyle: 'solid',
                                                opacity: this.animatedValue.interpolate({
                                                    inputRange: [0, opStart, opEnd, Math.min(1, opEnd * 1.5)],
                                                    outputRange: [0.1, 0.1, 0.9, 0.1],
                                                    extrapolate: 'clamp'
                                                })
                                            },
                                            inverted
                                                ? {
                                                    borderTopWidth: height,
                                                    borderTopColor: color,
                                                } : {
                                                    borderBottomWidth: height,
                                                    borderBottomColor: color,
                                                }
                                        ]}
                                    />
                                </Animated.View>
                            )
                        })
                    }
                </React.Fragment>
            )
        };

        let percent = function (value: number): Function & { value: number } {
            const fn = function (p: number) {
                return p * value
            };
            fn.value = value;
            return fn;
        };

        const width = percent(360);

        const height = percent(208);


        // let rad = angle * Math.PI / 180 transformX(Math.cos(angle) * dx - Math.sin(angle) * dy) transf

        return (
            <View style={{
                width: width.value,
                height: height.value,
                alignSelf: 'center',
                // backgroundColor: 'pink'
            }}>

                {/* head */}
                <Animated.Image
                    source={require('./../assets/colibri/head.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.005),
                            left: width(.06),
                            transform: [
                                {rotate: this.interpolateRepeat(6, '0deg', '-5deg')},
                                {rotateY: this.interpolateRepeat(4, '0deg', '-10deg')},
                                {rotateX: this.interpolateRepeat(8, '-10deg', '0deg')}
                            ]
                        }
                    ]}
                />

                {/* chest */}
                <Animated.Image
                    source={require('./../assets/colibri/chest.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.198),
                            left: width(.3),
                            transform: [
                                {scale: this.interpolateRepeat(0.08, 1, 1.1)},
                            ]
                        }
                    ]}
                />

                {/* back */}
                <Animated.Image
                    source={require('./../assets/colibri/back.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.19),
                            left: width(.3),
                            // transform: [
                            //     {scale: this.interpolateRepeat(0.08, 1.05, 1.0)},
                            // ]
                        }
                    ]}
                />

                {/* wing 1*/}
                <Animated.Image
                    source={require('./../assets/colibri/wing.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.0),
                            left: width(.3),
                            opacity: this.interpolateRepeat(0.04, 0, 1),
                            transform: [
                                {rotate: this.interpolateRepeat(5, '5deg', '-5deg')},
                                {translateY: this.interpolateRepeat(5, width(.02), width(-.02))},
                                {rotateX: this.interpolateRepeat(0.08, '-20deg', '20deg')},
                                // {rotateX: this.interpolateRepeat(2, '-10deg', '40deg')},
                                // {rotateY: this.interpolateRepeat(2, '0deg', '10deg')},
                                // {rotateX: this.interpolateRepeat(2, '10deg', '0deg')}
                            ]
                        }
                    ]}
                />

                {/* tail-1 */}
                <Animated.Image
                    source={require('./../assets/colibri/tail-1.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.295),
                            left: width(.53)
                        }
                    ]}
                />

                {/* tail-2 */}
                <Animated.Image
                    source={require('./../assets/colibri/tail-2.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.295),
                            left: width(.567)
                        }
                    ]}
                />

                {/* tail-3 */}
                <Animated.Image
                    source={require('./../assets/colibri/tail-3.png')}
                    style={[
                        {
                            position: 'absolute',
                            top: width(0.295),
                            left: width(.61),
                            transform: [
                                // {translateY: this.interpolateRepeat(2, width(-.04), width(.04))},
                                // {translateX: this.interpolateRepeat(2, 0, width(-.04))},
                                // {rotate: this.interpolateRepeat(2, '-10deg', '10deg')}
                            ]
                        }
                    ]}
                />

            </View>
        );
    }
}
