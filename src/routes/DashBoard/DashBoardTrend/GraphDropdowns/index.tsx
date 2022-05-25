import styles from '../dashboardTrend.module.scss';

import { useRecoilState } from 'recoil';

import { Dropdown } from 'components/Dropdown';
import { firstGraphCategoryAtom, secondGraphCategoryAtom, termCategoryAtom } from 'states/graph';
import { IData, sortList } from '../DashBoardChart/list';

// before
import { GreenCircle, BlueCircle, WhiteCircle } from 'assets/svg/index';

const dateList: IData[] = [
  { id: 0, name: '일별', value: '일별' },
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
          state={firstGraphCategory}
          setState={setFirstGraphCategory}
        />
        <Dropdown
          list={secondFilteredList}
          svgIcon={<GreenCircle />}
          state={secondGraphCategory}
          setState={setSecondGraphCategory}
        />
      </div>
      <Dropdown list={dateList} svgIcon={<WhiteCircle />} state={termCategory} setState={setTermCategory} />
    </section>
  );
};

export default GraphDropdowns;
