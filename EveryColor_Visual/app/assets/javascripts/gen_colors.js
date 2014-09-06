var Build = function(dataset) {
  var svg = d3.select("body")
              .append("svg")

  var testMaxWidth = function(d) {
    if (d[3] == 50) {
      return 0.35 * $("svg").width();
      }
    else {return d[0] * $("svg").width()};
  }

  var testMaxHeight = function(d) {
    if (d[3] == 50) {
      return 0.55 * $("svg").height();
      }
    else {return d[1] * $("svg").height()};
  }

  svg.selectAll("circle")
     .data(dataset.colors)
     .enter()
     .append("circle")

     .attr("cx", function(d) {
        return testMaxWidth(d);
     })
     .attr("cy", function(d) {
       return testMaxHeight(d);
     })
     .attr("fill", function(d) {
        return d[2];
     })
     .attr("r", function(d) {
        return d[3]; 
     });

  svg.selectAll("text")
     .data(dataset.colors)
     .enter()
     .append("text")
     .text(function(d) {
        return d[2] + " / " + dataset.max + " favs and rts" +
                " / " + d[4];
     })
     .attr("x", function(d) {
        return testMaxWidth(d);
      })
     .attr("y", function(d) {
        return testMaxHeight(d) + 75;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d) {
        var size = d[3]/50 * 20;
        if (size == 20) {
          return 30;
        }
        else {return 0;}
    })
    .attr("fill", "black");
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
      dataset.colors = result.colors;
      dataset.max = result.max;
      Build(dataset);
    });
}

 $(document).ready(function() {
    Dataset();
});