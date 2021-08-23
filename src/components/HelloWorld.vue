<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg class="icon aaa" aria-hidden="true">
      <use xlink:href="#icon-friend-fields" />
    </svg>
    <svg width="500" height="110" class="icon bbb" aria-hidden="true">
      <use xlink:href="#icon-friend-fields" />
    </svg>
    <svg width="500" height="110" class="icon bbb" aria-hidden="true">
      <use xlink:href="#icon-save" />
    </svg>
    <svg width="500" height="110" class="icon bbb" aria-hidden="true">
      <use xlink:href="#icon-search" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.aaa {
  font-size: 15px !important;
}
.bbb {
  font-size: 15px !important;
}
</style>
