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


let wiggleShader;

let vertSrc = `
precision highp float;

attribute vec3 aPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec4 vVertexColor;

uniform float time;

void main() {
  vec3 position = aPosition;
  position.y += 5.0 * sin(time * 0.004 + position.y * 0.05);
  vec4 viewModelPosition = uModelViewMatrix * vec4(position, 1.0);
  gl_Position = uProjectionMatrix * viewModelPosition;  
  vVertexColor = aVertexColor;
}
`;

let fragSrc = `
precision highp float;
varying vec4 vVertexColor;

void main() {
  gl_FragColor = vVertexColor;
}
`;

let ribbon;
function setup() {
  let cnv = createCanvas(100, 100, WEBGL);
  cnv.id('myCanvas');
  wiggleShader = createShader(vertSrc, fragSrc);

  let startColor = color('#F55');
  let endColor = color('#55F');

  ribbon = buildGeometry(() => {
    noStroke();


    beginShape(QUAD_STRIP);
    let numPoints = 50;
    for (let currentPoint = 0; currentPoint < numPoints; currentPoint++) {
      let x = map(currentPoint, 0, numPoints - 1, -width / 2, width / 4);
      let y = map(currentPoint, 0, numPoints - 1, -height / 6, height / 6);


      fill(lerpColor(startColor, endColor, currentPoint / (numPoints - 1)));
      for (let z of [-50, 50]) {
        vertex(x, y, z);
      }
    }
    endShape();
  });
  

}

function draw() {
  background(255);
  noStroke();

  rotateX(PI * 0.15);

  shader(wiggleShader);


  wiggleShader.setUniform('time', millis());

  model(ribbon);
}


const stickyDiv = document.getElementById('circles');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;

      // Change color when the scroll position reaches 2000px
      if (scrollPosition >= 5100) {
        stickyDiv.style.backgroundColor = 'rgb(0, 47, 255)';
      } else {
        stickyDiv.style.backgroundColor = 'rgb(219, 219, 219)';
      }
      if (scrollPosition >= 7100) {
        stickyDiv.style.backgroundColor = 'rgb(255, 0, 0)';
      }
    });
