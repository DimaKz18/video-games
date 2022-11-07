import { useEffect } from 'react';

// eslint-disable-next-line
export const useMountEffect = (fun: React.EffectCallback) => useEffect(fun, []);
