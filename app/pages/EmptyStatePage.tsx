import React from 'react';
import {EmptyState, TableView, TableViewRow, TableViewSection, Toast} from "../../index";

export default class EmptyStatePage extends React.PureComponent {

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
                                    <EmptyState
                                        image={{
                                            source: require('./../assets/icon-sad-empty-state.png')
                                        }}
                                        tint={true}
                                        title={'Oops...There are no Files'}
                                        description={'Tap on button to add one :)'}
                                        action={[
                                            {
                                                title: 'Add new',
                                                rounded: true,
                                                onPress: () => {
                                                    Toast.show('Add new');
                                                }
                                            },
                                            {
                                                title: 'Another action',
                                                rounded: true,
                                                onPress: () => {
                                                    Toast.show('Another action');
                                                }
                                            }

                                        ]}
                                    />
                                )
                            }
                        ] as Array<TableViewRow>
                    },
                ] as Array<TableViewSection>}
            />
        );
    }
}
