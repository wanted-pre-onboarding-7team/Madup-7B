import MediaStatus from './MediaStatus';

import styles from './Routes.module.scss';
import Calendar from './Calendar';

const App = () => {
  return (
    <div className={styles.app}>
      <Calendar />
      <MediaStatus />
    </div>
  );
};

export default App;
