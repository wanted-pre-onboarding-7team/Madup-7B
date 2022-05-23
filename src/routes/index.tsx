import ManageAd from './manageAd';
import styles from './Routes.module.scss';

const App = () => {
  return (
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
  );
};

export default App;
