/* jshint esversion:6*/
const PIPE_SIZES = [
  8,
  10,
  12,
  16,
  20,
  25,
  32,
  40,
  50,
  63,
  80,
  100,
  127,
  160,
  201,
  254,
  320,
  404,
  509,
  642,
  810,
  1021,
  1288,
  1624,
  2048,
  2582,
  3256,
  4106,
  5178,
  6529,
  8233,
  10382,
  13091,
  16507,
  20815,
  26248,
  33098,
  41735,
  52627,
  66361,
  83680,
  105518,
  133056,
  167780,
  211566,
  250000,
  300000,
  350000,
  400000,
  450000,
  500000,
  600000,
  700000,
  750000,
  800000,
  900000,
  1000000,
  1250000,
  1500000,
  1750000,
  2000000
];

const VALVE_SIZES = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
const TOLERANCE = 0.02;

let pipeSizeX;
let valveSizeX;
let pipeSizeY;
let valveSizeY;
let rateZ;
let pipeSizeZ;

let minPipeSizeX;
let minValveSizex;
let minPipeSizeY;
let minValveSizeY;
let minPipeSizeZ;

function calculatePipeSize(rate) {
  let pipeSize = 1.732 * 12.9 * 200 * rate / (208 * TOLERANCE);
  return pipeSize;
}

function calculateValveSize(rate) {
  let valveSize = rate * 1.25 * 1.25;
  return valveSize;
}

function assignPipeAndValveSizeValuesForXYZ(rateX, rateY) {
  rateZ = rateX + rateY;
  pipeSizeX = calculatePipeSize(rateX);
  valveSizeX = calculateValveSize(rateX);
  pipeSizeY = calculatePipeSize(rateY);
  valveSizeY = calculateValveSize(rateY);
  pipeSizeZ = calculatePipeSize(rateZ);
  return;
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
    return;
  }
}

function findMinimumPipeAndValveSizeForXYZ(rateX, rateY) {
  assignPipeAndValveSizeValuesForXYZ(rateX, rateY);

  minPipeSizeX = loopThroughPipeOrValveArray(pipeSizeX, PIPE_SIZES);
  minValveSizeX = loopThroughPipeOrValveArray(valveSizeX, VALVE_SIZES);

  minPipeSizeY = loopThroughPipeOrValveArray(pipeSizeY, PIPE_SIZES);
  minValveSizeY = loopThroughPipeOrValveArray(valveSizeY, VALVE_SIZES);

  minPipeSizeZ = loopThroughPipeOrValveArray(pipeSizeZ, PIPE_SIZES);
}

findMinimumPipeAndValveSizeForXYZ(16.45, 18.9);
