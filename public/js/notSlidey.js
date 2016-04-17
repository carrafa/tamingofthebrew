var sierraNotSlidey = {
bitter: 5,
cream: 8,
crisp: 10,
dry: 3,
fruit: 6,
hop: 5,
nut: 7,
sour: 4,
spicy: 2,
sweet: 5
};


var dd = [
         {axis: "crisp", value: sierraNotSlidey.crisp, order:0},
         {axis: "hop", value: sierraNotSlidey.hop, order:1},
         {axis: "nut", value: sierraNotSlidey.nut, order:2},
         {axis: "fruit", value: sierraNotSlidey.fruit, order:3},
         {axis: "cream", value: sierraNotSlidey.cream, order:4},
         {axis: "dry", value: sierraNotSlidey.dry, order:5},
         {axis: "sweet", value: sierraNotSlidey.sweet, order:6},
         {axis: "bitter", value: sierraNotSlidey.bitter, order:7},
         {axis: "spicy", value: sierraNotSlidey.spicy, order:8},
         {axis: "sour", value: sierraNotSlidey.sour, order:9}
        ];


// Slidey Chart D3.js from: https://github.com/azole/d3-radar-chart-draggable/blob/master/demo.html
var notSlideyOne = {
  draw: function(id, d, w, h){
    var cfg = {
      radius: 10,    // 點的半徑
      w: w,
      h: h,
      factor: 1,    // 框的縮放比例
      factorLegend: 0.85,
      levels: 10,    // 幾層框
      maxValue: 10,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      color: d3.scale.ordinal()
        .range(["#ED6939", "#ED6939"])
    };
    if('undefined' !== typeof options){
      for(var i in options){
        if('undefined' !== typeof options[i]){
          cfg[i] = options[i];
        }
      }
    }

    cfg.maxValue = Math.max(cfg.maxValue, d3.max(dd.map(function(o){
      return o.value;
    })));
    var allAxis = (dd.map(function(i, j){
      return i.axis;
    }));
    var total = allAxis.length;
    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);

    // 初始化畫布
    d3.select(id).select("svg").remove();
    var g = d3.select(id).append("svg").attr("width", cfg.w).attr("height", cfg.h).append("g");

    var tooltip;

    drawFrame();
    var maxAxisValues = [];
    drawAxis();
    var dataValues = [];
    reCalculatePoints();

    var areagg = initPolygon();
    drawPoly();

    drawnode();

    function drawFrame(){
      for(var j=0; j<cfg.levels; j++){
        var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        g.selectAll(".levels").data(allAxis).enter().append("svg:line")
         .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
         .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
         .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
         .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
         .attr("class", "line").style("stroke", "grey").style("stroke-width", "0.5px").attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");;
      }
    }

    // 坐標軸
    function drawAxis(){
      var axis = g.selectAll(".axis").data(allAxis).enter().append("g").attr("class", "axis");

      axis.append("line")
          .attr("x1", cfg.w/2)
          .attr("y1", cfg.h/2)
          .attr("x2", function(j, i){
            maxAxisValues[i] = {x:cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total)), y:0};
            return maxAxisValues[i].x;
          })
          .attr("y2", function(j, i){
            maxAxisValues[i].y = cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));
            return maxAxisValues[i].y;
          })
          .attr("class", "line").style("stroke", "grey").style("stroke-width", "1px");

      axis.append("text").attr("class", "legend")
          .text(function(d){return d}).style("font-family", "futura").style("font-size", "10px").attr("transform", function(d, i){return "translate(0, -10)";})
          .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-20*Math.sin(i*cfg.radians/total);})
          .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))+20*Math.cos(i*cfg.radians/total);});
    }

    // 根據輸入的資料計算多邊形要畫的點
    function reCalculatePoints(){
      g.selectAll(".nodes")
        .data(d, function(j, i){
          dataValues[i] =
          [
            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)),
          ];
        });
      dataValues[d[0].length] = dataValues[0];

    }

    // 初始化多邊形
    function initPolygon(){
      return g.selectAll("area").data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie0")
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(0))
                .on('mouseover', function (d){
                  z = "polygon."+d3.select(this).attr("class");
                  g.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                  g.selectAll(z).transition(200).style("fill-opacity", 0.7);
                })
                .on('mouseout', function(){
                  g.selectAll("polygon").transition(200).style("fill-opacity", cfg.opacityArea);
                })
                .style("fill", function(j, i){return cfg.color(0);})
                .style("fill-opacity", cfg.opacityArea);
    }

    // 畫多邊形
    function drawPoly(){
      areagg.attr("points",function(de) {
          var str="";
          for(var pti=0;pti<de.length;pti++){
            str=str+de[pti][0]+","+de[pti][1]+" ";
          }
          return str;
        });
    }

    // 畫點
    function drawnode(){
      g.selectAll(".nodes")
        .data(d).enter()
        .append("svg:circle").attr("class", "radar-chart-serie0")
        .attr('r', cfg.radius/2)
        .attr("alt", function(j){return Math.max(j.value, 0);})
        .attr("cx", function(j, i){
          return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
        })
        .attr("cy", function(j, i){
          return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
        })
        .attr("data-id", function(j){return j.axis;})
        .style("fill", cfg.color(0)).style("fill-opacity", 0.9)
        .on('mouseover', function (d){
                    newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                    newY =  parseFloat(d3.select(this).attr('cy')) - 5;
                    tooltip.attr('x', newX).attr('y', newY).text(d.value).transition(200).style('opacity', 1);
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon").transition(200).style("fill-opacity", 0.1);
                    g.selectAll(z).transition(200).style("fill-opacity", 0.7);
                  })
        .on('mouseout', function(){
                    tooltip.transition(200).style('opacity', 0);
                    g.selectAll("polygon").transition(200).style("fill-opacity", cfg.opacityArea);
                  })
        .append("svg:title")
        .text(function(j){
          return Math.max(j.value, 0);
        });
    }

    //Tooltip
    tooltip = g.append('text').style('opacity', 0).style('font-family', 'futura').style('font-size', 13);


  }
};
