$(document).ready(function() {

  //Be able to rotate your ships
  $(".ship").rotate({ 
     bind: 
       { 
          dblclick: function() {
              var width = $(this).width();
              var height = $(this).height();
              $(this).width(height).height(width);
          }
       } 
  });

  //Allow all the ships to be dragged onto the grid
  $('.ship').draggable({
    snap: '.my-cell',
    grid: [40, 40],
    stop: function( event, ui ) {
      var results = $('.ship').overlaps('.my-cell');
      if (results.length > 0){
        // for (var i=0;i<10;i++){
        //   for (j=0;j<10;j++){
        //     if ($('#'+i+j).hasclass('highlighted') == true){
        //       $('#'+i+j).removeClass('highlighted');
        //     }
        //   }
        // }
        for (var i = 0;i < results.length; i++){
          var target = results[i];

          $(target).addClass('highlighted');
        }
      }
    }
  });


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

