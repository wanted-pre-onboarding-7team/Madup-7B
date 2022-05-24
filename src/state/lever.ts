import { atom } from 'recoil';

export const adStatusAtom = atom<string>({
  key: '#adStatusAtom',
  default: '전체 광고',
});
