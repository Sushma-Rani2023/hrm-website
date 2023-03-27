import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: false,
});//https://tusypau41h.execute-api.us-east-1.amazonaws.com/dev