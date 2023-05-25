import axios from "axios";
// import qs from 'qs';

//数据请求URL  http://serviceiris.starrymedia.com/api/1.0/
//图片请求URl  https://serviceiris.uptick.world/

const service = axios.create({
  //baseURL: window.$env.VUE_APP_API_URL,
  //baseURL: "http:localhost:8088/",
  // baseURL: "",
  // baseURL:"http://file.uptick.world/v2/image/url",
  timeout: 300000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // const res = response.data;
    return response.data;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

//xxl 1.0
export let $postThird = (url, params, config) => {
	let res = axios.post(url, params, config);
	return res;
};


//
export let $postBodyJson = async (url,data) => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    data:data,
    url,
  };
  
  let res = await axios(options);
  return res;

};



export default service;
