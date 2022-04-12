import styles from './ProfileScreen.module.scss';
import Nav from '../components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/authSlice';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [plans, setPlans] = useState([
    {
      type: 'Netflix Basic',
      resolution: '480p',
      subscribe: false,
    },
    {
      type: 'Netflix Standard',
      resolution: '1080p',
      subscribe: false,
    },
    {
      type: 'Netflix Premium',
      resolution: '4K+HDR',
      subscribe: true,
    },
  ]);

  const signOutHandler = () => {
    auth.signOut();
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
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
              <h3>Plans (current plan: Netflix Premium) </h3>
              <span>Renewal date: 04/04/2022</span>
            </div>
            <div className={styles.plans}>
              {plans.map((plan) => (
                <div className={styles.plan}>
                  <div className={styles['plan__info']}>
                    <h4>{plan.type}</h4>
                    <span>{plan.resolution}</span>
                  </div>
                  <button
                    className={`btn ${styles['subscribe-btn']}`}
                    disabled={plan.subscribe}
                  >
                    {plan.subscribe ? 'Current Plan' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>
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