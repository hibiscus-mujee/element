# EfTable 表格

对 `ElementUI` 的 `Table` 表格进行二次封装，将原本的业务驱动模式封装为数据驱动模式，用户将不再需要重复编写 `el-table-column`
标签，只需专注于表格结构与数据结构，这能大量减少重复性代码，在多次生成相同表格结构时尤为有效。

## 基础用法

> `cols` 的每一条数据（eg: `{prop: 'date', label: '日期'}`）等价于一条 `el-table-column`，通过这种结构化生成方式，能减少大量的重复性代码。

```vue

<template>
  <ef-table :rows="tableData" :cols="columns"></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/yLPjKaa?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/yLPjKaa">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 带斑马纹表格

~~`ef-table` 的 `table-options` 属性用来接收 `el-table` 的原生属性，~~ 使用 `stripe` 字段即可生成斑马纹表格。

> 现版本推荐直接使用 `el-table` 的原生属性

```vue

<template>
  <!-- <ef-table :rows="tableData" :cols="columns" :table-options="{ stripe: true }"></ef-table> -->
  <ef-table :rows="tableData" :cols="columns" stripe></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/podVLKe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/podVLKe">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 带边框表格

`ef-table` 默认不带有竖直方向上的边框，~~在 `table-options`~~ 设置 `border: true` 即可。

```vue

<template>
  <!-- <ef-table :rows="tableData" :cols="columns" :table-options="{ border: true }"></ef-table> -->
  <ef-table :rows="tableData" :cols="columns" border></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/GROddGr?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/GROddGr">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 自定义表格状态

使用 `row-class-name` 属性，可以自定义表格的行状态。

```vue

<template>
  <!-- <ef-table :rows="tableData" :cols="columns" :table-options="{ rowClassName: tableRowClassName }"></ef-table> -->
  <ef-table :rows="tableData" :cols="columns" :row-class-name="tableRowClassName"></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-自定义表格状态" src="https://codepen.io/HibiscusToYou/embed/NWwMzxL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/NWwMzxL">
  ef-table-自定义表格状态</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 固定列和表头

当表格数据量过多时，可以设置 `height` 属性固定表头，同时对 `columns` 中的对应列设置 `fixed` 即可完成表头和数据列的固定。

> 1. 数据表的总宽度设置 `width` 属性，其值为百分比字符串。
> 2. 当数据量动态变化时，可以设置 `maxHeight` 最大高度。
> 3. `fixed` 可选值为 `true` `left` `right`。

```vue

<template>
  <!-- <ef-table :rows="tableData" :cols="columns" :table-options="{ height: 200 }"></ef-table> -->
  <ef-table :rows="tableData" :cols="columns" height="200" :style="{ width: '50%' }"></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期', fixed: true, width: 150 },
          { prop: 'name', label: '姓名', width: 200 },
          { prop: 'province', label: '省份', width: 200 },
          { prop: 'city', label: '城市', width: 200 },
          { prop: 'address', label: '市区', width: 200 },
          { prop: 'zip', label: '邮编', width: 200 },
        ],
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-固定表头" src="https://codepen.io/HibiscusToYou/embed/LYOmmap?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/LYOmmap">
  ef-table-固定表头</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 多级表头

在一些存在多级表头的复杂的表格结构中，`ef-table` 相较于 `el-table` 会有更大的优势，开发者只需要关注数据列之间的递进关系，而不需要编写繁琐的 `el-table-column` 嵌套。

> 注意，在使用了多级表头后，表头的宽度拖移功能将会失效，此时需要在 `column` 配置项里手动配置宽度。

> 本示例中，使用了表头的插槽模板。本组件支持对任何表头的自定义，只需使用 `v-slot:[column.prop]-header` 格式，通过每一项 `column` 的 `prop` 值与 `-header` 拼接即可定位。与原生组件的插槽相比，本组件开发维护成本更小，视觉效果更为简洁，同时也增强了插槽的功能性。

```vue

