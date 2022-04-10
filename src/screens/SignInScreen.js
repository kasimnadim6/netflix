import styles from './SignInScreen.module.scss';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignInScreen = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(4, 'Must be at least 4 characters long')
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const singUpHandler = (e) => {
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
          color="warning"
          onChange={formik.handleChange}
          value={formik.values.username}
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
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          className={styles.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button className={`btn ${styles['sign-in-btn']}`}>Sign In</button>
        <span className={styles['sign-up-link']}>
          New to Netflix?{' '}
          <a href="/" onClick={singUpHandler}>
            Sign Up now
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignInScreen;
