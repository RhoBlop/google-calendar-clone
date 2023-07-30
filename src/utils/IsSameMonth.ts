import dayjs from 'dayjs';

//FIXME is this even working?
export function IsSameMonth(date: dayjs.Dayjs, monthIndx: number) {
    return date.month() === monthIndx;
}
