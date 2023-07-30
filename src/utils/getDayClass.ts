import dayjs from 'dayjs';
import { IsSameMonth } from './IsSameMonth';

export default function getDayClass(
    date: dayjs.Dayjs,
    activeMonthIndx: number,
    selectedDay?: dayjs.Dayjs | null,
) {
    const today = dayjs();
    const defaultClass = `flex items-center justify-center rounded-full`;
    const conditionalClass = !IsSameMonth(date, activeMonthIndx)
        ? 'text-gray-300 hover:bg-gray-100'
        : date.isSame(today, 'day')
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : date.isSame(selectedDay)
        ? 'bg-blue-200 text-blue-600 hover:bg-blue-300'
        : 'hover:bg-gray-100';

    return defaultClass + ' ' + conditionalClass;
}
