import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ForwardRefRenderFunction } from 'react';

declare module 'react' {
  type FRRF<T, P = {}> = ForwardRefRenderFunction<T, P>;
  type CPWR<T extends ElementType> = ComponentPropsWithRef<T>;
  type CPWOR<T extends ElementType> = ComponentPropsWithoutRef<T>;
}
