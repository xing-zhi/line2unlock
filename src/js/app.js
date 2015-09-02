'use strict';

import helper from './modules/helper';
import canvas from './modules/canvas';
import draw from './modules/draw';
import generateData from './modules/data';

const drawTextAndCircle = draw.drawTextAndCircle,
      windowToCanvas = canvas.windowToCanvas,
      lightUp = draw.lightUp,
      whichItem = helper.whichItem,
      lightOff = draw.lightOff,
      drawLine = canvas.drawLine;

const canvasEl = document.querySelector('canvas'),
      ctx = canvasEl.getContext('2d'),
      width = canvasEl.width,
      height = canvasEl.height,
      circles = generateData(width, height);

let dragging = false,
    canvasSavedData;

const itemsDragged = [];

// 关于不同情况下绘图的canvas设置应该统一在这里设置
// const config = {};

function init() {
  /* eslint prefer-const:0, lines-around-comment:0 */
  for ( let [, circle] of circles ) {
    drawTextAndCircle(ctx, circle);
  }
}

function saveCanvas() {
  canvasSavedData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
}

function restoreCanvas() {
  ctx.putImageData(canvasSavedData, 0, 0);
}

function startDrag(e) {
  e.preventDefault();

  const loc = windowToCanvas(ctx.canvas, e.clientX, e.clientY),
        itemIndex = whichItem(circles, loc);

  if ( itemIndex !== -1 ) {
    dragging = true;
    saveCanvas();
    itemsDragged.push(itemIndex);
    lightUp(ctx, circles.get(itemIndex));
  } else {
    dragging = false;
  }
}

function drawRubberLine(loc) {
  const lightUpedItem = circles.get(itemsDragged[itemsDragged.length - 1]);

  restoreCanvas();
  drawLine(ctx, lightUpedItem, loc);
}

function drawLastLine() {
  const startItemIndex = itemsDragged[itemsDragged.length - 2],
        endItemIndex = itemsDragged[itemsDragged.length - 1],
        item1 = circles.get(startItemIndex),
        item2 = circles.get(endItemIndex);

  restoreCanvas();

  drawLine(ctx, item1, item2);
  lightOff(ctx, item1);

  saveCanvas();
}
function isDrag(e) {
  e.preventDefault();

  if ( !dragging ) {
    return ;
  }

  const loc = windowToCanvas(ctx.canvas, e.clientX, e.clientY),
        itemIndex = whichItem(circles, loc);

  if ( itemIndex !== -1 ) {
    itemsDragged.push(itemIndex);

    drawLastLine(loc);
    lightUp(ctx, circles.get(itemIndex));
    saveCanvas();
  } else {
    drawRubberLine(loc);
  }
}

function finishDrag() {
  dragging = false;
  restoreCanvas();
  lightOff(ctx, circles.get(itemsDragged[itemsDragged.length - 1]));
}

init();
canvasEl.addEventListener('mousedown', startDrag);
canvasEl.addEventListener('mousemove', isDrag);
canvasEl.addEventListener('mouseup', finishDrag);
