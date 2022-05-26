import { atom, selector } from 'recoil';
import CHANNEL_DATA from '../data/mediaChannel.json';
import { IfilterList } from 'types/adList';
import dayjs from 'dayjs';

export const startDateState = atom<Date | undefined>({
  key: '#startDateState',
  default: new Date('2022, 02, 01'),
});

export const endDateState = atom<Date | undefined>({
  key: '#endDateState',
  default: new Date('2022, 02, 04'),
});

export const loadingState = atom<boolean>({
  key: '#loadingState',
  default: false,
});

export const inclusionDateState = selector<IfilterList[]>({
  key: '#inclusionDateState',
  get: ({ get }) => {
    const startDate = get(startDateState);
    const endDate = get(endDateState);

    const start = dayjs(startDate).format('YYYY-MM-DD');
    const end = dayjs(endDate).format('YYYY-MM-DD');

    if (start && !end) return CHANNEL_DATA.filter(({ date }) => date >= start);

    if (!start && end) return CHANNEL_DATA.filter(({ date }) => date <= end);

    return CHANNEL_DATA.filter(({ date }) => date >= start && date <= end);
  },
});
