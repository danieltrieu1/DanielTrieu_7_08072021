import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/notes/";

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

  deleteNote() {
    localStorage.removeItem("note");
  }

}


export default new NoteService();

