let size = 30;
let button;
let noseConeShow = true;
function setup() {
  createCanvas(900,600,WEBGL);
  button = createButton('Hide nose cone');
  console.log(button);
  button.elt.setAttribute("id", "nose_button");
  button.position(0, 0);
  button.mousePressed(changeNoseCone);
}

function draw() {
  background(100);
  displayRocket();
}

function changeNoseCone(){
  noseConeShow = !noseConeShow;
  console.log('hi');
  if(noseConeShow)
    button.elt.innerHTML = "Hide nose cone";
  else
    button.elt.innerHTML = "Show nose cone";
}

displayRocket = function(){
  let rotateMouse = map(mouseX,0,width,-2*PI,2*PI);
  let rotateMouse1 = map(mouseY,0,height,-2*PI,2*PI);

  //Point being rotated at: 0, -180
  //Starting point: 0,20
  //Ending point: 0,-380
  noStroke();
  push();
  translate(0,-80);
  translate(0,100);
  rotateY(rotateMouse);
  rotateX(rotateMouse1);
  translate(0,-100);
  rotateX(PI);
  fill(255,0,0);
  if(noseConeShow)
    cone(40,70);
  translate(0,-110);
  fill(0,0,255);
  cylinder(40,150);
  pop();
}

gridToDisplay = function(startI){
  let grid = [[0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2],[3,3,3,3,3,3,3,3,3],[4,4,4,4,4,4,4,4,4],[5,5,5,5,5,5,5,5,5]]
  for (var i = 0; i < grid.length; i++) {
//      push();
    rectMode(CENTER);
    for (var j = 0; j < grid[i].length; j++) {
        let num = grid[i][j];
        let j1 = j%3 + 1;
        let j2 = int(j/3);
        let x = j1*size;
        let y = j2*size;
//          rect(x,y,5,5);
//          console.log(x,y,j,j1);
        drawIt(i,num,x,y);
    }
//      pop();
  }
}


drawIt = function(side, num, x, y){
  push();
  noStroke();
  switch(num){
  case 0:
    fill(0,0,255);
    break;
  case 1:
    fill(255,0,0);
    break;
  case 2:
    fill(0,255,0);
    break;
  case 3:
    fill(255,165,0);
    break;
  case 4:
    fill(255,255,0);
    break;
  case 5:
    fill(255,255,255);
    break;
  }
  let rotateMouse = map(mouseX,0,width,-3/2*PI,3/2*PI);
  let rotateMouse1 = map(mouseY,0,height,-3/2*PI,3/2*PI);
  rotateMouse1 *= -1;
  rectMode(CENTER);
  switch(side){
    case 0:
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
    translate(0,0,1.5*size);
    rect(x,y,size,size);
    break;
    case 1:
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
    translate(size*3.5,0,size*2);
    rotateY(PI/2);
    rect(x,y,size,size);
    break;
    case 2:
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
    translate(size*4,0,-3*size/2);
    rotateY(PI);
    rect(x,y,size,size);
    break;
    case 3:
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
    translate(size/2,0,-size*2);
    rotateY(-PI/2);
    rect(x,y,size,size);
    break;
    case 4:
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
    translate(0,-size/2,-size);
    rotateX(PI/2);
    rect(x,y,size,size);
    break;
    case 5:
    rotateY(rotateMouse);
    rotateX(rotateMouse1);
    translate(0,size*2.5,size);
    rotateX(-PI/2);
    rect(x,y,size,size);
    break;
  }
//    rotateX(angle);
//    rect(x,y,10,10);
  pop();
}
