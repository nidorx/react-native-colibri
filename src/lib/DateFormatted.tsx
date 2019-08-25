import React from 'react'
import SimpleText, {SimpleTextProps} from "./SimpleText";
// @ts-ignore
import moment from 'moment/min/moment-with-locales';

export type DateFormattedProps = SimpleTextProps & {
    /**
     * The date to format
     */
    date?: Date | string;

    /**
     * The Presentation Location.
     */
    locale?: string;

    /**
     * The formatting view as defined by Moment.js. Default: 'LLLL'
     */
    format?: string;
}

/**
 * Component for standard data formatting, using https://momentjs.com/
 */
export default class DateFormatted extends React.PureComponent<DateFormattedProps> {

    render() {
        let dtFormatted = '';
        if (this.props.date) {
            let mode =
                dtFormatted = moment(this.props.date)
                    .locale(this.props.locale || 'en')
                    .format(this.props.format || 'LLLL');
        }
        return <SimpleText {...this.props} text={dtFormatted}/>;
    }
}
