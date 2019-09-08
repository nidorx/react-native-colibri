import React from 'react';
import {Caption, H1, H2, H3, Large, SimpleText, Small, TableView, TableViewRow, TableViewSection} from "../../lib";

export default class TypographyPage extends React.Component {

    render() {
        let SEQ = 1;
        return (
            <TableView
                sections={[
                    {
                        key: `${SEQ++}`,
                        header: 'Typography',
                        data: [
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <H1
                                        text={'H1'}
                                    />
                                ),
                                subtitle: (
                                    <H1
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            } as TableViewRow,
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <H2
                                        text={'H2'}
                                    />
                                ),
                                subtitle: (
                                    <H2
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <H3
                                        text={'H3'}
                                    />
                                ),
                                subtitle: (
                                    <H3
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Large
                                        text={'Large'}
                                    />
                                ),
                                subtitle: (
                                    <Large
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Large
                                        text={'Large italic'}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <Large
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular'}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular italic'}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Small
                                        text={'Small'}
                                    />
                                ),
                                subtitle: (
                                    <Small
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Small
                                        text={'Small italic'}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <Small
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Caption
                                        text={'Caption'}
                                    />
                                ),
                                subtitle: (
                                    <Caption
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <Caption
                                        text={'Caption italic'}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <Caption
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        italic={true}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                    {
                        key: `${SEQ++}`,
                        header: 'Font Variants',
                        data: [
                            // 'thin' | 'light' | 'regular' | 'medium' | 'bold'
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Thin'}
                                        font={{weight: 'thin'}}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'thin'}}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Thin Italic'}
                                        font={{weight: 'thin'}}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'thin'}}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Light'}
                                        font={{weight: 'light'}}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'light'}}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Light Italic'}
                                        font={{weight: 'light'}}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'light'}}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular'}
                                        font={{weight: 'regular'}}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'regular'}}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Regular Italic'}
                                        font={{weight: 'regular'}}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'regular'}}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Medium'}
                                        font={{weight: 'medium'}}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'medium'}}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Medium Italic'}
                                        font={{weight: 'medium'}}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'medium'}}
                                        italic={true}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Bold'}
                                        font={{weight: 'bold'}}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'bold'}}
                                    />
                                )
                            },
                            {
                                key: `${SEQ++}`,
                                title: (
                                    <SimpleText
                                        text={'Bold Italic'}
                                        font={{weight: 'bold'}}
                                        italic={true}
                                    />
                                ),
                                subtitle: (
                                    <SimpleText
                                        text={'The quick brown fox jumps over the lazy dog.'}
                                        font={{weight: 'bold'}}
                                        italic={true}
                                    />
                                )
                            },

                        ] as Array<TableViewRow>
                    }
                ] as Array<TableViewSection>}
            />
        );
    }
}
