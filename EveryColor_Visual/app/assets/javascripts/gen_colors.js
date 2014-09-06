var Build = function(dataset) {
  var svg = d3.select("body")
              .append("svg")
              .attr("width", 600)
              .attr("height", 600);

  svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")

     .attr("cx", function(d) {
        return d[0];
     })
     .attr("cy", function(d) {
        return d[1];
     })
     .attr("fill", function(d) {
        return d[2];
     })
     .attr("r", function(d) {
        return d[3]; 
     })
}

var Dataset = function() {
    dataset = {};
    var getTheColors = function() {
      return $.ajax({
        url : '/generate',
        method: 'get',
        success: function(response) {
          result = response;
      }
    });
  }
    getTheColors().done(function(result) {
      console.log("COMPLETE")
      dataset.colors = result.colors;
      console.log(dataset.colors);
      Build(dataset.colors);
    });
}


 $(document).ready(function() {
    Dataset();
});