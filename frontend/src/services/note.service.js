import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/notes/";

class NoteService {
  getAllNotes() {
    return axios
      .get(API_URL, {
        headers: authHeader()
      })
      .then(response => {
          localStorage.setItem("notes", JSON.stringify(response.data));
        return response.data;
      });
  }

  createNote(content) {
    return axios.put(API_URL + "note", {
      content,
    })}

  deletePost() {
    localStorage.removeItem("note");
  }

}


export default new NoteService();

