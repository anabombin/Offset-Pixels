let xPoints = []; //Declare as an empty array so that it can be filled
let yPoints = [];
let spacing; // Change this to adjust the spacing
let color1;
let color2;
let color3;
let color4;
let color5;
let color6;
let color7;
let color8;
let color9;
let color10;
let color11;
let color12;
let color13;
let color14;
let xSpeeds = [];
let ySpeeds = [];

const params = {
  Stroke: 50,
  Pixelation: 5,
};

const pane = new Tweakpane.Pane();

pane.addInput(params, "Stroke", { min: 20, max: 400 });
pane.addInput(params, "Pixelation", { min: 5, max: 50 });

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255, 100, 100);

  //randomizing colors on load
  color1 = random(255);
  color2 = random(255);
  color3 = random(255);
  color4 = random(255);
  color5 = random(255);
  color6 = random(255);
  color7 = random(255);
  color8 = random(255);
  color9 = random(255);
  color10 = random(255);
  color11 = random(255);
  color12 = random(255);
  color13 = random(255);
  color14 = random(255);

  camera_button = createButton("Undo");
  // ... (rest of your code for buttons)
  camera_button.position(windowWidth-70, 70);
  camera_button.style("font-size", "15px");
}

function draw() {
  background(255);
  
  Stroke = params.Stroke;
  spacing = params.Pixelation;

  // Iterate through every fifth pixel for load time
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      let closestDistance = Infinity;

      // Find the closest point from the array
      for (let i = 0; i < xPoints.length; i++) {
        let d = dist(x, y, xPoints[i], yPoints[i]);
        closestDistance = min(closestDistance, d);
      }

      // Set color based on closest distance
      let colorValue;
      if (closestDistance <= Stroke) {
        colorValue = color(color1, 100, 100); // Yellow
      } else if (closestDistance > Stroke && closestDistance <= Stroke*2) {
        colorValue = color(color2, 100, 100); // Green
      } else if (closestDistance > Stroke*2 && closestDistance <= Stroke*3) {
        colorValue = color(color3, 100, 100); // Red
      } else if (closestDistance > Stroke*3 && closestDistance <= Stroke*4) {
        colorValue = color(color4, 100, 100); // Blue
      } else if (closestDistance > Stroke*4 && closestDistance <= Stroke*5){
        colorValue = color(color5, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*5 && closestDistance <= Stroke*6){
        colorValue = color(color6, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*6 && closestDistance <= Stroke*7){
        colorValue = color(color7, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*7 && closestDistance <= Stroke*8){
        colorValue = color(color8, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*8 && closestDistance <= Stroke*9){
        colorValue = color(color9, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*9 && closestDistance <= Stroke*10){
        colorValue = color(color10, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*10 && closestDistance <= Stroke*11){
        colorValue = color(color11, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*11 && closestDistance <= Stroke*12){
        colorValue = color(color12, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*12 && closestDistance <= Stroke*13){
        colorValue = color(color13, 100, 100); // Black for the rest
      } else if (closestDistance > Stroke*13 && closestDistance <= Stroke*14){
        colorValue = color(color13, 100, 100); // Black for the rest
      }

      // Apply color to current and neighboring pixels so no white space
      for (let i = 0; i < spacing; i++) {
        for (let j = 0; j < spacing; j++) {
          if (x + i < width && y + j < height) {
            set(x + i, y + j, colorValue);
          }
        }
      }
    }
  }
  // Delete last point drawn
  camera_button.mousePressed(() => {
    xPoints.pop();
    yPoints.pop();
  });

  for (let i = 0; i < xPoints.length; i++) {
    // Update x and y positions based on their respective speeds
    xPoints[i] += xSpeeds[i];
    yPoints[i] += ySpeeds[i];
    
    // Check if the point has hit the boundary, and if so, reverse its speed
    if (xPoints[i] > width || yPoints[i] > height || xPoints[i] < 0 || yPoints[i] < 0) {
      xSpeeds[i] *= -1;
      ySpeeds[i] *= -1;
    }
  }

  updatePixels(); // Update canvas with modified pixel values
}


function mousePressed(){
  // Add a new point only when mouse is pressed but not if the mouse is over the undo button
  if (mouseX >= windowWidth-75 && mouseX<= windowWidth-20 && mouseY>=70 && mouseY<=90){
    console.log("undo-button");
  } else {
    append(xPoints, mouseX);
    append(yPoints, mouseY);
    append(xSpeeds, random(1,6));
    append(ySpeeds, random(1,6));
  }
}

function keyPressed(){
  if(key === "s"){
    saveCanvas();
  }
}