<template>
  <ef-table :rows="tableData" :cols="columns">
    <template #province-header="{ column }">
      <el-tag>{{ column.label }}</el-tag>
    </template>
  </ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期', fixed: true, width: 150 },
          {
            label: '配送信息',
            children: [
              { prop: 'name', label: '姓名' },
              {
                label: '地址',
                children: [
                  { prop: 'province', label: '省份' },
                  { prop: 'city', label: '城市' },
                  { prop: 'address', label: '市区' },
                  { prop: 'zip', label: '邮编' },
                ]
              }
            ]
          },
        ],
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/zYPjLKd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/zYPjLKd">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 单选

在 `column` 配置里 `type = 'radio'` 即可实现表格单选功能。使用 `ef-table` 对外暴露的方法 `setCurrentRow`，参数为行索引或者是行对象以选择对应行。

在实现单选过程中，可以使用（非必须）一个空白列，使其 `type = 'index'` 即可显示其行号，默认从 1 开始（在设置 `type = 'index'` 后可通过 `index` 属性设置起始行号。）。

> 1. `current-change` 事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`，并且此时的数据会带有 `_index` 表示该行的索引值。
> 2. `on-selection` 事件是兼容写法，在同一个组件页面复用时无法判断是单选或是复选时可采用。（注：如果返回值明确时，推荐选择对应的事件，单选为 `current-change`，多选为 `selection-change`）
>    + 单选：返回值为对象
>    + 复选：返回值为数组

> 在默认情况下，点击行时并不会触发单选按钮的状态更新，如果要同步操作，需要设置 `radio-by-row-click`

> 在 `column` 配置项里，使用回调函数 `radioCheck | Function(row)` 可以预置表格单选按钮的初始状态

```vue

