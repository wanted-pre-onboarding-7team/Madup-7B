import { useState, MouseEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import cx from 'classnames';

import { ArrowDownIcon } from 'assets/svg';
import { adStatusAtom } from 'routes/ManageAd/state';
import { IAd } from 'types/adList';
import adList from 'data/adLIst.json';

import AdSummary from './AdSummary/AdSummary';

import styles from './manageAd.module.scss';

const ManageAd = () => {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const [filteredAdList, setFilteredAdList] = useState<IAd[]>([]);
  const [adStatus, setAdStatus] = useRecoilState(adStatusAtom);

  const toggleOptionHanlder = () => {
    setIsDropDownOpened((prev) => !prev);
  };

  const selectStatusHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.dataset.status) setAdStatus(e.currentTarget.dataset.status);
  };

  const dropDownOptions = isDropDownOpened && (
    <ul className={styles.options} role='menu'>
      <li data-status='전체 광고' role='menuitem' onClick={selectStatusHandler}>
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
        <div
          className={cx(styles.select, { [styles.focused]: isDropDownOpened })}
          role='presentation'
          onClick={toggleOptionHanlder}
        >
          <span>{adStatus}</span>
          {dropDownOptions}
          <ArrowDownIcon className={cx({ [styles.rotate]: isDropDownOpened })} />
        </div>
        <button type='button'>광고 만들기</button>
      </div>
      <div className={styles.ads}>{adSummaries}</div>
    </div>
  );
};

export default ManageAd;
