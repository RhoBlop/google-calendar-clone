import dayjs from 'dayjs';

export default function getDayClass(
    date: dayjs.Dayjs,
    activeMonthIndx: number,
    isSelected?: boolean | null,
) {
    const today = dayjs();
    const defaultClass = `flex items-center justify-center rounded-full`;
    const conditionalClass = !date.isSame(
        dayjs().month(activeMonthIndx),
        'month',
    )
        ? 'text-gray-300 hover:bg-gray-100'
        : date.isSame(today, 'day')
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : isSelected
        ? 'bg-blue-200 text-blue-600 hover:bg-blue-300'
        : 'hover:bg-gray-100';

    return defaultClass + ' ' + conditionalClass;
}
