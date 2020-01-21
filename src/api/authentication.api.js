import {httpClient} from "./httpClient";

const LOG_IN = "/login";
const LOG_OUT = "/logout";

const logIn = (username, password) => httpClient.post(LOG_IN, {username: username, password: password})
const logOut = () => httpClient.post(LOG_OUT)

export  {
    logIn,
    logOut
}
