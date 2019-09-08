import React from 'react';
import {Button, TableView, TableViewSection, Toast} from "../../lib";
import {View} from "react-native";
import {renderComponentPropertiesSection} from "../Utils";


export default class ButtonPage extends React.PureComponent {

    state = {
        props: {}
    };

    render() {
        let SEQ = 1;
        return (
            <TableView
                sections={[
                    {
                        key: `${SEQ++}`,
                        header: {
                            title: 'Button',
                            subtitle: 'Buttons are used to make common actions immediately visible and easy to perform with one click, tap, or keypress. Merchants can use them to navigate or to take action.'
                        },
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: 'Basic button',
                                subtitle: 'Used most in the interface. Only use another style if a button requires more or less visual weight.',
                                right: (
                                    <Button
                                        title={'Add product'}
                                        onPress={() => {
                                        }}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Outline button',
                                subtitle: 'Use against shaded or colorful backgrounds. An outline button will maintain the appropriate visual weight and won’t clash with the background color.',
                                right: (
                                    <Button
                                        title={'Add product'}
                                        outline={true}
                                        onPress={() => {
                                        }}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Outline monochrome button',
                                subtitle: 'Use against shaded or colorful backgrounds where matching the current text colors is more appropriate than the current outline theme.',
                                right: (
                                    <Button
                                        title={'Retry'}
                                        outline={true}
                                        monochrome={true}
                                        onPress={() => {
                                        }}
                                    />
                                )
                            }
                        ]
                    },
                    renderComponentPropertiesSection(
                        this,
                        (
                            <View>
                                <Button
                                    title={'Add product'}
                                    onPress={() => {
                                        Toast.show('onPress button');
                                    }}
                                    {...this.state.props}
                                />
                            </View>
                        ),
                        `
                            /**
                             * Permite definir um tema personalizado para este componente
                             */
                            theme?: Partial<ThemeProps>;
                            /**
                             * Defines button label
                             */
                            title: string;
                            /**
                             * Replaces button text with a spinner while a background action is being performed
                             */
                            loading?: boolean;
                            /**
                             * Show as rounded button
                             */
                            rounded?: boolean;
                            /**
                             * Allows the button to grow to the width of its container
                             */
                            fullWidth?: boolean;
                            /**
                             * Disables the button, disallowing user interaction
                             */
                            disabled?: boolean;
                            /**
                             * Gives the button a subtle alternative to the default button styling, appropriate for certain backdrops
                             */
                            outline?: boolean;
                            /**
                             * Renders a button that looks like a link
                             */
                            plain?: boolean;
                            /**
                             * Displays the button with a disclosure icon
                             */
                            disclosure?: boolean;
                            /**
                             * Makes \`plain\` and \`outline\` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to \`plain\` Buttons
                             */
                            monochrome?: boolean;
                            /**
                             * Provides extra visual weight and identifies the primary action in a set of buttons
                             */
                            primary?: boolean;
                            info?: boolean;
                            danger?: boolean;
                            warning?: boolean;
                            success?: boolean;
                            /**
                             * Add custom style to button
                             */
                            style?: StyleProp<ViewStyle>;
                            /**
                             * Changes the size of the button, giving it more or less padding
                             */
                            size?: 'micro' | 'tiny' | 'medium' | 'large';
                            /**
                             * Callback when pressed
                             */
                            onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
                            bgColor?: string;
                            fgColor?: string;
                            large?: boolean;
                            color?: string;
                            accessibilityLabel?: string;
                        `
                    ),

                ] as Array<TableViewSection>}
            />
        );
    }
}
