<template>
  <div>
    <h4>1. 懒加载数组件</h4>
    <el-tree :props="props" :load="loadNode" lazy show-checkbox> </el-tree>
  </div>
</template>

<script>
export default {
  name: 'ElComp',
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      count: 1
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])
      setTimeout(() => {
        // 1. 借助 leaf 属性来模拟是否有子节点
        // const data = [
        //   { name: 'zone' + this.count++, leaf: Math.random() > 0.5 }
        // ]

        // 2. 通过查询 得到的data是否为空数组来判断是否是末节点
        let data
        if (Math.random() > 0.5) {
          data = [{ name: 'zone' + this.count++ }]
        } else {
          data = []
        }
        resolve(data)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped></style>
