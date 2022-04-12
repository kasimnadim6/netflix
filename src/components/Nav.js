import { useEffect, useState } from 'react';
import logo from '../logo.png';
import styles from './Nav.module.scss';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
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
        <img
          className={styles['nav__logo']}
          src={logo}
          alt="logo"
          onClick={() => navigate('/')}
        />
        <img
          className={styles['nav__avatar']}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
          onClick={() => navigate('profile')}
        />
      </div>
    </div>
  );
};

export default Nav;
