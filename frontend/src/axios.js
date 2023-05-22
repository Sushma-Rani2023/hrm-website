import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
}); 

export function gettoken(){
  console.log('axios',process.env.REACT_APP_BASE_URL)
  const location= window.location
  const query=new URLSearchParams(location.search);
  const token =query.get('token')
  window.history.pushState({}, document.title, window.location.pathname)
  return token;
}
