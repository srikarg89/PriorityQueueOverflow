class BodyTube{

  constructor(r = 3, h = 25){
    this.radius = r;
    this.height = h;
    this.RADIUS_SCALE = 10;
    this.HEIGHT_SCALE = 10;
    this.toDraw = true;
    this.inputH = createInput(''+this.height);
    this.inputR = createInput(''+this.radius);
    this.font = loadFont('assets/Avenir.otf');
  }

  activate(){
    if(!this.isActive){
      this.inputH = createInput(''+this.height);
      this.inputR = createInput(''+this.radius);
      this.makeGUI();
      this.isActive = true;
    }
  }

  deactivate(){
    this.inputH.remove();
    this.inputR.remove();
    this.isActive = false;
    console.log("HELLLO");
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
    this.inputH.position(180,100);
    this.inputH.size(70,20);
    this.inputR.position(180,200);
    this.inputR.size(70,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Height: ', -windowWidth/2 + 120, -windowHeight/2 + 88, 200, 100);
    text('Radius: ', -windowWidth/2 + 120, -windowHeight/2 + 188, 200, 100);
    text('cm', -windowWidth/2 + 260, -windowHeight/2 + 88, 80, 50);
    text('cm', -windowWidth/2 + 260, -windowHeight/2 + 190, 80, 50);

    textSize(20);
    text('Body Tube Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(){
    if(!this.toDraw)
      return;

    if(!isNaN(this.inputH.elt.value) && this.inputH.elt.value >= 0){
      this.height = this.inputH.elt.value;
    }
    if(!isNaN(this.inputR.elt.value)  && this.inputR.elt.value >= 2){
      this.radius = this.inputR.elt.value;
    }
    push();
    fill(0,0,255);
    translate(0,-this.HEIGHT_SCALE*this.height/2);
    cylinder(this.radius * this.RADIUS_SCALE, this.height * this.HEIGHT_SCALE);
    pop();

  }



}
