import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import ManageAd from './manageAd';

import styles from './Routes.module.scss';

const App = () => {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
};

export default App;
