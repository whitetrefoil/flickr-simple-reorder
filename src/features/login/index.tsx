import { useCallback, useEffect }    from 'preact/hooks';
import React, { FC, memo }           from 'react';
import { useDispatch }               from 'react-redux';
import { Redirect, useParams }       from 'react-router-dom';
import Page                          from '~/components/Page';
import { useRS }                     from '~/hooks/use-root-selector';
import { FETCH_TOKEN, VERIFY_TOKEN } from '~/store/session/actions';
import * as $                        from '~/store/session/selectors';
import * as css                      from './index.scss';
import LoginPanel                    from './LoginPanel';


const LoginFeature: FC = () => {

  const dispatch = useDispatch();

  // https://flickr-simple-reorder.whitetrefoil.com/#/login?oauth_token=72157714520923463-41c9dbe346ca4ed3&oauth_verifier=fa1d9ad5a00aa946

  const params =
    // eslint-disable-next-line camelcase
    useParams<{ oauth_token: string, oauth_verifier: string }>();

  const user = useRS($.$user);

  useEffect(() => {
    console.log(params);
    // if (oToken == null || oVerifier == null) {
    //   return;
    // }
    // dispatch(VERIFY_TOKEN.request({
    //   key     : oToken,
    //   verifier: oVerifier,
    // }));
  }, [dispatch/*, oToken, oVerifier*/]);

  const onClick = useCallback(() => {
    dispatch(FETCH_TOKEN.request());
  }, [dispatch]);

  return (
    <Page className={css.root}>
      {user ? <Redirect to="/"/> : <LoginPanel
        $token={$.$token}
        $verifier={$.$verifier}
        $loading={$.$loading}
        $error={$.$error}
        $loginUrl={$.$loginUrl}
        onLoginClick={onClick}
      />}
    </Page>
  );
};


export default memo(LoginFeature);
