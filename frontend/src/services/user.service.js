import axios from "axios";
import AuthHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/users/";

class UserService {
  getAllUsers() {
    return axios
      .get(API_URL, { headers: AuthHeader() })
      .then(response => {
          localStorage.setItem("allUsers", JSON.stringify(response.data))
      });
  }

}

export default new UserService();