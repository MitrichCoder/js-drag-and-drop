'use stict';

var screen = document.querySelector('.screen');

var cursorPoint = document.querySelector('.cursor-point');
var cursorPointCoords = document.querySelector('.cursor-point__coords');
var cursorLineHorizontal = document.querySelector('.cursor-line--horizontal');
var cursorLineVertical = document.querySelector('.cursor-line--vertical');

cursorPointCoords.textContent = 'x: ' + (Math.round(document.body.clientWidth / 2)) + ' y: ' + Math.round((document.body.clientHeight / 2));

screen.onmousemove = function (moveEvt) {
  moveEvt.preventDefault();

  var cursorCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };

  cursorPoint.style.cssText = 'left: ' + cursorCoords.x + 'px; top: ' + cursorCoords.y + 'px;';
  cursorLineHorizontal.style = 'top:' + moveEvt.clientY + 'px;'
  cursorLineVertical.style = 'left:' + moveEvt.clientX + 'px;'
  cursorPointCoords.textContent = 'x: ' + moveEvt.clientX + ' y: ' + moveEvt.clientY;

  // console.log(cursorPoint.offsetTop, cursorPoint.offsetLeft/*, moveEvt.clientX, moveEvt.clientY*/);
};
