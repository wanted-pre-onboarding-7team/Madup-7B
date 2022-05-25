import Calendar from './Calendar';

import MediaStatus from './MediaStatus';
import DashboardTrend from './DashBoardTrend';

import styles from './dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboardWrap}>
      <div className={styles.titleWrap}>
        <h1>대시보드</h1>
        <Calendar />
      </div>
      <DashboardTrend />
      <MediaStatus />
    </div>
  );
};

export default Dashboard;
