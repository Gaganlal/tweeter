

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));        //this adds the esc function with stops users from using js in the tweet
  return div.innerHTML;                                           //and manipulating (hacking) ur page
}

$(document).ready(function() {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  function createTweetElement(tweet) {



    return `<article>
    <header> <img class ="img" src="https://c.ndtvimg.com/2018-10/15p50r1g_cristiano-ronaldo-afp-10-18_625x300_03_October_18.jpg?output-quality=70&output-format=webp">
    <div class="name"> ${tweet.user.name} </div>   <div class ="short">  cr7 </div>

    </header>
    <div class="lorem">${escape(tweet.content.text)}</div>


    <footer> 10 Days ago
    <div class="emoji">
    <a href="#"> <i class="fas fa-flag">  </i> </a>

    <a href="#"> <i class="fas fa-retweet"> </i> </a>

    <a href="#"> <i class="fas fa-heart"> </i> </a>



    </footer>



    </article>`

  }                   // here if u look at the return, escape is being added to the tweete.content.text... t
                                //this means that the tweet itself can escape any js, so no hacking.
  createTweetElement(tweetData);

  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
    ];




    function renderTweets(data) {

      data.forEach(function (tweet) {
        $(".tweets-section").prepend(createTweetElement(tweet))

      })
    }

    renderTweets(data)

    $( "form" ).on("submit", function( event ) {
  event.preventDefault();                                 // function to prevent reload. deactivating the FORM SUBMIT

  var form = $(this)

  let $textBox = $(".new-tweet textarea")
  let tweetValue = $textBox.val()
  let tweetLength = tweetValue.length

  if(tweetLength > 140 ) {
    alert("Tweet exceeded Limit")                         // here adding a constraint on the text box,
  } else if (!tweetValue) {                                     //tweet has to meet these requirements to submit
    alert("There is no tweet")
  } else {

  console.log(form.serialize())
  $.ajax({
    url: '/tweets',
        type: 'POST',                                       // making a ajax request similar to action="/tweets"
        data:  form.serialize(),                                      //method = POST
        success: function (response) {                  // so sending tweets to server
          loadTweets()                                      //loadtweets function adds data to browser
        },
        error: function () {
          alert("error");
        }
      });
};


});

    function loadTweets() {
      $.ajax("/tweets", {
        method: "GET",
    dataType: 'json'                                          //fetching data from the server
  })
      .then(function (profile) {
        renderTweets(profile)

      })
    }

    loadTweets()

  })



/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

