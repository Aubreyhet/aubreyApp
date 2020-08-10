<template>
  <div class="home">
    <p>这个是home页面</p>
    <el-button type="info" @click="dropOut">退出</el-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {}
  },
  methods: {
    dropOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style></style>
