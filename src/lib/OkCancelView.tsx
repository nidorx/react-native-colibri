import React from "react";
import {StyleSheet, View} from "react-native";
import Button from "./Button";
import {getTheme, spacingReact} from "./Theme";

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
        const padding = spacingReact(theme, 'micro');

        return (
            <View style={styles.okCancelContainer}>
                {this.props.children}
                <View
                    style={[
                        styles.buttons,
                        {
                            marginTop: spacingReact(theme, 'small'),
                            padding: spacingReact(theme, 'tiny'),
                        }
                    ]}
                >
                    <View style={[styles.button, {paddingRight: padding}]}>
                        <Button
                            block={true}
                            rounded={true}
                            title={this.props.cancelText || 'Cancel'}
                            bgColor={theme.colorDanger}
                            onPress={this.props.onCancel}
                        />
                    </View>
                    <View style={[styles.button, {paddingLeft: padding}]}>
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
