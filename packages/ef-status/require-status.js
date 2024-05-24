const statusCtx = require.context('examples/play/commonStatus', true, /\.status\.js$/);
const status = {};
statusCtx.keys().forEach(key => {
  const fileRE = /([^./]+)\.status\.js/g;
  const match = fileRE.exec(key);
  if (!match) return true;
  const moduleName = match[1].trim();
  const moduleValue = statusCtx(key).default || statusCtx(key);
  status[moduleName] = moduleValue;
});
export const ALL_STATUS = status;
