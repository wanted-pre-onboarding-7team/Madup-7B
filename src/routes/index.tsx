import styles from './Routes.module.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { useRecoilState } from 'recoil';

import { loadingState } from 'states/atom';

import Loading from 'components/Loading';
import Layout from './Layout';

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
