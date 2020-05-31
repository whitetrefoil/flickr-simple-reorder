import { RS, useRS } from './use-root-selector';

export type ValOf<T> = T|RS<T>;

export const valTo$ = <T>(valOrSelector: ValOf<T>) => typeof valOrSelector === 'function'
  ? valOrSelector as RS<T>
  : () => valOrSelector as T;

export const useVal = <T>(valOrSelector: ValOf<T>, debugTag?: string) => useRS(
  valTo$(valOrSelector),
  debugTag,
);
