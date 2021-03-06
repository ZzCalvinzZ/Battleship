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
        }
        else{
          timeOutId = setTimeout(waitFunction, 2000); 
        }
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
  }
  waitFunction();


  //Removes the wait loading bar
  function removeWait(response){
    $('#wait').remove();
    $('#opponent-name').replaceWith('<h2 id="opponent-name">' +  response['opponent_name'] + '</h2>')
    if (response['my_turn']){
      $('#my-name').addClass('turn');
      myTurn = true;
    }
    else{
      $('#opponent-name').addClass('turn');
      myTurn = false;
      turnFunction();
    }
  }

  //Timer for the wait between turns
  var timeOutId2 = 0
  var turnFunction = function(){
    if (!myTurn){
      if ($('#wait').length == 0){
        $.ajax({
          url: window.location.pathname+ '/their_turn',
          success: function(response){
            if (response['my_turn']){
              clearTimeout(timeOutId2);
              myTurn = true;
              $('#my-name').addClass('turn');
              $('#opponent-name').removeClass('turn')
              checkIfHit(response);
            }
            else{
              timeOutId2 = setTimeout(turnFunction, 2000); 
            }
          },
          error: function(response){
            alert('something went wrong, please try again');
          }
        });
      }
    }
  }

  //check whether I was hit or not
  function checkIfHit(response){
    var coord = '#my-field #' + response['latest_coord']
    if ($(coord).hasClass('highlighted')){
      $(coord).text('X').addClass('hit')
    }
    else{
      $(coord).text('O').addClass('miss')
    }
  }

  //Pick a coordinate to fire at your opponent
  $('#opponent-table tbody tr td').click(function (e){
    if (myTurn){
      var target = e.target
      var x = target.parentNode.rowIndex;
      var y = target.cellIndex;

      if (!$(target).hasClass('hit')){
        if (!$(target).hasClass('miss')) {
          my_turn(x, y);
        }
      }
    }
  });

  //ajax call to check if you hit or missed
  function my_turn(x,y){
    var csrftoken = getCookie('csrftoken');
    $.ajax({
      type: 'POST',
      url: window.location.pathname+ '/my_turn',
      data: {
        csrfmiddlewaretoken: csrftoken,
        x: x,
        y: y
      },
      success: function(response){
        //you sunk my battleship!
        if (response['aircraft_left'] == 0){alert(response['opponent_name'] + ", you sunk my Aircraft Carrier!");}
        if (response['battleship_left'] == 0){alert(response['opponent_name'] + ", you sunk my battleship_left!");}
        if (response['submarine_left'] == 0){alert(response['opponent_name'] + ", you sunk my Submarine!");}
        if (response['cruiser_left'] == 0){alert(response['opponent_name'] + ", you sunk my Cruiser!");}
        if (response['destroyer_left'] == 0){alert(response['opponent_name'] + ", you sunk my Destroyer!");}

        myTurn = false;
        $('#my-name').removeClass('turn');
        $('#opponent-name').addClass('turn')
        markOpponent(response); 
        timeOutId2 = setTimeout(turnFunction, 2000)       
        // }
      },
      error: function(response){
        alert('something went wrong, please try again');
      }
    });
  }

  //Marks the opponents board with a hit or a miss
  function markOpponent(response){
    var coord = '#opponent-field #' + response['opponent_coord']
    if (response['opponent_attr'] == 'H'){
      $(coord).text('X').addClass('hit');
    }
    else if (response['opponent_attr'] == 'M'){
      $(coord).text('O').addClass('miss');
    }
  }


// get the cross site request forgery protection cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

});