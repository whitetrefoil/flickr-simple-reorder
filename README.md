flickr-simple-reorder
=====================

master: [![Build Status](https://travis-ci.org/whitetrefoil/flickr-simple-reorder.svg?branch=master)](https://travis-ci.org/whitetrefoil/flickr-simple-reorder) dev: [![Build Status](https://travis-ci.org/whitetrefoil/flickr-simple-reorder.svg?branch=dev)](https://travis-ci.org/whitetrefoil/flickr-simple-reorder)

A simple tool to help reorder photos in galleries (photosets).

** Current state:** Alpha

** Latest version:** v2.1.0-alpha.4

IMPORTANT!!!
------------

Since Flickr suddenly removed the legacy auth API (which this application uses), this application won't work for now.  I'm currently working on a [web service](https://github.com/whitetrefoil/flickr-simple-reorder-server) for this application to use OAuth API.

But since these applications are simple, the security is weak if uses OAuth.  Please read the security notice in the [web service project](https://github.com/whitetrefoil/flickr-simple-reorder-server)'s [README file](https://github.com/whitetrefoil/flickr-simple-reorder-server/blob/master/README.md).  In short, if you really care about your account security, **ONLY** use this application in well controlled environment (e.g. HTTPS, local, intranet).

Author
------

[**Gino Zhang (a.k.a. WhiteTrefoil)**](http://en.gravatar.com/whitetrefoil)

Email: whitetrefoil@gmail.com

Location: Shanghai, China

License
-------

[Apache License 2.0](https://github.com/whitetrefoil/flickr-simple-reorder/blob/master/LICENSE)

Links
-----

* Project Home - https://github.com/whitetrefoil/flickr-simple-reorder
* Report Issue - https://github.com/whitetrefoil/flickr-simple-reorder/issues
* Alpha Test Environment - http://flickr-simple-reorder.whitetrefoil.com
* Author's Flickr - https://www.flickr.com/whitetrefoil

TODOs
-----

* [x] Put POST params in body to fix HTTP 414 error
* [x] Use Vue to refactor
* [x] Possible damage alerts
* [ ] Messages
* [ ] Network error handling
* [x] Bulk edit
* [x] Searching / filtering
* [x] About page
* [x] Ordering in other orders
* [ ] Rollback
* [ ] Logo
* [ ] Public API
* [ ] UT

Changelog
---------

### v2.1.0-alpha.4

* Revert changes in v2.1.0-alpha.3 because that header should be set on server side, not client.

### v2.1.0-alpha.3

* Set HTTP header to disable nginx proxy buffer.

### v2.1.0-alpha.2

* Use HTTPS flickr buddyicon.

### v2.1.0-alpha.1

* Use the newest server version & its bulk_reorder API.
* Optimize dev / build process.
* Fix minor bugs in dev / build process.

### v2.0.0-alpha.7

* Some routine dependencies update.

### v2.0.0-alpha.6

* Use the new features in webpack v3 & av-ts v0.8.

### v2.0.0-alpha.5

* Fix welcome panel width.

### v2.0.0-alpha.4

* Small tweaks.

### v2.0.0-alpha.3

* Fix login workflow.
* Sync changelog to webpage.
* Don't format "package.json" to be compatible with newest NPM standard.
* Fix wrong version number in "README.md".

### v2.0.0-alpha.2

* Use server-side OAuth.

### v2.0.0-alpha.1

* Use Vue to totally refactor the whole application.
* Put POST params in body to fix `HTTP 414` error permanently.

### v0.6.0-alpha.2

* Temporarily fix "Pagination bug when 500+ photos" ([#22](https://github.com/whitetrefoil/flickr-simple-reorder/issues/22))

### v0.6.0-alpha.1

* Migrate to Gulp.

### v0.5.0

* Upgrade dependencies.
* Use `localStorage` instead of `cookie`.
* Fix wired modal border radius.
* Save preferred ordering in `localStorage`.

### v0.4.0

* Upgrade dependencies.
    * Majorly AngularJS from v1.3 to v1.4
    * Use official `angular-cookies` instead of `jquery-cookie` since it has been enhanced in v1.4.
    * Fix some issues caused by breaking changes of `lodash` (`_.template()`) and `angular-bootstrap` (dropdown) upgrading.
    * `bundle exec` issue seems to have been fixed.
* Adjust `Bootstrap` fonts location and relative `Gruntfile` configuration.
* Use cookie to remember the selection of warning dialog, life to 7 days.

### v0.3.4
* Totally removed grunt concurrent.

### v0.3.3
* Fix about build process.

### v0.3.2
* Add a FAQ page.

### v0.3.1
* Disable "Reorder All" button when there's already a reordering processing.
* Reduce the amount of photosets displayed per page in small device from 12 to 5.

### v0.3.0
* Now can order in "Title", "Taken time", "Upload time" or "Views count".
* Added a confirmation modal before doing re-order.
* UI optimized.

### v0.2.1

* About page.

### v0.2.0

* Reorder all (or currently filtered out) photosets.
* Let the filtering to be case insensitive.

### v0.1.2

* Added a warning about development.

### v0.1.1

* Added searching function
* Added a link to the original Flickr photoset page on the photosets' name
* Fixed mistakenly calling `/{{currentUserIconUrl}}`

### v0.1.0

* Much better UI.

### v0.0.3

* Improve the robustness of authentication process.

### v0.0.2

* Fix wrong ordering function.
* Fix build issue.

### v0.0.1

* Login, logout, list photosets, reorder photos in photosets.
* With totally no error handling.
