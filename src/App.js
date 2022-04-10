import styles from './App.module.scss';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  const loggedIn = null;
  return (
    <div className={styles.app}>
      {!loggedIn ? <LoginScreen /> : <HomeScreen />}
    </div>
  );
}

export default App;
