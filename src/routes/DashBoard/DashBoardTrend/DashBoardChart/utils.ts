import { useRecoilValue } from 'recoil';
import useData from 'hooks/useData';
import { firstGraphCategoryAtom, secondGraphCategoryAtom, termCategoryAtom } from 'states/graph';
import { IDaily } from 'types/trend';

interface IDatum {
  x: string;
  y: number;
}

type IDataset = IDatum[];

export const useGraphData = () => {
  const firstGraphCategory = useRecoilValue(firstGraphCategoryAtom);
  const secondGraphCategory = useRecoilValue(secondGraphCategoryAtom);
  const termCategory = useRecoilValue(termCategoryAtom);
  const { getCurTrendData } = useData();

  const filteredDataByDate = getCurTrendData();

  // 일간
  if (termCategory === '일별') {
    const firstGraphCoords = filteredDataByDate.map((data) => {
      return { x: data.date, y: data[firstGraphCategory] };
    });

    const secondGraphCoords = filteredDataByDate.map((data) => {
      return { x: data.date, y: data[secondGraphCategory] };
    });

    const graphData = [firstGraphCoords, secondGraphCoords];

    return graphData;
  }

  // 주간
  /* const firstGraphCoords = filteredDataByDate.reduce((acc, el, idx) => {
    if (idx % 7 === 0) {
      return [...acc, { x: el.date, y: el[firstGraphCategory] }];
    }

    const lastIdx = acc.length - 1;
    const newCoords = acc.splice(lastIdx, 1, acc[lastIdx][firstGraphCategory] + el[firstGraphCategory]);
    return newCoords;
  }, [{}]); */

  const graphData: IDaily[][] = [[], []];

  filteredDataByDate.forEach((el, idx) => {
    if (idx % 7 === 0) {
      graphData[0].push(el);
    } else {
      const lastIdx = graphData[0].length - 1;
      const lastItem = graphData[0][lastIdx];
      lastItem[firstGraphCategory] += lastItem[firstGraphCategory] + el[firstGraphCategory];
      graphData[0].splice(lastIdx, 1, lastItem);
    }
  });

  filteredDataByDate.forEach((el, idx) => {
    if (idx % 7 === 0) {
      graphData[1].push(el);
    } else {
      const lastIdx = graphData[1].length - 1;
      const lastItem = graphData[1][lastIdx];
      lastItem[secondGraphCategory] += lastItem[secondGraphCategory] + el[secondGraphCategory];
      graphData[1].splice(lastIdx, 1, lastItem);
    }
  });

  return graphData;
};
