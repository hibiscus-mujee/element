import { createVue, destroyVM, getDataType, triggerEvent, wait, getTestData } from '../util';

const DELAY = 50;
const toArray = function(obj) {
  return [].slice.call(obj);
};

const getTestColumns = (opt = {}) => {
  const { type, columns } = opt || {};
  if (columns instanceof Array) {
    return columns;
  }
  let col = null;
  if (type === 'radio') {
    col = { type: 'radio' };
  } else if (type === 'selection') {
    col = { type: 'selection' };
  } else if (type === 'index') {
    col = { type: 'index' };
  }
  if (col) {
    return [
      col,
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' }
    ];
  }
  return [
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'address', label: '地址' }
  ];
};

const createVueNode = (attrs = [], opts = {}, config = {}) => {
  const attrsStr = attrs.join(' ');
  return createVue(Object.assign({}, {
    template: `
      <ef-table ref="table" :rows="tableData" :cols="columns" ${ attrsStr }>
        ${ config.template || '' }
      </ef-table>
    `,
    data() {
      return {
        refs: null,
        tableData: getTestData(config.tableData),
        columns: getTestColumns(config),
        ...(config.data || {})
      };
    }
  }, opts), config.mounted || false);
};

describe('EfTable', () => {
  describe('基本用法', () => {
    it('头部', done => {
      const vm = createVueNode();
      setTimeout(_ => {
        const nodes = toArray(vm.$el.querySelectorAll('thead th'));
        expect(nodes.map(node => node.textContent).filter(o => o)).to.eql(['日期', '姓名', '地址']);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('表格属性 stripe border', done => {
      const vm = createVueNode(['stripe', 'border']);
      setTimeout(_ => {
        expect(vm.$el.classList.contains('el-table--striped')).to.be.true;
        expect(vm.$el.classList.contains('el-table--border')).to.be.true;
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('自定义表格行样式', done => {
      const vm = createVueNode([':row-class-name="tableRowClassName"'], {
        methods: {
          tableRowClassName({ rowIndex }) {
            if (rowIndex === 1) {
              return 'warning-row';
            } else if (rowIndex === 3) {
              return 'success-row';
            }
            return '';
          }
        }
      });
      setTimeout(_ => {
        const nodes = toArray(vm.$el.querySelectorAll('.el-table__row'));
        const nodesClassList = nodes.map(node => toArray(node.classList));
        expect(nodesClassList[1].includes('warning-row')).to.be.true;
        expect(nodesClassList[3].includes('success-row')).to.be.true;
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('嵌套表头', done => {
      const columns = [
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
                { prop: 'zip', label: '邮编' }
              ]
            }
          ]
        }
      ];
      const tableData = [
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
      ];
      const vm = createVueNode([], {}, {
        columns, tableData
      });
      const expectNode = (node, { dateStr, colspan, rowspan }) => {
        expect(node.textContent).to.eql(dateStr);
        expect(node.getAttribute('colspan')).to.eql(colspan);
        expect(node.getAttribute('rowspan')).to.eql(rowspan);
      };
      setTimeout(_ => {
        const headerNodes = toArray(vm.$el.querySelectorAll('.el-table__fixed-header-wrapper .is-group .el-table__cell'));
        expectNode(headerNodes[0], { dateStr: '日期', colspan: '1', rowspan: '3' });
        expectNode(headerNodes[1], { dateStr: '配送信息', colspan: '5', rowspan: '1' });
        expectNode(headerNodes[2], { dateStr: '姓名', colspan: '1', rowspan: '2' });
        expectNode(headerNodes[3], { dateStr: '地址', colspan: '4', rowspan: '1' });
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('插槽', done => {
      const template = `
      <template #date-header>
        我是日期，我延展了表头功能
      </template>
      <template #date="{ row }">
        <el-tag>{{ row.date }}</el-tag>
      </template>
    `;
      const vm = createVueNode([], {}, { template });
      setTimeout(_ => {
        const headerNode = vm.$el.querySelector('.el-table__header th');
        const tagNode = vm.$el.querySelector('.el-table__body tbody td span');
        expect(headerNode.textContent.trim()).to.eql('我是日期，我延展了表头功能');
        expect(toArray(tagNode.classList).join(' ')).to.eql('el-tag el-tag--light');
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('固定列和表头', done => {
      const columns = [
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
                { prop: 'zip', label: '邮编' }
              ]
            }
          ]
        }
      ];
      const tableData = [
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
      ];
      const vm = createVueNode(['height="200"', 'style="width:500px"'], {}, {
        columns, tableData
      });
      setTimeout(_ => {
        expect(vm.$el.style.height).to.eql('200px');
        expect(vm.$el.style.width).to.eql('500px');
        const scrollNode = vm.$el.querySelector('.el-table__body-wrapper');
        const scrollNodeClass = toArray(scrollNode.classList);
        expect(scrollNodeClass.includes('is-scrolling-left')).to.be.true;
        const fixedNode = vm.$el.querySelector('.el-table__fixed');
        expect(fixedNode).not.to.null;
        destroyVM(vm);
        done();
      }, DELAY);
    });

    describe('列表合并', () => {
      it('行合并', done => {
        const columns = [
          { prop: 'name', label: '姓名' },
          { prop: 'date', label: '日期' },
          { prop: 'address', label: '地址' }
        ];
        const tableData = [
          {
            name: 'merge1',
            childrenList: [{ date: '2024-4-1', address: 'merge1 addr1' }, { date: '2024-4-2', address: 'merge1 addr2' }]
          },
          {
            name: 'merge2',
            childrenList: [{ date: '2024-4-3', address: 'merge2 addr1' }, { date: '2024-4-4', address: 'merge2 addr2' }]
          }
        ];
        const vm = createVueNode(['need-merge', 'children-prop="childrenList"'], {}, { columns, tableData });
        setTimeout(_ => {
          const rows = vm.$el.querySelectorAll('.el-table__row');
          expect(rows.length).to.eql(4);
          const rows0tds = rows[0].querySelectorAll('td');
          expect(rows0tds.length).to.eql(3);
          const rows0td0 = rows0tds[0];
          expect(rows0td0.getAttribute('rowspan')).to.eql('2');
          expect(rows0td0.textContent.trim()).to.eql('merge1');
          const rows1tds = rows[1].querySelectorAll('td');
          expect(rows1tds.length).to.eql(2);
          destroyVM(vm);
          done();
        }, DELAY);
      });

      it('列合并', done => {
        const mergeSpanList = [
          { spanPosition: [0, 1], offset: [1, 0] },
          { spanPosition: [1, 1], offset: [0, 1] },
          { spanPosition: [2, 0], offset: 1 },
          { spanPosition: [3, 1], offset: { left: 1, right: 1 } }
        ];
        const vm = createVueNode(['need-merge', ':merge-span-list="mergeSpanList"'], {}, { data: { mergeSpanList } });
        setTimeout(_ => {
          const rows = vm.$el.querySelectorAll('.el-table__row');
          const rows0tds = rows[0].querySelectorAll('td');
          expect(rows0tds.length).to.eql(2);
          expect(rows0tds[0].getAttribute('colspan')).to.eql('2');
          expect(rows0tds[1].getAttribute('colspan')).to.eql('1');
          expect(rows0tds[0].textContent.trim()).to.eql('王小虎1');

          const rows1tds = rows[1].querySelectorAll('td');
          expect(rows1tds.length).to.eql(2);
          expect(rows1tds[0].getAttribute('colspan')).to.eql('1');
          expect(rows1tds[1].getAttribute('colspan')).to.eql('2');
          expect(rows1tds[1].textContent.trim()).to.eql('王小虎2');

          const rows2tds = rows[2].querySelectorAll('td');
          expect(rows2tds.length).to.eql(2);
          expect(rows2tds[0].getAttribute('colspan')).to.eql('2');
          expect(rows2tds[1].getAttribute('colspan')).to.eql('1');
          expect(rows2tds[0].textContent.trim()).to.eql('2023-01-04');

          const rows3tds = rows[3].querySelectorAll('td');
          expect(rows3tds.length).to.eql(1);
          expect(rows3tds[0].getAttribute('colspan')).to.eql('3');
          expect(rows3tds[0].textContent.trim()).to.eql('王小虎4');
          destroyVM(vm);
          done();
        }, DELAY);
      });

      it('列合并排序', async() => {
        const columns = [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: '姓名' },
          { prop: 'amount1', label: '数值1', sortable: true },
          { prop: 'amount2', label: '数值2' },
          { prop: 'amount3', label: '数值3' }
        ];
        const tableData = [
          { id: '12987122', name: '王小2', amount1: '234', amount2: '3.2', amount3: 10 },
          { id: '12987123', name: '王小3', amount1: '165', amount2: '4.43', amount3: 12 },
          { id: '12987124', name: '王小4', amount1: '324', amount2: '1.9', amount3: 9 },
          { id: '12987125', name: '王小5', amount1: '621', amount2: '2.2', amount3: 17 },
          { id: '12987126', name: '王小6', amount1: '539', amount2: '4.1', amount3: 15 }
        ];
        const mergeSpanList = [
          { spanPosition: [0, 0], offset: 1 },
          { spanPosition: [2, 0], offset: 1 },
          { spanPosition: [4, 0], offset: 1 }
        ];
        const vm = createVueNode(
          ['need-merge', ':merge-span-list="mergeSpanList"', '@sort-change="onSortChange"'],
          {
            methods: {
              onSortChange({ prop, order }) {
                this.sorting = { prop, order };
              }
            }
          },
          { columns, tableData, data: { mergeSpanList, sorting: { order: null, prop: null } }, mounted: true }
        );
        await wait(DELAY);
        const rows = vm.$el.querySelectorAll('.el-table__row');

        // 排序前
        try {
          const rows0tds = rows[0].querySelectorAll('td');
          expect(rows0tds[0].getAttribute('colspan')).to.eql('2');
          expect(rows0tds[0].textContent.trim()).to.eql('12987122');
          const amount1 = vm.$el.querySelectorAll('thead th')[2];
          expect(amount1.textContent.trim()).to.eql('数值1');
          expect(amount1.classList.contains('is-sortable')).to.be.true;
          const sortCaret0 = amount1.querySelectorAll('i')[0];
          expect(sortCaret0.classList.contains('sort-caret')).to.be.true;
          expect(vm.sorting.order).to.eql(null);
          expect(vm.sorting.prop).to.eql(null);
        } catch (e) {
          throw e;
        }
        // 排序后
        const elm = vm.$el.querySelector('.caret-wrapper');
        // const rows = vm.$el.querySelectorAll('.el-table__row');
        elm.click();
        await wait(DELAY);
        try {
          const rows0tds = rows[0].querySelectorAll('td');
          expect(rows0tds[0].getAttribute('colspan')).to.eql('2');
          expect(rows0tds[0].textContent.trim()).to.eql('12987123');
          expect(vm.sorting.order).to.eql('ascending');
          expect(vm.sorting.prop).to.eql('amount1');
          const ascendingList = toArray(vm.$el.querySelectorAll('.el-table__row :nth-last-child(3) .cell'));
          expect(ascendingList.map(node => node.textContent.trim())).to.eql(['165', '234', '324', '539', '621']);
        } catch (e) {
          throw e;
        }
        destroyVM(vm);
      });
    });

    it('展开行', async() => {
      const columns = [
        {
          type: 'expand',
          cellClassName: row => {
            if (row._index === 0) {
              return false;
            }
            if (row._index === 1) {
              return 1;
            }
            if (row._index === 2) {
              return 'expand-custom';
            }
          }
        },
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' }
      ];
      const vm = createVueNode(
        ['row-key="id"', '@expand-change="onExpand"'],
        {
          methods: {
            onExpand(row, expanded) {
              this.expands = expanded;
            }
          }
        },
        { columns, data: { expands: [] }, mounted: true }
      );
      await wait(DELAY);

      const expands = vm.$el.querySelectorAll('.el-table__row td.el-table__expand-column');
      expands.forEach((node, index) => {
        if (index === 0) {
          expect(node.classList.contains('ef-table-expand_none')).to.be.true;
        } else {
          expect(node.classList.contains('ef-table-expand_none')).to.be.false;
        }
        if (index === 2) {
          expect(node.classList.contains('expand-custom')).to.be.true;
        }
      });

      const icon = vm.$el.querySelector('.el-table__row:nth-child(2) td.el-table__expand-column .el-table__expand-icon');
      // 展开前
      expect(icon.classList.contains('el-table__expand-icon--expanded')).to.be.false;
      icon.click();
      await wait(DELAY);
      // 展开后
      expect(icon.classList.contains('el-table__expand-icon--expanded')).to.be.true;
      expect(vm.$el.querySelectorAll('.el-table__expanded-cell').length).to.equal(1);
      expect(vm.expands).to.eql([{ 'id': 2, 'date': '2023-01-03', 'name': '王小虎2', 'address': '上海市普陀区金沙江路 1517 弄', '_index': 1 }]);
      destroyVM(vm);
    });

    it('树形结构与懒加载', async() => {
      const tableData = [
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
      ];
      const vm = createVueNode(
        ['rowKey="id"', 'lazy', ':load="onLoad"'],
        {
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
                ]);
              }, 1000);
            }
          }
        },
        { tableData, mounted: true }
      );
      await wait(DELAY);
      const expandIcon = vm.$el.querySelector('.el-table__expand-icon');
      expect(expandIcon).to.exist;
      expandIcon.click();
      await wait(0);
      const icon = vm.$el.querySelector('.el-table__expand-icon i');
      expect(icon.classList.contains('el-icon-loading')).to.be.true;
      await wait(1100);
      expect(expandIcon.classList.contains('el-table__expand-icon--expanded')).to.be.true;
      expect(icon.classList.contains('el-icon-arrow-right')).to.be.true;
      // 新增两项
      expect(vm.$el.querySelectorAll('.el-table__row').length).to.equal(6);
      destroyVM(vm);
    });

    it('表尾合计行', async() => {
      const columns = [
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: '姓名' },
        { prop: 'amount1', label: '数值1' },
        { prop: 'amount2', label: '数值2' },
        { prop: 'amount3', label: '数值3' }
      ];
      const tableData = [
        { id: '12987122', name: '王小虎', amount1: '234', amount2: '3.2', amount3: 10 },
        { id: '12987123', name: '王小虎', amount1: '165', amount2: '4.43', amount3: 12 },
        { id: '12987124', name: '王小虎', amount1: '324', amount2: '1.9', amount3: 9 },
        { id: '12987125', name: '王小虎', amount1: '621', amount2: '2.2', amount3: 17 },
        { id: '12987126', name: '王小虎', amount1: '539', amount2: '4.1', amount3: 15 }
      ];
      const vm = createVueNode(
        ['show-summary', ':summary-method="onSummaries"'],
        {
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
          }
        },
        { tableData, columns, mounted: true }
      );
      await wait(DELAY);
      const cells = toArray(vm.$el.querySelectorAll('.el-table__footer .cell'));
      const summaries = cells.map(cell => cell.innerHTML.trim());
      expect(summaries).to.eql(['总价', 'N/A', '1883 元', '15.83 元', '63 元']);
      destroyVM(vm);
    });
  });

  describe('表格事件', () => {
    const validRadio = async(vm, idx) => {
      try {
        const nodes = vm.$el.querySelectorAll('.el-radio');
        nodes[idx].click();
        await wait(DELAY);
        expect(vm.result._index).to.eql(idx);
        expect(nodes[idx].classList.contains('is-checked')).to.be.true;
      } catch (e) {
        throw e;
      }
    };

    it('radio current-change', async() => {
      const columns = [
        { type: 'radio', width: 30, radioCheck: row => row._index === 2 },
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' }
      ];
      const vm = createVueNode(
        ['@current-change="onCurrentChange"', 'radio-by-row-click'],
        {
          methods: {
            onCurrentChange(val) {
              this.result = val;
            }
          }
        },
        { columns, data: { result: null }, mounted: true }
      );
      const vm2 = createVueNode(
        ['@current-change="onCurrentChange"', 'radio-by-row-click'],
        {
          methods: {
            onCurrentChange(val) {
              this.result = val;
            }
          }
        },
        { type: 'radio', data: { result: null }, mounted: true }
      );
      await wait(DELAY);
      // 测试单选功能
      // 初始化时值为2
      expect(vm.$el.querySelectorAll('.el-radio')[2].classList.contains('is-checked')).to.be.true;
      await validRadio(vm, 1);
      await wait(DELAY);

      // 测试 radio-by-row-click
      const cell2 = vm2.$el.querySelectorAll('.el-table__row')[2].querySelectorAll('td')[2];
      const radio2 = vm2.$el.querySelectorAll('.el-radio')[2];
      cell2.click();
      await wait(DELAY);
      try {
        expect(vm2.result._index).to.eql(2);
        expect(radio2.classList.contains('is-checked')).to.be.true;
      } catch (e) {
        throw e;
      }
      destroyVM(vm);
      destroyVM(vm2);
    });

    describe('selection-change', () => {
      const vm = () => createVueNode(
        ['@selection-change="onSelectionChange"', 'radio-by-row-click'],
        {
          methods: {
            onSelectionChange(val) {
              this.result = val;
            }
          }
        },
        { type: 'selection', data: { result: [] }, mounted: true }
      );
      it('checkbox select all', async() => {
        const vmNode = vm();
        await wait(DELAY);
        vmNode.$el.querySelector('.el-checkbox').click();
        await wait(DELAY);
        try {
          expect(vmNode.result).to.length(getTestData().length);
          vmNode.$el.querySelectorAll('.el-checkbox').forEach(node => {
            expect(node.classList.contains('is-checked')).to.be.true;
          });
        } catch (e) {
          throw e;
        }
      });

      it('checkbox select', done => {
        const vmNode = vm();
        setTimeout(_ => {
          const nodes = vmNode.$el.querySelectorAll('.el-checkbox');
          nodes[1].click();
          nodes[3].click();
          setTimeout(_ => {
            expect(vmNode.result).to.length(2);
            expect(vmNode.result[0]._index).to.eql(0);
            expect(vmNode.result[1]._index).to.eql(2);
            expect(nodes[0].querySelector('span').classList.contains('is-indeterminate')).to.be.true;
            expect(nodes[1].classList.contains('is-checked')).to.be.true;
            expect(nodes[3].classList.contains('is-checked')).to.be.true;
            done();
          }, DELAY);
        }, DELAY);
      });
    });

    describe('on-selection', () => {
      const vm = (type) => createVueNode(
        ['@on-selection="onSelection"', 'radio-by-row-click'],
        {
          methods: {
            onSelection(val) {
              this.result = val;
            }
          }
        },
        { type, data: { result: null }, mounted: true }
      );
      const radioVm = vm('radio');
      const selectionVm1 = vm('selection');
      const selectionVm2 = vm('selection');

      it('单选', async() => {
        try {
          await wait(DELAY);
          await validRadio(radioVm, 2);
          expect(getDataType(radioVm.result)).to.eql('Object');
        } catch (e) {
          throw e;
        }
        destroyVM(radioVm);
      });

      it('复选全选', async() => {
        await wait(DELAY);
        const nodes = selectionVm1.$el.querySelectorAll('.el-checkbox');
        nodes[0].click();
        await wait(DELAY);
        try {
          expect(selectionVm1.result).to.length(getTestData().length);
          nodes.forEach(node => {
            expect(node.classList.contains('is-checked')).to.be.true;
          });
        } catch (e) {
          throw e;
        }
        destroyVM(selectionVm1);
      });

      it('复选', async() => {
        await wait(DELAY);
        const nodes2 = selectionVm2.$el.querySelectorAll('.el-checkbox');
        nodes2[1].click();
        nodes2[3].click();
        await wait(DELAY);
        try {
          expect(selectionVm2.result).to.length(2);
          expect(selectionVm2.result[0]._index).to.eql(0);
          expect(selectionVm2.result[1]._index).to.eql(2);
          expect(nodes2[0].querySelector('span').classList.contains('is-indeterminate')).to.be.true;
          expect(nodes2[1].classList.contains('is-checked')).to.be.true;
          expect(nodes2[3].classList.contains('is-checked')).to.be.true;
        } catch (e) {
          throw e;
        }
        destroyVM(selectionVm2);
      });
    });

    describe('filter-change', () => {
      const template = `
        <template #tag="{ row }">
          <el-tag :type="row.tag === '家' ? 'primary' : 'success'">{{ row.tag }}</el-tag>
        </template>
      `;
      const columns = [
        { prop: 'date', label: '日期', sortable: true },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' },
        {
          prop: 'tag',
          columnKey: 'tag',
          label: '标签',
          filters: [
            { text: '家', value: '家' },
            { text: '公司', value: '公司' }
          ],
          filterMethod: (value, row) => row.tag === value
        }
      ];
      const tableData = [
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
      ];
      let vm;
      beforeEach(done => {
        vm = createVueNode(
          ['@filter-change="onFilterChange"'],
          {
            methods: {
              onFilterChange(val) {
                this.filter = val;
              }
            }
          },
          { template, columns, tableData, data: { filter: null }, mounted: true }
        );
        setTimeout(done, DELAY);
      });
      afterEach(() => destroyVM(vm));

      it('过滤图标', () => {
        expect(vm.$el.querySelector('.el-table__column-filter-trigger')).to.exist;
      });
      it('选择标签"家"', async() => {
        const btn = vm.$el.querySelector('.el-table__column-filter-trigger');
        await triggerEvent(btn, 'click', true, false);
        await wait(100);
        const filter = document.body.querySelector('.el-table-filter');
        expect(filter).to.exist;
        // 选择标签"家"
        triggerEvent(filter.querySelector('.el-checkbox'), 'click', true, false);
        // 点击筛选按钮
        triggerEvent(filter.querySelector('.el-table-filter__bottom button'), 'click', true, false);
        await wait(100);
        expect(vm.filter.tag).to.be.eql(['家']);
        expect(vm.$el.querySelectorAll('.el-table__body-wrapper tbody tr')).to.length(2);
      });
    });
  });

  describe('表格方法', () => {
    it('setCurrentRow', async() => {
      const vm = createVueNode(
        ['@current-change="onCurrentChange"'],
        {
          methods: {
            onCurrentChange(val) {
              this.result = val;
            }
          }
        },
        { type: 'radio', data: { result: null }, mounted: true }
      );
      await wait(DELAY);
      // 传入行索引
      vm.$refs.table.setCurrentRow(1);
      expect(vm.result._index).to.eql(1);
      // 传入行对象
      vm.$refs.table.setCurrentRow(vm.tableData[2]);
      expect(vm.result._index).to.eql(2);
      destroyVM(vm);
    });

    it('toggleRowSelection', async() => {
      const vm = createVueNode(
        ['@selection-change="onSelectionChange"'],
        {
          methods: {
            onSelectionChange(val) {
              this.result = val;
            }
          }
        },
        { type: 'selection', data: { result: [] }, mounted: true }
      );
      await wait(DELAY);
      vm.$refs.table.toggleRowSelection(1); // 使用行索引
      vm.$refs.table.toggleRowSelection(vm.tableData[3]); // 使用行对象
      expect(vm.result).to.eql([vm.tableData[1], vm.tableData[3]]);
    });
  });

  describe('表格属性', () => {
    it('selected', async() => {
      const vm = createVueNode(
        ['@selection-change="onSelectionChange"', ':selected="row => row._index % 2 === 0"'],
        {
          methods: {
            onSelectionChange(val) {
              this.result = val;
            }
          }
        },
        { type: 'selection', data: { result: [] }, mounted: true }
      );
      await wait(DELAY);
      expect(vm.result).to.eql([vm.tableData[0], vm.tableData[2]]);
      vm.$el.querySelectorAll('.el-table__row .el-checkbox').forEach((node, idx) => {
        if (idx % 2 === 0) {
          expect(node.classList.contains('is-checked')).to.be.true;
        } else {
          expect(node.classList.contains('is-checked')).to.be.false;
        }
      });
      destroyVM(vm);
    });

    describe('class-name', () => {
      let vm;
      beforeEach(done => {
        vm = vm = createVueNode([
          ':header-cell-class-name="({ column }) => \'header-\' + column.property"',
          ':cell-class-name="({ column }) => column.property"'
        ]);
        setTimeout(done, DELAY);
      });
      afterEach(() => destroyVM(vm));
      it('header-class-name', () => {
        const dateHeader = vm.$el.querySelector('.el-table__header-wrapper th');
        expect(dateHeader.classList.contains('header-date')).to.be.true;
      });
      it('cell-class-name', () => {
        const dateRow = vm.$el.querySelector('.el-table__row td');
        expect(dateRow.classList.contains('date')).to.be.true;
      });
    });
  });
});
