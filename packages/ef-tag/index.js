import EfTag from './src/ef-tag';

/* istanbul ignore next */
EfTag.install = function(Vue) {
  Vue.component(EfTag.name, EfTag);
};
export default EfTag;
