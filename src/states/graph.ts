import { atom } from 'recoil';

export type category = 'imp' | 'click' | 'cost' | 'conv' | 'convValue' | 'ctr' | 'cvr' | 'cpc' | 'cpa' | 'roas';

export const graphCategoryAtom = atom<category[]>({
  key: '#graphCategoryAtom',
  default: ['imp', 'click'],
});
