import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  userDelete(id, e) {
    e.preventDefault()
    return axios.delete(API_URL + `user/${id}`,)
      .then(response => console.log('Supprimé', response)
      .catch(error => console.log( error )) )
    
  }
}

export default new AuthService();

