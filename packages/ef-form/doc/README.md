# EfForm 气泡表单

在管理台的实际业务中，往往会出现大量的条件筛选，这些条件所对应的输入型控件会占据大量无效的视觉空间，从而影响到用户的阅读体验。

本组件目的是收集非常用的输入型组件，通过与 `ef-tag` 组件联动，将这些条件以 `tag` 标签类型进行呈现并隐藏真实输入组件，从而节省出视觉空间。同时，通过统一管理输入组件，可以在一定程度上规范输入组件样式不统一、布局不一致的问题。

## 基础用法

`ef-form` 与 `el-form` 用法上基本一致，大部分参数也能兼容。

```vue

<template>
  <ef-form :model="ruleForm" label-width="80px">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
  </ef-form>
  <ef-tag :data="ruleForm"></ef-tag>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          desc: ''
        }
      }
    }
  }
</script>
```

<iframe height="450" style="width: 100%;" scrolling="no" title="ef-form-基础用法" src="https://codepen.io/HibiscusToYou/embed/OJzLmVM?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/OJzLmVM">
  ef-form-基础用法</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