<template>
  <ef-table ref="singleTable" :rows="tableData" :cols="columns" highlight-current-row @current-change="handleCurrentChange"></ef-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(1)">选中第二行</el-button>
    <el-button @click="setCurrent(tableData[3])">选中第四行</el-button>
    <el-button @click="setCurrent()">取消选择</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { type: "radio", width: 50, radioCheck: row => row._index === 1 },
          { prop: "date", label: "日期" },
          { prop: "name", label: "姓名" },
          { prop: "address", label: "地址" }
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ]
      }
    },
    methods: {
      setCurrent(index) {
        this.$refs.singleTable.setCurrentRow(index);
      },
      handleCurrentChange(val) {
        console.log(val);
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/BamVdrp?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/BamVdrp">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 多选

在实现表格多选时需要新增一项空白列，使其 `type = 'selection'`。与实现单选类似，在多选时只需传入包含多选项索引的数组即可。通过原生事件 `selection-change` 即可完成对多选事件的监听。

> `selected` 属性接收一个包含行索引的数组，它将会为当前表格默认选中行。

```vue

<template>
  <ef-table
    ref="multipleTable"
    :rows="tableData"
    :cols="columns"
    :selected="handleSelected"
    @selection-change="handleSelectionChange"
  ></ef-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([1, 3])">选中第二，四行</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { type: 'selection', width: 50 },
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods: {
      handleSelected(row) {
        return row._index % 2 === 0;
      },
      toggleSelection(selections) {
        selections && this.$refs.multipleTable.toggleRowSelection(selections);
        !selections && this.$refs.multipleTable.clearSelection()
      },
      handleSelectionChange(val) {
        console.log('selection-change', val)
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-表格多选" src="https://codepen.io/HibiscusToYou/embed/xxPJbme?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/xxPJbme">
  ef-table-表格多选</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 排序与筛选

在需要进行排序的列中，设置 `sortable` 属性即可开启，然后通过 `sort-change` 事件完成对排序方法改变时的监听。开启筛选功能与 `el-table` 的实现大同小异，在 `column` 中定义 `filters` 和 `filter-method` 两个属性，然后使用 `filter-change` 事件完成监听。`columnKey` 可以指定对应的属性值，否则 `filter-change` 的返回值将为 `{ "el-table_1_column_4": ["家"]}` 类似结构。

> 注：`columnKey` 可以指定对应的属性值，影响 `filter-change` 的返回值：
>
> ```
> { "el-table_1_column_4": ["家"] }  // 未指定
> { "tag": ["家"] }  // columnKey: "tag"
> ```

> 在本示例中，使用了插槽 `tag`，在后面的章节我们将重点讲解本组件插槽具体使用与其强大之处。

```vue

<template>
  <ef-table
    :rows="tableData"
    :cols="columns"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
  >
    <template #tag="{ row }">
      <el-tag :type="row.tag === '家' ? 'primary' : 'success'">{{ row.tag }}</el-tag>
    </template>
  </ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期', sortable: true },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
          {
            prop: 'tag',
            label: '标签',
            columnKey: 'tag',
            filters: [
              { text: '家', value: '家' },
              { text: '公司', value: '公司' }
            ],
            filterMethod: (value, row) => row.tag === value
          }
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '家'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag: '公司'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '家'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '公司'
          }
        ]
      }
    },
    methods: {
      handleSortChange({ column, prop, order }) {
        console.log('sort-change test', { column, prop, order });  // checked
      },
      handleFilterChange(filters) {
        console.log('filter-change test', filters);  // checked
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-表格排序与筛选" src="https://codepen.io/HibiscusToYou/embed/XWzBbev?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/XWzBbev">
  ef-table-表格排序与筛选</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 展开行

通过设置 `type = 'expand'` 和 `#expand` 可以开启展开行功能。

> 1. 在 `column` 配置里，可以通过 `cellClassName` 回调方法进行控制展开按钮的显示。
> 2. 在存在默认展开行的情况下，该方法失效，因为其本质只是隐藏了展开按钮，并未影响内部机制。

```vue

<template>
  <ef-table :rows="tableData" :cols="columns">
    <template #expand="{ row }">
      <span>expand: {{row}}</span>
    </template>
  </ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { type: 'expand', width: 30, cellClassName: row => row._index === 0 },
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/wvZNgJa?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/wvZNgJa">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


## 树形结构与懒加载

支持树类型的数据的显示。当 row 中包含 `children` 字段时，被视为树形数据。渲染树形数据时，必须要指定 `row-key`。支持子节点数据异步加载。设置 Table 的 `lazy` 属性为 true 与加载函数 `load`
。通过指定 row 中的 `hasChildren` 字段来指定哪些行是包含子节点。`children` 与 `hasChildren` 都可以通过 `tree-props` 配置。

> 数据行包含 `children` 字段且未设置 `need-merge` 时才会被渲染成树形结构。在设置 `need-merge` 之后，该表格将会根据 `tableData` 的数据结构自动合并。

```vue

<template>
  <ef-table :rows="tableData" :cols="columns" border row-key='id' lazy :load="onLoad" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
        ],
        tableData: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            hasChildren: true
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods: {
      onLoad(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      }
    },
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-树形结构与懒加载" src="https://codepen.io/HibiscusToYou/embed/WNXKwGz?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/WNXKwGz">
  ef-table-树形结构与懒加载</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 表尾合计行

```vue

<template>
  <ef-table :rows="tableData" :cols="columns" show-summary :summaryMethod="onSummaries"></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: '姓名' },
          { prop: 'amount1', label: '数值1' },
          { prop: 'amount2', label: '数值2' },
          { prop: 'amount3', label: '数值3' },
        ],
        tableData: [
          { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10 },
          { id: '12987123', name: '王小虎', amount1: '165', amount2: '4.43', amount3: 12 },
          { id: '12987124', name: '王小虎', amount1: '324', amount2: '1.9', amount3: 9 },
          { id: '12987125', name: '王小虎', amount1: '621', amount2: '2.2', amount3: 17 },
          { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 }
        ]
      }
    },
    methods: {
      onSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    },
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-表尾合计行" src="https://codepen.io/HibiscusToYou/embed/NWwBNJE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/NWwBNJE">
  ef-table-表尾合计行</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 单元格合并

单元格的合并是表格的常见操作，在 `el-table` 中，需要开发者手动编写 `span-method`
方法，为此所编写的合并函数，有一定的理解难度，提高了后续的维护成本。本组件正是基于此类问题，淡化了合并方法，通过数据结构数据间的嵌套关系，所见即所得，最终的表格结构将与数据结构保持一致，开发模式由业务生成变成数据生成。

### 行合并

在进行行合并时，只需给 `ef-table` 设置 `need-merge` 属性即可。在默认情况下 `children` 作为子项的键值，但考虑到真实业务，数据间的递进关系，可以通过 `children-prop` 指定相关字段。

> 1. 目前仅支持单次合并，不支持数据间的递归。
> 2. 当前组件同原生 `el-table` 一样不支持在合并后进行排序操作，这会破坏掉合并结果导致错位。后续有项目需要再进行组件迭代。

```vue

<template>
  <ef-table :rows="tableData" :cols="columns" need-merge children-prop="subjects"></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: '姓名' },
          { prop: 'subject', label: '科目' },
          {
            prop: 'examination',
            label: '考试',
            align: 'center',
            children: [
              { prop: 'exam1', label: '考试1' },
              { prop: 'exam2', label: '考试2' },
              { prop: 'exam3', label: '考试3' },
              { prop: 'exam4', label: '考试4' },
            ]
          },
        ],
        tableData: [
          {
            id: '10001',
            name: '王小虎',
            subjects: [
              {
                subject: '语文',
                exam1: 101.1,
                exam2: 101.2,
                exam3: 101.3,
                exam4: 101.4,
              },
              {
                subject: '数学',
                exam1: 102.1,
                exam2: 102.2,
                exam3: 102.3,
                exam4: 102.4,
              },
              {
                subject: '英语',
                exam1: 103.1,
                exam2: 103.2,
                exam3: 103.3,
                exam4: 103.4,
              },
            ]
          },
          {
            id: '10002',
            name: '王小美',
            subjects: [
              {
                subject: '语文',
                exam1: 111.1,
                exam2: 111.2,
                exam3: 111.3,
                exam4: 111.4,
              },
              {
                subject: '数学',
                exam1: 112.1,
                exam2: 112.2,
                exam3: 112.3,
                exam4: 112.4,
              },
              {
                subject: '英语',
                exam1: 113.1,
                exam2: 113.2,
                exam3: 113.3,
                exam4: 113.4,
              },
            ]
          },
          {
            id: '10003',
            name: '王小龙',
            subjects: [
              {
                subject: '语文',
                exam1: 121.1,
                exam2: 121.2,
                exam3: 121.3,
                exam4: 121.4,
              },
              {
                subject: '数学',
                exam1: 122.1,
                exam2: 122.2,
                exam3: 122.3,
                exam4: 122.4,
              },
              {
                subject: '英语',
                exam1: 123.1,
                exam2: 123.2,
                exam3: 123.3,
                exam4: 123.4,
              },
            ]
          },
        ]
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/HibiscusToYou/embed/KKyBbYy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/KKyBbYy">
  Untitled</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 列合并

