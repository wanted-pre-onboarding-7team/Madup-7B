import { Routes, Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import ManageAd from './manageAd';
import MediaStatus from './MediaStatus';

import styles from './Routes.module.scss';

import DashBoardChart from '../components/DashBoardChart/index';
import Calendar from './Calendar';

const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main>
          <Routes>
            {/* <Route path='/' element={<Dashboard />} /> */}
            <Route path='/advertisement' element={<ManageAd />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
