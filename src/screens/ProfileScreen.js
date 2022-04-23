import styles from './ProfileScreen.module.scss';
import Nav from '../components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/authSlice';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import PlansScreen from './PlansScreen';
import {
  clearSubscription,
  selectSubscription,
} from '../features/subscriptionSlice';
import Loader from '../components/Loader';

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);
  const { isLoading, isSubscribed, name, current_period_end } =
    useSelector(selectSubscription);
  console.log(isLoading);
  const signOutHandler = () => {
    auth.signOut();
    dispatch(logout());
    dispatch(clearSubscription());
    navigate('/');
  };

  return (
    <>
      {isLoading && <Loader />}
      <Nav />
      <div className={styles['profile']}>
        <h1 className={styles['profile__header']}>Edit Profile</h1>
        <div className={styles['profile__body']}>
          <img
            className={styles['profile__picture']}
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile"
          />
          <div className={styles['profile__body__info']}>
            <h2 className={styles['user']}>{user?.email}</h2>
            <div className={styles['current-plan']}>
              <h3>{isSubscribed && `Plans (current plan: ${name})`}</h3>
              <h3>
                {!isSubscribed && 'Please choose any plan to enjoy Netflix.'}
              </h3>
              <span>
                {isSubscribed &&
                  `Renewal date: ${new Date(
                    current_period_end * 1000
                  ).toLocaleDateString()}`}
              </span>
            </div>
            <PlansScreen />
            <button
              onClick={signOutHandler}
              className={`btn ${styles['sign-out']}`}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
