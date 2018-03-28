/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Hightlight tweet when hover over it
$(document).ready(function() {
  $("article.tweet").hover(
    function() {
      $(this).attr("id", "hover");
      $("article.tweet footer").append(`
        <span class="hover">
          <img src="images/flag.png" alt="Share button" />
          <img src="images/share.png" alt="Flag button" />
          <img src="images/like.png" alt="Like button" />
        </span>`);
    }, function() {
      $(this).attr("id", null);
      $("span.hover").remove();
    }

    //   $(this).addClass("hover");
    // }, function() {
    //   $(this).removeClass("hover");
    // }
  );
});

// TEST addition of new tweet
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

function createTweetElement(tweet) {
  // console.log("YAY");
  // console.log(tweet);
  var $tweet = $("<article>").addClass("tweet").append(`
    <header>
      <img src="${tweet.user.avatars.small}" alt="Avatar"/>
      <span class="name">${tweet.user.name}</span>
      <span class="username">${tweet.user.handle}</span>
    </header>
      <p>${tweet.content.text}</p>
      <footer>
        ${tweet.created_at}
      </footer>
    `);
  // console.log($tweet);
  return $tweet;
}

var $tweet = createTweetElement(tweetData);

// console.log($tweet);
$(document).ready(function() {
  $(".tweets-container").append($tweet);
});