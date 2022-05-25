import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { Dispatch, FC, SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoard from 'routes/DashBoard';
import ManageAd from 'routes/ManageAd';
import { useRecoilState } from 'recoil';

import styles from './layout.module.scss';
import { loadingState } from 'states/atom';

interface IProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Layout: FC<IProps> = ({ setIsLoading }) => {
  return (
    <div className={styles.layout}>
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
    </div>
  );
};

export default Layout;
