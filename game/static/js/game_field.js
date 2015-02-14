$(document).ready(function() {

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

//Timer for the wait between turns
var turnFunction = function(){
  $.ajax({
    url: window.location.pathname+ '/their_turn',
    success: function(response){
      if response['my_turn']{
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

$()

//Removes the wait loading bar
function removeWait(response){
  $('#wait').remove();
  $('#opponent-name').replaceWith('<h2 id="opponent-name">' +  response['opponent_name'] + '</h2>')
}

function checkIfHit(response){
  response
}


});