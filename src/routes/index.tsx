import { RecoilRoot } from 'recoil';
import ManageAd from './manageAd';
import styles from './Routes.module.scss';

const App = () => {
  return (
    <RecoilRoot>
      <div className={styles.app}>
        <section className={styles.sideMenu} />
        <div className={styles.content}>
          <header />
          <main>
            <h1>광고 관리</h1>
            <ManageAd />
          </main>
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