在进行列合并时，需要设置 `need-merge` 属性，同时为 `merge-span-merge` 属性传入带有合并信息的数组即可。

`merge-span-list` 中的每一项，必须带有两个参数：`spanPosition` 和 `offset` 分别代表单元格坐标以及基于该单元格进行左右的一个偏移量。

> 先前已经被合并过的单元格将不能被再次进行列合并操作。

```vue

<template>
  <ef-table
    :rows="tableData"
    :cols="columns"
    need-merge
    children-prop="subjects"
    :merge-span-list="mergeSpanList"
  ></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: '姓名' },
          { prop: 'subject', label: '科目' },
          {
            prop: 'examination',
            label: '考试',
            align: 'center',
            children: [
              { prop: 'exam1', label: '考试1' },
              { prop: 'exam2', label: '考试2' },
              { prop: 'exam3', label: '考试3' },
              { prop: 'exam4', label: '考试4' },
            ]
          },
        ],
        tableData: [
          {
            id: '10001',
            name: '王小虎',
            subjects: [
              {
                subject: '语文',
                exam1: 101.1,
                exam2: 101.2,
                exam3: 101.3,
                exam4: 101.4,
              },
              {
                subject: '数学',
                exam1: 102.1,
                exam2: 102.2,
                exam3: 102.3,
                exam4: 102.4,
              },
              {
                subject: '英语',
                exam1: 103.1,
                exam2: 103.2,
                exam3: 103.3,
                exam4: 103.4,
              },
            ]
          },
          {
            id: '10002',
            name: '王小美',
            subjects: [
              {
                subject: '语文',
                exam1: 111.1,
                exam2: 111.2,
                exam3: 111.3,
                exam4: 111.4,
              },
              {
                subject: '数学',
                exam1: 112.1,
                exam2: 112.2,
                exam3: 112.3,
                exam4: 112.4,
              },
              {
                subject: '英语',
                exam1: 113.1,
                exam2: 113.2,
                exam3: 113.3,
                exam4: 113.4,
              },
            ]
          },
          {
            id: '10003',
            name: '王小龙',
            subjects: [
              {
                subject: '语文',
                exam1: 121.1,
                exam2: 121.2,
                exam3: 121.3,
                exam4: 121.4,
              },
              {
                subject: '数学',
                exam1: 122.1,
                exam2: 122.2,
                exam3: 122.3,
                exam4: 122.4,
              },
              {
                subject: '英语',
                exam1: 123.1,
                exam2: 123.2,
                exam3: 123.3,
                exam4: 123.4,
              },
            ]
          },
        ],
        mergeSpanList: [
          {
            spanPosition: [0, 3],  // 王小虎 -> 考试1 -> 101.1 -> 左偏移
            offset: [1, 0]
          },
          {
            spanPosition: [4, 3],  // 王小美 -> 考试1 -> 112.1 -> 左右偏移
            offset: {
              left: 1,
              right: 1
            }
          },
          {
            spanPosition: [8, 2],  // 王小龙 -> 科目 -> 英语 -> 右偏移
            offset: 1
          },
          {
            spanPosition: [3, 0],  // 已合并单元格，失效
            offset: [1, 0]
          },
        ],
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-列合并" src="https://codepen.io/HibiscusToYou/embed/XWzBOJy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/XWzBOJy">
  ef-table-列合并</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 列合并排序

在不涉及行合并的情况下，列合并操作仍然支持排序操作。

```vue

