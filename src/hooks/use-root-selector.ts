import { FC, useDebugValue } from 'react';
import { shallowEqual, useSelector } from 'react-redux';


export type RootSelector<TSelected> = (state: RootState) => TSelected;
export type RS<TSelected> = RootSelector<TSelected>;

export type RootSC<TSelected> = (...args: any[]) => RootSelector<TSelected>;
export type RSC<TSelected> = RootSC<TSelected>;

export type FCRS<T> = FC<{ $data: RS<T> }>;

export type RootSelected<T> = T extends RootSelector<infer F> ? F : never;


export const useRootSelector = <TSelected>(
  selector: RS<TSelected>,
  tag?: string,
): TSelected => {
  const res = useSelector<RootState, TSelected>(selector);
  useDebugValue(tag, t => t == null ? JSON.stringify(res) : `${t}: ${JSON.stringify(res)}`);
  return res;
};

export const useRS = useRootSelector;


export const useRootSelectorShallow = <TSelected>(
  selector: RS<TSelected>,
  tag?: string,
): TSelected => {
  const res = useSelector<RootState, TSelected>(selector, shallowEqual);
  useDebugValue(tag, t => t == null ? String(res) : `${t}: ${res}`);
  return res;
};

export const useRSS = useRootSelectorShallow;


export const useRootSelectorCustom = <TSelected>(
  selector: RS<TSelected>,
  comparator: (left: TSelected, right: TSelected) => boolean,
  tag?: string,
): TSelected => {
  const res = useSelector<RootState, TSelected>(selector, comparator);
  useDebugValue(tag, t => t == null ? String(res) : `${t}: ${res}`);
  return res;
};

export const useRSC = useRootSelectorCustom;
