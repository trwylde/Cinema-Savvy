$(document).ready(function () {

    
    $(".material-icons").on("click", function(event) {

    event.preventDefault();
    
    var movie = $("#movie-title-field").val();
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
    

});