'use strict';

function drawCircle(ctx, x, y, r, isFill) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  if ( isFill ) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function drawText(ctx, text, x, y) {
  ctx.beginPath();
  ctx.fillText(text, x, y);
}

function windowToCanvas(canvas, x, y) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: x - rect.left * (canvas.width / rect.width),
    y: y - rect.top * (canvas.height / rect.height)
  };
}

function drawLine(ctx, item1, item2) {
  ctx.beginPath();

  ctx.moveTo(item1.x, item1.y);
  ctx.lineTo(item2.x, item2.y);
  ctx.stroke();
}

export default {
  drawCircle,
  drawText,
  drawLine,
  windowToCanvas
};
