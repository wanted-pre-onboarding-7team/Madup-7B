import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import ManageAd from './manageAd';
import Loading from 'components/Loading';

import styles from './Routes.module.scss';

import DashBoard from './DashBoard/index';
import { useLocation } from 'react-use';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const path = useLocation();

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTime);
    };
  }, [path]);

  const content = isLoading ? (
    <Loading />
  ) : (
    <>
      <Sidebar setIsLoading={setIsLoading} />
      <div className={styles.content}>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/advertisement' element={<ManageAd />} />
          </Routes>
        </main>
      </div>
    </>
  );

  return <div className={styles.app}>{content}</div>;
};

export default App;
