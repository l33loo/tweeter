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

