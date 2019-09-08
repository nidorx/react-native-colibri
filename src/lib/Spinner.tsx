import React from 'react';
import {Animated, Easing, View,} from 'react-native';
import Theme, {getTheme, scale, ThemeProps} from "./Theme";

export type TitleProps = {
    theme?: Partial<ThemeProps>;
    color?: string;
    opacity?: number;
    size?: number;
}

export default class Spinner extends React.PureComponent<TitleProps> {

    private animatedValue = new Animated.Value(0);

    private animation?: Animated.CompositeAnimation;

    componentDidMount() {
        this.animation = Animated.loop(
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.linear
            })
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
        return (
            <Theme>
                {() => {
                    const theme = getTheme(this.props.theme);
                    const size = this.props.size || scale(theme, theme.fontRegular.lineHeight as number);
                    return (
                        <View>
                            <Animated.Image
                                source={require('../assets/spinner.png')}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: this.props.color || '#000',
                                    opacity: this.props.opacity || 0.5,
                                    transform: [
                                        {
                                            rotate: this.animatedValue.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['-180deg', '180deg']
                                            })
                                        }
                                    ]
                                }}
                            />
                        </View>
                    )
                }}
            </Theme>
        )
    }
}
