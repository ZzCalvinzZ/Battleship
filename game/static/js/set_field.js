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

  var usedSquares = []

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
    // snap: true,
    // snapMode: 'inner',
    // snapTolerance: 50,
    // grid: [40, 40],
    // drag: function( event, ui ) {
    //   var snapTolerance = $(this).draggable('option', 'snapTolerance');
    //   var topRemainder = ui.position.top % 40;
    //   var leftRemainder = ui.position.left % 40;

    //   if (topRemainder <= snapTolerance) {
    //       ui.position.top = ui.position.top - topRemainder;
    //   }

    //   if (leftRemainder <= snapTolerance) {
    //       ui.position.left = ui.position.left - leftRemainder;
    //   }
    // },
    stop: function( event, ui ) {

      if ($.isEmptyObject(aircraftData)){
        var aircraft = $('#aircraft').overlaps('.my-cell');
        aircraftData = setShip(aircraft, aircraftSize);
        if (!($.isEmptyObject(aircraftData))){
          $('#aircraft').unbind().removeClass('draggable');
        }
      }

      if ($.isEmptyObject(battleshipData)){
        var battleship = $('#battleship').overlaps('.my-cell');
        battleshipData = setShip(battleship, battleshipSize);
        if (!($.isEmptyObject(battleshipData))){
          $('#battleship').unbind().removeClass('draggable');
        }
      }

      if ($.isEmptyObject(submarineData)){
        var submarine = $('#submarine').overlaps('.my-cell');
        submarineData = setShip(submarine, submarineSize);
        if (!($.isEmptyObject(submarineData))){
          $('#submarine').unbind().removeClass('draggable');
        }
      }

      if ($.isEmptyObject(cruiserData)){
        var cruiser = $('#cruiser').overlaps('.my-cell');
        cruiserData = setShip(cruiser, cruiserSize);
        if (!($.isEmptyObject(cruiserData))){
          $('#cruiser').unbind().removeClass('draggable');
        }
      }

      if ($.isEmptyObject(destroyerData)){
        var destroyer = $('#destroyer').overlaps('.my-cell');
        destroyerData = setShip(destroyer, destroyerSize);
        if (!($.isEmptyObject(destroyerData))){
          $('#destroyer').unbind().removeClass('draggable');
        }
      }
    }
  });

  function setShip(ship, size){
    var shipData = {}
    var duplicate = false
    if (ship.length > 0){
      if (ship.length == size){
        for (var i = 0;i < ship.length; i++){
          for (var j = 0; j < usedSquares.length; j++){
            var target = ship[i];
            if (target.id == usedSquares[j]){
              duplicate = true
              break;
            }
          }
        }
        if (!duplicate){
          for (var i = 0;i < ship.length; i++){
            var target = ship[i];
            $(target).addClass('highlighted');
            shipData[i] = target.id;
            usedSquares.push(target.id);
          }
          return shipData;
        }
        else{
          alert("Ships cannot be placed on top of each other")
        }
      }
      else{
        alert("Must place ship entirely on grid");
      }
    }
  }

  //Gather data when your field is set
  $('#set-field-form').submit(function(e){
    var self = this;
    e.preventDefault();

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
      jsonShips = JSON.stringify(ships)
      $("#id_ship_data").val(jsonShips);
      self.submit();
    }
    return false;
  });
});

