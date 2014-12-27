var Build = function(dataset) {
  var dir = [-1, 1],
      svg = d3.select("body")
               .append("svg")

  function fillLeader() {
    var leaderText = "latest favorite: "+ dataset.colors[0][2] + " / " + dataset.max + " favs and rts" +
                " / " + dataset.colors[0][4];
    $("#leader").text(leaderText);
    $(".leader").css("background-color", dataset.colors[0][2])
  }
  fillLeader();

  function testMaxWidth(d) {
    if (d[3] == 50) {
      return 0.35 * $("svg").width();
      }
    else {return d[0] * $("svg").width()};
  }

  function testMaxHeight(d) {
    if (d[3] == 50) {
      return 0.55 * $("svg").height();
      }
    else {return d[1] * $("svg").height()};
  }

  var circles = svg.selectAll("circle")
     .data(dataset.colors)
     .enter()
     .append("circle")

     .attr("cx", function(d) {
       setRand(this, 'xDir');
       this.xPosition = testMaxWidth(d);
       return testMaxWidth(d);
     })
     .attr("cy", function(d) {
       setRand(this, 'yDir');
       this.yPosition = testMaxHeight(d);
       return testMaxHeight(d);
     })
     .attr("fill", function(d) {
       return d[2];
     })
     .attr("r", function(d) {
       return d[3]; 
     })

  function setRand(object, attr) {
    var rand = Math.round(Math.random() * 1);
    if (object[attr] === undefined) {
      object[attr] = dir[rand];
    }
  }

  setInterval(function() {
    circles 
     .attr("cy", function(d) {
        if (this.moveForward === undefined && this.moveBack === undefined) {
          this.yPosition += this.yDir;
        } else {
          if (this.moveForward === true) {
            this.yPosition += 1;
          }
          else {
            this.yPosition -= 1;
          }
        }
        if (Math.round(this.yPosition) >= 600) {  
          this.moveForward = false;
        }

        if (Math.round(this.yPosition) <= 0) {
          this.moveForward = true;
        }

        return this.yPosition;
      })
    .attr("cx", function(d) {
        if (this.moveForwardX === undefined && this.moveBackX === undefined) {
          this.xPosition += this.xDir;
        } else {
          if (this.moveForwardX === true) {
            this.xPosition += 1;
          }
          else {
            this.xPosition -= 1;
          }
        }
        if (Math.round(this.xPosition) >= 1200) { 
          this.moveForwardX = false;
        }

        if (Math.round(this.xPosition) <= 0) {  
          this.moveForwardX = true;
        }

        return this.xPosition;
      })
          
    }, 10);

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