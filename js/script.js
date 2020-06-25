///////////
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
   var streetStr = $('#street').val();
   var cityStr = $('#city').val();
   console.log(streetStr, cityStr);
   var address = streetStr + ', ' + cityStr;

   $greeting.text('So, you want to live at ' + address + '?');

   var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=AIzaSyDq90X4dQmb5HERUYj3sakuQca35IGzRJ0';
   $body.append('<img class="bgimg" src ="' + streetUrl + '">');
    // YOUR CODE GOES HERE!

    //NYT API 
    var nytAPIURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=IT6EnDGJVCi28rwAMtib7Rc1znGsnU8i";

    $.getJSON( nytAPIURL, function( data ) {
        console.log(data);
        $nytHeaderElem.text("New York Times Articles about " + cityStr);

        articles=data.response.docs;
        for(var i=0; articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        }
      }).fail( function(e){
        $nytHeaderElem.text("New York Times Articles could not be loaded");
      });


      //Wikipedia API request
      var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

      function timeoutText(){
        $wikiElem.text("TMED OUT, Faild to get wikipedia resources");
      }
     // var wikiTimeout = setTimeout(timeoutText(), 9000);

      $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        //dataType: "callback",
        success : function(response){
          console.log(response);
          var articleList = response[1];

          for(var i=0; i<articleList.length; i++){
            wikiArticle=articleList[i];
            console.log(wikiArticle);
            var url = "https://en.wikipedia.org/wiki/" + wikiArticle ;
            $wikiElem.append('<li><a href="' + url + '">' + wikiArticle + '</a></li>' );
          };
          //clearTimeout(wikiTimeout);
        }

      });


    return false;
};

$('#form-container').submit(loadData);

// loadData();
