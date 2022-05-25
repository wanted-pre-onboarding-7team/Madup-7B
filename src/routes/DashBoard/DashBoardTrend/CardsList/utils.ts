import { IDaily } from 'types/trend';

const initSumData = {
  roas: 0,
  cost: 0,
  imp: 0,
  click: 0,
  conv: 0,
  revenue: 0,
};

export const calSumData = (data: IDaily[]) => {
  const sumData = data.reduce(
    (acc: { [key: string]: number }, cur: { [key: string]: any }) => {
      Object.keys(cur).forEach((key) => {
        if (!['roas', 'cost', 'imp', 'click', 'conv'].includes(key)) return;

        if (key === 'roas') {
          acc[key] += Math.floor(cur[key] / 100);
          return;
        }

        acc[key] += Math.floor(cur[key]);
      });

      acc.revenue += Math.floor((cur.conv * cur.roas) / 100);
      return acc;
    },
    { ...initSumData }
  );
  return sumData;
};

export const calDiffData = (prevData: { [key: string]: number }, curData: { [key: string]: number }) => {
  const diffData = Object.fromEntries(Object.entries(curData).map(([key, value]) => [key, value - prevData[key]]));

  return diffData;
};
