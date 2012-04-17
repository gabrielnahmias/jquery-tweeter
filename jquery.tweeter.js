/**
  * Tweeter v1.0.0
  * http://github.com/terrasoftlabs/tweeter
  *
  * Copyright © 2012 Gabriel Nahmias.
  * Free to use under the MIT license.
  * http://www.opensource.org/licenses/mit-license.php
  *
  */

// I need to do some major rehauling of this already (sad to say).  Refer to the following article to find
// best practices, etc.:
// http://docs.jquery.com/Plugins/Authoring

( function($) {
	
	jQuery.fn.tweeter = function(oParams) {
		
		this.oSettings = $.extend( {
			
			account: "twitter",
			count: 10,
			cssDir: "css",
			height: 0,
			replies: false,
			retweets: false,
			speed: 1000,
			theme: "",
			transition: "none",
			updateInterval: 60000,
			width: 0
			
		}, oParams);
		
		// Look, I know this is ugly but it saves the hassle of including files.
		
		this.o64 = {
			
			load: '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',
			
			logo: 'iVBORw0KGgoAAAANSUhEUgAAAEYAAAAOCAYAAACSJWqFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlCNDI2MjlFODc5RDExRTE5NDc2OTY2QzQzMEVFMjk4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlCNDI2MjlGODc5RDExRTE5NDc2OTY2QzQzMEVFMjk4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUI0MjYyOUM4NzlEMTFFMTk0NzY5NjZDNDMwRUUyOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUI0MjYyOUQ4NzlEMTFFMTk0NzY5NjZDNDMwRUUyOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5llKsnAAAByUlEQVR42tRXgXGDMAyEXAZgBEZgg7oTlA2aEZIJaCYgnYBskG7gdIKyAWwQNqDiTs6pOskYAnfp3/0dFrIkhC3Zcd/3ESBFXqPnRwLMgDWwW8vJBp00QAss/kFiXKyXNZ0MiXkjY/PkSTG4YlaPdSMsUyM41YLIJsqd/Sxgu4ToGZasR3z9tQU1puhl/Az1B2hxbHHsWDI9nzwhcocGaNjcMT2jxHoDpjN8VZotX2J6nExBDWtyS+RGkHEYZa6kZzzv8wm+Evxxqt7Gs8TOC1X9HdmKX8BX4IHYribqSaixo4baKD1bbLBVb5nwisaWxDvbz67zdThO8WNC9F6Y7Ximr5zofQCPPOjtgmeLjjz7imVo91mig/nidThKCkNivlk3cYeniGV7wB54wiXLt8uJzHdohRXJ0TF/Pr1P/MPU71n5+FBfMrAQ3YQCVGKhqvp5cF1sR2QXLIB7fE5J4Q3Vs4qvZIINrXHcKQXFu1KqJM6HQT8jjrQOULCAQvQyJZ58go3gxERouBHOMS4YK/wlI8gblhTtzPCIHo+Hn2PGbFjlDHZnjJdIqWhJlzR32WxZ/XDysT28tF6G9a8V6tmYDeO7iP4KMABRIDgy0Gf7bwAAAABJRU5ErkJggg==',
			
		};
		
		var self = this;
		
		var $Box = this.find("#tweeter-box");
		var $Stop = $Box.find("#stop-tweets");
		var $Tweets = $Box.find("#tweets");
		var $Ol = $Box.find(".overlay");
		
		var bEnd = false;
		var bStop = false;
		var bWK = navigator.userAgent.indexOf("WebKit") != -1;
		
		var iPage = 1;
		
		var rVars = /count=(\d)*&page=(\d)*/;
		var rPage = /page=(\d)*/;
		
		var sName = "";
		var sTwtr = "http://www.twitter.com/";		
		var sURL = "https://api.twitter.com/1/statuses/user_timeline/" + this.oSettings.account + ".json" + "?count=" + (this.oSettings.count + 1) + "&page=" + iPage + "&include_rts=" + this.oSettings.retweets.toString() + "&exclude_replies=" + !this.oSettings.replies.toString() + "&callback=?";
		var sAccountURL = sTwtr + this.oSettings.account;
		
		//console.debug(sURL)
		
		if ( !$.easing.hasOwnProperty("def") ) {
			
			// Add easing if it doesn't exist,
			
			eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'w\']=h.i[\'r\'];h.L(h.i,{v:\'u\',r:8(x,a,b,c,d){6 h.i[h.i.v](x,a,b,c,d)},u:8(x,a,b,c,d){6-c*(a/=d)*(a-2)+b},y:8(x,a,b,c,d){6 c*((a=a/d-1)*a*a+1)+b},B:8(x,a,b,c,d){6-c*((a=a/d-1)*a*a*a-1)+b},D:8(x,a,b,c,d){6 c*((a=a/d-1)*a*a*a*a+1)+b},K:8(x,a,b,c,d){6 c*9.t(a/d*(9.m/2))+b},z:8(x,a,b,c,d){6(a==d)?b+c:c*(-9.q(2,-o*a/d)+1)+b},P:8(x,a,b,c,d){6 c*9.I(1-(a=a/d-1)*a)+b},J:8(x,b,c,d,e){j s=1.n;j p=0;j a=d;f(b==0)6 c;f((b/=e)==1)6 c+d;f(!p)p=e*.3;f(a<9.C(d)){a=d;j s=p/4}l j s=p/(2*9.m)*9.E(d/a);6 a*9.q(2,-o*b)*9.t((b*e-s)*(2*9.m)/p)+d+c},F:8(x,a,b,c,d,s){f(s==G)s=1.n;6 c*((a=a/d-1)*a*((s+1)*a+s)+1)+b},H:8(x,a,b,c,d){f((a/=d)<(1/2.g)){6 c*(7.k*a*a)+b}l f(a<(2/2.g)){6 c*(7.k*(a-=(1.5/2.g))*a+.g)+b}l f(a<(2.5/2.g)){6 c*(7.k*(a-=(2.M/2.g))*a+.N)+b}l{6 c*(7.k*(a-=(2.O/2.g))*a+.A)+b}}});',52,52,'||||||return||function|Math||||||if|75|jQuery|easing|var|5625|else|PI|70158|10||pow|swing||sin|easeOutQuad|def|jswing||easeOutCubic|easeOutExponential|984375|easeOutQuart|abs|easeOutQuint|asin|easeOutBack|undefined|easeOutBounce|sqrt|easeOutElastic|easeOutSine|extend|25|9375|625|easeOutCircular'.split('|'),0,{}));
		
		}
		
		// Load the proper stylesheets.
		
		addStylesheet("tweeter");
		
		if (this.oSettings.theme != "")
			addStylesheet("tweeter-theme-" + this.oSettings.theme);
		
		// Add the HTML necessary for the plugin to the element.
		
		$Body = $('<div id="tweeter-box"> <div class="top"> <a class="name" href="' + sAccountURL + '" target="_blank"><img class="left elem-left" id="profile" src="https://api.twitter.com/1/users/profile_image?screen_name=' + this.oSettings.account + '" width="32" /></a> <div class="info"> <div class="title"> </div> <a class="name" href="' + sAccountURL + '" target="_blank" title="Check out ' + possessive(this.oSettings.account) + ' Profile on Twitter">' + this.oSettings.account + '</a> </div> <div id="follow" class="right"> <a href="' + sAccountURL + '" class="twitter-follow-button" data-show-screen-name="false" data-show-count="false" data-lang="en"></a> </div> </div> <div class="clear"></div> <div id="tweet-container"> <div class="overlay"> ' + baseImg("gif", this.o64.load) + ' <div class="counter"> </div> </div> <div id="tweets"> </div> </div> <div class="bottom"> <a href="http://www.terrasoftlabs.com" target="_blank" title="A Terrasoft Product">' + baseImg("png", this.o64.logo) + '</a> <div class="stopper"> <input id="stop-tweets" type="checkbox" checked="checked" /><label for="stop-tweets">Load New Tweets</label> </div> </div> </div>').addClass( ( (bWK) ? "webkit" : "" ) );
		
		// Write name to appropriate DIV (gotta fix the error that if the rate limit has been exceeded
		// this fails to run).
		
		$.ajax( {
			
			url: "http://twitter.com/users/show.json?screen_name=" + this.oSettings.account + "&callback=?",
			
			async: false,
			
			dataType: 'json',
			
			success: function(data) {
				
				$('#tweeter-box .title').html(data.name)
				
			},
			
		} );
		
		// Set explicit dimensions if specified.
		
		if (this.oSettings.height != 0)
			$Body.find("#tweets").height(this.oSettings.height);
		
		if (this.oSettings.width != 0)
			$Body.width(this.oSettings.width);
		
		$Body.delay(1000).appendTo(this);
		
		if (this.oSettings.transition == "none" ||
			typeof this.oSettings.transition === "undefined" ||
			this.oSettings.transition.trim() == "" )
			
			$Body.css("display", "block");
			
		else {
			
			var aDetails = this.oSettings.transition.split(" ");
			
			// Fade or slide.  Slide and bounce by default if something incorrect is specified.
			
			var sHow = aDetails[0];
			var sType = aDetails[1];
			
			var sPrefix = "easeOut";
			var sUpper = ucwords(sType);
			
			if ( sType != "swing" && sType != "linear" )
				var sFullType = "easeOut" + ucwords(sType);
			else
				sFullType = sType;
			
			if (sHow != "fade" && sHow != "slide")
				sHow = "slide";
			
			// If it's not in easing, default to bouncy bounce.
			
			if ( !$.easing.hasOwnProperty(sFullType) )
				sType = "easeOutBounce";
				
			if (sHow == "slide")
				$Body.slideDown(this.oSettings.speed, sFullType);
			else
				$Body.fadeIn(this.oSettings.speed, sFullType);
			
		}
		
		String.prototype.trim = function() {
			
			return this.replace(/^\s+|\s+$/g, '');
			
		}
		
		function addStylesheet(sFilename) {
			
			$("head").append('<link href="' + self.oSettings.cssDir + "/" + sFilename + '.css" rel="stylesheet" type="text/css" />');
			
		}
		
		function baseImg(sType, s64) {
			
			sType = sType.toLowerCase();
			
			return '<img src="data:image/' + sType + ';base64,' + s64 + '" />';
			
		}
		
		function correctEnding(sWord, iNum) {
			
			return sWord + ( (iNum == 1) ? "" : "s" );
			
		}
		
		function error(sText) {
			
			return '<div class="error">' + sText + '</div>';
			
		}
		
		function parseLinks(sText) {
			// had (?!\<a class\=\"no\"). after \b
			var rReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			
			return sText.replace(rReg, '<a href="$1" target="_blank">$1</a>');
			
		}
		
		function parseAccounts(sText) {
			
			return sText.replace(/\B@([\w-]+)/gm, '<a href="' + sTwtr + '$1" target="_blank">@$1</a>');
			
		}
	
		function possessive(sValue) {
			
			var sWord = sValue;
			
			if ( sWord.substr(-1) == 's' )
				sWord += "'";
			else
				sWord += "'s";
			
			return sWord;
			
		}
		
		function relativeTime(sTime) {
			
			var values = sTime.split(" ");
			
			sTime = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
			
			var parsed_date = Date.parse(sTime);
			
			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			
			var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			
			delta = delta + (relative_to.getTimezoneOffset() * 60);
			
			if (delta < 60)
				return 'less than a minute ago';
			else if (delta < 120)
				return 'about a minute ago';
			else if ( delta < (60 * 60) )
				return (parseInt(delta / 60)).toString() + ' minutes ago';
			else if (delta < (120 * 60))
				return 'about an hour ago';
			else if (delta < (24 * 60 * 60))
				return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
			else if (delta < (48 * 60 * 60))
				return '1 day ago';
			else
				return (parseInt(delta / 86400)).toString() + ' days ago';
			
		}
		
		function ucwords(str) {
			
			return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
				
				return $1.toUpperCase();
				
			} );
			
		}
		
		var addTweet = function(tweet, id, sDate, bFirst, sAuthor) {
			
			// Make URLs and @twitternames links.
			
			tweet = parseLinks(tweet);
			tweet = parseAccounts(tweet);
			
			var sLink = ( (sAuthor != "") ? '<a href="' + sTwtr + sAuthor + '">' + sAuthor + '</a> ' : "" );
			
			//console.debug(sLink)
			
			// I think it's neater to use the .attr() function instead of having such long strings.
			
			var $Tweet = $('<div class="tweet"></div>')
													   .html('<div class="text">' + sLink + tweet + "</div>")
													   .attr("time", sDate)
													   .append( $('<div class="links"></div>')
																 .append( $('<a target="_blank">' + relativeTime(sDate) + '</a>')
																			 .attr("href", sAccountURL + "/status/" + id)
																			 .attr("title", "View tweet on Twitter") )
																 .append(" · ")
																 .append( $('<a target="_blank">reply</a>')
																			 .attr("href", "http://twitter.com/intent/tweet?in_reply_to=" + id)
																			 .attr("title", "Reply to tweet") )
																 .append(" · ")
																 .append( $('<a target="_blank">retweet</a>')
																			 .attr("href", "http://twitter.com/intent/retweet?tweet_id=" + id)
																			 .attr("title", "Retweet") )
																 .append(" · ")
																 .append( $('<a target="_blank">favorite</a>')
																			 .attr("href", "http://twitter.com/intent/favorite?tweet_id=" + id)
																			 .attr("title", "Add this tweet to Your Favorites") ) )
													   .css("display", "none");
			
			if (bFirst)
			
				$Tweet.prependTo( $($Tweets.selector) );
			
			else {
				
				// We need to add some breaks to pad the bottom if they aren't there (so scrolling can
				// occur) or set the minimum amount of tweets to around 5-10.
				
				$($Tweets.selector).append($Tweet);
				
					
			}
			
			$Tweet.find(".text").css("opacity", 0).end().slideDown( ( (bFirst) ? 300 : 0 ) , "" , function() { 
				
				$(this).find(".text").animate( {
					
					opacity: 1
					
				} );
				
			} );
			
		};
		
		var changeUpdater = function(bEnabled) {
			
			if (bEnabled) {
				
				window.tweetUpdater = updateInterval();
				
				if ( !$($Stop.selector).attr('checked') )
					$($Stop.selector).prop("checked", true);
				
				$($Stop.selector).removeAttr("disabled");
				
			} else {
				
				clearInterval(window.tweetUpdater);
				
				if ( $($Stop.selector).attr('checked') )
					$($Stop.selector).prop("checked", false);
				
				$($Stop.selector).attr("disabled", "disabled");
				
			}
			
		}
		
		var loadTweets = function() {
			
			$Ol = $($Ol.selector);
			$Tweets = $($Tweets.selector);
			
			var sLoadURL = sURL.replace(rPage, "page=" + iPage);
			
			var oInfo;
			
			$.ajax( {
				
				url: "https://twitter.com/account/rate_limit_status.json?callback=?",
				
				async: true,
				
				dataType: 'json',
				
				success: function(data) {
					
					var iHitsLeft = parseInt(data.remaining_hits);
					
					// So, the following formula is pretty simple:
					
					// Subtract the current time from the reset time, divide that by 60,000 (or 1000 [to account
					// for the unit discrepancy (one in seconds, the other ms)]), and take the floor of
					// it.  This gives you the seconds remaining until the limit is restored.
					
					var iSecs = Math.floor( ( (data.reset_time_in_seconds * 1000) - Date.now() ) / 1000 );
					var iMinsLeft = Math.floor(iSecs / 60);
					var iSecsLeft = iSecs % 60;
					
					oLimitInfo = {
						
						hits: iHitsLeft,
						
						mins: iMinsLeft,
						
						secs: iSecsLeft,
						
					}
					
					if (oLimitInfo.hits > 5) {
						
						// If we haven't approached the rate limit, do this.
							
						$.ajax( {
							
							url: sLoadURL,
							
							// async is set to false because we want to modify a variable outside the
							// scope of the following callback.
							
							async: false,
							
							dataType: 'json',
							
							success: function(data) {
								
								if (!bEnd) {
									
									// Now, we check if the next page is empty, and if so, stop loading tweets.
									
									$.ajax( {
										
										url: sURL.replace(rPage, "page=" + (iPage + 1) ),
										
										async: false,
										
										dataType: 'json',
										
										success: function(data) {
											
											if (!data.length)
												bEnd = true;
											
										}
										
									} );
									
									// In all my time as a programmer, I don't think I have EVER seen a scenario like this
									// and it made sense to do so: a variable is being checked if it's false inside a block
									// with the same conditions.  I'm not even sure this is appropriate but I'm doing it anyway.
									// Ah, the wonder of events.
									
									if (!bEnd) {
										
										var iTweets = $("#tweets div.tweet").length;
										
										$.each(data, function(i, post) {
											
											var sAuthor = "";
											
											if (typeof post.retweeted_status !== "undefined") {
												
												var oRetweet = post.retweeted_status;
												
												var sAuthor = oRetweet.user.screen_name;
												
												post.id_str = oRetweet.id_str;
												post.text = oRetweet.text;
												
											}
											
											addTweet(post.text, post.id_str, post.created_at, false, sAuthor);
											
										} );
										
										if ( iTweets == 0 && iPage <= 10 /* || iTweets < (this.oSettings.count + 1) ) && iTweets < getNumTweets() */ ) {
											
											// I'm not sure if this is the best method but it works.  Sometimes, there are
											// no tweets loaded even if there are some to be loaded.  I check if the current
											// number loaded is 0 or less than the count specified and if it's less than the
											// number of tweets for this account.  If so, increment the page counter and keep
											// trying to load.  Might want to check merely if the number of total tweets for
											// the user is not 0 THEN do this instead of what's previously mentioned.
											
											// Might also wanna check if we're on the 10th page and if the tweets area is empty
											// then make the message for the overlay "No tweets..." maybe...
											
											iPage++;
											
											loadTweets();
											
										} else {
											
											$Ol.find(".counter").html( $("#tweets div.tweet").length + " total tweets loaded").end().delay(500).fadeOut();
											
										}
										
									}
									
								}
								
							}
							
						} );
					
					} else {
						
						// Let the user know the rate limit has been exceeded.
						
						var $Time = $("span#time-left");
						
						var iHits = oLimitInfo.hits;
						var iMins = oLimitInfo.mins;
						var iSecs = oLimitInfo.secs;
						
						var sMsg = "";
						var sPhrase = ( (iHits) ? "come too close to" : "met" );
						
						if (iMins != 0)
							sMsg = iMins + correctEnding(" minute", iMins) + " and ";
						
						if (iSecs != 0)
							sMsg += iSecs + correctEnding(" second", iSecs);
						
						if (sMsg == "")
							sMsg = "no time";
						
						$($Time.selector).html(sMsg);
						
						$Tweets.children().remove().end().append( error('You have ' + sPhrase + ' the maximum amount of tweet requests per hour' + ( (iHits) ? ' (you have <span id="hits-left"></span> left)' : "" ) +'.  You have <span id="time-left"></span> left until you can retrieve tweets.') ).glow("FF0000");
						
						$Ol.hide();
						
						$("span#hits-left").html( ( (iHits) ? iHits : "none" ) );
						
						changeUpdater(false);
						
						window.limitTimer = setInterval( function() {
							
							iSecs--;
							
							if (iSecs == -01) {
								
								iSecs = 59;
								
								iMins -= 1;
								
							} else
								
								iMins = iMins;
							
							sMsg = "";
							
							if (iMins != 0)
								sMsg = iMins + correctEnding(" minute", iMins) + ( (iSecs != 0) ? " and " : "" );
							
							if (iSecs != 0)
								sMsg += iSecs + correctEnding(" second", iSecs);
							
							$($Time.selector).html(sMsg);
							
							if (iMins == '00' && iSecs == '00') {
								
								iSecs = "00";
								
								window.clearInterval(window.limitTimer);
								
								$($Tweets.selector).find(".error").fadeOut().remove();
								
								changeUpdater(true);
								
								$Ol.fadeIn();
								
								loadTweets();
								
							}
							
						
						}, 1000);
						
					}
					
				}
				
			} );
			
		};
		
		var updateTime = function() {
			
			$($Tweets.selector).find("div.tweet").each( function(i, oTweet) {
				
				// This updates all the links relative times (xxx days ago, etc.).
				
				var $Tweet = $(oTweet);
				
				var sTime = $Tweet.attr("time");
				
				$Tweet.find("a.time").text( relativeTime(sTime) );
				
			} );
			
		}
		
		var updateTweets = function() {
			
			//console.debug('running');
			
			$.ajax( {
				
				url: sURL.replace(rVars, ""),
				
				dataType: 'json',
				
				success: function(data) {
					
					// We check here if the latest tweet has a greater timestamp than the newest one in our
					// feed's "time" attribute (it's in milliseconds).
					
					data = data[0];
					
					var iLatestTime = Date.parse( $Tweets.find("div.tweet:first-child").attr("time") );
					var iTweetTime = Date.parse(data.created_at);
					
					/*
					console.debug("JSON Reponse from Twitter:");
					console.debug(data);
					
					console.debug("Time of latest tweet on page:\t" + iLatestTime);
					console.debug("Time of latest tweet from Twitter:\t" + iTweetTime);
					*/
					
					if (iTweetTime > iLatestTime)
						addTweet(data.text, data.id_str, data.created_at, true);
					/* else
						console.debug("No newer tweets.");
					*/
					
				}
				
			} );
			
		}
		
		// This is a fairly one-dimensional error checking method.  After 10 seconds, if the
		// tweet holder's contents are empty, a message is displayed.
		
		var errorCheck = window.setTimeout( function() {
			
			$Tweets = $($Tweets.selector);
			
			var sTweets = $Tweets.text();
			
			if ( sTweets.trim() == "" ) {
				
				$($Ol.selector).fadeOut();
				
				$Tweets.append( error('Error loading tweets!') ).glow("FF0000");
				
				changeUpdater(false);
				
			}
			
		}, 10000);
		
		// Every 30 seconds (or otherwise specified by setting updateInterval in the settings), check to see
		// if there's a new tweet and if so, post it (unless they've unchecked "load new tweets").  Also,
		// update the relative time links every minute.
		
		var timeInterval = function() {
			
			return window.setInterval( function() { updateTime(); } , 60 * 1000 );
			
		}
		
		var updateInterval = function() {
			
			return window.setInterval( function() { updateTweets(); } , self.oSettings.updateInterval);
			
		}
		
		window.timeUpdater = timeInterval();
		window.tweetUpdater = updateInterval();
		
		$($Stop.selector).change( function() {
			
			if ( !$(this).is(":checked") )
				clearInterval(window.tweetUpdater);
			else
				window.tweetUpdater = updateInterval();
			
		} );
		
		$($Tweets.selector).scroll( function() {
			
			if ( $(this)[0].scrollHeight - $(this).scrollTop() + 2 == $(this).outerHeight() ) {
				
				if (!bEnd) {
					
					iPage++;
					
					if (iPage > 10) {
						
						$($Ol.selector).find(".counter").html("Maximum tweets loaded.").end().fadeIn(self.oSettings.speed, "", function() { $(this).delay(self.oSettings.speed * 2).fadeOut() } );;
						
						return false;
						
					} 
					
					$Ol.fadeIn();
					
					loadTweets();
					
				}
				
			}
			
		} );
		
		loadTweets();
		
		!function(d, s, id) {
			var js,
			fjs = d.getElementsByTagName(s)[0];
			if (!d.getElementById(id)) {
				js = d.createElement(s);
				js.id = id;
				js.src = "//platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js, fjs);
			}
		} (document, "script", "twitter-wjs");
		
		return this;
		
	}

} )(jQuery);

