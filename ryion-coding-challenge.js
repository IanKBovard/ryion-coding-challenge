/* jshint esversion:6*/
const PIPE_SIZES = [8, 10, 12, 16, 20, 25, 32, 40, 50, 63, 80, 100, 127, 160, 201, 254, 320, 404, 509, 642, 810, 1021, 1288, 1624, 2048, 2582, 3256, 4106, 5178, 6529, 8233, 10382, 13091, 16507, 20815, 26248, 33098, 41735, 52627, 66361, 83680, 105518, 133056, 167780, 211566, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 750000, 800000, 900000, 1000000, 1250000, 1500000, 1750000, 2000000];
const VALVE_SIZES = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const TOLERANCE = 0.02;

let pipeX = { pipeSize: null, valveSize: null };
let pipeY = { pipeSize: null, valveSize: null };
let pipeZ = { pipeSize: null };
let testArray = [1, 2, 3];

let minPipeX = [{ rateX: null, pipeSizeX: null, valveSizeX: null }];
let minPipeY = [{ rateY: null, pipeSizeY: null, valveSizeY: null }];
let minPipeZ = [{ rateZ: null, pipeSizeZ: null }];

/*let data = [minPipeX, minPipeY, minPipeZ];
*/

function calculatePipeSize(rate) {
  let pipeSize = 1.732 * 12.9 * 200 * rate / (208 * TOLERANCE);
  return pipeSize;
}

function calculateValveSize(rate) {
  let valveSize = rate * 1.25 * 1.25;
  return valveSize;
}

function assignPipeAndValveSizeValuesForXYZ(rateX, rateY) {
  minPipeX[0].rateX = rateX;
  minPipeY[0].rateY = rateY;
  minPipeZ[0].rateZ = rateX + rateY;
  pipeX.pipeSize = calculatePipeSize(rateX);
  pipeX.valveSize = calculateValveSize(rateX);
  pipeY.pipeSize = calculatePipeSize(rateY);
  pipeY.valveSize = calculateValveSize(rateY);
  pipeZ.pipeSize = calculatePipeSize(minPipeZ[0].rateZ);
  return;
}

function checkValues() {
  if (minPipeX[0].pipeSizeX === undefined || minPipeX[0].pipeSizeX === 'null') {
    minPipeX[0].rateX = 'null';
  }
  if (minPipeY[0].pipeSizeY === undefined || minPipeY[0].pipeSizeY === 'null') {
    minPipeY[0].rateY = 'null';
  }
}
function loopThroughPipeOrValveArray(pipeOrValveSize, pipeOrValveArray) {
  let minPipeSize;
  if (pipeOrValveSize <= pipeOrValveArray[pipeOrValveArray.length - 1] || pipeOrValveSize >= pipeOrValveArray[0]) {
    for (let i = pipeOrValveArray.length - 1; i >= 0; i--) {
      if (pipeOrValveSize === pipeOrValveArray[i]) {
        minPipeSize = pipeOrValveArray[i];
        return minPipeSize;
      } else if (pipeOrValveSize > pipeOrValveArray[i]) {
        minPipeSize = pipeOrValveArray[i + 1];
        return minPipeSize;
      }
    }
  } else {
    minPipeSize = 'null';
    return minPipeSize;
  }
}

function findMinimumPipeAndValveSizeForXYZ(rateX, rateY) {
  assignPipeAndValveSizeValuesForXYZ(rateX, rateY);

  minPipeX[0].pipeSizeX = loopThroughPipeOrValveArray(pipeX.pipeSize, PIPE_SIZES);
  minPipeX[0].valveSizeX = loopThroughPipeOrValveArray(pipeX.valveSize, VALVE_SIZES);

  minPipeY[0].pipeSizeY = loopThroughPipeOrValveArray(pipeY.pipeSize, PIPE_SIZES);
  minPipeY[0].valveSizeY = loopThroughPipeOrValveArray(pipeY.valveSize, VALVE_SIZES);

  minPipeZ[0].pipeSizeZ = loopThroughPipeOrValveArray(pipeZ.pipeSize, PIPE_SIZES);

  checkValues();
}
// Change Values in function to run
findMinimumPipeAndValveSizeForXYZ(16.45, 18.9);
//D3

