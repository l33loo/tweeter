$(document).ready(function() {
  $(".new-tweet textarea").on("keypress", function(event) {
    var usedChar = ($(this).val()).length + 1;
    var charLeft = 140 - usedChar;

    $("span.counter").text(140 - usedChar);
  });
});