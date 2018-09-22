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
  $("#table tbody").empty();
  $("#movie-title-field").attr("placeholder","Movie Title");
  
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
      var title = response.Title;
     // var info = "<h5> Rating: " + rating + " " + "Runtime: " + runtime + "</h5>" +  "<h6> Plot : " + plot + "</h6>";
     var tableHead = $("<tr>");
     var th1 = $("<th>").html("Genre")
     var th2 = $("<th>").html("IMDB Score")
     var th3 = $("<th>").html("Rating")
     var th4 = $("<th>").html("Runtime")
     tableHead.append(th1,th2,th3,th4);

     var newRow = $("<tr>");
     var td1 = $("<td>").html(genre);
     var td2 = $("<td>").html(imdbScore);
     var td3 = $("<td>").html(rating);
     var td4 = $("<td>").html(runtime);
     newRow.append(td1,td2,td3,td4);


      $("#movie-poster").attr("src", response.Poster);
      $("#table").append(tableHead,newRow);
      $("#plot").html("<h6> Plot : " + plot + "</h6>");
      $("#play-button").html("<a class='btn-floating btn-large waves-effect waves-light pink'><i class='material-icons'>play_circle_outline</i></a>" + "<p>Play Trailer</p>");
      $(".header").text(title);



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

  var getTMDBIDURL = "https://api.themoviedb.org/3/search/movie?api_key=de609cecd260e54111a9794f1dff58a7&language=en-US&query=" + movie + "'";

  $.ajax({
      url: getTMDBIDURL,
      method: "GET"
    }).then(function(tmdbRes) {

      console.log(tmdbRes.results[0].id);
      var movieID = tmdbRes.results[0].id;
      var getSimURL = "https://api.themoviedb.org/3/movie/" + movieID + "/similar?api_key=de609cecd260e54111a9794f1dff58a7";

      $.ajax({
          url: getSimURL,
          method: "GET"
        }).then(function(simRes) {

            $("#rel-posters").append("<h5> Similar Movies </h5>");
             
          console.log(simRes);
          for(var i = 0; i < 4 ; i++)
          {
              console.log(simRes.results[i].title);
              console.log(simRes.results[i].poster_path);
              var newImg =$("<img>");
              newImg.addClass("simPosters");
              newImg.attr("src","https://image.tmdb.org/t/p/w185/" + simRes.results[i].poster_path );
              newImg.attr("id",simRes.results[i].title );
              newImg.attr("style","padding: 10px 20px");

              $("#rel-posters").append(newImg);
              

          }
    
    
      });


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

    $("body").on("click", ".simPosters", function() {

        var selectedPoster = $(this).attr("id");

        console.log(selectedPoster);


    });


});