// These two jQuery extensions can come in handy if you want to use them elsewhere throughout your site.
// The first one relies on the second, the second enabling textShadow animation.  The first takes 3 parameters
// and makes your text glow according to color, time and, radius.

/*glow*/
(function($){function componentToHex(c){var hex=c.toString(16).toUpperCase();return hex.length==1?"0"+hex:hex}function rgbToHex(sRGB,bHash){sRGB=sRGB.replace("rgb\(","").replace("\)","").split(", ");var r=parseInt(sRGB[0]);var g=parseInt(sRGB[1]);var b=parseInt(sRGB[2]);if(!bHash)bHash=false;return((bHash)?"#":"")+componentToHex(r)+componentToHex(g)+componentToHex(b)}$.fn.glow=function(sColor,iTime,iRadius){var sOriginal=jQuery(this).css("color");if(!sColor)var sColor=rgbToHex(sOriginal);if(!iTime)var iTime=1000;if(!iRadius)var iRadius=10;sColor="#"+sColor;return this.each(function(){jQuery(this).animate({color:sColor,textShadow:sColor+" 0 0 "+iRadius+"px"},iTime,"",function(){jQuery(this).animate({color:sOriginal,textShadow:sColor+" 0 0 0"},(iTime/2),"",function(){$(this).css("text-shadow","none")})})})}})(jQuery);

