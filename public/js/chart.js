
var dataSet = [
        {
          className: 'flavors',
          axes: [
            {axis: "crisp", value: $('#crisp').val()},
            {axis: "hop", value: $('#hop').val()},
            {axis: "nut", value: $('#nut').val()},
            {axis: "fruit", value: $('#fruit').val()},
            {axis: "cream", value: $('#cream').val()},
            {axis: "dry", value: $('#dry').val()},
            {axis: "sweet", value: $('#sweet').val()},
            {axis: "bitter", value: $('#bitter').val()},
            {axis: "spicy", value: $('#spicy').val()},
            {axis: "sour", value: $('#sour').val()}

          ]
        }
      ];
$('input').on('input', function(){
  var value = $(this).val();
  var name = $(this).attr('name');
  console.log(name)
  console.log(value);
  dataSet.axes = value;

  console.log(dataSet);
  makeChart(dataSet)
});


function makeChart(data){

  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = 400;
  RadarChart.defaultConfig.h = 400;

  var selectedElement = 0;
  var currentX = 0;
  var currentY = 0;
  var currentMatrix = 0;

  function selectElement(evt) {

    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
      for(var i=0; i<currentMatrix.length; i++) {
      currentMatrix[i] = parseFloat(currentMatrix[i]);

  }
    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
  }



        function randomDataset() {
          return data.map(function(d) {
            return {
              className: d.className,
              axes: d.axes.map(function(axis) {
                return {axis: axis.axis, value: axis.value};
              })
            };
          });
        }

  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg = d3.select('#chart-area').append('svg')
  .attr('class', 'draggable')
  .attr('onmousedown', 'selectElement(evt)')
  .attr('width', cfg.w + cfg.w + 50)
  .attr('height', cfg.h + cfg.h / 4);
  svg.append('g').classed('single', 1).datum(randomDataset()).call(chart);



  // draw one
  // svg.append('g').classed('focus', 1).datum(data).call(chart);

  // // draw many radars
  // var game = svg.selectAll('g.game').data(
  //   [
  //     data,
  //     data,
  //     data,
  //     data
  //   ]
  // );
  // game.enter().append('g').classed('game', 1);
  // game
  //   .attr('transform', function(d, i) { return 'translate(150,600)'; })
  //   .call(chart);
  //
  //   chart.config();
  // all options with default values
  chart.config({
    containerClass: 'radar-chart', // target with css, default stylesheet targets .radar-chart
    w: 600,
    h: 600,
    factor: 0.95,
    factorLegend: 1,
    levels: 3,
    maxValue: 0,
    minValue: 0,
    radians: 2 * Math.PI,
    color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
    axisLine: true,
    axisText: true,
    circles: true,
    radius: 5,
    axisJoin: function(d, i) {
      return d.className || i;
    },
    tooltipFormatValue: function(d) {
      return d;
    },
    tooltipFormatClass: function(d) {
      return d;
    },
    transitionDuration: 300
  });
};
// render();
