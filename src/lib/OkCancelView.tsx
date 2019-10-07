import React from "react";
import {StyleSheet, View} from "react-native";
import Button from "./Button";
import Theme, {spacing} from "./Theme";

const styles = StyleSheet.create({
    okCancelContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    buttons: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    button: {
        flex: 1
    }
});

export type OkCancelViewProps = {
    onOk: () => void;
    onCancel: () => void;
    okText?: string;
    cancelText?: string;
}

/**
 * Simple view with Ok and Cancel buttons.
 *
 * @param props
 * @constructor
 */
export default class OkCancelView extends React.PureComponent <OkCancelViewProps> {

    render() {
        return (
            <Theme>
                {(theme) => {

                    const padding = spacing(theme, 'micro');

                    return (
                        <View style={styles.okCancelContainer}>
                            {this.props.children}
                            <View
                                style={[
                                    styles.buttons,
                                    {
                                        marginTop: spacing(theme, 'small'),
                                        padding: spacing(theme, 'tiny'),
                                    }
                                ]}
                            >
                                <View style={[styles.button, {paddingRight: padding}]}>
                                    <Button
                                        danger={true}
                                        rounded={true}
                                        fullWidth={true}
                                        onPress={this.props.onCancel}
                                        title={this.props.cancelText || 'Cancel'}
                                    />
                                </View>
                                <View style={[styles.button, {paddingLeft: padding}]}>
                                    <Button
                                        rounded={true}
                                        fullWidth={true}
                                        onPress={this.props.onOk}
                                        title={this.props.okText || 'Ok'}
                                    />
                                </View>
                            </View>
                        </View>
                    );
                }}
            </Theme>
        );

    }
}
