import { atom, selector } from 'recoil';
import CHANNEL_DATA from '../data/mediaChannel.json';

interface IfilterList {
  channel: string;
  date: string;
  imp: number;
  click: number;
  cost: number;
  convValue?: number;
  ctr: number;
  cvr?: number;
  cpc: number;
  cpa?: number;
  roas: number;
}

export const startDateState = atom<string>({
  key: 'startDateState',
  default: '',
});

export const endDateState = atom<string>({
  key: 'endDateState',
  default: '',
});

export const inclusionDateState = selector<IfilterList[]>({
  key: 'inclusionDateState',
  get: ({ get }) => {
    const startDate = get(startDateState);
    const endDate = get(endDateState);

    return CHANNEL_DATA.filter((el: any) => el.date >= startDate && el.date <= endDate);
  },
});
