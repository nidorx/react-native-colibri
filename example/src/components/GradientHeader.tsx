import React from 'react';
import {Animated, ImageBackground, StyleSheet,} from 'react-native';
import {LayoutEvent} from 'react-navigation';
import {EmptyState, getTheme, SimpleText, TableView, TableViewProps} from "rn-components-ui";

export type GradientHeaderProps = TableViewProps & {
    title: string;
    description: string | JSX.Element;
}

type IndexPageState = {
    headerHeight: number;
}

export default class GradientHeader extends React.PureComponent<GradientHeaderProps> {

    state = {
        headerHeight: 10
    };

    private animatedScrollValue = new Animated.Value(0);

    private onLayoutHeader = (event: LayoutEvent) => {
        this.setState({
            headerHeight: event.nativeEvent.layout.height
        })
    };

    render() {
        const theme = getTheme();

        const headerOpacityColor = this.animatedScrollValue.interpolate({
            inputRange: [0, this.state.headerHeight * 0.7],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <ImageBackground
                style={[StyleSheet.absoluteFill, {alignSelf: 'flex-start'}]}
                source={require('./../assets/gradient.png')}
            >
                <TableView
                    {...this.props}
                    header={(
                        <Animated.View style={[{opacity: headerOpacityColor}]} onLayout={this.onLayoutHeader}>
                            <EmptyState
                                title={this.props.title}
                                titleProps={{color: '#FFF'}}
                                description={
                                    (typeof this.props.description === 'string')
                                        ? (
                                            <SimpleText
                                                color={'#FFF'}
                                                text={this.props.description}
                                            />
                                        )
                                        : this.props.description
                                }
                            />
                        </Animated.View>
                    )}
                    transparent={true}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.animatedScrollValue}}}])}
                />
            </ImageBackground>
        );
    }
}
