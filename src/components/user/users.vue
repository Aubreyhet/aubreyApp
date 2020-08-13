<template>
  <div id="userslist">
    <!-- //导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      // 获取用户列表对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
    }
  },
  created() {
    this.getUesrInfolist()
  },
  methods: {
    async getUesrInfolist() {
      const { data: res } = await this.$http.get('apis/getUserInfo', {
        params: this.queryInfo,
      })
      console.log(res)
    },
  },
}
</script>

<style lang= 'less' scoped>
</style>
