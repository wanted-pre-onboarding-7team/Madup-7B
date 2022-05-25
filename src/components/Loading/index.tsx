import { LoadingInner, LoadingOuter } from 'assets/svg';

import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <LoadingInner className={styles.inner} />
      <LoadingOuter className={styles.outer} />
    </div>
  );
};

export default Loading;
