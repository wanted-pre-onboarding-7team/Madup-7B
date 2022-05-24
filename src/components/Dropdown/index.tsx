import { useState } from 'react';
import { ArrowDownIcon } from 'assets/svg';
import cx from 'classnames';
import styles from './dropdown.module.scss';
import { current } from '@reduxjs/toolkit';

interface Props {
  list: string[];
  svgIcon: any;
}

export const Dropdown = ({ list, svgIcon }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDropdown = () => {
    setIsShow(!isShow);
  };

  const handleCurrentIndex = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedIndex = Number(e.currentTarget.dataset.index);
    setCurrentIndex(selectedIndex);
    setIsShow(false);
  };

  return (
    <div className={styles.container}>
      <button className={cx(styles.dropButton, { [styles.focused]: isShow })} type='button' onClick={handleDropdown}>
        <span className={styles.circleIcon}>{svgIcon}</span>
        <span className={styles.currentList}>{list[currentIndex]}</span>
        <ArrowDownIcon className={styles.arrowIcon} />
      </button>
      {isShow && (
        <ul className={styles.dropBox}>
          {list.map((el, index) => (
            <li
              key={`Dropdown-${el}`}
              className={styles.list}
              onClick={handleCurrentIndex}
              data-index={index}
              role='presentation'
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
