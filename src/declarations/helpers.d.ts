interface Indexed<T> {[key: string]: T}

type SimpleSet = Indexed<true>;

type Resolved<T> = T extends PromiseLike<infer F> ? F : T;

type AsyncReturnValue<T> = T extends (...args: any[]) => PromiseLike<infer F> ? F : never;

interface Loadable<T> {
  data?: T;
  loading?: true;
  loadError?: Error;
}

interface Saveable<T> {
  data?: T;
  saving?: true;
  saveError?: Error;
}

type nil = null|undefined;
