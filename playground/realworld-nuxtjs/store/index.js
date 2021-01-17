// nuxt 会加载
// 写成函数形式，服务端是例会调用，初始化
const cookieParser = process.server ? require("cookieparser") : undefined;

export const state = () => {
  return {
    user: null,
  };
};

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null;

    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (err) {
        // No valid cookie found
      }
    }

    commit("setUser", user);
  },
};
