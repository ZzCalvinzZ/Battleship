$(document).ready(function() {
  var aircraftSize = 5
  var battleshipSize = 4
  var submarineSize = 3
  var cruiserSize = 3
  var destroyerSize = 2
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
      var destroyer = $('#destroyer').overlaps('.my-cell');
      destroyerData = setShip(destroyer, destroyerSize)
      // if (battleship.length > 0){

      //   for (var i = 0;i < battleship.length; i++){
      //     var target = battleship[i];

      //     $(target).addClass('highlighted');
      //   }
      // }
    }
  });

  function setShip(ship, size){
    if (ship.length > 0){
      if (ship.length == size){
        for (var i = 0;i < ship.length; i++){
          var target = ship[i];

          $(target).addClass('highlighted');
        }
      }
      else{
        alert("Must place ship entirely on grid");
      }
    }
  }

  //Gather data when your field is set
  $('#set-field-form').submit(function(){
    var ships = {battleship: ['#04', '#05'], butt: ['#40', '#41']};
    $.ajax({
      type:$(this).attr('method'),
      url: window.location.pathname,
      data: $(this).serialize() + '&' + $.param(ships),
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

