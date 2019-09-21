import React, {Consumer} from "react";
import {Animated, StyleSheet, View, ViewStyle} from "react-native";
import Modal, {ModalOptions} from "./Modal";
import {animateGenericNative} from "../Utils";

const styles = StyleSheet.create({
    flex: {flex: 1}
});


export type AnimatedModalAPI = {
    /**
     * Exibe a Modal
     */
    show: (content: JSX.Element, options?: ModalOptions, onClose?: () => void) => void;
    /**
     * Permite exibir uma mensagem de erro na modal
     */
    error: (message: string) => void;
    /**
     * Oculta a modal
     */
    hide: () => void;
}

const DEFAULT_API: AnimatedModalAPI = {
    show: () => {
    },
    error: () => {
    },
    hide: () => {
    }
};

const Context = React.createContext(DEFAULT_API);

export type AnimatedModalProps = {
    backgroundStyle?: ViewStyle;
    contentStyle?: ViewStyle;
}

type AnimatedModalState = {
    content?: any;
    onClose?: () => void;
    options?: ModalOptions;
}

/**
 *
 */
export default class AnimatedModal extends React.PureComponent<AnimatedModalProps, AnimatedModalState> {

    public static Consumer: Consumer<AnimatedModalAPI> = Context.Consumer;

    state: AnimatedModalState = {};

    private modal: Modal | null = null;

    private containerStyle: any;

    private animatedContentValue = new Animated.Value(1);

    private api: AnimatedModalAPI = {
        error: (message: string) => {
            if (this.modal) {
                this.modal.error(message);
            }
        },
        show: (content, options, onClose) => {
            this.setState({
                content: React.cloneElement(content, {modal: this.api}),
                onClose: onClose,
                options: options,
            }, () => {
                if (this.modal) {
                    this.modal.show(() => {
                        setTimeout(() => {
                            animateGenericNative(this.animatedContentValue, 0);
                        }, 50);
                    });
                }
            });
        },
        hide: () => {
            if (this.modal) {
                this.modal.hide();
            }
        }
    };

    constructor(props: any) {
        super(props);
        this.containerStyle = {
            overflow: 'hidden',
            transform: [
                {perspective: 1000},
                {
                    scale: this.animatedContentValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.94, 1]
                    })
                },
                {
                    translateY: this.animatedContentValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [35, 0]
                    })
                }
            ],
        };
    }

    render() {
        return (
            <View style={styles.flex}>
                <Context.Provider value={this.api}>
                    <View style={[styles.flex, this.props.backgroundStyle || {backgroundColor: '#000000'}]}>
                        <Animated.View
                            style={[
                                styles.flex,
                                this.containerStyle,
                                this.props.contentStyle || {backgroundColor: '#FFF'}
                            ]}
                        >
                            {this.props.children}
                        </Animated.View>
                    </View>
                </Context.Provider>
                <Modal
                    ref={(modal) => this.modal = modal}
                    onClose={this.onClose}
                    onBeforeClose={this.onBeforeClose}
                    options={this.state.options}
                    content={this.state.content}
                />
            </View>
        )
    }

    private onBeforeClose = () => {
        animateGenericNative(this.animatedContentValue, 1);
    };

    private onClose = () => {
        const onClose = this.state.onClose;
        // Limpa as referencias
        this.setState({
            content: undefined,
            onClose: undefined,
            options: undefined
        }, () => {
            requestAnimationFrame(() => {
                if (onClose) {
                    try {
                        onClose();
                    } catch (e) {
                    }
                }
            });
        });
    };
}
