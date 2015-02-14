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

function highlight(response){
  var ships = response['my_ships']
  for (var ship in ships){
    $('#my-field #'+ ships[ship]).addClass('highlighted');
  }
}

//
setInterval(function() {
  $.ajax({
    url: window.location.pathname+ '/check',
    data:{
      reloadData: true
    },
    success: function(response){
        remap(response);        
    },
    error: function(response){
      alert('something went wrong, please try again');
    }
  });
}, 5000); //5 seconds

});