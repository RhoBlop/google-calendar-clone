import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

dayjs.locale('pt-br');
dayjs.updateLocale('pt-br', {
    months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
});
