import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';

import Layout from './Layout';
import Loading from 'components/Loading';
import styles from './Routes.module.scss';
import { useRecoilState } from 'recoil';
import { loadingState } from 'states/atom';

const App = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const path = useLocation();

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(loadingTime);
    };
  }, [path, isLoading, setIsLoading]);

  const content = isLoading ? <Loading /> : <Layout setIsLoading={setIsLoading} />;

  return <div className={styles.app}>{content}</div>;
};

export default App;
