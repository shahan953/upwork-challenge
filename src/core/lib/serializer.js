import moment from "moment";

export const serialize = (obj) => {
  let str = [];
  // eslint-disable-next-line no-unused-vars
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const formatDate = (date = '') => {
  return moment(date).format('LL');
}