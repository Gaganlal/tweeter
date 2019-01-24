$(document).ready(function() {

  $(".new-tweet textarea").on('keyup', function() {

    const tweetValue = $(this).val();
    const tweetLength = tweetValue.length;

    $("span.counter").text(140 - tweetLength);

    if (tweetLength > 140) {
      $("span.counter").addClass("warning");                        // Can do: .toggleClass() but be cautious

    } else {
      $("span.counter").removeClass("warning");
    }

  })

  $(".new-tweet textarea").on('keyup', function () {

  })



});