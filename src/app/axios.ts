import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8787",
  timeout: 5000,
  headers: { "User-Agent": "Portal-v0.1.0" },
});
