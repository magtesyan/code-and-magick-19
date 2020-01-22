'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 20;
var SHADOW_GAP = 10;
var BAR_GAP = 50;
var MARGIN_TOP = 20;
var MARGIN_LEFT = 30;
var BAR_WIDTH = 40;
var TITLE_HEIGHT = MARGIN_TOP + GAP * 2;
var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + MARGIN_LEFT, CLOUD_Y + MARGIN_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + MARGIN_LEFT, CLOUD_Y + MARGIN_TOP + GAP);

  ctx.fillStyle = '#000000';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.floor(times[i]), CLOUD_X + MARGIN_LEFT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + TITLE_HEIGHT + barHeight - ((barHeight * times[i]) / maxTime));

    ctx.fillStyle = names[i] === 'Вы' ? 'red' : 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    ctx.fillRect(CLOUD_X + MARGIN_LEFT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + TITLE_HEIGHT + barHeight - ((barHeight * times[i]) / maxTime), BAR_WIDTH, (barHeight * times[i]) / maxTime);

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + MARGIN_LEFT + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + MARGIN_LEFT + TITLE_HEIGHT + barHeight);
  }
};