<template>
  <ef-table
    :rows="tableData"
    :cols="columns"
    need-merge
    :merge-span-list="mergeSpanList"
  ></ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: '姓名' },
          { prop: 'amount1', label: '数值1', sortable: true },
          { prop: 'amount2', label: '数值2' },
          { prop: 'amount3', label: '数值3' },
        ],
        tableData: [
          {
            id: '12987122',
            name: '王小2',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          },
          {
            id: '12987123',
            name: '王小3',
            amount1: '165',
            amount2: '4.43',
            amount3: 12
          },
          {
            id: '12987124',
            name: '王小4',
            amount1: '324',
            amount2: '1.9',
            amount3: 9
          },
          {
            id: '12987125',
            name: '王小5',
            amount1: '621',
            amount2: '2.2',
            amount3: 17
          },
          {
            id: '12987126',
            name: '王小6',
            amount1: '539',
            amount2: '4.1',
            amount3: 15
          }
        ],
        mergeSpanList: [
          {
            spanPosition: [0, 0],
            offset: 1
          },
          {
            spanPosition: [2, 0],
            offset: 1
          },
          {
            spanPosition: [4, 0],
            offset: 1
          },
        ],
      }
    }
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-列合并排序" src="https://codepen.io/HibiscusToYou/embed/rNYrPwR?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/rNYrPwR">
  ef-table-列合并排序</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 插槽

