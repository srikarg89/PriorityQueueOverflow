class NoseCone{

  constructor(r = 3, h = 10){
    //Constants for different types of nose cones
    this.CONE_RADIUS_SCALE = 10;
    this.CONE_HEIGHT_SCALE = 10;

    this.ELLIPSOID_RADIUS_SCALE = 80/3;
    this.ELLIPSOID_HEIGHT_SCALE = 4;
    this.ELLIPSOID_MODEL = loadModel('assets/Ellipsoid.obj');

    this.OGIVE_RADIUS_SCALE = .8/3;
    this.OGIVE_HEIGHT_SCALE = .5/7;
    this.OGIVE_MODEL = loadModel('assets/Ogive.obj');

    this.radius = r;
    this.height = h;
    this.type = 1; //Default nose cone type
    this.toDraw = true;
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Conical', 1);
    this.dropdown.option('Elliptical', 2);
    this.dropdown.option('Ogive', 3);
    this.inputH = createInput(''+this.height);
    this.inputR = createInput(''+this.radius);
    this.font = loadFont('assets/Avenir.otf');
  }

  activate(){
    if(!this.isActive){
      this.dropdown = createSelect(); // or create dropdown?
      this.dropdown.option('Conical', 1);
      this.dropdown.option('Elliptical', 2);
      this.dropdown.option('Ogive', 3);
      this.inpH = createInput('');
      this.inpR = createInput('');
      this.makeGUI();
      this.isActive = true;
    }
  }

  deactivate(){
    this.inputH.remove();
    this.inputR.remove();
    console.log('hi');
    this.dropdown.remove();
    this.isActive = false;
  }


  setRadius(radius){
    this.nose_radius = radius;
  }

  setHeight(height){
    this.nose_height = height;
  }

  getRadius(){
    return radius;
  }

  getHeight(){
    return height;
  }

  makeGUI(){
    this.dropdown.position(50,100);
    this.inputH.position(230,100);
    this.inputH.size(70,20);
    this.inputR.position(230,200);
    this.inputR.size(70,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Height: ', -windowWidth/2 + 170, -windowHeight/2 + 88, 200, 100);
    text('Radius: ', -windowWidth/2 + 170, -windowHeight/2 + 190, 200, 100);
    text('cm', -windowWidth/2 + 310, -windowHeight/2 + 88, 80, 50);
    text('cm', -windowWidth/2 + 310, -windowHeight/2 + 190, 80, 50);

    textSize(20);
    text('Nose Cone Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }


  draw(nose_position){
    if(!this.toDraw)
      return;
    fill(255,0,0);
    this.type = parseInt(this.dropdown.elt.value);
    if(!isNaN(this.inputH.elt.value) && this.inputH.elt.value >= 5){
      this.height = this.inputH.elt.value;
    }
    if(!isNaN(this.inputR.elt.value)  && this.inputR.elt.value >= 2){
      this.radius = this.inputR.elt.value;
    }
    push();
    if(this.type == 1){
      push();
      translate(0,this.CONE_HEIGHT_SCALE*this.height/2);
      cone(this.CONE_RADIUS_SCALE*this.radius,this.CONE_HEIGHT_SCALE*this.height);
      pop();
    }
    else if(this.type == 2){
      push();
      translate(nose_position.x,nose_position.y);
      scale(this.ELLIPSOID_RADIUS_SCALE*this.radius,this.ELLIPSOID_HEIGHT_SCALE*this.height,this.ELLIPSOID_RADIUS_SCALE*this.radius);
      rotateX(-PI/2);
      fill(0,255,0);
      model(this.ELLIPSOID_MODEL);
      pop();
    }
    else{
      push();
      translate(nose_position.x,nose_position.y);
      scale(this.OGIVE_RADIUS_SCALE*this.radius,this.OGIVE_HEIGHT_SCALE*this.height,this.OGIVE_RADIUS_SCALE*this.radius);
      rotateX(PI/2);
      rotateY(-PI/2);
      fill(0,255,0);
      model(this.OGIVE_MODEL);
      pop();
    }
    pop();

  }



}
