import c                              from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import { Card }                       from 'react-bootstrap';
import { BsColor }                    from '~/interfaces/bs';
import * as css                       from './index.scss';


const Panel: FC<{
  className?: string;
  title: string;
  color?: BsColor;
  children?: ReactNode;
}> = ({
  className,
  title,
  color = BsColor.Default,
  children,
}) => {

  const variant = color === BsColor.Danger ? css.error :
    color === BsColor.Warning ? css.warning :
      color === BsColor.Success ? css.success :
        color === BsColor.Info ? css.info :
          undefined;

  return (
    <Card className={c(className, css.root, variant)}>
      <Card.Header as="h5" className={css.title}>
        {title}
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};


export default memo(Panel);
