import React from 'react'
import {Image, ImageProps, StyleSheet, View, ViewStyle} from 'react-native';
import SimpleText, {SimpleTextProps} from './SimpleText';
import Button, {ButtonProps} from "./Button";
import {getTheme} from "./Utils";


/**
 * Ajuste de tamanho de fontes para o EmptyState
 */
const EMPTY_STATE_FONT_SIZE_FACTOR = 1.2;

export type EmptyStateProps = {
    component?: JSX.Element;
    title?: string | boolean;
    titleProps?: SimpleTextProps;
    description?: string | string[] | JSX.Element;
    descriptionProps?: SimpleTextProps;
    image?: ImageProps;
    tint?: boolean;
    action?: ButtonProps | ButtonProps[]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        width: '100%',
        textAlign: 'center'
    },
    description: {
        width: '100%',
        textAlign: 'center',
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

/**
 * Component to represent a page without content.  It should be used when a view is empty because no objects exist and
 * you want to guide the user to perform specific actions.
 *
 * @link http://emptystat.es/tagged/mobile
 */
export default class EmptyState extends React.PureComponent<EmptyStateProps> {

    public static titleDefault = "Oops...There's nothing in here";

    render() {
        const theme = getTheme();
        let {title, component, description, image, tint, action} = this.props;
        if ((!title && title !== false) || title === true) {
            title = EmptyState.titleDefault;
        }

        return (
            <View style={[styles.container, {padding: theme.padding,}]}>
                {
                    component
                        ? component
                        : (
                            <View>
                                {
                                    image
                                        ? (
                                            <Image
                                                {...image}
                                                style={[
                                                    image.style,
                                                    {
                                                        width: (image.style && (image.style as any).width)
                                                            ? (image.style as any).width
                                                            : '50%',
                                                        resizeMode: 'contain',
                                                        marginBottom: theme.padding,
                                                        alignSelf: 'center',
                                                        tintColor: tint
                                                            ? theme.colorTextSecondary
                                                            : image.style ? (image.style as any).tintColor : undefined
                                                    }
                                                ]}
                                            />
                                        ) : null
                                }

                                {
                                    title
                                        ? (
                                            <SimpleText
                                                {...(this.props.titleProps || {})}
                                                style={[
                                                    styles.title,
                                                    {
                                                        fontSize: theme.fontSize * EMPTY_STATE_FONT_SIZE_FACTOR,
                                                        marginBottom: theme.padding,
                                                    },
                                                    this.props.titleProps ? this.props.titleProps.style : undefined
                                                ]}
                                            >
                                                {title}
                                            </SimpleText>
                                        )
                                        : null
                                }


                                {
                                    description
                                        ? (
                                            (typeof description === 'string')
                                                ? this.renderDescription(`description`, description)
                                                : (
                                                    Array.isArray(description)
                                                        ? description.map((desc, i) => {
                                                            return this.renderDescription(`d-${i}`, desc);
                                                        })
                                                        : description
                                                )
                                        )
                                        : null
                                }

                                <View style={styles.buttons}>
                                    {
                                        action
                                            ? (
                                                Array.isArray(action)
                                                    ? action.map((props, i, all) => {
                                                        let style: ViewStyle = {
                                                            marginTop: theme.padding,
                                                            paddingLeft: theme.paddingMinimum,
                                                            paddingRight: theme.paddingMinimum
                                                        };
                                                        if (i == 0) {
                                                            style.paddingLeft = 0;
                                                        }
                                                        if (i == all.length - 1) {
                                                            style.paddingRight = 0;
                                                        }
                                                        return (
                                                            <View key={`action-${i}`} style={[styles.button, style]}>
                                                                <Button
                                                                    block={true}
                                                                    rounded={true}
                                                                    {...props}
                                                                />
                                                            </View>
                                                        );
                                                    })
                                                    : (
                                                        <View style={[styles.button, {marginTop: theme.padding}]}>
                                                            <Button
                                                                block={true}
                                                                rounded={true}
                                                                {...action}
                                                            />
                                                        </View>
                                                    )
                                            )
                                            : null
                                    }
                                </View>
                            </View>
                        )
                }
            </View>
        )
    }

    private renderDescription(key: string, description: string) {
        const theme = getTheme();
        return (
            <SimpleText
                key={key}
                {...(this.props.descriptionProps || {})}
                style={[
                    styles.description,
                    {
                        marginBottom: theme.padding,
                        color: theme.colorTextSecondary,
                        fontSize: theme.fontSizeSubline * EMPTY_STATE_FONT_SIZE_FACTOR
                    },
                    (this.props.descriptionProps || {}).style
                ]}
            >
                {description}
            </SimpleText>
        );
    }
}
