import axios from "axios";
console.log(process.env.REACT_APP_ENQUIRY_API);
export default axios.create({
  baseURL: process.env.REACT_APP_ENQUIRY_API,
  responseType: "json",
});
