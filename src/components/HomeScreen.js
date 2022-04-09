import Banner from './Banner';
import styles from './HomeScreen.module.scss';
import Nav from './Nav';

const HomeScreen = () => {
  return (
    <div className={styles['home-screen']}>
      <Nav />
      <Banner />
    </div>
  );
};

export default HomeScreen;
