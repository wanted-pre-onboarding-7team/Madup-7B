import styles from './Routes.module.scss';
import { Routes, Route } from 'react-router-dom';
import DashBoardChart from '../components/DashBoardChart/index';

const App = () => {
  return (
    <div className={styles.app}>
      <DashBoardChart />
    </div>
  );
};

export default App;
