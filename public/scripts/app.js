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

function createTweetElement(tweet) {
  var $tweet = $("<article>").addClass("tweet").append(`
    <header>
      <img src="${tweet.user.avatars.small}" alt="Avatar"/>
      <span class="name">${tweet.user.name}</span>
      <span class="handler">${tweet.user.handle}</span>
    </header>
      <p>${tweet.content.text}</p>
      <footer>
        Posted ${daysAgo(tweet.created_at)}
      </footer>
    `);
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
      renderTweets(tweetsArr);
      $("textarea").val("");
      $(".counter").text(140);
    });
  }

  var tweet = $(".new-tweet form");
  $(tweet).on('submit', function(event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    let data = $(tweet).serialize();
    console.log(data.length);
    let ajax = $.post("/tweets", data).done(loadTweets);
    if (data) {
      if (data.length <= 140) {
        ajax;
      } else {
        ajax.abort();
        let errorMsg = $("<span>").addClass("error").append("Your tweet exceeds the 140-character limit.");
        $("form input").append(errorMsg);
      }
    } else {
      ajax.abort();
      let errorMsg = $("<span>").addClass("error").append("You must enter text in order to submit a tweet.");
      $("form input").append(errorMsg);
    }
  });
});
