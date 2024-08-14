import { useState, useMemo, useRef, useEffect } from 'react';

export default function useSafeState(initialState) {
  const [state, setState] = useState(initialState);
  const mountedRef = useRef(true);

  const setSafeState = useMemo(() => (params) => {
    if (mountedRef.current === true) {
      setState(params);
    }
  }, []);

  useEffect(() => () => {
    mountedRef.current = false;
  }, [mountedRef]);

  return [
    state,
    setSafeState,
  ];
}
