declare module '*.png';
declare module '*.jpg';
declare module '*.md' {
  const content: string;
  export = content;
}
