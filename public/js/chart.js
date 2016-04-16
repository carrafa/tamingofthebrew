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

var data = [
        {
          className: 'flavors', // optional can be used for styling
          axes: [
            {axis: "crisp", value: 3},
            {axis: "hop", value: 3},
            {axis: "nut", value: 3},
            {axis: "fruit", value: 7},
            {axis: "cream", value: 4},
            {axis: "dry", value: 2},
            {axis: "sweet", value: 3},
            {axis: "bitter", value: 5},
            {axis: "spicy", value: 3},
            {axis: "sour", value: 7}

          ]
        }
      ];

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
var svg = d3.select('body').append('svg')
.attr('class', 'draggable')
.attr('onmousedown', 'selectElement(evt)')
.attr('width', cfg.w + cfg.w + 50)
.attr('height', cfg.h + cfg.h / 4);
svg.append('g').classed('single', 1).datum(randomDataset()).call(chart);

render();

