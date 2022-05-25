import { atom } from 'recoil';

export const startDateState = atom<Date | undefined>({
  key: '#startDateState',
  default: new Date('2022, 02, 01'),
});

export const endDateState = atom<Date | undefined>({
  key: '#endDateState',
  default: new Date('2022, 02, 04'),
});
