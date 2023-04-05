import axios from "axios";
// import * as dotenv from "dotenv"

// dotenv.config()

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
}); //https://nmk33dgsdl.execute-api.us-east-1.amazonaws.com/dev
// export function getCookie(name) {
//   const cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith(name)) {
//       return cookie.substring(name.length + 1);
//     }
//   }
//   return null;
// }

export function gettoken(){
  const location= window.location
  const query=new URLSearchParams(location.search);
  const token =query.get('token')
  alert(token)
  return token;

}
