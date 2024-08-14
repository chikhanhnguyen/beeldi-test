import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function makeDispatchable(actionCreator) {
  return (dependencies = []) => {
    const dispatch = useDispatch();

    return useCallback((...params) => dispatch(actionCreator(...params)), [dispatch, ...dependencies]);// eslint-disable-line react-hooks/exhaustive-deps
  };
}
