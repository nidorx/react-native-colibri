import React from "react";
import {StyleSheet, View} from "react-native";
import Button from "./Button";
import {getTheme} from "./Utils";

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
        const theme = getTheme();
        return (
            <View style={styles.okCancelContainer}>
                {this.props.children}
                <View
                    style={[
                        styles.buttons,
                        {
                            marginTop: theme.padding,
                            padding: theme.paddingSmall,
                        }
                    ]}
                >
                    <View style={[styles.button, {paddingRight: theme.paddingMinimum}]}>
                        <Button
                            block={true}
                            rounded={true}
                            title={this.props.cancelText || 'Cancel'}
                            bgColor={theme.colorDanger}
                            onPress={this.props.onCancel}
                        />
                    </View>
                    <View style={[styles.button, {paddingLeft: theme.paddingMinimum}]}>
                        <Button
                            block={true}
                            rounded={true}
                            title={this.props.okText || 'Ok'}
                            onPress={this.props.onOk}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
