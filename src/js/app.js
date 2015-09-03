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
      drawLine = canvas.drawLine,
      getCanvasData = canvas.getCanvasData,
      restoreCanvas = canvas.restoreCanvas;

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

function startDrag(e) {
  e.preventDefault();

  const loc = windowToCanvas(ctx.canvas, e.clientX, e.clientY),
        itemIndex = whichItem(circles, loc);

  if ( itemIndex !== -1 ) {
    itemsDragged.push(itemIndex);
    dragging = true;

    lightUp(ctx, circles.get(itemIndex));
    canvasSavedData = getCanvasData(ctx);
  } else {
    dragging = false;
  }
}

function drawRubberLine(loc) {
  const lightUpedItem = circles.get(itemsDragged[itemsDragged.length - 1]);

  restoreCanvas(ctx, canvasSavedData);
  drawLine(ctx, lightUpedItem, loc);
}

function drawLastLine() {
  const startItemIndex = itemsDragged[itemsDragged.length - 2],
        endItemIndex = itemsDragged[itemsDragged.length - 1],
        item1 = circles.get(startItemIndex),
        item2 = circles.get(endItemIndex);

  restoreCanvas(ctx, canvasSavedData);

  drawLine(ctx, item1, item2);
  lightOff(ctx, item1);
  lightUp(ctx, item2);

  canvasSavedData = getCanvasData(ctx);
}
function isDrag(e) {
  e.preventDefault();

  if ( !dragging ) {
    return ;
  }

  const loc = windowToCanvas(ctx.canvas, e.clientX, e.clientY),
        itemIndex = whichItem(circles, loc);

  if ( itemIndex !== -1 && itemIndex !== itemsDragged[itemsDragged.length - 1] ) {
    itemsDragged.push(itemIndex);

    drawLastLine(loc);

    canvasSavedData = getCanvasData(ctx);
  } else {
    drawRubberLine(loc);
  }
}

function finishDrag() {
  dragging = false;
  restoreCanvas(ctx, canvasSavedData);
  lightOff(ctx, circles.get(itemsDragged[itemsDragged.length - 1]));
}

init();
canvasEl.addEventListener('mousedown', startDrag);
canvasEl.addEventListener('mousemove', isDrag);
canvasEl.addEventListener('mouseup', finishDrag);
