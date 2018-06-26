'use stict';

var cursorPoint = document.querySelector('.cursor-point');
var cursorPointCoords = document.querySelector('.cursor-point__coords');
var cursorLineHorizontal = document.querySelector('.cursor-line--horizontal');
var cursorLineVertical = document.querySelector('.cursor-line--vertical');

var box = document.querySelector('.box');

cursorPointCoords.textContent = 'x: ' + (Math.round(document.body.clientWidth / 2)) + ' y: ' + Math.round((document.body.clientHeight / 2));

window.onmousemove = function (evt) {
  evt.preventDefault();

  var cursorCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  cursorPoint.style.cssText = 'left: ' + cursorCoords.x + 'px; top: ' + cursorCoords.y + 'px;';
  cursorLineHorizontal.style = 'top:' + cursorCoords.y + 'px;'
  cursorLineVertical.style = 'left:' + cursorCoords.x + 'px;'
  cursorPointCoords.textContent = 'x: ' + cursorCoords.x + ' y: ' + cursorCoords.y;
};

// box drag and drop
box.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    box.style.top = (startCoords.y) + 'px';
    box.style.left = (startCoords.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        box.removeEventListener('click', onClickPreventDefault)
      };
      box.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
