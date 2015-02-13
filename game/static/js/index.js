$(document).ready(function() {

  $('#game-form').submit(function(){
    $.ajax({
      type:$(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function(response){
        $('#url').html("<h5>Game " + response.game + " has been created, you and your opponent can enter the game with this URL:</h5> <h5><a href=" + response.url + ">" + response.url + "</a></h5>")       
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
    return false;
  });
});