
$(document).ready(function() {
  $(".new-tweet textarea").on(("input"), function(event) {
    const counterObj = $(this).siblings(".counter");
    const counter = parseInt($(counterObj).text());
    const charLeft = 140 - ($(this).val().length);
    if (counter >= 0 && counter < 140) {
      $("span.error").remove();
    }
    if (charLeft < 0) {
      counterObj.addClass("over-char-limit");
    } else {
      counterObj.removeClass("over-char-limit");
    }
    counterObj.text(charLeft);
  });
});