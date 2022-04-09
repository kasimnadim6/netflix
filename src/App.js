import styles from './App.module.scss';
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <div className={styles.app}>
      <HomeScreen />
    </div>
  );
}

export default App;
