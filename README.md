# Later!

Later! is a Chrome Extension that enables you to bookmark a page to Read It Later.
It does this by adding a small icon to the address bar, a so called page action.

## Design goals

The goals of Later! can be summarised in follow:

* Dead simple to use
* No configuration
* Handle non-direct url situations; like Google Reader

### Non-direct url situations
This are situations where a website page url doesn't point to a article. For example, when you 
read a article in Google Reader. The current url point to the stream of articles. This could be
the unread, favored or all articles in a certain category. In these situation sending the current
url to ReadItLater doesn't work. You want to send the perma url to it instead. This are scenario's
we want to support.

Currently we support none.

# Technical

Later! is build with HTML, Javascript and uses the [Chrome.* API's](http://code.google.com/chrome/extensions/api_index.html).