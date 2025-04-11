import axios from "axios";

/*  Attempts to login user using username and password, updates User context
*   Return: Returns 0 success, 1 unable to login, -1 Server error
*/
export const handleLogin = async (username: string, password: string) => {
    try {
        console.log(username, password);
        const response = await axios.post("http://localhost:8080/login", {
            "username": username,
            "password": password
        });

        return 1;
    } catch (err) {
        console.log("Server error: ");
        return -1
    }
}