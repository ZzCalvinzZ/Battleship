$(document).ready(function() {

  var myTurn = false;
  // highlight your ships
  $(function(){
    $.ajax({
      url: window.location.pathname + '/highlight',
      success: function(response){
          highlight(response);        
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
  });

  //highlights the players ships
  function highlight(response){
    var ships = response['my_ships']
    for (var ship in ships){
      $('#my-field #'+ ships[ship]).addClass('highlighted');
    }
  }

  //Timer for the initial wait for both players to be ready
  var timeOutId = 0;
  var waitFunction = function(){
    $.ajax({
      url: window.location.pathname+ '/wait',
      success: function(response){
        if (response['opponent_id'] != 0){
          removeWait(response);  
          clearTimeout(timeOutId);
          turnFunction();
        }
        else{
          timeOutId = setTimeout(waitFunction, 5000); 
        }
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
  }
  waitFunction();
  timeOutId = setTimeout(waitFunction, 5000);


  //Removes the wait loading bar
  function removeWait(response){
    $('#wait').remove();
    $('#opponent-name').replaceWith('<h2 id="opponent-name">' +  response['opponent_name'] + '</h2>')
    if response['my_turn']:
      $('#my-name').addClass('turn');
  }

  //Timer for the wait between turns
  var turnFunction = function(){
    $.ajax({
      url: window.location.pathname+ '/their_turn',
      success: function(response){
        if response['my_turn']{
          myTurn = true;
          $('#my-name').addClass('turn');
          $('#opponent-name').removeClass('turn')
          checkIfHit(response);
          clearTimeout(timeOutId);
        }
        else{
          timeOutId = setTimeout(turnFunction, 5000); 
        }
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
  }
  turnFunction();
  timeOutId = setTimeout(turnFunction, 5000);

  //check whether I was hit or not
  function checkIfHit(response){
    var coord = '#my-field #' + response['latest_coord']
    if $(coord).hasClass('highlighted'){
      $(coord).text('X').addClass('hit')
    }
    else{
      $(coord).text('/').addClass('miss')
    }
  }

  //Pick a coordinate to fire at your opponent
  $('#opponent-cell').click(function (e){
    if myTurn{
      var target = e.target
      var x = target.parentNode.rowIndex;
      var y = target.cellIndex;

      if (!$(target).hasClass('hit')) && (!$(target).hasClass('miss')) {
      my_turn(x, y);
      }
    }
  });

  //ajax call to check if you hit or missed
  function my_turn(x,y){
    $.ajax({
      type: 'POST',
      url: window.location.pathname+ '/my_turn',
      data: {
        x: x,
        y: y
      },
      success: function(response){
        // if (lost == false && win == false){
        //   if (response.lost == true){
        //     lost = true
        //     gameLost();
        //   } 

        //   if (response.won == true){
        //     win = true
        //     gameWon();
        //   } 

        checkIfOpponentIsHit(response);        
        // }
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
  }

  function checkIfOpponentIsHit(response){

  }


});