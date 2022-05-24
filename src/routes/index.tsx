import MediaStatus from './MediaStatus';

import styles from './Routes.module.scss';

import DashBoardChart from '../components/DashBoardChart/index';
import Calendar from './Calendar';

const App = () => {
  return (
    <div className={styles.app}>
      <DashBoardChart />
      <Calendar />
      <MediaStatus />
    </div>
  );
};

export default App;
