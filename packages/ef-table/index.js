import EfTable from './src/ef-table';
import Column from './src/column';

/* istanbul ignore next */
EfTable.install = function(Vue) {
  Vue.component(EfTable.name, EfTable);
  Vue.component(Column.name, Column);
};
export default EfTable;
