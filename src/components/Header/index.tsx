import styles from './header.module.scss';
import { AlarmIcon, SettingIcon, ProfileIcon } from 'assets/svg/index';

const Header = () => {
  return (
    <header className={styles.header}>
      <section>
        <div className={styles.iconWrapper}>
          <AlarmIcon />
        </div>
        <div className={styles.iconWrapper}>
          <SettingIcon />
        </div>
        <div className={styles.profileWrapper}>
          <ProfileIcon />
        </div>
        <span>원티드님</span>
      </section>
    </header>
  );
};

export default Header;
