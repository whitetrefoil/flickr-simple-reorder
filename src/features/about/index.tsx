import React, { FC, memo } from 'react';
import changelog           from '~/../CHANGELOG.md';
import Page                from '~/components/Page';
import * as css            from './index.scss';


const AboutFeature: FC = () => (
  <Page className={css.root} header={<h1>About</h1>}>
    <section>
      <p>A simple tool to help reorder photos in galleries (photosets).</p>
      <p><strong>Current state:</strong> Alpha</p>
      <p><strong>Latest version:</strong> v2.2.0-alpha.2</p>
    </section>

    <div className={css.row}>
      <div className={css.secondaryInfo}>
        <section id="about-page-author">
          <h3>Author</h3>
          <address>
            <strong><a href="http://en.gravatar.com/whitetrefoil" target="_blank" rel="noreferrer">Gino Zhang
              (a.k.a.
              WhiteTrefoil)</a></strong><br/>Email: <a href="mailto:whitetrefoil@gmail.com">whitetrefoil@gmail.com</a><br/>Location:
            Shanghai, China
          </address>
        </section>

        <section id="about-page-license">
          <h3>License</h3>
          <p>
            <a href="https://github.com/whitetrefoil/flickr-simple-reorder/blob/master/LICENSE">Apache License
              2.0</a>
          </p>
        </section>

        <section id="about-page-links">
          <h3>Links</h3>
          <dl>
            <dt>Project Home</dt>
            <dd>
              <a href="https://github.com/whitetrefoil/flickr-simple-reorder">github.com/whitetrefoil/flickr-simple-reorder</a>
            </dd>
            <dt>Report Issues</dt>
            <dd>
              <a href="https://github.com/whitetrefoil/flickr-simple-reorder/issues">github.com/whitetrefoil/flickr-simple-reorder/issues</a>
            </dd>
            <dt>Alpha Test Environment</dt>
            <dd><a href="https://flickr-simple-reorder.whitetrefoil.com">flickr-simple-reorder.whitetrefoil.com</a>
            </dd>
            <dt>Author&apos;s Flickr</dt>
            <dd><a href="https://www.flickr.com/whitetrefoil">www.flickr.com/whitetrefoil</a></dd>
          </dl>
        </section>
      </div>

      <div className={css.mainInfo}>
        <section className={css.todos}>
          <h3>TODOs</h3>
          <ul>
            <li>
              <input disabled type="checkbox" checked/> Put POST params in body to fix HTTP 414 error
            </li>
            <li>
              <input disabled type="checkbox" checked/> Use Vue to refactor
            </li>
            <li>
              <input disabled type="checkbox" checked/> Possible damage alerts
            </li>
            <li>
              <input disabled type="checkbox"/> Messages
            </li>
            <li>
              <input disabled type="checkbox"/> Network error handling
            </li>
            <li>
              <input disabled type="checkbox" checked/> Bulk edit
            </li>
            <li>
              <input disabled type="checkbox" checked/> Searching / filtering
            </li>
            <li>
              <input disabled type="checkbox" checked/> About page
            </li>
            <li>
              <input disabled type="checkbox" checked/> Ordering in other orders
            </li>
            <li>
              <input disabled type="checkbox"/> Rollback
            </li>
            <li>
              <input disabled type="checkbox"/> Logo
            </li>
            <li>
              <input disabled type="checkbox"/> Public API
            </li>
            <li>
              <input disabled type="checkbox"/> UT
            </li>
          </ul>
        </section>

        <section className={css.changelog}>
          <h3>Changelog & Roadmap</h3>

          <div dangerouslySetInnerHTML={{ __html: changelog }}/>
        </section>
      </div>
    </div>
  </Page>
);


export default memo(AboutFeature);
