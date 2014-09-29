flickr-simple-reorder
=====================

master: [![Build Status](https://travis-ci.org/whitetrefoil/flickr-simple-reorder.svg?branch=master)](https://travis-ci.org/whitetrefoil/flickr-simple-reorder) dev: [![Build Status](https://travis-ci.org/whitetrefoil/flickr-simple-reorder.svg?branch=dev)](https://travis-ci.org/whitetrefoil/flickr-simple-reorder)

A simple tool to help reorder photos in galleries (photosets).

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
