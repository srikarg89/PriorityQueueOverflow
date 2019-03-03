var motor_type;
class Motor{

  constructor(){
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('F39-9', 1);
    this.dropdown.option('C6-9', 2);
    this.dropdown.changed(function(e){ motor_type = this.value(); });
    motor_type = 1;
    this.toDraw = true;
    this.font = loadFont('assets/Avenir.otf');
  }

  activate(){
    if(!this.isActive){
      this.dropdown = createSelect(); // or create dropdown?
      this.dropdown.option('F39-9', 1);
      this.dropdown.option('C6-9', 2);
      this.dropdown.changed(function(e){ motor_type = this.value(); });
      this.makeGUI();
      this.isActive = true;
    }
  }

  deactivate(){
    this.dropdown.remove();
    this.isActive = false;
  }

  setRadius(radius){
    body_radius = radius;
  }

  setHeight(height){
    body_height = height;
  }

  getRadius(){
    return body_radius;
  }

  getHeight(){
    return body_height;
  }

  makeGUI(){
    this.dropdown.position(250,100);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);
    text('Motor options:',-windowWidth/2 + 140,-windowHeight/2 + 88, 500,100);

    textSize(20);
    text('Choosing a motor',-windowWidth/2 + 150,-windowHeight/2 + 30, 500,100);
  }

  draw(){
    if(!this.toDraw)
      return;

    let length = 50;
    let radius = -1;
    if(motor_type == 1){
      radius = 25;
    }
    else{
      radius = 15;
    }

    push();
    translate(0,-120,0);
    fill(0,0,0);
    cylinder(radius,length);
    pop();

  }



}
