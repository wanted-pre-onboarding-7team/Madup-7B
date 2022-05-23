import { useState, MouseEvent } from 'react';
import cx from 'classnames';

import { ArrowDownIcon } from 'assets/svg';

import Summary from './Summary';

import styles from './manageAd.module.scss';

const ManageAd = () => {
  const [isDropDownOpened, setIsDropDownOpened] = useState(true);
  const [status, setStatus] = useState('전체');

  const toggleOptionHanlder = () => {
    setIsDropDownOpened((prev) => !prev);
  };

  const selectStatusHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.dataset.status) setStatus(e.currentTarget.dataset.status);
  };

  const dropDownOptions = isDropDownOpened && (
    <ul className={styles.options} role='menu'>
      <li data-status='전체' role='menuitem' onClick={selectStatusHandler}>
        전체 광고
      </li>
      <li data-status='진행중인 광고' role='menuitem' onClick={selectStatusHandler}>
        진행중인 광고
      </li>
      <li data-status='중지 광고' role='menuitem' onClick={selectStatusHandler}>
        중지 광고
      </li>
    </ul>
  );

  return (
    <div className={styles.manageAd}>
      <h1>광고 관리</h1>
      <div className={styles.top}>
        <div
          className={cx(styles.select, { [styles.focused]: isDropDownOpened })}
          role='presentation'
          onClick={toggleOptionHanlder}
        >
          <span>{status}</span>
          {dropDownOptions}
          <ArrowDownIcon className={cx({ [styles.rotate]: isDropDownOpened })} />
        </div>
        <button type='button'>광고 만들기</button>
      </div>
      <div className={styles.ads}>
        <Summary />
        <Summary />
        <Summary />
        <Summary />
      </div>
    </div>
  );
};

export default ManageAd;
