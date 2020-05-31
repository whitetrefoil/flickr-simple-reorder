declare interface CSSNameMap {
  [plain: string]: string;
}

declare module '*.sass' {
  const map: CSSNameMap;
  export = map;
}

declare module '*.scss' {
  const map: CSSNameMap;
  export = map;
}

declare module '*.less' {
  const map: CSSNameMap;
  export = map;
}

declare module '*.css' {
  const map: CSSNameMap;
  export = map;
}
