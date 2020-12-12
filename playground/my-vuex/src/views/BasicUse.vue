<template>
  <div>
    <h2>State</h2>
    <p>msg: {{$store.state.msg}}</p>
    <p>count: {{$store.state.count}}</p>
    <br>
    <h2>Getters</h2>
    <p>reverseMsg: {{$store.getters.reverseMsg}}</p>
    <br>
    <h2>Mutations</h2>
    <p><button @click="$store.commit('increment', 1)">increment</button></p>
    <br>
    <h2>Actions</h2>
    <p><button @click="$store.dispatch('incrementAsync', 6)">incrementAsync</button></p>
  </div>
</template>

<script>
export default {
  name: 'BasicUse'
}
</script>

<style>

</style>