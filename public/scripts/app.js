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
      $("article.tweet footer").attr("id", "hover-footer");
    }, function() {
      $(this).attr("id", null);
      $("article.tweet footer").attr("id", null);
    }

    //   $(this).addClass("hover");
    // }, function() {
    //   $(this).removeClass("hover");
    // }
  );
});