import styles from './dashboardTrend.module.scss';

import DashBoardChart from './DashBoardChart';
import IndicatorCardsList from './CardsList';
import GraphDropdowns from './GraphDropdowns';

const DashBoardTrend = () => {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>통합 광고 현황</h2>
      <div className={styles.dashboard}>
        <IndicatorCardsList />
        <GraphDropdowns />
        <DashBoardChart />
      </div>
    </div>
  );
};

export default DashBoardTrend;
