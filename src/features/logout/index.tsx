import { prevented }       from '@whitetrefoil/jsx-sp-events/react';
import { useCallback }     from 'preact/hooks';
import React, { FC, memo } from 'react';
import Button              from 'react-bootstrap/Button';
import { useDispatch }     from 'react-redux';
import { Link }            from 'react-router-dom';
import Panel               from '~/components/Panel';
import { useRS }           from '~/hooks/use-root-selector';
import { BsColor }         from '~/interfaces/bs';
import { LOGOUT }          from '~/store/session/actions';
import { $hasLogin }       from '~/store/session/selectors';
import * as css            from './index.scss';


const LogoutFeature: FC = () => {

  const dispatch = useDispatch();

  const hasLogin = useRS($hasLogin);

  const onClick = useCallback(() => dispatch(LOGOUT()), []);

  const panel = hasLogin ? (
    <Panel className={css.panel} title="Warning" color={BsColor.Warning}>
      <p>You are going to logout, are you sure?</p>
      <p className="actions">
        <Button onClick={prevented(onClick)} variant={BsColor.Warning}>Yes, log me out!</Button>
      </p>
    </Panel>
  ) : (
    <Panel className={css.panel} title="See you!" color={BsColor.Success}>
      <p>You&apos;ve logged out successfully :)</p>
      <p>Want to login again?</p>
      <p><Link to="/login">Go to login page!</Link></p>
    </Panel>
  );

  return (
    <div className={css.root}>
      {panel}
    </div>
  );
};


export default memo(LogoutFeature);
