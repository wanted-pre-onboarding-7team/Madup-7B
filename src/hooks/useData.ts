import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import TREND_DATA from 'data/trend.json';

import { IDaily } from 'types/trend';
import { useRecoilState } from 'recoil';
import { endDateState, startDateState } from 'states/atom';

const useData = () => {
  dayjs.extend(isBetween);

  const [startDate] = useRecoilState(startDateState);
  const [endDate] = useRecoilState(endDateState);

  const allDailyList = TREND_DATA.report.daily;

  const fetchTrendDataByPeriod = (start: Date | undefined, end: Date | undefined): IDaily[] => {
    const trendDataByPeriod = allDailyList.filter((item) => dayjs(item.date).isBetween(start, end, 'day', '[]'));
    return trendDataByPeriod;
  };

  const getCurrentTrendData = (): IDaily[] => {
    const filteredTrendData = fetchTrendDataByPeriod(startDate, endDate);
    return filteredTrendData;
  };

  const getPrevTrendData = (): IDaily[] => {
    const diff = dayjs(endDate).diff(startDate);
    const prevEndDate = dayjs(startDate).subtract(1, 'd').toDate();
    const prevStartDate = dayjs(prevEndDate).subtract(diff, 'millisecond').toDate();
    const filteredTrendData = fetchTrendDataByPeriod(prevStartDate, prevEndDate);
    return filteredTrendData;
  };

  return {
    getCurrentTrendData,
    getPrevTrendData,
  };
};

export default useData;
