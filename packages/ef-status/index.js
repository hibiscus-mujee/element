import EfStatus from './src/ef-status';
import './require-status';

EfStatus.install = function(Vue) {
  Vue.component(EfStatus.name, EfStatus);
};
export default EfStatus;
