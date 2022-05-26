import styles from './cardList.module.scss';

import useData from 'hooks/useData';
import { calDiffData, calSumData } from './utils';

import IndicatorCard from './Card';

const IndicatorCardsList = () => {
  const { getCurrentTrendData, getPrevTrendData } = useData();

  const prevSumData = calSumData(getPrevTrendData());
  const currentSumData = calSumData(getCurrentTrendData());
  const diff = calDiffData(prevSumData, currentSumData);

  const { roas, cost, imp, click, conv, revenue } = currentSumData;

  return (
    <ul className={styles.indicatorCardsList}>
      <IndicatorCard valueName='ROAS' sumValue={roas} diffValue={diff.roas} />
      <IndicatorCard valueName='광고비' sumValue={cost} diffValue={diff.cost} />
      <IndicatorCard valueName='노출 수' sumValue={imp} diffValue={diff.imp} />
      <IndicatorCard valueName='클릭 수' sumValue={click} diffValue={diff.click} />
      <IndicatorCard valueName='전환 수' sumValue={conv} diffValue={diff.conv} />
      <IndicatorCard valueName='매출' sumValue={revenue} diffValue={diff.revenue} />
    </ul>
  );
};

export default IndicatorCardsList;
