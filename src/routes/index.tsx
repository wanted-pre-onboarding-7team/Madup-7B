import { Routes, Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import ManageAd from './manageAd';

import styles from './Routes.module.scss';

import DashBoard from './DashBoard/index';

const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/advertisement' element={<ManageAd />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
