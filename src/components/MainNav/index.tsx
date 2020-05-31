import { useMemo }         from 'preact/hooks';
import React, { FC, memo } from 'react';
import { Link, NavLink }   from 'react-router-dom';
import { useVal, ValOf }   from '~/hooks/use-val';
import { User }            from '~/interfaces/api';
import * as css            from './index.scss';


const MainNav: FC<{
  $hasLogin: ValOf<boolean>;
  $user: ValOf<User|nil>;
}> = ({
  $hasLogin,
  $user,
}) => {

  const hasLogin = useVal($hasLogin);
  const user = useVal($user);

  const avatarUrl = useMemo(() => {
    if (user == null) {
      return 'about:blank';
    }
    const { iconFarm, iconServer, nsid } = user;
    return `https://farm${iconFarm}.staticflickr.com/${iconServer}/buddyicons/${nsid}.jpg`;
  }, [user]);

  return (
    <nav className={css.root}>
      <div className={css.appTitle}>
        <Link to="/">Flickr Simple Reorder</Link>
      </div>

      <div className={css.menuItems}>
        <NavLink to="/photosets" activeClassName={css.active}>Photosets</NavLink>
        <NavLink to="/faq" activeClassName={css.active}>FAQ</NavLink>
        <NavLink to="/about" activeClassName={css.active}>About</NavLink>
        {hasLogin
          ? <NavLink to="/logout" activeClassName={css.active}>Logout</NavLink>
          : <NavLink to="/login" activeClassName={css.active}>Login</NavLink>
        }
      </div>

      {
        (hasLogin && user != null) &&
        <div className={css.userGreeting}>
          <span>Hello, {user.username}!</span>
          <a href={user.profileUrl} target="_blank" rel="noreferrer"><img
            className={css.userAvatar}
            src={avatarUrl}
            alt="userName"
          /></a>
        </div>
      }
    </nav>
  );
};


export default memo(MainNav);
