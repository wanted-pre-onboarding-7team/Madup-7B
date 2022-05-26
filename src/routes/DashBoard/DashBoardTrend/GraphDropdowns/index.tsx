import styles from '../dashboardTrend.module.scss';

import { useRecoilState } from 'recoil';

import { Dropdown } from 'components/Dropdown';
import { firstGraphCategoryAtom, secondGraphCategoryAtom, termCategoryAtom } from 'states/graph';
import { IData, sortList } from './list';

import { GreenCircle, BlueCircle } from 'assets/svg/index';

const dateList: IData[] = [
  { id: 0, name: '일간', value: '일간' },
  { id: 1, name: '주간', value: '주간' },
];

const GraphDropdowns = () => {
  const [firstGraphCategory, setFirstGraphCategory] = useRecoilState(firstGraphCategoryAtom);
  const [secondGraphCategory, setSecondGraphCategory] = useRecoilState(secondGraphCategoryAtom);
  const [termCategory, setTermCategory] = useRecoilState(termCategoryAtom);

  const fisrtFilteredList = sortList.filter((item) => item.value !== secondGraphCategory);
  const secondFilteredList = sortList.filter((item) => item.value !== firstGraphCategory);

  return (
    <section className={styles.buttonContainer}>
      <div className={styles.categoryDropdownWrap}>
        <Dropdown
          list={fisrtFilteredList}
          svgIcon={<BlueCircle />}
          setState={setFirstGraphCategory}
          init={firstGraphCategory}
        />
        <Dropdown
          list={secondFilteredList}
          svgIcon={<GreenCircle />}
          setState={setSecondGraphCategory}
          init={secondGraphCategory}
        />
      </div>
      <Dropdown list={dateList} setState={setTermCategory} init={termCategory} />
    </section>
  );
};

export default GraphDropdowns;