`ef-table` 延展了 `el-table` 的插槽功能，使得开发者能在繁杂的 `el-table-column` 项中解放出来。

> `ef-table` 的每一列，只要配置了 `prop` 值，则就存在着两个插槽项：
>
> 1. `header` 插槽：`prop` 值与 `-header` 拼接，返回当前列配置 `column` 值；
> 2. `body` 插槽：`prop` 值，返回当前行 `row` 值：
> 	+ 相较于 `el-table` 的插槽，此处并未抛出 `$index` 值，该值被 `row._index` 所代替，因为这里的索引其实是被计算出来的；
> 	+ 同样也没有抛出 `column` 值，因为考虑到实际业务里绝大多数情况只需要用到 `row`。

> 注意此处的 `operate` 操作列有一个特殊的配置项 `denyMerge`，其作用是用来避免该列被自动进行行合并，默认值为 `false`。

```vue

<template>
  <ef-table
    :rows="tableData"
    :cols="columns"
    need-merge
    children-prop="subjects"
    :merge-span-list="mergeSpanList"
  >
    <template #examination-header="{ column }">
      我是
      <el-tag>{{ column.label }}</el-tag>
      <div>我延展了 header 插槽功能。</div>
    </template>

    <template #id="{ row }">
      我的 ID 是
      <el-tag type="success">{{ row.id }}</el-tag>
      <div>我延展了行合并单元格插槽功能。</div>
    </template>

    <template #exam3="{ row }">
      <div>科目：{{ row.subject }}</div>
      <div>分数：{{ row.exam3 }}</div>
    </template>

    <template #operate="{ row }">
      <el-button @click="edit(row)" type="text">编辑</el-button>
      <el-button @click="() => {}" type="text">删除</el-button>
    </template>
  </ef-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { prop: 'id', label: 'ID', width: '150px' },
          { prop: 'name', label: '姓名', width: 100 },
          { prop: 'subject', label: '科目' },
          {
            prop: 'examination',
            label: '考试',
            align: 'center',
            children: [
              { prop: 'exam1', label: '考试1' },
              { prop: 'exam2', label: '考试2' },
              { prop: 'exam3', label: '考试3' },
              { prop: 'exam4', label: '考试4' },
              { prop: 'operate', label: '操作', denyMerge: true }
            ]
          },
        ],
        tableData: [
          {
            id: '10001',
            name: '王小虎',
            subjects: [
              {
                subject: '语文',
                exam1: 101.1,
                exam2: 101.2,
                exam3: 101.3,
                exam4: 101.4,
              },
              {
                subject: '数学',
                exam1: 102.1,
                exam2: 102.2,
                exam3: 102.3,
                exam4: 102.4,
              },
              {
                subject: '英语',
                exam1: 103.1,
                exam2: 103.2,
                exam3: 103.3,
                exam4: 103.4,
              },
            ]
          },
          {
            id: '10002',
            name: '王小美',
            subjects: [
              {
                subject: '语文',
                exam1: 111.1,
                exam2: 111.2,
                exam3: 111.3,
                exam4: 111.4,
              },
              {
                subject: '数学',
                exam1: 112.1,
                exam2: 112.2,
                exam3: 112.3,
                exam4: 112.4,
              },
              {
                subject: '英语',
                exam1: 113.1,
                exam2: 113.2,
                exam3: 113.3,
                exam4: 113.4,
              },
            ]
          },
          {
            id: '10003',
            name: '王小龙',
            subjects: [
              {
                subject: '语文',
                exam1: 121.1,
                exam2: 121.2,
                exam3: 121.3,
                exam4: 121.4,
              },
              {
                subject: '数学',
                exam1: 122.1,
                exam2: 122.2,
                exam3: 122.3,
                exam4: 122.4,
              },
              {
                subject: '英语',
                exam1: 123.1,
                exam2: 123.2,
                exam3: 123.3,
                exam4: 123.4,
              },
            ]
          },
        ],
        mergeSpanList: [
          {
            spanPosition: [0, 3],  // 王小虎 -> 考试1 -> 101.1 -> 左偏移
            offset: [1, 0]
          },
          {
            spanPosition: [4, 3],  // 王小美 -> 考试1 -> 112.1 -> 左右偏移
            offset: {
              left: 1,
              right: 1
            }
          },
          {
            spanPosition: [8, 2],  // 王小龙 -> 科目 -> 英语 -> 右偏移
            offset: 1
          },
          {
            spanPosition: [3, 0],  // 已合并单元格，失效
            offset: [1, 0]
          },
        ],
      }
    },
    methods: {
      edit(row) {
        console.log(row);
      }
    },
  }
</script>
```

