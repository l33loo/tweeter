/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function daysAgo(date) {

  // Calculate the number of days from milliseconds
  let msecInADay = 1000 * 60 * 60 * 24;

  let dayElapsed = Math.round((Date.now() - date) / msecInADay);
  if (dayElapsed >= 365) {
    let years = Math.round(dayElapsed / 365);
    if (years === 1) {
      return "a year ago";
    } else {
      return `${years} years ago`;
    }
  } else if (dayElapsed > 1) {
    return `${dayElapsed} days ago`;
  } else if (dayElapsed === 1) {
    return "yesterday";
  } else if (!dayElapsed) {
    return "today";
  }
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  var tweetText = escape(tweet.content.text);
  var $tweet = $("<article>").addClass("tweet").append(`
    <header>
    <div>
      <img src="${tweet.user.avatars.small}" alt="Avatar"/>
      <span class="name">${tweet.user.name}</span>
      <span class="handler">${tweet.user.handle}</span>
    </div>
    </header>
    <p class="tweet-text">${tweetText}</p>
    <footer>
      Posted ${daysAgo(tweet.created_at)}
    </footer>
  `);
  return $tweet;
}

function renderTweets(arr) {
  arr.reverse().forEach(function(element) {
    let $tweet = createTweetElement(element);
    $(".tweets-container").append($tweet);
  });
}

$(document).ready(function() {

  $(".nav-bar .compose-bttn").on("mouseenter", function() {
    $(this).attr("id", "bttn-hover");
  });
  $(".nav-bar .compose-bttn").on("mouseleave", function() {
    $(this).attr("id", null);
    $(this).find(".bttn-hover").remove();
  });

   $(".nav-bar .compose-bttn").on("click", function() {
    $(".new-tweet").toggle();
    $("textarea").focus()
;  });
  // Hightlight tweet when hover over it
  $(".tweets-container").on("mouseenter", ".tweet", function() {
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

  function loadTweets() {
    $.get("/tweets").done(function(tweetsArr){
      $(".tweets-container").children().remove();
      renderTweets(tweetsArr);
    });
  }

var tweet = $(".new-tweet form");

$(tweet).on('submit', function(event) {
  event.preventDefault();
  let data = $(tweet).serialize();
  let counter = parseInt($(".counter").text());
  if (counter >= 0 && counter < 140) {
    $("textarea").val("");
    $(".counter").text(140);
    $("span.error").remove();
    console.log('Button clicked, performing ajax call...');
    $.post("/tweets", data).done(loadTweets);
  } else if (counter < 0) {
    $("span.error").remove();
    $("form").append("<span class='error'>Your tweet exceeds the 140-character limit.</span>");
  } else {
    $("span.error").remove();
    $("form").append("<span class='error'>You must enter text to submit a tweet.</span>");
  }
});
  loadTweets();
});
