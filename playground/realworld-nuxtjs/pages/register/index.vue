<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="errMsg in errors" :key="errMsg">{{ errMsg }}</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                required
                placeholder="Your Name"
              />
            </fieldset>
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
                minlength="8"
              />
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user";
import ErrorHandler from "@/utils/error-handler";

export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async onSubmit() {
      try {
        const data = await register({ user: this.user });
        // TODO: 保存登录态
        console.log(data);
        // 跳转首页
        // this.$router.push("/");
      } catch (e) {
        if (!e.response) throw e;
        this.errors = ErrorHandler.handleAuthError(e.response.data.errors);
      }
    },
  },
};
</script>

<style></style>
