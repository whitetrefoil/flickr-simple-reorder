<style lang="less" src="./page.less" scoped></style>
<script lang="ts" src="./page.ts"></script>

<template>
  <article class="wt-page about-page">
    <header class="wt-page-header">
      <h1>About</h1>
    </header>

    <div class="wt-page-content">
      <section>
        <p>A simple tool to help reorder photos in galleries (photosets).</p>
        <p><strong>Current state:</strong> Alpha</p>
        <p><strong>Latest version:</strong> v2.2.0-alpha.2</p>
      </section>

      <div class="about-page-row">
        <div class="about-page-secondary-info">
          <section id="about-page-author">
            <h3>Author</h3>
            <address>
              <strong><a href="http://en.gravatar.com/whitetrefoil" target="_blank">Gino Zhang (a.k.a. WhiteTrefoil)</a></strong><br/>Email: <a href="mailto:whitetrefoil@gmail.com"></a> whitetrefoil@gmail.com<br/>Location: Shanghai, China
            </address>
          </section>

          <section id="about-page-license">
            <h3>License</h3>
            <p>
              <a href="https://github.com/whitetrefoil/flickr-simple-reorder/blob/master/LICENSE">Apache License 2.0</a>
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
              <dt>Author's Flickr</dt>
              <dd><a href="https://www.flickr.com/whitetrefoil">www.flickr.com/whitetrefoil</a></dd>
            </dl>
          </section>
        </div>

        <div class="about-page-main-info">
          <section class="about-page-todos">
            <h3>TODOs</h3>
            <ul class="checklist">
              <li>
                <input disabled="disabled" type="checkbox" checked/> Put POST params in body to fix HTTP 414 error
              </li>
              <li>
                <input disabled="disabled" type="checkbox" checked/> Use Vue to refactor
              </li>
              <li>
                <input disabled="disabled" type="checkbox" checked/> Possible damage alerts
              </li>
              <li>
                <input disabled="disabled" type="checkbox"/> Messages
              </li>
              <li>
                <input disabled="disabled" type="checkbox"/> Network error handling
              </li>
              <li>
                <input disabled="disabled" type="checkbox" checked/> Bulk edit
              </li>
              <li>
                <input disabled="disabled" type="checkbox" checked/> Searching / filtering
              </li>
              <li>
                <input disabled="disabled" type="checkbox" checked/> About page
              </li>
              <li>
                <input disabled="disabled" type="checkbox" checked/> Ordering in other orders
              </li>
              <li>
                <input disabled="disabled" type="checkbox"/> Rollback
              </li>
              <li>
                <input disabled="disabled" type="checkbox"/> Logo
              </li>
              <li>
                <input disabled="disabled" type="checkbox"/> Public API
              </li>
              <li>
                <input disabled="disabled" type="checkbox"/> UT
              </li>
            </ul>
          </section>

          <section class="about-page-changelog">
            <h3>Changelog & Roadmap</h3>

            <section>
              <h4>v2.2.0-alpha.2</h4>
              <ul>
                <li>Fix build failure.</li>
              </ul>
            </section>

            <section>
              <h4>v2.2.0-alpha.1</h4>
              <ul>
                <li>Use the latest workflow.</li>
              </ul>
            </section>

            <section>
              <h4>v2.1.0-alpha.4</h4>
              <ul>
                <li>Revert changes in v2.1.0-alpha.3 because that header should be set on server side, not client.</li>
              </ul>
            </section>

            <section>
              <h4>v2.1.0-alpha.3</h4>
              <ul>
                <li>Set HTTP header to disable nginx proxy buffer.</li>
              </ul>
            </section>

            <section>
              <h4>v2.1.0-alpha.2</h4>
              <ul>
                <li>Use HTTPS flickr buddyicon.</li>
              </ul>
            </section>

            <section>
              <h4>v2.1.0-alpha.1</h4>
              <ul>
                <li>Use the newest server version & its bulk_reorder API.</li>
                <li>Optimize dev / build process.</li>
                <li>Fix minor bugs in dev / build process.</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.7</h4>
              <ul>
                <li>Some routine dependencies update.</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.6</h4>
              <ul>
                <li>Use the new features in webpack v3 & av-ts v0.8.</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.5</h4>
              <ul>
                <li>Fix welcome panel width.</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.4</h4>
              <ul>
                <li>Small tweaks.</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.3</h4>
              <ul>
                <li>Fix login workflow.</li>
                <li>Sync changelog to webpage.</li>
                <li>Don't format "package.json" to be compatible with newest NPM standard.</li>
                <li>Fix wrong version number in "README.md".</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.2</h4>
              <ul>
                <li>Use server-side OAuth.</li>
              </ul>
            </section>

            <section>
              <h4>v2.0.0-alpha.1</h4>
              <ul>
                <li>Use Vue to totally refactor the whole application.</li>
                <li>Put POST params in body to fix <code>HTTP 414</code> error permanently.</li>
              </ul>
            </section>

            <section>
              <h4>v0.6.0-alpha.2</h4>
              <ul>
                <li>Temporarily fix "Pagination bug when 500+ photos" (<a href="https://github.com/whitetrefoil/flickr-simple-reorder/issues/22">#22</a>)
                </li>
              </ul>
            </section>

            <section>
              <h4>v0.6.0-alpha.1</h4>
              <ul>
                <li>Migrate to Gulp.</li>
              </ul>
            </section>

            <section>
              <h4>v0.5.0</h4>
              <ul>
                <li>Upgrade dependencies.</li>
                <li>Use <code>localStorage</code> instead of <code>cookie</code>.</li>
                <li>Fix wired modal border radius.</li>
                <li>Save preferred ordering in <code>localStorage</code>.</li>
              </ul>
            </section>

            <section>
              <h4>v0.4.0</h4>
              <ul>
                <li>Upgrade dependencies.
                  <ul>
                    <li>Majorly AngularJS from v1.3 to v1.4</li>
                    <li>Use official code angular-cookies instead of <code>jquery-cookie</code> since it has been enhanced in v1.4.
                    </li>
                    <li>Fix some issues caused by breaking changes of lodash <code>_.template()</code> and <code>angular-bootstrap (dropdown)</code> upgrading.
                    </li>
                    <li><code>bundle exec</code> issue seems to have been fixed.</li>
                  </ul>
                </li>
                <li>Adjust <code>Bootstrap</code> fonts location and relative <code>Gruntfile</code> configuration.</li>
                <li>Use cookie to remember the selection of warning dialog, life to 7 days.</li>
              </ul>
            </section>

            <section>
              <h4>v0.3.4</h4>
              <ul>
                <li>Totally removed grunt concurrent.</li>
              </ul>
            </section>

            <section>
              <h4>v0.3.3</h4>
              <ul>
                <li>Fix about build process.</li>
              </ul>
            </section>

            <section>
              <h4>v0.3.2</h4>
              <ul>
                <li>Add a FAQ page.</li>
              </ul>
            </section>

            <section>
              <h4>v0.3.1</h4>
              <ul>
                <li>Disable "Reorder All" button when there's already a reordering processing.</li>
                <li>Reduce the amount of photosets displayed per page in small device from 12 to 5.</li>
              </ul>
            </section>

            <section>
              <h4>v0.3.0</h4>
              <ul>
                <li>Now can order in "Title", "Taken time", "Upload time" or "Views count".</li>
                <li>Added a confirmation modal before doing re-order.</li>
                <li>UI optimized.</li>
              </ul>
            </section>

            <section>
              <h4>v0.2.1</h4>
              <ul>
                <li>About page.</li>
              </ul>
            </section>

            <section>
              <h4>v0.2.0</h4>
              <ul>
                <li>Reorder all (or currently filtered out) photosets.</li>
                <li>Let the filtering to be case insensitive.</li>
              </ul>
            </section>

            <section>
              <h4>v0.1.2</h4>
              <ul>
                <li>Added a warning about development.</li>
              </ul>
            </section>

            <section>
              <h4>v0.1.1</h4>
              <ul>
                <li>Added searching function.</li>
                <li>Added a link to the original Flickr photoset page on the photosets' name.</li>
                <li>Fixed mistakenly calling<code v-html="'{{currentUserIconUrl}}'"></code></li>
              </ul>
            </section>

            <section>
              <h4>v0.1.0</h4>
              <ul>
                <li>Much better UI.</li>
              </ul>
            </section>

            <section>
              <h4>v0.0.3</h4>
              <ul>
                <li>Improve the robustness of authentication process.</li>
              </ul>
            </section>

            <section>
              <h4>v0.0.2</h4>
              <ul>
                <li>Fix wrong ordering function.</li>
                <li>Fix build issue.</li>
              </ul>
            </section>

            <section>
              <h4>v0.0.1</h4>
              <ul>
                <li>Login, logout, list photosets, reorder photos in photosets.</li>
                <li>With totally no error handling.</li>
              </ul>
            </section>
          </section>
        </div>
      </div>
    </div>
  </article>
</template>
