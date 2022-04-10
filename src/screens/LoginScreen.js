import styles from './LoginScreen.module.scss';
import logo from '../logo.png';
import { useState } from 'react';
import SignInScreen from './SignInScreen';

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  return (
    <>
      <div className={styles['login-container']}>
        <div className={styles.head}>
          <img className={styles.logo} src={logo} alt="logo" />
          <button className={`btn ${styles['login-btn']}`}>Login</button>
        </div>

        <div
          className={`${styles.body} ${!signIn ? styles['login-body'] : ''}`}
        >
          {signIn ? (
            <SignInScreen />
          ) : (
            <>
              <div className={styles['titles-box']}>
                <h1 className={styles['title']}>
                  Unlimited movies, TV shows and more.
                </h1>
                <h2 className={styles['sub-title']}>
                  Watch anywhere. Cancel anytime.
                </h2>
                <span className={styles['get-started-text']}>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </span>
              </div>
              <div className={styles['input-container']}>
                <input
                  id="email"
                  placeholder="Email Address"
                  className={styles['email']}
                  type="email"
                />
                <button
                  className={styles['get-started-btn']}
                  type="submit"
                  onClick={() => setSignIn(true)}
                >
                  Get Started<span className={styles.arrow}>&#8594;</span>
                </button>
              </div>
            </>
          )}
        </div>
        <div className={styles['gradient-background']}></div>
      </div>
    </>
  );
}

export default LoginScreen;
