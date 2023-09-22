import dayjs from 'dayjs';

export function convertDateToSaveFormat(date: dayjs.Dayjs) {
    return date.format('YYYY-MM-DD');
}

export function dateAsId() {
    return dayjs().format();
}

export function convertToMonthAndYear(date: dayjs.Dayjs) {
    return date.format('MMMM [de] YYYY');
}
