
$(document).ready(function() {
  $(".new-tweet textarea").on(("input"), function(event) {
    const counterObj = $(this).siblings(".counter");
    const charLeft = 140 - ($(this).val().length);
    $(".error").remove();
    if (charLeft < 0) {
      counterObj.addClass("over-char-limit");
    } else {
      counterObj.removeClass("over-char-limit");
    }
    counterObj.text(charLeft);
  });
});