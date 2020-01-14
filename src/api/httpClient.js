import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 12000, // indicates, 1000ms ie. 1 second
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers":
    //   "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json",
    "cache-control": "no-cache",

    // anything you want to add to the headers
  }
});

export default httpClient;
