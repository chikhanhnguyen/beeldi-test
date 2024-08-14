import { useState, useEffect, useRef, useMemo } from 'react';

export default function useAsync(asyncFunc, initialParams = {}, immediate = true) {
  const [loading, setLoading] = useState(immediate);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const execute = useMemo(() => (params) => {
    setLoading(true);
    return asyncFunc({
      ...initialParams,
      ...params,
    }).then((res) => {
      if (!mountedRef.current) { return null; }
      setData(res);
      setError(null);
      setLoading(false);
      return res;
    }).catch((err) => {
      if (!mountedRef.current) { return null; }
      setError(err);
      setLoading(false);
      throw err;
    });
  }, [asyncFunc, setData, setError, setLoading]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (immediate) {
      execute(initialParams);
    }
  }, [immediate, execute]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => {
    mountedRef.current = false;
  }, [mountedRef]);// eslint-disable-line react-hooks/exhaustive-deps

  return {
    execute,
    loading,
    data,
    error,
  };
}
