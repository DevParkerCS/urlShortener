import { useState } from "react";
import { Nav } from "../../Components/Nav/Nav";
import { LoginForm } from "./Components/LoginForm/LoginForm";
import { SignupForm } from "./Components/SignupForm/SignupForm";
import styles from "./Login.module.scss";

export const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  return (
    <div>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.formWrapper}>
          {isLoggingIn ? <LoginForm /> : <SignupForm />}
          <p
            className={styles.loginOption}
            onClick={() => setIsLoggingIn(!isLoggingIn)}
          >
            {isLoggingIn
              ? "Don't have an account? Sign Up"
              : "Already have an Account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};
