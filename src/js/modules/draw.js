'use strict';

import canvas from './canvas';

const draw = {};

draw.drawTextAndCircle = function drawTextAndCircle(ctx, item, options = { textBaseline: 'middle', textAlign: 'center' }) {
  ctx.save();

  ctx.font = options.font || '30px serif';
  ctx.textBaseline = options.textBaseline;
  ctx.textAlign = options.textAlign;
  ctx.lineWidth = options.lineWidth || 2;

  canvas.drawCircle(ctx, item.x, item.y, item.r);
  canvas.drawText(ctx, item.text, item.x, item.y);

  ctx.restore();
};

// lightUp和lightOff差别只有一处：fillStyle，考虑合并
draw.lightUp = function lightUp(ctx, item, options = { fillStyle: '#eee' }) {
  ctx.save();

  ctx.fillStyle = options.fillStyle;

  canvas.drawCircle(ctx, item.x, item.y, item.r, true);

  ctx.restore();

  draw.drawTextAndCircle(ctx, item);
};

draw.lightOff = function lightOff(ctx, item, options = { fillStyle: 'white' }) {
  ctx.save();

  ctx.fillStyle = options.fillStyle;

  canvas.drawCircle(ctx, item.x, item.y, item.r, true);

  ctx.restore();

  draw.drawTextAndCircle(ctx, item);
};

export default draw;
