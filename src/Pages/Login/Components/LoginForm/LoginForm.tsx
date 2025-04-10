import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Login</h1>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel} htmlFor="username">
            Username:
          </label>
          <input
            className={styles.formInput}
            id="username"
            placeholder="Enter Username"
          />
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.inputLabel} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.formInput}
            id="password"
            placeholder="Enter Password"
            type="password"
          />
        </div>

        <button className={styles.loginBtn}>Login</button>
      </form>
    </div>
  );
};
