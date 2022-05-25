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

export const inclusionDateState = selector<IfilterList[]>({
  key: 'inclusionDateState',
  get: ({ get }) => {
    const startDate = get(startDateState);
    const endDate = get(endDateState);

    const start = dayjs(startDate).format('YYYY-MM-DD');
    const end = dayjs(endDate).format('YYYY-MM-DD');

    // 시작 날짜만 있을 때
    if (start && !end) return CHANNEL_DATA.filter(({ date }) => date >= start);

    // 끝 날짜만 있을 때
    if (!start && end) return CHANNEL_DATA.filter(({ date }) => date <= end);

    // 둘 다 있을 때
    return CHANNEL_DATA.filter(({ date }) => date >= start && date <= end);
  },
});
