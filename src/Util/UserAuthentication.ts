import axios from "axios";
import { User, useUser } from "../Context/UserContext";

/*  Attempts to login user using username and password, updates User context
 *   Return: Returns 0 success, 1 unable to login, -1 Server error
 */

export const handleLogin = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.log("Server error: ");
    return null;
  }
};

export const handleSignup = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/signup",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    console.log("signed up");
  } catch (err) {
    console.log("Error");
    return -1;
  }
};

export const handleLogout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/logout",
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.log(err);
  }
};
