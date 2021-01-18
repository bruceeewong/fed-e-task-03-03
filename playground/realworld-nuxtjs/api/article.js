import request from "@/utils/request";

// 获取公共文章
export const getArticles = (params) => {
  return request({
    url: "/api/articles",
    method: "GET",
    params: params,
  });
};
