flickr-simple-reorder
=====================

master: [![Build Status](https://travis-ci.org/whitetrefoil/flickr-simple-reorder.svg?branch=master)](https://travis-ci.org/whitetrefoil/flickr-simple-reorder) dev: [![Build Status](https://travis-ci.org/whitetrefoil/flickr-simple-reorder.svg?branch=dev)](https://travis-ci.org/whitetrefoil/flickr-simple-reorder)

A simple tool to help reorder photos in galleries (photosets).

** Current state:** Alpha

** Latest version:** v2.2.0-alpha.2

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

Moved to [CHANGELOG.md]().
