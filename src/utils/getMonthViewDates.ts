import dayjs, { Dayjs } from 'dayjs';

export default function getMonthViewDates(monthIndx = dayjs().month()) {
    // console.time('monthDates');
    const monthDatesArr: Dayjs[] = [];

    const monthFirstDay = dayjs().month(monthIndx).startOf('M');
    const firstDayOfWeekIndx = monthFirstDay.day();

    const monthLastDay = monthFirstDay.endOf('M');
    const lastDayOfWeekIndx = monthLastDay.day();

    // it needs to start negative to get the days from past month
    let currDayCount = 0 - firstDayOfWeekIndx;
    let lastDay = monthLastDay.date() + 6 - lastDayOfWeekIndx;

    for (; currDayCount < lastDay; currDayCount) {
        monthDatesArr.push(monthFirstDay.add(currDayCount, 'day'));
        currDayCount++;
    }

    // console.timeEnd('monthDates');
    return monthDatesArr;
}
