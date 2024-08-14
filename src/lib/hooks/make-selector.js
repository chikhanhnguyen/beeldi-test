import { useSelector } from 'react-redux';
import { get as _get } from 'lodash';

export default function makeSelector(path, defaultValue) {
  return typeof path === 'function'
    ? (...params) => useSelector((state) => path(state, ...params))
    : () => useSelector(state => _get(state, path, defaultValue));
}
