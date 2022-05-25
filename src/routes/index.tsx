import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';

import Layout from './Layout';
import Loading from 'components/Loading';
import styles from './Routes.module.scss';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const path = useLocation();

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(loadingTime);
    };
  }, [path]);

  const content = isLoading ? <Loading /> : <Layout setIsLoading={setIsLoading} />;

  return <div className={styles.app}>{content}</div>;
};

export default App;
