import { useLayoutEffect } from 'preact/hooks';

export const useTitle = (title: string) => {
  useLayoutEffect(() => {
    const prev = window.document.title ?? 'Simple Check-in';
    window.document.title = `${title} | Simple Check-in`;
    return () => {
      window.document.title = prev;
    };
  });
};
