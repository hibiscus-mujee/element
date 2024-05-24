# EfSearch 选择输入框

## 基础用法

```vue

<ef-search v-model="searchForm" :conditions="selectOptions"></ef-search>

<script>
  export default {
    data() {
      return {
        selectOptions: [
          {
            field: "username",
            label: "用户名"
          },
          {
            field: "email",
            label: "邮箱"
          }
        ],
        searchForm: {
          username: "",
          email: ""
        }
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-search-基础用法" src="https://codepen.io/HibiscusToYou/embed/bGLaqxM?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/bGLaqxM">
  ef-search-基础用法</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>
</iframe>

## 有禁用选项

> 在 `conditions` 中设置 `disabled` 为 `true`

```vue

<ef-search :conditions="selectOptions" :attach="searchForm"></ef-search>

<script>
  export default {
    data() {
      return {
        selectOptions: [
          {
            field: "username",
            label: "用户名"
          },
          {
            field: "email",
            label: "邮箱",
            disabled: true
          }
        ],
        searchForm: {
          username: "",
          email: ""
        }
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/PoQQVyB?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/PoQQVyB">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 整体禁用

> 在 `ef-search` 设置 `disabled` 为 `true`

```vue

<ef-search v-model="searchForm" :conditions="selectOptions" disabled></ef-search>

<script>
  export default {
    data() {
      return {
        selectOptions: [
          {
            field: "username",
            label: "用户名"
          },
          {
            field: "email",
            label: "邮箱"
          }
        ],
        searchForm: {
          username: "",
          email: ""
        }
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="整体禁用" src="https://codepen.io/HibiscusToYou/embed/gOGmdgE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/gOGmdgE">
  整体禁用</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
## 自定义模板

`ef-search` 定义了作用域插槽 `option`，用户能对下拉框进行个性化定制。

```vue

<ef-search v-model="searchForm" :conditions="selectOptions">
<template #option="{ option }">
  <span style="float: left">{{ option.label }}</span>
  <span style="float: right; color: #8492a6; font-size: 13px">{{ option.field }}</span>
</template>
</ef-search>

<script>
  export default {
    data() {
      return {
        selectOptions: [
          {
            field: "username",
            label: "用户名"
          },
          {
            field: "email",
            label: "邮箱"
          }
        ],
        searchForm: {
          username: "",
          email: ""
        }
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-search-插槽" src="https://codepen.io/HibiscusToYou/embed/abqqMGq?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/abqqMGq">
  ef-search-插槽</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 可搜索

> 在 `ef-search` 设置 `filterable` 为 `true`

```vue

<ef-search :conditions="selectOptions" :attach="searchForm" filterable></ef-search>

<script>
  export default {
    data() {
      return {
        selectOptions: [
          {
            field: "username",
            label: "用户名"
          },
          {
            field: "email",
            label: "邮箱"
          }
        ],
        searchForm: {
          username: "",
          email: ""
        }
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/abqqrmz?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/abqqrmz">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
## 高度配置

> 使用 `height` 属性可对组件进行高度限制，范围为 `20px <= height <= 40px`

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/RwQQmLL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/RwQQmLL">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 输入框属性

> `conditions` 的 `option` 属性继承于 `Element Input` 输入框

```vue

<ef-search :conditions="selectOptions" :attach="searchForm"></ef-search>

<script>
  export default {
    data() {
      return {
        selectOptions: [
          {
            field: "username",
            label: "用户名"
          },
          {
            field: "mobile",
            label: "手机号码",
          },
          {
            field: "email",
            label: "邮箱",
            type: "textarea",
            width: 220,
            autosize: {minRows: 1, maxRows: 3},
          },
        ],
        searchForm: {
          username: '',
          mobile: '',
          email: ''
        }
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="输入框属性" src="https://codepen.io/HibiscusToYou/embed/zYEZJdd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/zYEZJdd">
  输入框属性</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Select Attributes

| 参数              | 说明       | 类型            | 是否必选 | 默认值     |
|-----------------|----------|---------------|------|---------|
| conditions      | 下拉选项结构   | Array[Object] | 是    |         |
| attach          | 表单绑定     | Object        | 是    |         |
| width           | 下拉选择器宽度  | Number/String | 否    | 120     |
| backgroundColor | 下拉选择器背景色 | String        | 否    | #f5f7fa |
| disabled        | 下拉禁用     | Boolean       | 否    | false   |
| filterable      | 下拉选项可筛选  | Boolean       | 否    | false   |
| placeholder     | 占位符      | String        | 否    | 请输入     |

## Option Attributes

### 下拉选项基础属性

| 参数          | 说明     | 类型            | 是否必选 | 默认值         |
|-------------|--------|---------------|------|-------------|
| field       | 下拉选项值  | String/Number | 是    |             |
| label       | 下拉选项标签 | String/Number | 是    |             |
| width       | 输入框宽度  | Number/String | 否    | 200         |
| placeholder | 占位符    | String        | 否    | 请输入${label} |
| disabled    | 下拉选项禁用 | Boolean       | 否    | false       |

### 下拉选项继承属性

> 继承属性用来控制输入框的属性，可参照 [Element Input 输入框](https://element.eleme.cn/#/zh-CN/component/input#input-attributes)

> **注：** option 的 disabled 属性针对于下拉选项的禁用，并以此来影响输入框的状态。

## EfSearch Events

| 事件名称          | 说明         | 回调参数   |
|---------------|------------|--------|
| select-change | 选中值发生变化时触发 | 目前的选中值 |

