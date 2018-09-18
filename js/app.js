$(document).ready(function () {

    var movie = "Fight CLub";

    
    $("#searchButton").on("click", function(event) {

    event.preventDefault();
    
    movie = $("#movie-title-field").val();
    var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=96837c43";

    $.ajax({
        url: omdbURL,
        method: "GET"
      }).then(function(response) {
  
        console.log(response);
        var rating = response.Rated;
        var runtime = response.Runtime;
        var info = "<h5> Rating: " + rating + " " + "Runtime: " + runtime + "</h5>";

        $("#movie-poster").attr("src", response.Poster);
        $("#movie-info").html(info);



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