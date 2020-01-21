import Vue from "vue";
const getValue = async key => {
  return await Vue.prototype.$getItem(key).then(res => res);
};

const setValue = async (key, value) => {
  return await Vue.prototype.$setItem(key, value);
};

const removeItem = async key => {
  return await Vue.prototype.$removeItem(key);
};
const clearStorage = async () => {
  return await Vue.prototype.$clearStorage();
};
const lengthOfStorage = async () => {
  return await Vue.prototype.$lengthOfStorage().then(res => res);
};

export default {
  getValue,
  setValue,
  removeItem,
  clearStorage,
  lengthOfStorage
};
//Examples
// await Vue.forage.setValue("A","A");
// await Vue.forage.setValue("B","B");
// var rem = await Vue.forage.removeItem("A");
// var sss = await Vue.forage.getValue("B");
// var length = await Vue.forage.lengthOfStorage();