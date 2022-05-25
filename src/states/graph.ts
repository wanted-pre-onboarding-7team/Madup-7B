import { atom } from 'recoil';

export type Tcategory = 'conv' | 'click' | 'cost' | 'imp' | 'convValue' | 'ctr' | 'cvr' | 'cpc' | 'cpa' | 'roas';

export const firstGraphCategoryAtom = atom<Tcategory>({
  key: '#firstGraphCategoryAtom',
  default: 'roas',
});

export const secondGraphCategoryAtom = atom<Tcategory>({
  key: '#secondGraphCategoryAtom',
  default: 'cost',
});

export type TtermCategory = '일별' | '주간';

export const termCategoryAtom = atom<TtermCategory>({
  key: '#termCategory',
  default: '일별',
});