/*textshadow*/
jQuery(function(d){function h(b,d){var a,c,f={};if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=
[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),parseFloat(a[4])];if(a=/(-*[0-9.]+(?:px|em|pt)?)\s+(-*[0-9.]+(?:px|em|pt)?)\s+(-*[0-9.]+(?:px|em|pt)?)/.exec(b.replace(a[0],"")))a=a.slice(1).map(function(a){var b=a.match(/em|pt/);if(b=="em")return parseFloat(a)*parseInt(d);if(b=="pt")return parseInt(a)/72*96;return parseInt(a)}),f={right:a[0],bottom:a[1],blur:a[2]};f.color=c;return f}d.extend(!0,d,{support:{rgba:function(){var b=d("script:first"),e=b.css("color"),a=!1;if(/^rgba/.test(e))a=!0;else try{a=
e!=b.css("color","rgba(0, 0, 0, 0.5)").css("color"),b.css("color",e)}catch(c){}return a}()}});d.fx.step.textShadow=function(b){if(!b.init){var e=d(b.elem).get(0).style.fontSize||d(b.elem).css("fontSize"),a=d(b.elem).get(0).style.textShadow||d(b.elem).css("textShadow");if(a=="none")a=b.end;b.begin=h(a,e);b.end=d.extend({},b.begin,h(b.end,e));b.init=!0}var e=b.elem.style,a=b.begin,c=b.end,b=b.pos,f=[];typeof c.right!="undefined"&&f.push(parseInt(a.right+b*(c.right-a.right))+"px "+parseInt(a.bottom+
b*(c.bottom-a.bottom))+"px");typeof c.blur!="undefined"&&f.push(parseInt(a.blur+b*(c.blur-a.blur))+"px");if(typeof c.color!="undefined"){var g="rgb"+(d.support.rgba?"a":"")+"("+parseInt(a.color[0]+b*(c.color[0]-a.color[0]))+","+parseInt(a.color[1]+b*(c.color[1]-a.color[1]))+","+parseInt(a.color[2]+b*(c.color[2]-a.color[2]));d.support.rgba&&(g+=","+parseFloat(a.color[3]+b*(c.color[3]-a.color[3])));g+=")";f.push(g)}a=f.join(" ");e.textShadow=a}});