var boxCoord = [[400, 100], [400, 700], [900, 700], [900, 100], [400, 100]];

var pipeXCoordBeforeArc = [[110, 300], [500, 300]];
var pipeYCoordBeforeArc = [[110, 450], [500, 450]];

var pipeXCoordAfterArc = [[696, 300], [775, 300]];
var pipeYCoordAfterArc = [[696, 450], [775, 450]];

var pipeZVerticalCoord = [[775, 450], [775, 200]];
var pipeZHorizontalCoord = [[771, 200], [1200, 200]];

var svgContainer = d3
  .select('body')
  .append('svg')
  .attr('width', 1280)
  .attr('height', 815)
  .style('border', '1px solid black');

var lineGenerator = d3.line();
var boxPath = lineGenerator(boxCoord);

var pipeXPathBeforeArc = lineGenerator(pipeXCoordBeforeArc);
var pipeXPathAfterArc = lineGenerator(pipeXCoordAfterArc);

var pipeYPathBeforeArc = lineGenerator(pipeYCoordBeforeArc);
var pipeYPathAfterArc = lineGenerator(pipeYCoordAfterArc);

var pipeZVerticalPath = lineGenerator(pipeZVerticalCoord);
var pipeZHorizontalPath = lineGenerator(pipeZHorizontalCoord);

var box = svgContainer
  .append('path')
  .attr('d', boxPath)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

var pipeXGroup = svgContainer
  .append('g')
  .attr('class', 'pipeX')
  .data(minPipeX);

pipeXGroup // pipe path
  .append('path')
  .attr('d', pipeXPathBeforeArc)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

pipeXGroup // rate x text
  .append('text')
  .attr('x', 0)
  .attr('y', 310)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.rateX;
  });

pipeXGroup // pipe size text
  .append('text')
  .attr('x', 210)
  .attr('y', 280)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.pipeSizeX;
  });

pipeXGroup // valve size text
  .append('text')
  .attr('x', 575)
  .attr('y', 300)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.valveSizeX;
  });

pipeXGroup // valve X arc
  .append('path')
  .attr('d', 'M 496, 300 A 50, 50, 0, 0 ,1, 700, 300')
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .attr('stroke-width', 8);

pipeXGroup // path path after arc
  .append('path')
  .attr('d', pipeXPathAfterArc)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

pipeXGroup // upper circle
  .append('circle')
  .attr('cx', 775)
  .attr('cy', 300)
  .attr('r', 20)
  .attr('fill', 'black');

var pipeYGroup = svgContainer
  .data(minPipeY)
  .append('g')
  .attr('class', 'pipeY');

pipeYGroup // pipe path
  .append('path')
  .attr('d', pipeYPathBeforeArc)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

pipeYGroup // rate y text
  .append('text')
  .attr('x', 0)
  .attr('y', 460)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.rateY;
  });

pipeYGroup // pipe size text
  .append('text')
  .attr('x', 210)
  .attr('y', 430)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.pipeSizeY;
  });

pipeYGroup // valve size text
  .append('text')
  .attr('x', 575)
  .attr('y', 460)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.valveSizeY;
  });

pipeYGroup // valve y arc
  .append('path')
  .attr('d', 'M496, 450 A 50, 50, 0, 0, 1, 700, 450')
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .attr('stroke-width', 8);

pipeYGroup // pipe path after arc
  .append('path')
  .attr('d', pipeYPathAfterArc)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

pipeYGroup // lower circle
  .append('circle')
  .attr('cx', 775)
  .attr('cy', 450)
  .attr('r', 20)
  .attr('fill', 'black');

var pipeZGroup = svgContainer
  .append('g')
  .attr('class', 'pipeZ')
  .data(minPipeZ);

pipeZGroup // vertical pipe path
  .append('path')
  .attr('d', pipeZVerticalPath)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

pipeZGroup // pipe Z path
  .append('path')
  .attr('d', pipeZHorizontalPath)
  .attr('stroke', 'black')
  .attr('stroke-width', 8)
  .attr('fill', 'none');

pipeZGroup
  .append('text')
  .attr('x', 1000)
  .attr('y', 180)
  .attr('font-family', 'arial')
  .attr('font-size', 35)
  .text(function(d) {
    return d.pipeSizeZ;
  });
