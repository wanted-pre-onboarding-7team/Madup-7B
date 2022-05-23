import { useState, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { Logo, ArrowDownIcon, DashBoardIcon, GraphIcon, GuidepIcon, PlusIcon } from 'assets/svg/index';

const Sidebar = () => {
  const [isShow, setIsShow] = useState(false);

  const handleDropdown = (e: MouseEvent<HTMLElement>) => {
    setIsShow(!isShow);
  };

  return (
    <aside className={styles.sidebar}>
      <Logo className={styles.logo} />
      <hr />
      <section className={styles.serviceSection} onClick={handleDropdown} role='presentation'>
        <p className={styles.subject}>서비스</p>
        <div className={styles.serviceBox}>
          매드업
          <ArrowDownIcon className={styles.arrowIcon} />
        </div>
        {isShow && (
          <div className={styles.dropdownBox}>
            <p>코딩</p>
            <div className={styles.serviceAdd}>
              <span>서비스 추가</span>
              <PlusIcon fill='#586cf5' className={styles.plusIcon} />
            </div>
          </div>
        )}
      </section>
      <section className={styles.adSection}>
        <p className={styles.subject}>광고 센터</p>
        <NavLink className={({ isActive }) => (isActive ? styles.adButton : styles.inActive)} to='/'>
          <button type='button' className={styles.sidebarButton}>
            <DashBoardIcon className={styles.adIcon} />
            <span>대시보드</span>
          </button>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.adButton : styles.inActive)} to='/advertisement'>
          <button type='button' className={styles.sidebarButton}>
            <GraphIcon className={styles.adIcon} />
          </button>
          <span>광고관리</span>
        </NavLink>
      </section>
      <section className={styles.guideSection}>
        <div className={styles.guide}>
          <GuidepIcon className={styles.guideIcon} />
          <p className={styles.useGuide}>레버 이용 가이드</p>
          <span className={styles.guideMent}>시작하기 전에 알아보기</span>
        </div>
        <p className={styles.useMent}>레버는 함께 만들어갑니다.</p>
        <p className={styles.useTerms}> 이용약관</p>
      </section>
    </aside>
  );
};

export default Sidebar;
