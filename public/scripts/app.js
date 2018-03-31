function getTimeSince(date) {
  // Compute elapsed time in various units.
  let min = (Date.now() - date) / (1000 * 60);
  let hr = min / 60;
  let day = hr / 24;
  let week = day / 7;
  let month = day / 30;
  let yr = month / 12;

  min = Math.round(min);
  hr = Math.round(hr);
  day = Math.round(day);
  week = Math.round(week);
  month = Math.round(month);
  yr = Math.round(yr);

  if (min === 0) {
    return "now";
  } else if (min === 1) {
    return  "1 minute ago";
  } else if (hr < 1) {
    return `${min} minutes ago`;
  } else if (hr === 1) {
    return "1 hour ago";
  } else if (day < 1) {
    return `${hr} hours ago`;
  } else if (day === 1) {
    return "1 day ago";
  } else if (week < 1) {
    return `${day} ago`;
  } else if (week === 1) {
    return "1 week ago";
  } else if (month < 1) {
    return `${week} ago`;
  } else if (month === 1) {
    return "1 month ago";
  } else if (yr < 1) {
    return `${month} months ago`;
  } else if (yr === 1) {
    return "1 year ago";
  } else {
    return `${yr} years ago`;
  }
}

// Escape html code.
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  const tweetText = escape(tweet.content.text);
  let $tweet = $("<article>").addClass("tweet").append(`
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

// Replace displayed tweets with current database.
function loadTweets() {
  $.get("/tweets").done(function(tweetsArr){
    $(".tweets-container").children().remove();
    renderTweets(tweetsArr);
  });
}

$(document).ready(function() {

  // Compose-button hover.
  $(".compose-bttn").on("mouseenter", function() {
    $(this).attr("id", "bttn-hover");
  });
  $(".compose-bttn").on("mouseleave", function() {
    $(this).attr("id", null);
    $(this).find(".bttn-hover").remove();
  });

  // Display of tweet submit form.
  $(".new-tweet").hide();
  $(".compose-bttn").on("click", function() {
    $(".new-tweet").slideToggle(200);
    $(".new-tweet textarea").focus();
  });

  // Tweet hover.
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

  // Form validation.
const tweet = $(".new-tweet form");
  $(tweet).on('submit', function(event) {
    event.preventDefault();
    const counter = parseInt($(".counter").text());
    const data = $(tweet).serialize();
    if (counter >= 0 && counter < 140) {
      $(this).find("textarea").val("");
      $(".counter").text(140);
      $.post("/tweets", data).done(loadTweets);
    } else if (counter < 0) {
      $(".error").remove();
      $(".new-tweet").append(`
          <span class='error'>
            Your tweet exceeds the 140-character limit.
          </span>
        `);
      $(".new-tweet textarea").focus();
    } else {
      $(".error").remove();
      $("form").append(`
          <span class='submit error'>
            You must enter text to submit a tweet.
          </span>
        `);
      $("textarea").focus();
    }
  });
  loadTweets();
});
