import React from 'react';
import {Animated, Dimensions, ImageBackground, StyleSheet, View,} from 'react-native';
import {LayoutEvent, NavigationScreenProp} from 'react-navigation';
import {EmptyState, getTheme, SimpleText, TableView, TableViewProps} from "rn-components-ui";

const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const randomBetweenInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const BUBBLES_TEXTURES = [
    require('../assets/bubble-1.png'),
    require('../assets/bubble-2.png'),
    require('../assets/bubble-3.png')
];

const CIRCLES_TEXTURES = [
    require('../assets/circle-1.png'),
    require('../assets/circle-2.png'),
    require('../assets/circle-3.png')
];

const PARTICLES_TEXTURES: Array<any> = [];

for (var a = 0; a < 100; a++) {
    if (a % 15 == 0) {
        PARTICLES_TEXTURES.push(BUBBLES_TEXTURES[a % BUBBLES_TEXTURES.length]);
    } else {
        PARTICLES_TEXTURES.push(CIRCLES_TEXTURES[a % CIRCLES_TEXTURES.length]);
    }
}

const PARTICLES_COLORS = [
    '#FFC96F',
    '#C8ACFF',
    '#AE367E',
    '#7198FF',
    '#5F30C2',
    '#FFC96F',
    '#E9F097',
    '#29A3AE',
    '#D956CA'
];

// Número máximo de particulas vivas
const MAX_PARTICLES = 20;

// Duração da animação
const ANIM_DURATION = 15 * 1000;

export type ParticlesProps = {
    max?: number;
    duration?: number;
    height?: number;
}

type ParticlesState = {
    height: number;
    width: number;
    particles: Array<JSX.Element>;
}

/**
 * Efeitos de partículas para o menu da aplicação
 */
export default class Particles extends React.PureComponent<ParticlesProps, ParticlesState> {

    state = {
        height: 10,
        width: 10,
        particles: []
    };

    private sequence = 0;

    private stop: boolean = false;

    private allParticles: Array<any> = [];

    private animations: Array<Animated.CompositeAnimation> = [];

    private addParticles = () => {
        if (this.stop) {
            return;
        }

        let now = +new Date();

        // Remove da listagem as particulas mortas
        this.allParticles = this.allParticles.filter(value => {
            return value[1] > now;
        });

        // Mantém as particulas vivas
        let particles: Array<JSX.Element> = this.allParticles.map(value => {
            return value[0];
        });

        const max = this.props.max || MAX_PARTICLES;
        const duration = this.props.duration || ANIM_DURATION;
        const height = this.props.height || this.state.height;

        // Substitui particulas mortas
        if (particles.length < max) {
            let diff = max - particles.length;
            let animationValue = new Animated.Value(0);

            let minTTL = Number.MAX_SAFE_INTEGER;

            for (let a = 0; a < diff; a++) {

                const seq = this.sequence++;

                // Atraso no inicio da animacao
                let delay = randomBetween(0.0001, 0.01);

                let maxEnergy = delay + randomBetween(0.3, 0.6);

                // Tempo de vida
                let ttl = randomBetween(maxEnergy * 1.1, 1 - delay);

                // Tamanho inicial
                let minSize = randomBetween(0.5, 1);

                // Tamanho final
                let maxSize = randomBetween(minSize, 2);

                let txStart = Math.floor(randomBetween(-(this.state.width / 2), this.state.width / 2));
                let txEnd = Math.floor(randomBetween(-(this.state.width / 2), this.state.width / 2));

                let tyStart = Math.floor(randomBetween(-(this.state.width / 4), height / 2));
                let tyEnd = Math.floor(randomBetween(-(this.state.width / 4), height / 2));

                let texture = PARTICLES_TEXTURES[seq % PARTICLES_TEXTURES.length];
                let color = PARTICLES_COLORS[seq % PARTICLES_COLORS.length];

                const isBubble = BUBBLES_TEXTURES.indexOf(texture) >= 0;

                let size = randomBetweenInt(this.state.width * 0.4, this.state.width * 0.7);

                let particle = (
                    <Animated.Image
                        key={`p-${seq}`}
                        source={texture}
                        pointerEvents={'none'}
                        style={{
                            // borderWidth: 1,
                            // borderColor: '#000',
                            position: 'absolute',
                            width: size,
                            height: size,
                            top: 0,
                            left: 0,
                            tintColor: isBubble ? undefined : color,
                            opacity: animationValue.interpolate({
                                inputRange: [0, delay, maxEnergy, ttl],
                                outputRange: [0, 0, randomBetween(isBubble ? 0.3 : 0.6, isBubble ? 0.7 : 0.9), 0]
                            }),
                            transform: [
                                {
                                    scale: animationValue.interpolate({
                                        inputRange: [delay, ttl],
                                        outputRange: [minSize, maxSize],
                                        extrapolate: 'clamp'
                                    })
                                },
                                {
                                    translateY: animationValue.interpolate({
                                        inputRange: [delay, ttl],
                                        outputRange: [tyStart, tyEnd],
                                        extrapolate: 'clamp'
                                    })
                                },
                                {
                                    translateX: animationValue.interpolate({
                                        inputRange: [delay, ttl],
                                        outputRange: [txStart, txEnd],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]
                        }}
                    />
                );


                // Quando a particula será removida
                let deadts = now + (ttl * duration);

                this.allParticles.push([particle, deadts]);

                // Adiciaona na lista das novas particulas a renderizar
                particles.push(particle);

                minTTL = Math.min(minTTL, ttl);
            }

            particles.sort((a: JSX.Element, b: JSX.Element) => {
                return (a.key as string).localeCompare(b.key as string);
            });

            // Agenda proxima execução do script
            setTimeout(this.addParticles, minTTL * duration);

            this.setState({
                particles: particles
            }, () => {

                let animation = Animated.timing(animationValue, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true
                });

                this.animations.push(animation);

                animation.start(result => {
                    let idx = this.animations.indexOf(animation);
                    if (idx >= 0) {
                        this.animations.splice(idx, 1);
                    }

                    this.addParticles();
                });
            });
        }
    };

    private onLayout = (event: LayoutEvent) => {
        this.setState({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
        }, () => {
            this.addParticles();
        })
    };

    componentWillUnmount() {
        this.stop = true;
        this.animations.forEach(value => {
            value.stop();
        })
    }

    render() {
        return (
            <View
                style={[
                    {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: this.props.height ? undefined : 0,
                        height: this.props.height,
                        overflow: 'hidden'
                    }
                ]}
                pointerEvents={'none'}
                onLayout={this.onLayout}
            >
                {
                    this.state.particles.map(value => {
                        return value;
                    })
                }
            </View>
        );
    }
}
