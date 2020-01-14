import httpClient from "./httpClient";

const ALL_LIST = "/list/alllist";

const GetAllList = () => httpClient.get(ALL_LIST);

export {
    GetAllList
}