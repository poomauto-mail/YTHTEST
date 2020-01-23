import {httpClient} from "./httpClient";

const ALL_LIST = "/supplier/list";
const LIST_PAGINATION = "/job/search";

const getAllList = () => httpClient.get(ALL_LIST);
const getListPagination = (body) => httpClient.post(LIST_PAGINATION, body);


export {
    getAllList,
    getListPagination
}