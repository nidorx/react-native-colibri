import React from 'react';
import {Animated, Dimensions, ImageBackground, StyleSheet, View,} from 'react-native';
import {LayoutEvent} from 'react-navigation';
import {EmptyState, getTheme, SimpleText, TableView, TableViewProps} from "rn-components-ui";

export type GradientHeaderProps = TableViewProps & {
    title: string;
    description: string | JSX.Element;
}

type GradientHeaderState = {
    headerHeight: number;
    particles: Array<JSX.Element>;
}

const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const randomBetweenInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const width = Dimensions.get('window').width;

const PARTICLES_TEXTURES = [
    require('../assets/particle-1.png'),
    require('../assets/particle-2.png'),
    require('../assets/particle-4.png'),
];

const PARTICLES_COLORS = [
    '#C8ACFF',
    '#7198FF',
    '#5F30C2',
    '#29A3AE',
    '#FFC96F',
    '#AE367E',
    '#E9F097',
    '#D956CA'
];

let PARTICLE_SEQ = 0;

// Número máximo de particulas vivas
const MAX_PARTICLES = 20;

// Duração da animação
const ANIM_DURATION = 10 * 1000;


export default class GradientHeader extends React.PureComponent<GradientHeaderProps, GradientHeaderState> {

    state = {
        headerHeight: 10,
        particles: []
    };

    private stop: boolean = false;

    private allParticles: Array<any> = [];

    private animations: Array<Animated.CompositeAnimation> = [];

    private animatedScrollValue = new Animated.Value(0);

    private onLayoutHeader = (event: LayoutEvent) => {
        this.setState({
            headerHeight: event.nativeEvent.layout.height
        })
    };

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

        // Substitui particulas mortas
        if (particles.length < MAX_PARTICLES) {
            let diff = MAX_PARTICLES - particles.length;
            let animationValue = new Animated.Value(0);

            let minTTL = Number.MAX_SAFE_INTEGER;

            for (let a = 0; a < diff; a++) {

                // Atraso no inicio da animacao
                let delay = randomBetween(0.0001, 0.01);

                let maxEnergy = delay + randomBetween(0.3, 0.6);

                // Tempo de vida
                let ttl = randomBetween(maxEnergy * 1.1, 1 - delay);

                // Tamanho inicial
                let minSize = randomBetween(0.5, 1);

                // Tamanho final
                let maxSize = randomBetween(minSize, 2);

                let txStart = Math.floor(randomBetween(-(width / 2), width / 2));
                let txEnd = Math.floor(randomBetween(-(width / 2), width / 2));

                let tyStart = Math.floor(randomBetween(-(width / 4), this.state.headerHeight / 2));
                let tyEnd = Math.floor(randomBetween(-(width / 4), this.state.headerHeight / 2));

                let texture = PARTICLES_TEXTURES[randomBetweenInt(0, PARTICLES_TEXTURES.length - 1)];
                let color = PARTICLES_COLORS[randomBetweenInt(0, PARTICLES_COLORS.length - 1)];

                let size = randomBetweenInt(width * 0.4, width * 0.7);

                let particle = (
                    <Animated.Image
                        key={`p-${PARTICLE_SEQ++}`}
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
                            tintColor: color,
                            opacity: animationValue.interpolate({
                                inputRange: [0, delay, maxEnergy, ttl],
                                outputRange: [0, 0, randomBetween(0.3, 0.8), 0]
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
                let deadts = now + (ttl * ANIM_DURATION);

                this.allParticles.push([particle, deadts]);

                // Adiciaona na lista das novas particulas a renderizar
                particles.push(particle);

                minTTL = Math.min(minTTL, ttl);
            }

            particles.sort((a: JSX.Element, b: JSX.Element) => {
                return (a.key as string).localeCompare(b.key as string);
            });

            // Agenda proxima execução do script
            setTimeout(this.addParticles, minTTL * ANIM_DURATION);

            this.setState({
                particles: particles
            }, () => {

                let animation = Animated.timing(animationValue, {
                    toValue: 1,
                    duration: ANIM_DURATION,
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

    componentDidMount(): void {
        this.addParticles();
    }

    componentWillUnmount() {
        this.stop = true;
        this.animations.forEach(value => {
            value.stop();
        })
    }

    render() {
        const theme = getTheme();

        const headerOpacityColor = this.animatedScrollValue.interpolate({
            inputRange: [0, this.state.headerHeight * 0.7],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <ImageBackground
                style={[StyleSheet.absoluteFill, {alignSelf: 'flex-start'}]}
                source={require('./../assets/gradient.png')}
            >
                <TableView
                    {...this.props}
                    header={(
                        <Animated.View style={[{opacity: headerOpacityColor}]} onLayout={this.onLayoutHeader}>
                            <View style={[StyleSheet.absoluteFill]} pointerEvents={'none'}>
                                {
                                    this.state.particles.map(value => {
                                        return value;
                                    })
                                }
                            </View>
                            <EmptyState
                                title={this.props.title}
                                titleProps={{color: '#FFF'}}

                                description={
                                    (typeof this.props.description === 'string')
                                        ? (
                                            <SimpleText
                                                color={'#FFF'}
                                                text={this.props.description}
                                            />
                                        )
                                        : this.props.description
                                }
                            />
                        </Animated.View>
                    )}
                    transparent={true}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.animatedScrollValue}}}])}
                />
            </ImageBackground>
        );
    }
}
