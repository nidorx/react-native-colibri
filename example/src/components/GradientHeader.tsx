import React from 'react';
import {Animated, View,} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {EmptyState, getTheme, Loading, SimpleText, TableView, TableViewProps} from "react-native-colibri";

export type GradientHeaderProps = TableViewProps & {
    description: string | JSX.Element;
    navigation?: NavigationScreenProp<any, {}>
}

type GradientHeaderState = {
    subHeaderHeight: number;
}

const AnimatedTableView = Animated.createAnimatedComponent(TableView);

export default class GradientHeader extends React.PureComponent<GradientHeaderProps, GradientHeaderState> {

    state = {
        subHeaderHeight: 0
    };

    public animatedScrollValue = new Animated.Value(0);

    componentDidMount(): void {
        const theme = getTheme();
        // this.addParticles();
        if (this.props.navigation) {
            this.props.navigation.setParams({
                // Quando o header tiver tamanho definido, aplicca efeito na tela
                animatedScrollValue: this.animatedScrollValue,
                onSubHeaderLayout: (height: number) => {
                    this.setState({
                        subHeaderHeight: height
                    });
                },
                subHeader: (
                    <View style={{paddingVertical: theme.paddingBig}}>
                        <EmptyState
                            title={false}
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
                    </View>
                )
            })
        }
    }

    render() {
        const isLoading = this.state.subHeaderHeight == 0;
        return (
            <Loading isLoading={isLoading}>
                {
                    isLoading
                        ? null
                        : (
                            <AnimatedTableView
                                {...this.props}
                                disableScrollViewPanResponder={true}
                                showsVerticalScrollIndicator={false}
                                header={<View style={{height: this.state.subHeaderHeight}}/>}
                                onScroll={Animated.event(
                                    [{nativeEvent: {contentOffset: {y: this.animatedScrollValue}}}],
                                    {useNativeDriver: true, listener: this.props.onScroll}
                                )}
                            />
                        )
                }

            </Loading>
        );
    }
}
