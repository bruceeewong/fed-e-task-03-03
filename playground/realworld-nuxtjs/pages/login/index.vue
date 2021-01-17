<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="errMsg in errors" :key="errMsg">{{ errMsg }}</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                required
                placeholder="Password"
              />
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import ErrorHandler from "@/utils/error-handler";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async onSubmit() {
      try {
        const data = await login({ user: this.user });
        // TODO: 保存登录态
        console.log(data);
        // 跳转首页
        this.$router.push("/");
      } catch (e) {
        if (!e.response) throw e;
        this.errors = ErrorHandler.handleAuthError(e.response.data.errors);
      }
    },
  },
};
</script>

<style>
</style>