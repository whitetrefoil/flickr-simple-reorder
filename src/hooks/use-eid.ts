import { useRef }   from 'react';
import { generate } from 'shortid';


export const useEid = (): [
  (key: string) => string,
  (str: TemplateStringsArray) => string,
] => {
  const idStore = useRef({});

  const eid = (key: string): string => {

    if (idStore.current[key] != null) {
      return idStore.current[key];
    }

    const newId = `eid${generate()}`;
    idStore.current = {
      ...idStore.current,
      [key]: newId,
    };

    return newId;
  };

  const i = (str: TemplateStringsArray): string => eid(str[0]);

  return [eid, i];
};


export const usePid = () => {
  const idStore = useRef({});
  const pid = new Proxy(idStore.current, {
    get: (target, p) => {
      if (p in target) {
        return target[p];
      }
      const newId = `_${generate()}`;
      target[p] = newId;
      return newId;
    },
  });
  return pid as { [key: string]: string };
};
