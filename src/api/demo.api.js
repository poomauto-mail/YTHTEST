import {httpClient} from "./httpClient";

const END_POINT = "/values";
const getDemo = () => httpClient.get(END_POINT);
const saveDemo = () => httpClient.get(END_POINT);

export {
  getDemo,
  saveDemo
};
