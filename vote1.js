let circleStartX = -10;
let circleEndX = 1910;
let votesStartY = -600;
let votesEndY = -50;

document.onmousemove = function(e) {
    let viewportWidth = window.innerWidth;
    let cursorX = e.clientX;
    let circleLeft = mapRange(cursorX, 0, viewportWidth, circleStartX, circleEndX);
    let circleElement = document.getElementById('circle');
    circleElement.style.left = circleLeft + 'px';
    let votesTop = mapRange(circleLeft, circleStartX, circleEndX, votesStartY, votesEndY);
    let votesElement = document.getElementById('votes');
    votesElement.style.top = votesTop + 'px';
};





function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}