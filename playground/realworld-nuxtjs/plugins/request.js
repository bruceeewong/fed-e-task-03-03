import axios from "axios";

export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// 插件导出函数必须作为default成员。
// 借助插件机制，获取上下文（含app, store, req, param ...）
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(
    (config) => {
      // 请求发送前执行
      const { user } = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    (error) => {
      // 请求未发出
      return Promise.reject(error);
    }
  );
  // 响应拦截器
};
