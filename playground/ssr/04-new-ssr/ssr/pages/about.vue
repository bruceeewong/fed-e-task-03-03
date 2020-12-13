<template>
  <div>
    <h1>About</h1>
    <article v-for="item in posts" :key="item.id">
      <h1>{{item.title}}</h1>
      <p>{{item.body}}</p>
    </article>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'About',
  // nuxt中特殊提供的一个钩子函数，专门获取页面服务端渲染的数据
  async asyncData() {
    const {data} = await axios({
        method: 'GET',
        url: 'http://localhost:3000/data.json'
      })

    return {
      title: data.title,
      posts: data.posts
    }
  }
}
</script>