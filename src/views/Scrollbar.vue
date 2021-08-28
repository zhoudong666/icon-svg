<template>
  <div class="scrollbar">
    <h1>对elementui里的隐藏组件el-scrollbar 使用</h1>
    <div>使用三步骤</div>
    <ol>
      <li>使用el-scrollbar对有滚动条的部分包裹</li>
      <li>el-scrollbar的外层必须要有宽高</li>
      <li>
        设置全局样式 .el-scrollbar__wrap {overflow-x: hidden;}.el-scrollbar
        {height: 100%;}
      </li>
    </ol>
    <div style="height:1000px;border:1px solid red;width:2000px;">
      <div>
        测试测试外层 200px * 200px
      </div>
      <div style="height:200px;width:200px;border:5px dashed #0f0">
        <el-scrollbar>
          <div style="height:300px;width:300px;border:1px solid #f00">
            inner 300px * 300px
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style>
/* 一定要是全局的样式 */
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar {
  height: 100%;
}
</style>
