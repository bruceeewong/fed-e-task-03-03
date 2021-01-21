import request from "@/utils/request";

// 获取公共文章
export const getArticles = (params) => {
  return request({
    url: "/api/articles",
    method: "GET",
    params: params,
  });
};

// 获取用户关注的文章
export const getFeedArticles = (params) => {
  return request({
    url: "/api/articles/feed",
    method: "GET",
    headers: {
      Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM1OTQwLCJ1c2VybmFtZSI6ImJydXNraSIsImV4cCI6MTYxNjM3MTM0Mn0.7izoVBdP_CEcjVazhN8VKmwV4hwfMwmsAeH5kiuIm4g`,
    },
    params: params,
  });
};
