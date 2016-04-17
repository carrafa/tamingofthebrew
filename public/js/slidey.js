var sierra = {
bitter: 5,
cream: 5,
crisp: 5,
dry: 8,
fruit: 5,
hop: 5,
nut: 5,
sour: 5,
spicy: 5,
sweet: 5
};


var d = [
         {axis: "crisp", value: sierra['crisp'], order:0},
         {axis: "hop", value: sierra['hop'], order:1},
         {axis: "nut", value: sierra['nut'], order:2},
         {axis: "fruit", value: sierra['fruit'], order:3},
         {axis: "cream", value: sierra['cream'], order:4},
         {axis: "dry", value: sierra['dry'], order:5},
         {axis: "sweet", value: sierra['sweet'], order:6},
         {axis: "bitter", value: sierra['bitter'], order:7},
         {axis: "spicy", value: sierra['spicy'], order:8},
         {axis: "sour", value: sierra['sour'], order:9}
        ];


  function tellMe(){
    console.log("Crisp = " + Math.round( d[0].value)),
      console.log("Hop = " + Math.round( d[1].value)),
        console.log("Nut = " + Math.round( d[2].value)),
          console.log("Fruit = " + Math.round(d[3].value)),
            console.log("Cream = " + Math.round(d[4].value)),
              console.log("Dry = " + Math.round(d[5].value)),
                console.log("Sweet = " + Math.round(d[6].value)),
                console.log("bitter = " + Math.round(d[7].value)),
                console.log("Spicy = " + Math.round(d[8].value)),
                console.log("Sour = " + Math.round(d[9].value))
  }


// Slidey Chart D3.js from: https://github.com/azole/d3-radar-chart-draggable/blob/master/demo.html

var RadarChartSlidey = {
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
      labelFactor: 0.3,   //How much farther than the radius of the outer circle should the labels be
      opacityArea: 0.35, 	//The opacity of the area of the blob
      dotRadius: 1, 			//The size of the colored circles of each blog
      opacityCircles: 0.50, 	//The opacity of the fill when hovering over the circles
      strokeWidth: 2, 		//The width of the stroke around each blob
      roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
      color: d3.scale.category10()
    };
    if('undefined' !== typeof options){
      for(var i in options){
        if('undefined' !== typeof options[i]){
          cfg[i] = options[i];
        }
      }
    }



    cfg.maxValue = Math.max(cfg.maxValue, d3.max(d.map(function(o){return o.value})));
    var allAxis = (d.map(function(i, j){return i.axis}));
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
          .text(function(d){return d}).style("font-family", "sans-serif").style("font-size", "10px").attr("transform", function(d, i){return "translate(0, -10)";})
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
                .style("stroke-width", "5px")
                .style("roundStrokes", "true")
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
        .append("svg:circle").attr("class", "radar-chart-guy" )
        .attr('r', cfg.radius)
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
        .call(d3.behavior.drag().on("drag", move))  // for drag & drop
        .append("svg:title")
        .text(function(j){return Math.max(j.value, 0)});

    }




    //Tooltip
    tooltip = g.append('text').style('opacity', 0).style('font-family', 'sans-serif').style('font-size', 13);




    function move(dobj, i){
      this.parentNode.appendChild(this);
      var dragTarget = d3.select(this);

      var oldData = dragTarget.data()[0];
      // 進行座標位移歸零，以方便計算斜率
      var oldX = parseFloat(dragTarget.attr("cx")) - w/2;
      var oldY = w/2 - parseFloat(dragTarget.attr("cy"));
      var newY = 0, newX = 0, newValue = 0;
      var maxX = maxAxisValues[i].x - w/2;
      var maxY = w/2 - maxAxisValues[i].y;

      // 斜率為無限大的特殊情況
      if(oldX == 0) {
        newY = oldY - d3.event.dy;
        // 檢查是否超過範圍
        if(Math.abs(newY) > Math.abs(maxY)) {
          newY = maxY;
        }
        newValue = (newY/oldY) * oldData.value;
      }
      else
      {
        var slope = oldY / oldX;   // 斜率
        newX = d3.event.dx + parseFloat(dragTarget.attr("cx")) - w/2;
        // 檢查是否超過範圍
        if(Math.abs(newX) > Math.abs(maxX)) {
          newX = maxX;
        }
        newY = newX * slope;

        var ratio = newX / oldX; // 利用相似三角形等比的概念計算新的值
        newValue = ratio * oldData.value;

      }

      dragTarget
          .attr("cx", function(){return newX + w/2 ;})
          .attr("cy", function(){return w/2 - newY;});

      d[oldData.order].value=newValue;
// console.log(newValue)
      reCalculatePoints();
      // 重畫多邊形
      drawPoly();
    }

  }
}
