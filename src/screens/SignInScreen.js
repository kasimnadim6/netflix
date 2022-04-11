import styles from './SignInScreen.module.scss';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';

const SignInScreen = () => {
  const validate = (values) => {
    let errors = {};
    const regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/i;
    if (!values.username) {
      errors.username = 'Please enter a valid email address or phone number.';
    } else if (!regex.test(values.username)) {
      errors.username = 'Invalid Username';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4 || values.password.length > 60) {
      errors.password =
        'Your password must contain between 4 and 60 characters.';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const signInHandler = (e) => {};
  const registerHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles['sign-in-container']}>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles['sign-in-form']} onSubmit={formik.handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Email or phone number"
          variant="filled"
          fullWidth
          required
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 12, color: '#fff' } }}
          FormHelperTextProps={{ style: { fontSize: 11, fontWeight: 800 } }}
          className={styles.username}
          color={
            formik.touched && Boolean(formik.errors.username)
              ? 'warning'
              : 'success'
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          helperText={formik.touched.username && formik.errors.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="filled"
          fullWidth
          required
          inputProps={{ style: { fontSize: 12 } }}
          InputLabelProps={{ style: { fontSize: 14, color: '#fff' } }}
          FormHelperTextProps={{ style: { fontSize: 11, fontWeight: 800 } }}
          color={
            formik.touched && Boolean(formik.errors.password)
              ? 'warning'
              : 'success'
          }
          className={styles.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <button
          className={`btn ${styles['sign-in-btn']}`}
          onClick={signInHandler}
        >
          Sign In
        </button>
        <span className={styles['sign-up-link']}>
          New to Netflix?{' '}
          <a href="/" onClick={registerHandler}>
            Sign Up now
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignInScreen;
