/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




// TEST addition of new tweet
// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
}

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...
  return $tweet;
}

renderTweets(data);


function createTweetElement(tweet) {
  // console.log("YAY");
  // console.log(tweet);
  var $tweet = $("<article>").addClass("tweet").append(`
    <header>
      <img src="${tweet.user.avatars.small}" alt="Avatar"/>
      <span class="name">${tweet.user.name}</span>
      <span class="handler">${tweet.user.handle}</span>
    </header>
      <p>${tweet.content.text}</p>
      <footer>
        ${tweet.created_at}
      </footer>
    `);
  // console.log($tweet);
  return $tweet;
}

function renderTweets(arr) {
  arr.forEach(function(element) {
    let $tweet = createTweetElement(element);
    $(".tweets-container").append($tweet);
  });
}

$(document).ready(function() {

  // Hightlight tweet when hover over it
  $(".tweets-container").on("mouseenter", ".tweet", function() {
    console.log("BLAH");
    $(this).attr("id", "hover");
    $(this).find("footer").append(`
      <span class="hover">
        <img src="images/flag.png" alt="Share button" />
        <img src="images/share.png" alt="Flag button" />
        <img src="images/like.png" alt="Like button" />
      </span>`);
  });
  $(".tweets-container").on("mouseleave", ".tweet", function() {
    $(this).attr("id", null);
    $(this).find("span.hover").remove();
  });

  // Create new tweet
  renderTweets(data);
});
