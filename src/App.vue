<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/scrollbar">Scrollbar</router-link>
    </div>
    <div class="box">
      <el-scrollbar>
        <router-view />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss">
.box {
  height: calc(100vh - 57px);
  border: 1px solid #eee;
}
</style>
