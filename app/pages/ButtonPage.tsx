import React from 'react';
import {Button, ButtonProps, TableView, TableViewSection, Toast} from "../../lib";
import {View} from "react-native";
import {componentPropertiesPlayground} from "../Utils";


export default class ButtonPage extends React.PureComponent {

    state = {
        props: {
            title: 'Add product'
        } as ButtonProps
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
                    componentPropertiesPlayground(
                        this,
                        (
                            <View>
                                <Button
                                    onPress={() => {
                                        Toast.show('onPress button');
                                    }}
                                    {...this.state.props}
                                    // style={{
                                    //     width: '80%'
                                    // }}
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
                                 * Defines direction of disclosure
                                 */
                                disclosureDirection?: 'up' | 'right' | 'down' | 'left';
                                /**
                                 * Makes \`plain\` and \`outline\` Button colors (text, borders, icons) the same as the current text color. Also adds an underline to \`plain\` Buttons
                                 */
                                monochrome?: boolean;
                                /**
                                 * Change border width
                                 */
                                borderWidth?: number;
                                /**
                                 * Define border radius
                                 */
                                borderRadius?: number;
                                /**
                                 * Provides extra visual weight and identifies the primary action in a set of buttons
                                 */
                                primary?: boolean;
                                /**
                                 * Indicates a informational action
                                 */
                                info?: boolean;
                                /**
                                 * Indicates a dangerous or potentially negative action
                                 */
                                danger?: boolean;
                                /**
                                 * Indicates a warning or negative action
                                 */
                                warning?: boolean;
                                /**
                                 * Indicates a success or positive action
                                 */
                                success?: boolean;
                                /**
                                 * Add custom style to button
                                 */
                                style?: StyleProp<ViewStyle>;
                                /**
                                 * Changes the size of the button, giving it more or less padding
                                 */
                                size?: 'small' | 'regular' | 'medium' | 'large';
                                /**
                                 * Changes the inner text alignment of the button. Only applicable when setting the fullWidth property or entering a width in styles
                                 */
                                align?: 'left' | 'right' | 'center';
                                /**
                                 * Callback when pressed
                                 */
                                onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
                        `
                    ),

                ] as Array<TableViewSection>}
            />
        );
    }
}
