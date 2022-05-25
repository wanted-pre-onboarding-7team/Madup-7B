import styles from './dashboard.module.scss';

import Calendar from './Calendar';
import DashBoardChart from './DashBoardChart';
import MediaStatus from './MediaStatus';
import DashboardTrend from './DashBoardTrend';

const Dashboard = () => {
  return (
    <div className={styles.dashboardWrap}>
      <div className={styles.titleWrap}>
        <h1>대시보드</h1>
        <Calendar />
      </div>
      <DashboardTrend />
      <DashBoardChart />
      <MediaStatus />
    </div>
  );
};

export default Dashboard;
