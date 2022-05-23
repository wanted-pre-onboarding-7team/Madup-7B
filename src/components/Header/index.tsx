import styles from './header.module.scss';
import { AlarmIcon, SettingIcon, ProfileIcon } from 'assets/svg/index';

const Header = () => {
  return (
    <header className={styles.header}>
      <section>
        <AlarmIcon className={styles.headerIcon} />
        <SettingIcon className={styles.headerIcon} />
        <ProfileIcon />
        <span>원티드님</span>
      </section>
    </header>
  );
};

export default Header;
