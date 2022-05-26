import { useRecoilValue } from 'recoil';

import { IDataset } from './types';
import useData from 'hooks/useData';
import { firstGraphCategoryAtom, secondGraphCategoryAtom, termCategoryAtom } from 'states/graph';

export const useGraphData = () => {
  const firstGraphCategory = useRecoilValue(firstGraphCategoryAtom);
  const secondGraphCategory = useRecoilValue(secondGraphCategoryAtom);
  const termCategory = useRecoilValue(termCategoryAtom);
  const { getCurrentTrendData } = useData();

  const filteredDataByDate = getCurrentTrendData();

  if (termCategory === '일간') {
    const firstGraphCoords = filteredDataByDate.map((data) => {
      return { x: data.date, y: data[firstGraphCategory] };
    });

    const secondGraphCoords = filteredDataByDate.map((data) => {
      return { x: data.date, y: data[secondGraphCategory] };
    });

    const graphData = [firstGraphCoords, secondGraphCoords];

    return graphData;
  }

  const graphData: IDataset[] = [[], []];

  filteredDataByDate.forEach((el, idx) => {
    if (idx % 7 === 0) {
      const coords = { x: el.date, y: el[firstGraphCategory] };
      graphData[0].push(coords);
    } else {
      const lastIdx = graphData[0].length - 1;
      const lastItem = graphData[0][lastIdx];
      lastItem.y = Number(lastItem.y) + Number(el[firstGraphCategory]);
      graphData[0].splice(lastIdx, 1, lastItem);
    }
  });

  filteredDataByDate.forEach((el, idx) => {
    if (idx % 7 === 0) {
      const coords = { x: el.date, y: el[secondGraphCategory] };
      graphData[1].push(coords);
    } else {
      const lastIdx = graphData[1].length - 1;
      const lastItem = graphData[1][lastIdx];
      lastItem.y = Number(lastItem.y) + Number(el[secondGraphCategory]);
      graphData[1].splice(lastIdx, 1, lastItem);
    }
  });

  return graphData;
};
