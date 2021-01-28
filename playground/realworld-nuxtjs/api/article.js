import { request } from "@/plugins/request";

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
    params: params,
  });
};

export const favoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "POST",
  });
};

export const unfavoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "DELETE",
  });
};
