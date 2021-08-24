<template>
  <svg class="svg-icon" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="'#icon-' + iconName" />
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    iconName: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
