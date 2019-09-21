import React from 'react';
import {Animated, Easing, StyleProp, View, ViewStyle,} from 'react-native';
import Theme, {ColorSystem, FontProps, getTheme, scale, SpacingName, spacing, ThemeProps} from "./Theme";
import {animateGenericNative} from "./Utils";


export type DiscloruseIconProps = {
    theme?: Partial<ThemeProps>;
    direction?: 'up' | 'right' | 'down' | 'left';
    /**
     * Changes the size of the icon
     */
    size?: 'small' | 'regular' | 'medium' | 'large';

    color?: string;
    /**
     * Add custom style to button
     */
    style?: StyleProp<ViewStyle> | any;

}

const ROTATIONS = {
    up: {
        left: -1,
        up: 0,
        right: 1,
        down: 2
    },
    right: {
        up: -1,
        right: 0,
        down: 1,
        left: 2
    },
    down: {
        up: -2,
        right: -1,
        down: 0,
        left: 1
    },
    left: {
        down: -1,
        left: 0,
        up: 1,
        right: 2
    }
};

/**
 * Ícone chevron
 *
 * @constructor
 */
export default class DiscloruseIcon extends React.PureComponent<DiscloruseIconProps> {

    private animatedValue = new Animated.Value(0);

    private actualRotation = -90;

    public size: number = 0;

    private calcNewRotation = (prevDirection: 'up' | 'right' | 'down' | 'left') => {
        let nextDirection = this.props.direction || 'right';
        this.actualRotation += ROTATIONS[prevDirection][nextDirection] * 90;
    };

    componentDidMount(): void {
        this.calcNewRotation('up');
        this.animatedValue.setValue(this.actualRotation);
    }

    componentDidUpdate(prevProps: Readonly<DiscloruseIconProps>): void {
        if (this.props.direction !== prevProps.direction) {
            this.calcNewRotation(prevProps.direction || 'right');
            animateGenericNative(this.animatedValue, this.actualRotation);
        }
    }

    render() {
        const render = () => {
            const theme = getTheme(this.props.theme);

            let font: Partial<FontProps>;

            switch (this.props.size || 'regular') {
                case 'large':
                    font = theme.fontTitle3;
                    break;
                case 'medium':
                    font = theme.fontLarge;
                    break;
                case 'regular':
                    font = theme.fontRegular;
                    break;
                default:
                    font = theme.fontCaption;
            }

            // const size = 8;
            // d=V2a
            // a = V2(d/2)
            // Calcula a largura a partir da diagonal
            const height = font.size as number;
            const size = Math.sqrt(2) * (height / 2);

            this.size = size;


            return (
                <Animated.View
                    style={[
                        {
                            position: 'relative',
                            alignContent: 'flex-end',
                            justifyContent: 'center',
                            width: height,
                            height: height,
                            marginLeft: spacing(theme, 'tiny'),
                            transform: [
                                {
                                    rotate: this.animatedValue.interpolate({
                                        inputRange: [-180, 180],
                                        outputRange: ['-180deg', '180deg']
                                    })
                                },
                            ],
                            backgrondColor: 'cyan'
                        },
                        this.props.style
                    ]}
                >
                    <View
                        style={{
                            position: 'relative',
                            width: size,
                            height: size,
                            borderTopWidth: 1,
                            borderRightWidth: 1,
                            borderColor: this.props.color || theme.colorBase.text,
                            transform: [
                                {
                                    rotate: '45deg',
                                },
                            ],
                        }}
                    />
                </Animated.View>
            )
        };
        return (<Theme>{render}</Theme>);
    }
}
