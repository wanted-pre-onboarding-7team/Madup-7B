import { useState, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import Calendar from 'routes/DashBoard/Calendar';
import DashBoardChart from 'routes/DashBoard/DashBoardChart';
import MediaStatus from 'routes/DashBoard/MediaStatus';
import { category, graphCategoryAtom } from 'states/graph';
import styles from './dashboard.module.scss';

const DATA_LIST: category[] = ['imp', 'click', 'cost', 'conv', 'convValue', 'ctr', 'cvr', 'cpc', 'cpa', 'roas'];

const Dashboard = () => {
  const [graphCategories, setGraphCategories] = useRecoilState(graphCategoryAtom);

  const [isDDOpened, setIsDDOpened] = useState(false);

  const optionClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.innerText as category;

    if (e.currentTarget.dataset.order === '1') {
      setGraphCategories((prev) => [prev[0], value]);
      return;
    }

    setGraphCategories((prev) => [value, prev[1]]);
  };

  const dds = graphCategories.map((gctg, i) => {
    return (
      <button
        className={styles.dropdown}
        key={i * i}
        type='button'
        onClick={() => {
          setIsDDOpened((prev) => !prev);
        }}
      >
        <span>{gctg}</span>
        {isDDOpened && (
          <ul className={styles.options}>
            {DATA_LIST.map((ctg, idx) => (
              <li key={idx}>
                <button type='button' onClick={optionClickHandler} data-order={i}>
                  {ctg}
                </button>
              </li>
            ))}
          </ul>
        )}
      </button>
    );
  });

  return (
    <div>
      <Calendar />
      {dds}
      <DashBoardChart />
      <MediaStatus />
    </div>
  );
};

export default Dashboard;
