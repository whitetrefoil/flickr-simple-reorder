import c                              from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import * as css                       from './index.scss';


const Page: FC<{
  className?: string;
  header?: ReactNode;
  children?: ReactNode;
}> = ({
  className,
  header,
  children,
}) => {
  if (header == null) {
    return (
      <article className={c(css.root, className)}>
        {children}
      </article>
    );
  }

  return (
    <article className={c(css.root, className)}>
      <header className={css.header}>{header}</header>
      <div className={css.content}>{children}</div>
    </article>
  );
};


export default memo(Page);
