$(document).ready(function() {
  var aircraftSize = 5
  var battleshipSize = 4
  var submarineSize = 3
  var cruiserSize = 3
  var destroyerSize = 2

  var aircraftData = {}
  var battleshipData = {}
  var submarineData = {}
  var cruiserData = {}
  var destroyerData = {}
  //Be able to rotate your ships
  $(".rotate").bind({ 
 
    dblclick: function() {
        var width = $(this).width();
        var height = $(this).height();
        $(this).width(height).height(width);
    } 
  });

  //Allow all the ships to be dragged onto the grid
  $('.ship').draggable({
    // snap: '.my-cell',
    // snapMode: 'inner',
    grid: [40, 40],
    stop: function( event, ui ) {

      var aircraft = $('#aircraft').overlaps('.my-cell');
      aircraftData = setShip(aircraft, aircraftSize);
      if (!($.isEmptyObject(aircraftData))){
        $('#aircraft').unbind().removeClass('draggable');
      }

      var battleship = $('#battleship').overlaps('.my-cell');
      battleshipData = setShip(battleship, battleshipSize);
      if (!($.isEmptyObject(battleshipData))){
        $('#battleship').unbind().removeClass('draggable');
      }

      var submarine = $('#submarine').overlaps('.my-cell');
      submarineData = setShip(submarine, submarineSize);
      if (!($.isEmptyObject(submarineData))){
        $('#submarine').unbind().removeClass('draggable');
      }

      var cruiser = $('#cruiser').overlaps('.my-cell');
      cruiserData = setShip(cruiser, cruiserSize);
      if (!($.isEmptyObject(cruiserData))){
        $('#cruiser').unbind().removeClass('draggable');
      }

      var destroyer = $('#destroyer').overlaps('.my-cell');
      destroyerData = setShip(destroyer, destroyerSize);
      if (!($.isEmptyObject(destroyerData))){
        $('#destroyer').unbind().removeClass('draggable');

      }
    }
  });

  function setShip(ship, size){
    var shipData = {}
    if (ship.length > 0){
      if (ship.length == size){
        for (var i = 0;i < ship.length; i++){
          var target = ship[i];
          $(target).addClass('highlighted');
          shipData[i] = target.id;
        }
        return shipData;
        $()
      }
      else{
        alert("Must place ship entirely on grid");
      }
    }
  }

  //Gather data when your field is set
  $('#set-field-form').submit(function(){
    var ships = {};
    ships.aircraft = aircraftData;
    ships.battleship = battleshipData;
    ships.submarine = submarineData;
    ships.cruiser = cruiserData;
    ships.destroyer = destroyerData;

    //make sure all ships are placed before submitting
    var stop = false;
    for (var ship in ships){
      if (ships[ship] == undefined){
        alert("Please place all ships before continuing");
        stop = true;
        break;
      }
    }

    if (!stop){
      $.ajax({
        type:$(this).attr('method'),
        url: window.location.pathname,
        data: $(this).serialize() + '&' + $.param(ships),
        success: function(response){
          alert("Player Name:  " + response.player_name);
        },
        error: function(response){
          alert('something went wrong, please try again');
        }
      });
    }

    return false;
  });


});

