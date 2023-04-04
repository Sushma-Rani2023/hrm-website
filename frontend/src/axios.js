import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: false,
}); //https://wdyagprup2.execute-api.us-east-1.amazonaws.com/dev/

export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
