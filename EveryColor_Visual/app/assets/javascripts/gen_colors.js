  var setColors = function(){
    return $.ajax({
      url : '/generate',
      method : 'GET',
      success : function(response){
        console.log(response.colors)
      }
    });
  };

 $(document).ready(function() {
  setColors();
});