<iframe height="300" style="width: 100%;" scrolling="no" title="ef-table-插槽功能延展" src="https://codepen.io/HibiscusToYou/embed/podZGxq?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/HibiscusToYou/pen/podZGxq">
  ef-table-插槽功能延展</a> by zxt (<a href="https://codepen.io/HibiscusToYou">@HibiscusToYou</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## EfTable Attributes

| 参数                 | 说明                                                                                                                         | 类型            | 可选值 | 默认值      |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|---------------|-----|----------|
| data               | 表格数据                                                                                                                       | array         | —   | —        |
| columns            | 表格列配置项                                                                                                                     | array         | —   | —        |
| children-prop      | 用以指定进行行合并的子项键值                                                                                                             | string        | —   | children |
| need-merge         | 标记该表格是否需要进行合并操作，包括列合并以及行合并                                                                                                 | boolean       | —   | false    |
| merge-span-list    | 用以指定需要进行列合并的单元格及其偏移量                                                                                                       | array         | —   | —        |
| selected           | 用以指定默认选中的行方法                                                                                                               | Function(row) | —   | —        |
| radio-by-row-click | 在 `type = 'radio'` 时有效，用来同步更新用户点击行操作时单选按钮的状态                                                                               | boolean       | —   | false    |
| —                  | 向下兼容 `el-table` 的属性（已检验常用属性），具体参考 [el-table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) | —             | —   | —        |

## columns Attributes

`columns` 属性下的每一条配置项，其实就等同于一条 `el-table-column`，因此能兼容 `el-table-column` 的所有属性，具体参考 [el-table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)

| 参数       | 说明                                                         | 类型          | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------------ | ------------- | ------ | ------ |
| denyMerge  | 用来避免该列被自动进行行合并                                 | boolean       | —      | false  |
| radioCheck | 在 `type = 'radio'` 时有效，用来预置表格单选按钮的初始状态，回调返回值为布尔值 | Function(row) | —      | false  |
| —          | 兼容 `el-table-column` 的所有属性，具体参考 [el-table-column Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes) | —             | —      | —      |

## EfTable Methods

`ef-table` 对外暴露的方法本质上是传递给 `el-table` 原生方法，因此大部分方法可参考 [el-table Methods](https://element.eleme.cn/#/zh-CN/component/table#table-methods)，以下是有所变化的两个方法：

| 方法名             | 说明                                                         | 参数                 |
| ------------------ | ------------------------------------------------------------ | -------------------- |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，直接传递当前行索引即可。如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | index\|row, selected |
| setCurrentRow      | 用于单选表格，设定某一行为选中行，直接传递当前行索引即可，如果调用时不加参数，则会取消目前高亮行的选中状态。 | index\|row           |
| —                  | 目前已验证 `el-table` 的绝大多数方法，具体可参考 [Table Methods](https://element.eleme.cn/#/zh-CN/component/table#table-methods) | —                    |

## To Fix

- [x] 树形结构与懒加载：在懒加载状态下，没有加载状态图标。
