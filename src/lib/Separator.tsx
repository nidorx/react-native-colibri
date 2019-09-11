import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import SimpleText from './SimpleText';
import {getTheme, spacingReact} from "./Theme";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row'
    },
    lineContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});

export type SeparatorProps = {
    title?: string;
    color?: string;
    reverse?: boolean;
    small?: boolean;
    style?: StyleProp<ViewStyle>;
}


/**
 * A simple horizontal separator
 */
export default class Separator extends React.PureComponent<SeparatorProps> {

    render() {
        const theme = getTheme();
        const spacingMicro = spacingReact(theme, 'micro');
        const spacingSmall = spacingReact(theme, 'small');

        const line = (
            <View style={[styles.lineContainer, {paddingTop: this.props.small ? 1 : spacingMicro}]}>
                <View
                    style={{
                        borderBottomColor: this.props.color
                            ? this.props.color
                            : this.props.reverse
                                ? theme.colorTextReverse
                                : theme.colorLineSelected,
                        borderBottomWidth: theme.lineWidth,
                    }}
                />
            </View>
        );


        return (
            <View
                style={[
                    styles.container,
                    {
                        marginVertical: this.props.small ? spacingMicro : spacingSmall
                    },
                    this.props.style
                ]}
            >

                {line}

                {
                    this.props.title
                        ? (
                            <View style={{paddingHorizontal: 5}}>
                                <SimpleText
                                    color={
                                        this.props.color
                                            ? this.props.color
                                            : (
                                                this.props.reverse
                                                    ? theme.colorTextReverse
                                                    : theme.colorTextSecondary
                                            )
                                    }
                                    reverse={this.props.reverse}
                                    small={this.props.small}
                                    align={'center'}
                                >
                                    {this.props.title}
                                </SimpleText>
                            </View>
                        )
                        : null
                }


                {line}
            </View>
        );
    }
}
