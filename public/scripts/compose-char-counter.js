$(document).ready(function() {
  $(".new-tweet textarea").on("keydown", function(event) {
    var counter = $(this).siblings(".counter");
    var charLeft = 140 - ($(this).val().length + 1);
    if (charLeft < 0) {
      counter.addClass("over-char-limit");
    } else {
      counter.removeClass("over-char-limit");
    }
    counter.text(charLeft);
  });
});

// dsfadsfadsfasdfasdfasdfasdfadsfasdfasdfasdfadsfasdfsadfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfffffffasdfadsfasdfsdfasdfasdfasdfasdfasdfasdfsdf