import React from 'react';
import {Carousel, SimpleText, TableView, TableViewSection} from "../../lib";

export default class CarouselPage extends React.PureComponent {

    render() {
        let SEQ = 1;
        return (
            <TableView
                sections={[
                    {
                        key: `${SEQ++}`,
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Carousel
                                        gap={6}
                                    >
                                        {

                                            [
                                                "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                            ].map((color, index, all) => (
                                                <SimpleText
                                                    key={'' + index}
                                                    text={'' + index}
                                                    color={'#FFF'}
                                                    align={'center'}
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                        backgroundColor: color
                                                    }}
                                                />
                                            ))
                                        }
                                    </Carousel>
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Dinamic size',
                                subtitle: (
                                    <Carousel
                                        gap={6}
                                    >
                                        {
                                            [
                                                "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                            ].map((color, index, all) => (
                                                <SimpleText
                                                    key={`${index}`}
                                                    text={`${index}`}
                                                    color={'#FFF'}
                                                    align={'center'}
                                                    style={{
                                                        height: 100,
                                                        width: Math.random() > 0.5 ? 100 : 150,
                                                        backgroundColor: color
                                                    }}
                                                />
                                            ))
                                        }
                                    </Carousel>
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: 'Page style',
                                subtitle: (
                                    <Carousel
                                        gap={6}
                                        pageStyle={{
                                            borderRadius: 20,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {

                                            [
                                                "#d109df", "#c013db", "#ae1cd6", "#9d26d2", "#8b2fce",
                                                "#7a39ca", "#6842c6", "#574cc2", "#4555bd", "#345fb9"
                                            ].map((color, index, all) => (
                                                <SimpleText
                                                    key={'' + index}
                                                    text={'' + index}
                                                    color={'#FFF'}
                                                    align={'center'}
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                        backgroundColor: color
                                                    }}
                                                />
                                            ))
                                        }
                                    </Carousel>
                                )
                            }
                        ]
                    },
                ] as Array<TableViewSection>}
            />
        );
    }
}
