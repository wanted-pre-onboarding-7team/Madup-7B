import { atom } from 'recoil';

// export const dateState = atom<{ startDateState: Date | undefined; endDateState: Date | undefined }>({
//   key: '#dateState',
//   default: { startDateState: new Date(), endDateState: new Date() },
// });

export const startDateState = atom<Date | undefined>({
  key: '#startDateState',
  default: new Date(),
});

export const endDateState = atom<Date | undefined>({
  key: 'endDateState',
  default: new Date(),
});
