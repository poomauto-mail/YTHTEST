import {httpClient} from "./httpClient";

const ALL_LIST = "/supplier/list";

const getAllList = () => httpClient.get(ALL_LIST);

export {
    getAllList
}