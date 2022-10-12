import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser, startLoader } from './features/authSlice';
import db from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen';
import NotFound from './components/NotFound';
import Loader from './components/Loader';
import {
  addSubscription,
  selectSubscription,
} from './features/subscriptionSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);
  const { isLoading, isSubscribed } = useSelector(selectSubscription);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch(startLoader);
      if (authUser) {
        dispatch(login({ uid: authUser.uid, email: authUser.email }));
        dispatch(startLoader);
      } else {
        dispatch(logout);
        dispatch(startLoader);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const getSubscriptions = async () => {
      dispatch(startLoader());
      const subscriptionDocsRef = collection(
        db,
        'customers',
        user.uid,
        'subscriptions'
      );
      const docsSnap = await getDocs(subscriptionDocsRef);
      docsSnap.forEach((doc) => {
        dispatch(
          addSubscription({
            role: doc.data().role,
            current_period_start: doc.data().current_period_start.seconds,
            current_period_end: doc.data().current_period_end.seconds,
          })
        );
      });
      !docsSnap.docs.length && navigate('/profile');
    };
    user?.uid && !isSubscribed && getSubscriptions();
  }, [dispatch, navigate, user, isSubscribed]);
  return (
    <>
      {isLoading || !user ? (
        <Loader />
      ) : (
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={user ? <HomeScreen /> : <LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
