import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/users/";

class UserService {
  getAllUsers() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => {
          localStorage.setItem("allUsers", JSON.stringify(response.data))
      });
  }

}

export default new UserService();