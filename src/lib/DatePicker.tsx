import React from 'react'
import {ViewProps} from 'react-native';
import RNDatePicker from 'react-native-date-picker';
// @ts-ignore
import DateFormatted from "./DateFormatted";
import AnimatedModal, {AnimatedModalAPI} from "./modal/AnimatedModal";
import OkCancelView from "./OkCancelView";

export type DatePickerProps = ViewProps & {
    /**
     * The currently selected date.
     */
    date?: Date

    /**
     * The date picker locale.
     */
    locale?: string

    /**
     * Maximum date.
     *
     * Restricts the range of possible date/time values.
     */
    maximumDate?: Date

    /**
     * Minimum date.
     *
     * Restricts the range of possible date/time values.
     */
    minimumDate?: Date

    /**
     * The interval at which minutes can be selected.
     */
    minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30

    /**
     * The date picker mode.
     */
    mode?: 'date' | 'time' | 'datetime'

    /**
     * Date change handler.
     *
     * This is called when the user changes the date or time in the UI.
     * The first and only argument is an Event. For getting the date the picker
     * was changed to, use onDateChange instead.
     */
    onChange?: (event: object) => void

    /**
     * Date change handler.
     *
     * This is called when the user changes the date or time in the UI.
     * The first and only argument is a Date object representing the new
     * date and time.
     */
    onDateChange: (date: Date) => void

    /**
     * Timezone offset in minutes.
     *
     * By default, the date picker will use the device's timezone. With this
     * parameter, it is possible to force a certain timezone offset. For
     * instance, to show times in Pacific Standard Time, pass -7 * 60.
     */
    timeZoneOffsetInMinutes?: number

    /**
     * Android picker is fading towords this background color. { color, 'none' }
     */
    fadeToColor?: string

    /**
     * Changes the text color.
     */
    textColor?: string;

    /**
     * The formatting view as defined by Moment.js. Default: 'LLLL'
     */
    format?: string;
}

type DatePickerState = {
    date?: Date;
}

/**
 * Componente DatePicker padrão
 */
export default class DatePicker extends React.PureComponent<DatePickerProps, DatePickerState> {

    state = {
        date: undefined
    };

    modalApi?: AnimatedModalAPI;

    private onDateChange = () => {
        if (this.props.onDateChange) {
            this.props.onDateChange(this.state.date || this.props.date || new Date());
        }

        if (this.modalApi) {
            this.modalApi.hide();
        }
    };

    public show() {
        let modalApi = this.modalApi;
        if (modalApi) {
            this.setState({
                date: this.props.date
            });
            let content = (
                <OkCancelView
                    onCancel={modalApi.hide}
                    onOk={this.onDateChange}
                >
                    <RNDatePicker
                        locale={'pt'}
                        {...this.props}
                        date={this.state.date || this.props.date}
                        onDateChange={date => this.setState({date})}
                    />
                </OkCancelView>
            );
            modalApi.show(content, {
                width: 'large'
            });
        }
    }

    render() {
        return (
            <AnimatedModal.Consumer>
                {(api) => {
                    this.modalApi = api;
                    return (
                        <DateFormatted
                            date={this.props.date}
                            locale={this.props.locale}
                            format={this.props.format}
                        />
                    )
                }}
            </AnimatedModal.Consumer>
        );
    }


}
