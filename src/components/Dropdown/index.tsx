import { useState, MouseEvent } from 'react';
import { SetterOrUpdater } from 'recoil';
import cx from 'classnames';

import { ArrowDownIcon } from 'assets/svg';

import styles from './dropdown.module.scss';
import { IData } from 'routes/DashBoard/DashBoardTrend/GraphDropdowns/list';

interface IProps {
  list: IData[];
  svgIcon?: any;
  setState: SetterOrUpdater<any>;
  init: string;
}

export const Dropdown = ({ list, svgIcon, setState, init }: IProps) => {
  const initValue = list.filter((item) => item.value === init)[0].name;

  const [isShow, setIsShow] = useState(false);

  const [selectedValue, setSelectedValue] = useState(initValue);

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
