// 已登录，跳转首页
export default function({ store, redirect }) {
  if (store.state.user) {
    return redirect("/");
  }
}
