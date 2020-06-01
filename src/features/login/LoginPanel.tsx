import { prevented }              from '@whitetrefoil/jsx-sp-events/react';
import getLogger                  from '@whitetrefoil/log-utils';
import React, { FC, memo }        from 'react';
import Button                     from 'react-bootstrap/Button';
import { ApiError, NetworkError } from '~/api/base';
import Panel                      from '~/components/Panel';
import { useVal, ValOf }          from '~/hooks/use-val';
import { KeySecret }              from '~/interfaces/api';
import { BsColor }                from '~/interfaces/bs';
import * as css                   from './index.scss';


const { warn } = getLogger(`/src/${__filename.split('?')[0]}`);


const LoginPanel: FC<{
  $token: ValOf<KeySecret|nil>;
  $verifier: ValOf<string|nil>;
  $loading: ValOf<boolean>;
  $error: ValOf<Error|nil>;
  $loginUrl: ValOf<string|nil>;
  onLoginClick(): unknown;
}> = ({
  $token,
  $verifier,
  $loading,
  $error,
  $loginUrl,
  onLoginClick,
}) => {

  const token = useVal($token);
  const verifier = useVal($verifier);
  const loading = useVal($loading);
  const loginUrl = useVal($loginUrl);
  const error = useVal($error);

  if (error) {
    if (error instanceof NetworkError) {
      return (
        <Panel className={css.panel} color={BsColor.Danger} title="Login">
          <p>Failed to connect to the server. Please check your network connection.</p>
          <Button variant="primary" onClick={prevented(onLoginClick)}>Login</Button>
        </Panel>
      );
    }
    if (error instanceof ApiError) {
      return (
        <Panel className={css.panel} color={BsColor.Warning} title="Login">
          <p>Your authentication is invalid. This may due to your previous authentication is timeout or some other
            small problem.</p>
          <Button variant="primary" onClick={prevented(onLoginClick)}>Login</Button>
        </Panel>
      );
    }
  }

  if (verifier != null) {
    return (
      <Panel className={css.panel} color={BsColor.Default} title="Login">
        <p>Verifying the authentication, just hold on a second&hellip;&hellip;</p>
      </Panel>
    );
  }

  if (token || loading) {
    if (loginUrl == null) {
      return (
        <Panel className={css.panel} color={BsColor.Default} title="Login">
          <p>Redirecting you to Flickr&hellip;&hellip;</p>
        </Panel>
      );
    }
    if (process.env.NODE_ENV === 'development') {
      warn('Redirecting to:', loginUrl);
    } else {
      window.location.assign(loginUrl);
    }
    return (
      <Panel className={css.panel} color={BsColor.Default} title="Login">
        <p>Redirecting you to Flickr&hellip;&hellip;</p>
        <p>If the page doesn&apos;t redirect, please <a href={loginUrl}>click here</a>.</p>
      </Panel>
    );
  }

  return (
    <Panel className={css.panel} color={BsColor.Default} title="Login">
      <p>You need to login to use this application. ;)</p>
      <Button variant="primary" onClick={prevented(onLoginClick)}>Login</Button>
    </Panel>
  );
};


export default memo(LoginPanel);
