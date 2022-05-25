import { useState, FC, SetStateAction, Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import { cx } from 'styles';

import { Logo, ArrowDownIcon, DashBoardIcon, GraphIcon, GuidepIcon, PlusIcon } from 'assets/svg/index';

import styles from './sidebar.module.scss';

interface IProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<IProps> = ({ setIsLoading }) => {
  const [isShow, setIsShow] = useState(false);

  const handleDropdown = () => {
    setIsShow(!isShow);
  };

  return (
    <aside className={styles.sidebar}>
      <Logo className={styles.logo} />
      <hr />
      <section className={styles.serviceSection} onClick={handleDropdown} role='presentation'>
        <p className={styles.subject}>서비스</p>
        {/* dropdown 컴포넌트로 변경 */}
        <div className={cx(styles.serviceBox, { [styles.focused]: isShow })}>
          <span>매드업</span>
          <ArrowDownIcon className={cx(styles.arrowIcon, { [styles.rotate]: isShow })} />
        </div>
        {isShow && (
          <ul className={styles.dropdownBox}>
            <li>매드업</li>
            <div className={styles.serviceAdd}>
              <span>서비스 추가</span>
              <PlusIcon className={styles.plusIcon} />
            </div>
          </ul>
        )}
      </section>
      <section className={styles.adSection}>
        <p className={styles.subject}>광고 센터</p>
        {/* 컴포넌트로 분리하기 */}
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to='/'
          onClick={() => {
            setIsLoading(true);
          }}
        >
          <DashBoardIcon className={styles.adIcon} />
          <span>대시보드</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to='/advertisement'
          onClick={() => {
            setIsLoading(true);
          }}
        >
          <GraphIcon className={styles.adIcon} />
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
