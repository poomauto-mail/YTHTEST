import httpClient from "./httpClient";

const LOG_IN = "/authentication/login";
const LOG_OUT = "/authentication";

const logIn = (username, password) => httpClient.post(LOG_IN, {username: username, password: password})
const logOut = (username, password) => httpClient.post(LOG_OUT, {username: username, password: password})

export  {
    logIn,
    logOut
}
