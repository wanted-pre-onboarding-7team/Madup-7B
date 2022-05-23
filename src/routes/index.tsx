import styles from './Routes.module.scss';
import Calendar from './Calendar';

const App = () => {
  return (
    <div className={styles.app}>
      <Calendar />
    </div>
  );
};

export default App;
