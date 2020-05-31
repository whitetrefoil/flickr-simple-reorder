import React, { FC, memo }         from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import '~/styles/bootstrap.scss';
import '~/styles/global.scss';
import MainNav                     from './components/MainNav';
import AboutFeature                from './features/about';
import FaqFeature                  from './features/faq';
import LoginFeature                from './features/login';
import LogoutFeature               from './features/logout';
import PhotosetsFeature            from './features/photosets';
import { $hasLogin, $user }        from './store/session/selectors';


const App: FC = () => {

  return (
    <div className="app">
      <MainNav $hasLogin={$hasLogin} $user={$user}/>
      <Switch>
        <Route path="/login" component={LoginFeature}/>
        <Route path="/logout" component={LogoutFeature}/>
        <Route path="/about" component={AboutFeature}/>
        <Route path="/faq" component={FaqFeature}/>
        <Route path="/photosets" component={PhotosetsFeature}/>
        <Redirect exact from="/" to="/photosets"/>
        <Redirect to="/about"/>
      </Switch>
    </div>
  );
};

export default memo(App);
