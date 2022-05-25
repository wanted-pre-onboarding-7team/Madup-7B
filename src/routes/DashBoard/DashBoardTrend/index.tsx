import styles from './dashboardTrend.module.scss';

import IndicatorCardsList from './CardsList';

const DashBoardTrend = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.dashboard}>
        <IndicatorCardsList />
      </div>
    </div>
  );
};

export default DashBoardTrend;
