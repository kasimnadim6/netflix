import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/authSlice';
import ProfileScreen from './screens/ProfileScreen';
import NotFound from './components/NotFound';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({ uid: authUser.uid, email: authUser.email }));
      } else {
        dispatch(logout);
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={user ? <HomeScreen /> : <LoginScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
