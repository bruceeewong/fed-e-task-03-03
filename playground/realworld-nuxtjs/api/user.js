import { request } from "@/plugins/request";

// 用户登录
export const login = (data) => {
  return request({
    url: "/api/users/login",
    method: "POST",
    data: data,
  });
};

// 用户注册
export const register = (data) => {
  return request({
    url: "/api/users",
    method: "POST",
    data: data,
  });
};
