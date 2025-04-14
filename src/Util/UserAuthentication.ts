import axios from "axios";

/*  Attempts to login user using username and password, updates User context
*   Return: Returns 0 success, 1 unable to login, -1 Server error
*/
export const handleLogin = async (username: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:8080/login", {
            "username": username,
            "password": password
        },);
        console.log(response.data == "");

        return 1;
    } catch (err) {
        console.log("Server error: ");
        return -1
    }
}

export const handleSignup = async (username: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:8080/signup", {
            "username": username,
            "password": password
        })
        console.log("signed up");
    } catch (err) {
        console.log("Error");
        return -1;
    }
}