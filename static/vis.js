$(document).ready( function() {
  var A = [];
  for (var i=0; i < 300; i++) {
    A.push(Math.ceil(Math.random()*100));
  }

  var width = $(window).width()
  var height = ($(window).height())*1/3;

  window.onload = drawsvg(height, width, A);

});

function drawsvg(height, width, data) {
  var svg = new bars(height, width);
  svg.setxscale(data.length, width);
  svg.setyscale(d3.max(data), height);
  setTimeout(svg.drawsvg.bind(null, 0, data), 10);
  split(0, svg, data, data, 0, function(a) {
    svg.drawsvg(0, a);
  });
}

function bars(height, width) {
  this.svg = d3.select('body').append('svg')
              .attr("width", width)
              .attr("height", height);
  this.height = height;
  this.data = [];
  this.bars;
}

bars.prototype = new bars();

bars.prototype.setxscale = function(npts, width) {
    this.xscale = d3.scale.linear()
        .domain([0, npts])
        .range([0, width]);
};

bars.prototype.setyscale = function(max, height) {
  this.yscale =
    d3.scale.linear()
          .domain([max, 0])
          .range([height, 0]);
};

bars.prototype.createdata = function(data) {
  if (this.data.length === 0) {
    this.setdata(data);
  } else {
    this.updatedata(data);
  }
};

bars.prototype.updatedata = function(A) {
  for (var i=0; i < this.data.length; i++) {
    if (A[i] !== this.data[i].data) {
      this.data[i].data = A[i];
    }
  }
};

bars.prototype.setdata = function(A) {
  this.data = A.map(function(d, j) {
                return {i: j, data: d};
              });
};

bars.prototype.depthdict = {
                    10: "#000000",
                    9: "#0A1A1A",
                    8: "#143333",
                    7: "#1F4C4C" ,
                    6: "#296666",
                    5: "#338080" ,
                    4: "#3D9999",
                    3: "#52CCCC",
                    2: "#5CE6E6",
                    1: "#66FFFF",
                    0: "#75FFFF"};


bars.prototype.drawsvg = function(depth, data) {
  this.createdata(data);

  this.bars = this.svg.selectAll("rect")
                              .data(this.data);
  this.bars
    .enter()
    .append("rect");

  this.bars
    .select("rect");

  this.bars
    .style("fill", function() { return this.depthdict[depth]; }.bind(this))
    .attr("x", function(d) { return this.xscale(d.i);}.bind(this))
    .attr("width", "1px")
    .attr("y", function(d) { return this.height - this.yscale(d.data); }.bind(this))
    .attr("height", function(d) { return this.yscale(d.data); }.bind(this))

  this.bars
    .exit()
    .remove();
};
