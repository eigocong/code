let circleStartY = 0;
let circleEndY = 1050;
let flagStartY = -200;
let flagsEndY =270;

document.onmousemove = function(e) {
    let viewportWidth = window.innerWidth;
    let cursorX = e.clientX;
    let circleTop = mapRange(cursorX, 0, viewportWidth, circleStartY, circleEndY);
    let circleElement = document.getElementById('circle');
    circleElement.style.top = circleTop + 'px';
    let flagTop = mapRange(circleTop, circleStartY, circleEndY, flagStartY, flagsEndY);
    let votesElement = document.getElementById('flag');
    votesElement.style.top = flagTop + 'px';
};





function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}