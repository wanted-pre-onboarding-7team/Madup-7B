import { useState, MouseEvent } from 'react';
import { SetterOrUpdater } from 'recoil';
import cx from 'classnames';

import { ArrowDownIcon } from 'assets/svg';

import styles from './dropdown.module.scss';
import { IData } from 'routes/DashBoard/DashBoardTrend/DashBoardChart/list';

interface IProps {
  list: IData[];
  svgIcon: any;
  state: any;
  setState: SetterOrUpdater<any>;
  startValue: string;
}

export const Dropdown = ({ list, svgIcon, state, setState, startValue }: IProps) => {
  const [isShow, setIsShow] = useState(false);

  const [selectedValue, setSelectedValue] = useState(list[0].name);

  const handleDropdown = () => {
    setIsShow(!isShow);
  };

  const handleCurrentIndex = (e: MouseEvent<HTMLButtonElement>) => {
    setIsShow(false);
    setState(e.currentTarget.dataset.value);
    setSelectedValue(e.currentTarget.innerText);
  };

  return (
    <div className={styles.dropdown}>
      <button className={cx(styles.dropButton, { [styles.focused]: isShow })} type='button' onClick={handleDropdown}>
        <span className={styles.circleIcon}>{svgIcon}</span>
        <span className={styles.currentList}>{selectedValue}</span>
        <ArrowDownIcon className={styles.arrowIcon} />
      </button>
      {isShow && (
        <ul className={styles.dropBox}>
          {list.map((item) => (
            <li
              key={`Dropdown-${item.id}`}
              className={cx(styles.list, { [styles.selected]: selectedValue === item.name })}
            >
              <button type='button' data-value={item.value} onClick={handleCurrentIndex}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
