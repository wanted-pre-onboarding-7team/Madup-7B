import Calendar from 'routes/DashBoard/Calendar';
import DashBoardChart from 'routes/DashBoard/DashBoardChart';
import MediaStatus from 'routes/DashBoard/MediaStatus';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboardWrap}>
      <Calendar />
      <DashBoardChart />
      <MediaStatus />
    </div>
  );
};

export default Dashboard;
