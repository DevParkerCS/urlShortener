import { handleSignup } from "../../../../Util/UserAuthentication";
import styles from "../LoginForm/LoginForm.module.scss";

export const SignupForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;

    const res = handleSignup(username, password);
  }

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
