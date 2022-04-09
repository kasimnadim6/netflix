import { useEffect, useState } from 'react';
import logo from '../logo.png';
import styles from './Nav.module.scss';

const Nav = () => {
  const [showBanner, setShowBanner] = useState(false);
  const scrollEventHandler = () => {
    if (window.scrollY > 100) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollEventHandler);
    return () => window.removeEventListener('scroll', scrollEventHandler);
  }, []);
  return (
    <div className={`${styles.nav} ${showBanner && styles['nav--black']}`}>
      <div className={styles.nav__content}>
        <img className={styles['nav__logo']} src={logo} alt="logo" />
        <img
          className={styles['nav__avatar']}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Nav;
