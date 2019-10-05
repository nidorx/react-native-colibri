import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageProps,
    LayoutChangeEvent,
    TouchableHighlight,
    View, ViewStyle
} from "react-native";
import {animateGenericNative} from "./Utils";
import Theme, {ColorSystem, fontStyle, spacing} from "./Theme";
import SimpleText from "./SimpleText";

const WIDTH = Dimensions.get('screen').width;

const ICONS = {
    'info': require('./../assets/info.png'),
    'success': require('./../assets/success.png'),
    'warning': require('./../assets/warning.png'),
    'danger': require('./../assets/danger.png'),
};

export type Message = {
    /**
     * Determines the type of message.
     */
    type: 'success' | 'info' | 'warning' | 'danger';
    /**
     * Enter the main title of the message
     */
    title: string;
    /**
     * The description of the message being displayed
     */
    description?: string;
    /**
     * Lets you replace the message icon
     */
    icon?: ImageProps;
    /**
     * Message lifetime. By default 5 seconds.
     *
     * Enter a value less than 0 (Ex. -1) for the message to be active until the user closes it.
     */
    duration?: number;
    /**
     * Allows you to create an immortal message.
     *
     * An immortal message can only be closed programmatically from the callback function obtained with the Notification.show method.
     */
    immortal?: boolean;

    /**
     * Executed when message was closed
     */
    onClose?: () => void;
    [key: string]: any;
}

type NotificationProps = {
    style?: ViewStyle;
}

type MessageState = {
    id: number;
    state: 'alive' | 'dead';
    height: number;
    message: Message;
    animation: Animated.Value;
    close: () => void;
    closeable: boolean;
};

type NotificationState = {
    extraData: number;
    messages: Array<MessageState>;
}

let SEQUENCE = 1;

const INSTANCES: Notification[] = [];

/**
 * Shared states between instances
 */
let SHARED_STATE: NotificationState = {
    extraData: 0,
    messages: []
};

const setSharedState = (fn: ((prevState: Readonly<NotificationState>) => any), callback?: () => void) => {
    const newState = fn(SHARED_STATE);
    if (newState == null) {
        return;
    }

    SHARED_STATE = {...SHARED_STATE, ...newState};

    let count = 0;
    INSTANCES.forEach(instance => {
        count++;
        instance.setState.call(instance, {...SHARED_STATE} as any, () => {
            count--;
            if (count === 0 && callback) {
                callback();
            }
        });
    });
};

/**
 * Notifications give the user immediate actionable information relevant to a task or an error.
 */
export default class Notification extends React.PureComponent<NotificationProps, NotificationState> {

    static show = (message: Message): () => void => {
        if (!message.duration) {
            message.duration = 5000;
        }

        const item: MessageState = {
            id: SEQUENCE++,
            state: 'alive',
            height: 0,
            message: message,
            animation: new Animated.Value(0),
            closeable: message.duration < 0 && message.immortal !== true,
            close: () => {
                animateGenericNative(item.animation, 0, () => {
                    setSharedState((prevState) => {
                        const messages = prevState.messages.filter(value => {
                            return value.id !== item.id;
                        });
                        return {
                            messages: messages
                        }
                    }, message.onClose);
                })
            }
        };

        setSharedState((prevState) => {
            const messages = prevState.messages.concat([]);
            messages.push(item);
            return {
                messages: messages
            }
        }, () => {
            let duration = message.duration as number;
            if (duration >= 0 && message.immortal !== true) {
                setTimeout(item.close, message.duration);
            }
        });

        return item.close;
    };

    state: NotificationState = {
        ...SHARED_STATE
    };

    componentDidMount() {
        INSTANCES.push(this);
    }

    componentWillUnmount() {
        const idx = INSTANCES.indexOf(this);
        if (idx >= 0) {
            INSTANCES.splice(idx, 1);
        }
    }

