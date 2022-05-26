import styles from './manageAd.module.scss';
import { useState, MouseEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import cx from 'classnames';

import { adStatusAtom } from './state';
import { IAd } from 'types/adList';
import adList from 'data/adLIst.json';

import AdSummary from './AdSummary/AdSummary';
import { ArrowDownIcon } from 'assets/svg';

const ManageAd = () => {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const [filteredAdList, setFilteredAdList] = useState<IAd[]>([]);
  const [adStatus, setAdStatus] = useRecoilState(adStatusAtom);

  const toggleOptionHanlder = () => {
    setIsDropDownOpened((prev) => !prev);
  };

  const selectStatusHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.status) setAdStatus(e.currentTarget.dataset.status);
  };

  const dropDownOptions = isDropDownOpened && (
    <ul className={styles.options}>
      <li>
        <button type='button' data-status='전체 광고' onClick={selectStatusHandler} aria-label='drowdown button'>
          전체 광고
        </button>
      </li>
      <li>
        <button type='button' data-status='진행중인 광고' onClick={selectStatusHandler} aria-label='drowdown button'>
          진행중인 광고
        </button>
      </li>
      <li>
        <button type='button' data-status='중지 광고' onClick={selectStatusHandler} aria-label='drowdown button'>
          중지 광고
        </button>
      </li>
    </ul>
  );

  useEffect(() => {
    if (adStatus === '전체 광고') {
      setFilteredAdList(adList.ads);
      return;
    }

    if (adStatus === '진행중인 광고') {
      const filteredList = adList.ads.filter((ad) => ad.status === 'active');
      setFilteredAdList(filteredList);
      return;
    }

    const filteredList = adList.ads.filter((ad) => ad.status === 'ended');
    setFilteredAdList(filteredList);
  }, [adStatus]);

  const adSummaries = filteredAdList.map((ad) => <AdSummary key={ad.id} data={ad} />);

  return (
    <div className={styles.manageAd}>
      <h1>광고 관리</h1>
      <div className={styles.top}>
        <button
          type='button'
          className={cx(styles.select, { [styles.focused]: isDropDownOpened })}
          onClick={toggleOptionHanlder}
        >
          <span>{adStatus}</span>
          {dropDownOptions}
          <ArrowDownIcon className={cx({ [styles.rotate]: isDropDownOpened })} />
        </button>
        <button type='button' className={styles.creatAdBtn}>
          광고 만들기
        </button>
      </div>
      <div className={styles.ads}>{adSummaries}</div>
    </div>
  );
};

export default ManageAd;
