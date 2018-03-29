/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



function createTweetElement(tweet) {
  var $tweet = $("<article>").addClass("tweet").append(`
    <header>
      <img src="${tweet.user.avatars.small}" alt="Avatar"/>
      <span class="name">${tweet.user.name}</span>
      <span class="handler">${tweet.user.handle}</span>
    </header>
      <p>${tweet.content.text}</p>
      <footer>
        Posted ${tweet.created_at}
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

  var tweet = $(".new-tweet form");
  $(tweet).on('submit', function(event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    let data = $(tweet).serialize();
    $.post("/tweets", data).done(function() {
      $.get("/tweets").done(function(tweetsArr){
        renderTweets(tweetsArr);
        $("textarea").val("");
      });
    });
  });
});
