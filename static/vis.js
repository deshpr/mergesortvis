$(document).ready( function() {
//  var A = [];
//  for (var i=0; i < 5; i++) {
//    A.push(Math.ceil(Math.random()*10));
//  }
  var A = [6,9,3,0];

  var width = $(window).width()
  var height = ($(window).height())*1/3;

  //window.onload = drawsvg(height, width, A);
  window.onload = merge(A);
  console.log(A);
});

function drawsvg(height, width, data) {
  console.log(data);
  var svg = new bars(height, width);
  svg.setxscale(data.length, width);
  svg.setyscale(d3.max(data), height);
  setTimeout(svg.drawsvg.bind(null, data), 10);
  insertion(data, svg, height, 1);
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

bars.prototype.drawsvg = function(data) {
  //add data state to Q
  this.createdata(data);

  this.bars = this.svg.selectAll("rect")
                              .data(this.data);
  this.bars
    .enter()
    .append("rect");

  this.bars
    .select("rect");

  this.bars
    .attr("x", function(d) { return this.xscale(d.i);}.bind(this))
    .attr("width", "1px")
    .attr("y", function(d) { return this.height - this.yscale(d.data); }.bind(this))
    .attr("height", function(d) { return this.yscale(d.data); }.bind(this))

  this.bars
    .exit()
    .remove();
};
