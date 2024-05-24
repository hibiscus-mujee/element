import EfForm from './src/ef-form';

/* istanbul ignore next */
EfForm.install = function(Vue) {
  Vue.component(EfForm.name, EfForm);
};
export default EfForm;
