<template>
  <div class="home">
    <h2>icon-svg 自定义icon组件使用</h2>
    <h4>1 添加颜色，hover</h4>
    <icon-svg class="red" icon-name="friend-fields"></icon-svg>
    <h4>
      2 添加事件 <icon-svg class="event" icon-name="add" @click="eventHandle" />
    </h4>
    <div>{{ num }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      num: 1
    }
  },
  methods: {
    eventHandle() {
      console.log(888)
      this.num++
    }
  },
  mounted() {
    console.log(this.num)
    console.log(this._data)
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  font-size: 24px;
}
.red {
  color: #f00;
}
.red:hover {
  color: #42b983;
  cursor: pointer;
}
</style>