    render() {
        let animationY: any = 0;

        return (
            <Theme>
                {(theme) => {

                    const tiny = spacing(theme, 'tiny') as number;
                    const small = spacing(theme, 'small') as number;
                    const base = spacing(theme, 'base') as number;

                    const titleStyle = fontStyle(theme, theme.fontRegular);

                    return (
                        <Animated.View
                            style={[
                                {
                                    zIndex: 100,
                                    width: WIDTH,
                                    position: 'absolute',
                                    top: 0
                                },
                                this.props.style
                            ]}
                        >
                            {this.props.children}

                            {this.state.messages.map((item, index, all) => {
                                if (animationY === 0) {
                                    animationY = item.animation.interpolate({
                                        inputRange: [0, item.height],
                                        outputRange: [-item.height, 0]
                                    });
                                } else {
                                    animationY = Animated.add(animationY, item.animation.interpolate({
                                        inputRange: [0, item.height],
                                        outputRange: [-item.height, 0]
                                    }));
                                }

                                let color: ColorSystem;
                                switch (item.message.type) {
                                    case 'info':
                                        color = theme.colorInfo;
                                        break;
                                    case 'warning':
                                        color = theme.colorWarning;
                                        break;
                                    case 'danger':
                                        color = theme.colorDanger;
                                        break;
                                    case 'success':
                                    default:
                                        color = theme.colorSuccess;
                                        break;
                                }

                                const content = (
                                    <View
                                        style={{
                                            padding: small,
                                            paddingLeft: base,
                                            borderBottomWidth: 1,
                                            borderColor: color.states.active.border,
                                            backgroundColor: color.states.active.background
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row'
                                            }}
                                        >
                                            {
                                                item.message.icon
                                                    ? (
                                                        <Image
                                                            {...item.message.icon}
                                                            style={[
                                                                {
                                                                    width: titleStyle.lineHeight,
                                                                    height: titleStyle.lineHeight
                                                                },
                                                                item.message.icon.style
                                                            ]}
                                                        />
                                                    )
                                                    : (
                                                        <Image
                                                            source={ICONS[item.message.type]}
                                                            style={{
                                                                tintColor: color.states.active.text,
                                                                width: titleStyle.lineHeight,
                                                                height: titleStyle.lineHeight
                                                            }}
                                                        />
                                                    )

                                            }

                                            <View
                                                style={{
                                                    paddingLeft: tiny,
                                                    flex: 1
                                                }}
                                            >
                                                <SimpleText
                                                    text={item.message.title}
                                                    color={color.states.active.text}
                                                />

                                                {
                                                    item.message.description
                                                        ? (
                                                            <SimpleText
                                                                text={item.message.description}
                                                                color={color.states.active.text}
                                                                small={true}
                                                            />
                                                        )
                                                        : null
                                                }
                                            </View>


                                            {
                                                item.closeable ? (
                                                    <Image
                                                        source={require('../assets/close.png')}
                                                        style={{
                                                            tintColor: color.states.active.text,
                                                            width: titleStyle.lineHeight,
                                                            height: titleStyle.lineHeight
                                                        }}
                                                    />
                                                ) : null
                                            }
                                        </View>
                                    </View>
                                );

                                return (
                                    <Animated.View
                                        key={item.id}
                                        style={{
                                            backgroundColor: theme.colorBackground,
                                            width: WIDTH,
                                            top: 0,
                                            opacity: item.height === 0
                                                ? 0
                                                : item.animation.interpolate({
                                                    inputRange: [0, small],
                                                    outputRange: [0.8, 1],
                                                    extrapolate: 'clamp'
                                                }),
                                            transform: [
                                                {
                                                    translateX: item.height === 0 ? WIDTH * 2 : 0
                                                },
                                                {
                                                    translateY: animationY
                                                }
                                            ],
                                            zIndex: (all.length - index)
                                        }}
                                    >
                                        <View
                                            onLayout={(event: LayoutChangeEvent) => {
                                                const height = event.nativeEvent.layout.height;
                                                if (height > 0) {
                                                    setSharedState((prevState) => {
                                                        const messages = prevState.messages.concat([]);
                                                        let itemState = messages.find(value => value.id === item.id);
                                                        if (itemState && itemState.height !== height) {
                                                            itemState.height = height;
                                                            animateGenericNative(itemState.animation, height);
                                                            return {
                                                                messages: messages
                                                            };
                                                        }
                                                        return null;
                                                    });
                                                }
                                            }}
                                        >
                                            {
                                                item.closeable
                                                    ? (
                                                        <TouchableHighlight
                                                            onPress={item.close}
                                                            activeOpacity={0.8}
                                                        >
                                                            {content}
                                                        </TouchableHighlight>
                                                    )
                                                    : content
                                            }
                                        </View>
                                    </Animated.View>
                                )
                            })}
                        </Animated.View>
                    )
                }}
            </Theme>
        )
    }
}
