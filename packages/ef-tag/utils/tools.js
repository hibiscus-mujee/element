const isArrayLike = (value) => {
  return value !== null && isLength(value.length) && !isFunction(value);
};

const isPlainObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

const isLength = (value) => {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
};

const isFunction = (value) => {
  return Object.prototype.toString.call(value) === '[object Function]';
};

export const isEmpty = (value) => {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value)) {
    return !value.length;
  } else if (isPlainObject(value)) {
    for (let key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const setEmpty = value => {
  let ret;
  switch (Object.prototype.toString.call(value)) {
    case '[object Object]':
      ret = {};
      break;
    case '[object Array]':
      ret = [];
      break;
    case '[object Boolean]':
      ret = false;
      break;
    default:
      ret = null;
  }
  return ret;
};
