$(document).ready(function () {

  $("#play-button").on("click", function()  {
    $("#play-button").hide();
  })
  
  var movie = "Fight CLub";

    
  $("#searchButton").on("click", function(event) {

  event.preventDefault();
  $("#play-button").show();
  $("#ytplayer").empty();  
  $("#review-link").empty();
  
  movie = $("#movie-title-field").val();
  var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=96837c43";

  $.ajax({
      url: omdbURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      var rating = response.Rated;
      var runtime = response.Runtime;
      var plot = response.Plot;
      var genre = response.Genre;
      var imdbScore= response.imdbRating;
     // var info = "<h5> Rating: " + rating + " " + "Runtime: " + runtime + "</h5>" +  "<h6> Plot : " + plot + "</h6>";
     var newRow = $("<tr>");
     var td1 = $("<td>").html(genre);
     var td2 = $("<td>").html(imdbScore);
     var td3 = $("<td>").html(rating);
     var td4 = $("<td>").html(runtime);
     newRow.append(td1,td2,td3,td4);


      $("#movie-poster").attr("src", response.Poster);
      $("#table").append(newRow);
      $("#plot").html("<h6> Plot : " + plot + "</h6>");



  });

  var nyTimeURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=2f0919d7eeb840b4b22d1948d1df7dda&query='" + movie + "'";

  $.ajax({
      url: nyTimeURL,
      method: "GET"
    }).then(function(nyresponse) {

      console.log(nyresponse);
      var headline = nyresponse.results[0].headline;
      var headlineURL = nyresponse.results[0].link.url;
      console.log(headline + " " + headlineURL);

      $("#review-link").append("<h5> New York Times Review </h5>  <p><a href=" + headlineURL + ">" + headline + "</a></p>");

  });


});
    $("#play-button").on("click", function(event) {

        $("#ytplayer").empty();    
        
        var ytFrame = $("<iframe>");
        ytFrame.attr("id","ytplayer");
        ytFrame.attr("type","text/html");
        ytFrame.attr("width",540);
        ytFrame.attr("height",360);
        ytFrame.attr("allow","autoplay");
        ytFrame.attr("src","https://www.youtube.com/embed?listType=search&list=" + movie);
        ytFrame.attr("frameborder",0);
        $("#ytplayer").append(ytFrame);



    });


});