import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/posts/";

class PostService {
  getAllPosts() {
    return axios
      .get(API_URL, {
        headers: authHeader()
      })
      .then(response => {
          localStorage.setItem("posts", JSON.stringify(response.data));
        return response.data;
      });
  }

  deletePost() {
    localStorage.removeItem("post");
  }

}
export default new PostService();

