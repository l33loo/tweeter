function getTimeSince(date) {

  const min = Math.round((Date.now() - date) / (1000 * 60));
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);
  const week = Math.round(day / 7);
  const month = Math.round(day / 30);
  const yr = Math.round(month / 12);

  if (min === 0) {
    return "now";
  } else if (min === 1) {
    return  "minute ago";
  } else if (min < 60) {
    return `${min} minutes ago`;
  } else {
    if (hr === 1) {
      return "1 hour ago";
    } else if (hr < 24) {
        return `${hr} hours ago`;
    } else {
      if (day === 1) {
        return "1 day ago";
      } else if (day < 30) {
        return `${day} ago`;
      } else {
        if (week === 1) {
          return "1 week ago";
        } else if (week < 4.3) {
          return `${week} ago`;
        } else {
          if (month === 1) {
            return "1 month ago";
          } else if (month < 12) {
            return `${month} months ago`;
          } else {
            if (yr === 1) {
              return "1 year ago";
            } else {
              return `${yr} years ago`;
            }
          }
        }
      }
    }
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
      <img src="${tweet.user.avatars.small}" alt="Avatar"/>
      <span class="username">${tweet.user.name}</span>
      <span class="handler">${tweet.user.handle}</span>
    </header>
    <p class="tweet-text">${tweetText}</p>
    <footer>
      Posted ${getTimeSince(tweet.created_at)}
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

function loadTweets() {
  $.get("/tweets").done(function(tweetsArr){
    $(".tweets-container").children().remove();
    renderTweets(tweetsArr);
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

  $(".new-tweet").hide();
  $(".nav-bar .compose-bttn").on("click", function() {
    $(".new-tweet").slideToggle(200);
    $("textarea").focus();
  });
  // Hightlight tweet when hover over it
  $(".tweets-container").on("mouseenter", ".tweet", function() {
    $(this).attr("id", "hover");
    $(this).find("footer").append(`
      <span class="hover">
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-thumbs-up"></i>
      </span>`);
  });
  $(".tweets-container").on("mouseleave", ".tweet", function() {
    $(this).attr("id", null);
    $(this).find("span.hover").remove();
  });

  const tweet = $(".new-tweet form");

  $(tweet).on('submit', function(event) {
    event.preventDefault();
    const counter = parseInt($(".counter").text());
    const data = $(tweet).serialize();
    if (counter >= 0 && counter < 140) {
      $("textarea").val("");
      $(".counter").text(140);
      $("span.error").remove();
      console.log('Button clicked, performing ajax call...');
      $.post("/tweets", data).done(loadTweets);
    } else if (counter < 0) {
      $("span.error").remove();
      $("form").append(`
          <span class='error'>
            Your tweet exceeds the 140-character limit.
          </span>
        `);
    } else {
      $("span.error").remove();
      $("form").append(`
          <span class='error'>
            You must enter text to submit a tweet.
          </span>
        `);
    }
  });
  loadTweets();
});
