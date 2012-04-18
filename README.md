Tweeter
=============

**Tweeter** is a **jQuery _plugin_** that easily enables any site to have a live feed of Twitter updates right on their page.  It allows for themes (the original Twitter Profile Widget look and feel is included as a bonus), several different options, and contains/includes most resources right inside the script itself (to reduce setup hassle).

[Check it out live toward the bottom of this page!](http://www.elemovements.com "Tweeeeeeeeeeeeter!")

What does it do?
-----------

* Loads tweets from a Twitter account into any specified element.
* Continuously checks if there are newer tweets and if so, loads them (can be toggled with checkbox).
* Removes the need to load stylesheets separately (it does all this on its own).
* Dazzles your friends.

How to use it&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Tweetster, the Tweeter Mascot" src="http://terrasoft.x10.mx/img/tweetster.png" title="Tweetster, the Tweeter Mascot" />
-----------

Of course, before doing anything, you must include **jQuery** (can't do it for ya!) and **jquery.tweeter.js** on your page like so
	
```javascript
<script language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="jquery.tweeter.js" type="text/javascript"></script>
```

Now that that incredibly laborious task is accomplished, we can plod along to the easy stuff.

There are 11 available options you can set when using Tweeter, and they are:

1.  **account** (default: "twitterapi") - a string containing the account (what you you log in with) from which you want to stream tweets.
2.  **count** (default: 10) - how many tweets to pull (not including retweets and replies).
3.  **cssDir** (default: "css") - the directory the CSS for Tweeter will be stored.
4.  **height** (default: 0 [or auto]) - integer to set an explicit height.  Tweeter will fit its container by default.
5.  **replies** (default: false) - load replies along with tweets.
6.  **retweets** (default: false) - load retweets along with tweets.
7.  **speed** (default: 1000ms) - general speed of UI animations.
8.  **theme** (default: none) - the name of a theme to load (from the path specified by cssDir).  The format of a Tweeter theme CSS file is **tweeter-theme-NAME.css**.  **NOTE:** don't include **.css**.
9.  **transition** (default: none) - either *slide* or *fade* *plus* any of the **jQuery Easing Plugin**'s choices in simplified format (i.e., *easeOutBounce* is just *bounce*, *easeOutElastic* is *elastic*, and so on).  Example: **slide bounce**
10.  **updateInterval** (default: 60000ms) - how often to check if there is a more recent tweet.
11.  **width** (default: 0 [or "auto"]) - integer to set an explicit width.

Examples
-----------

As simple as it gets (no options specified):

```javascript
<script language="javascript" type="text/javascript">

$("#twitter").tweeter();

</script>
```

What you will find in the included **index.html** file:

```javascript
<script language="javascript" type="text/javascript">

$("#twitter").tweeter( {
	
	account: "twitterapi",
	count: 20,
	height: 200,
	retweets: true,
	theme: "original",
	transition: "slide bounce",
	width: 250
	
} );

</script>
```

Browser support
-----------

* Google **Chrome**
* Mozilla **Firefox** 3+
* Others as of yet untested (help me out!)

License
-----------

Public domain

Acknowledgements
------------

Tweeter is a project by [Gabriel Nahmias](http://github.com/terrasoftlabs "Terrasoft's GitHub"), co-founder of Terrasoft.