function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str)); //this adds the esc function with stops users from using js in the tweet
  return div.innerHTML; //and manipulating (hacking) ur page
}

$(document).ready(function() {


  function createTweetElement(tweet) {



    return `<article>

    <header> <img class ="img" src=${tweet.user.avatars.small}>
    <div class="name"> ${tweet.user.name} </div>   <div class ="short">  ${tweet.user.handle} </div>

    </header>
    <div class="lorem">${escape(tweet.content.text)}</div>


    <footer>
    Created at ${moment(tweet.created_at).fromNow()}
      <div class="emoji">
        <a href="#"> <i class="fas fa-flag">  </i> </a>
        <a href="#"> <i class="fas fa-retweet"> </i> </a>
        <a href="#"> <i class="fas fa-heart"> </i> </a>
      </div>
    </footer>



    </article>`

  } // here if u look at the return, escape is being added to the tweete.content.text... t
  //this means that the tweet itself can escape any js, so no hacking.


  const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }, {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }, {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }];



  function renderTweets(data) {

    data.forEach(function(tweet) {
      $(".tweets-section").prepend(createTweetElement(tweet))

    })
  }

  $("form").on("submit", function(event) {
    event.preventDefault(); // function to prevent reload. deactivating the FORM SUBMIT

    var form = $(this)

    let $textBox = $(".new-tweet textarea")
    let tweetValue = $textBox.val()
    let tweetLength = tweetValue.length

    if (tweetLength > 140) {
      //adding an error in a section "error-message" instead of displaying an alert
      //also added a slidedown option which makes the UI better
      tweetExceeded()

    } else if (!tweetValue) {
      //adding error instead of alert in the section error message
      noTweets()
    } else {
      submitForm()
    };


  });


  function tweetExceeded() {
      //adding an error in a section "error-message" instead of displaying an alert
      //also added a slidedown option which makes the UI better
      $("div.error-message").text("Tweet exceeded Limit")
      $("div.error-message").slideDown("slow")

  }

  function noTweets() {
      //adding error instead of alert in the section error message
      $("div.error-message").text("Forgot your tweet")
      $("div.error-message").slideDown("slow")

  }

  function submitForm() {
      const $form = $("form")
      $(".error-message").slideUp()
      $.ajax({
        url: '/tweets', // making a ajax request similar to action="/tweets"
        type: 'POST', //method = POST
        data: $form.serialize(),
        success: function(response) { // so sending tweets to server
          loadTweets() //loadtweets function adds data to browser
           $(".new-tweet textarea").val("")
        $("form span.counter").text("140")
        },
        error: function() {
          alert("error");
        }
      });
  }


  function loadTweets() {
    $.ajax("/tweets", {
        method: "GET",
        dataType: 'json' //fetching data from the server
      })
      .then(function(tweets) {
        renderTweets(tweets)

      })
  }

  loadTweets()

  $("#nav-bar button").click(function() {
    console.log("running?")
    $(".new-tweet").toggle("slow", function () {                //added the focus
      $("textarea.text").focus();

  });
});


});



/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */