export interface IData {
  id: number;
  name: string;
  value: string;
}

export const sortList: IData[] = [
  { id: 1, name: 'ROAS', value: 'roas' },
  { id: 2, name: '광고비', value: 'cost' },
  { id: 3, name: '노출 수', value: 'imp' },
  { id: 4, name: '클릭 수', value: 'click' },
  { id: 5, name: '전환 수', value: 'conv' }, // 전환수 = click * cvr / 100 (&& 소수점 첫째 자리에서 반올림) (CVR = (number of conversions / impressions) x 100) */
  { id: 6, name: '매출', value: 'convValue' },
];
