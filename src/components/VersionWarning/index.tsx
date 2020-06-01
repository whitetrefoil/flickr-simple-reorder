import React, { FC, memo } from 'react';
import { Link }            from 'react-router-dom';
import Panel               from '~/components/Panel';
import { BsColor }         from '~/interfaces/bs';
// import * as css from './index.scss';


const VersionWarning: FC = () => (
  <Panel color={BsColor.Warning} title="Warning!">
    <p>This application is still under development.</p>
    <p>It contains a lot of bugs, errors, incomplete features, bad things. And it functions very unstable. This means
      it will possibly <strong>mess up, damage or even totally destroy your data</strong>.
    </p>
    <p>Please:</p>
    <ol>
      <li>Do <strong>backup</strong> your data before using.</li>
      <li>Do <strong>NOT</strong> use it on important data or even accounts.</li>
      <li>Use this application at your own risk.</li>
    </ol>
    <p>Although I will not take any responsibility for your loss
      (but I really don&apos;t want to see this happen, and hopefully you have followed the recommendations
      above), <a
        href="https://github.com/whitetrefoil/flickr-simple-reorder/issues"
        target="_blank"
        rel="noreferrer"
      >any bug report is appreciated</a>.
    </p>
    <p>Starting to use this application is deemed to read, acknowledge and agree with these terms.</p>
    <p>If you really want to take a try, <Link to="/login">click here to login with flickr</Link>.</p>
    <p>You can also <Link to="/faq">checkout the FAQ for more information</Link>.</p>
  </Panel>
);


export default memo(VersionWarning);
