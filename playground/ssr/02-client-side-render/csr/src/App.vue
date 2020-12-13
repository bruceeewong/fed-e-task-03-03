<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Hello {{message}}</h1>
    <section>
      <article v-for="item in posts" :key="item.id">
        <h1>{{item.title}}</h1>
        <p>{{item.body}}</p>
      </article>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      message: 'default message',
      posts: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios({
        method: 'GET',
        url: '/data.json'
      }).then(res => {
        const {data} = res
        this.message = data.message
        this.posts = data.posts
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
