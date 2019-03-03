var nose_type, nose_height, nose_radius;
class NoseCone{

  constructor(radius = 40, height = 70, typ = 3){
    this.ELLIPSOID_RADIUS_SCALE = 1;
    this.ELLIPSOID_HEIGHT_SCALE = 4/7;
    this.ELLIPSOID_MODEL = loadModel('assets/Ellipsoid.obj');
    this.OGIVE_RADIUS_SCALE = .8/40;
    this.OGIVE_HEIGHT_SCALE = .5/70;
    this.OGIVE_MODEL = loadModel('assets/Ogive.obj');

    nose_radius = radius;
    nose_height = height;
    nose_type = typ;
    this.toDraw = true;
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Conical', 1);
    this.dropdown.option('Elliptical', 2);
    this.dropdown.option('Ogive', 3);
    this.dropdown.changed(function(e){ nose_type = this.value(); });
    this.inpH = createInput('');
    this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 15 && this.value() <= 200){nose_height = this.value();}} });
    this.inpR = createInput('');
    this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){nose_radius = this.value(); body_radius = this.value();}} });
    this.font = loadFont('assets/Avenir.otf');

  }

  activate(){
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Conical', 1);
    this.dropdown.option('Elliptical', 2);
    this.dropdown.option('Ogive', 3);
    this.dropdown.changed(function(e){ nose_type = this.value(); });
    this.inpH = createInput('');
    this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 15 && this.value() <= 200){nose_height = this.value();}} });
    this.inpR = createInput('');
    this.inpR.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){nose_radius = this.value(); body_radius = this.value();}} });
    this.makeGUI();
    this.isActive = true;
  }

  deactivate(){
    this.inpH.remove();
    this.inpR.remove();
    this.dropdown.remove();
    this.isActive = false;
  }


  setRadius(radius){
    nose_radius = radius;
  }

  setHeight(height){
    nose_height = height;
  }

  getRadius(){
    return radius;
  }

  getHeight(){
    return height;
  }

  makeGUI(){
    this.dropdown.position(50,100);
    this.inpH.position(230,100);
    this.inpH.size(70,20);
    this.inpR.position(230,200);
    this.inpR.size(70,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Height: ', -windowWidth/2 + 170, -windowHeight/2 + 88, 200, 100);
    text('Radius: ', -windowWidth/2 + 170, -windowHeight/2 + 190, 200, 100);

    textSize(20);
    text('Nose Cone Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(){
    if(!this.toDraw)
      return;
    if(nose_type == 1){
      push();
      translate(0,(nose_height-70)/2);
      cone(nose_radius,nose_height);
      pop();
    }
    else if(nose_type == 2){
      push();
      translate(0,-35);
      scale(this.ELLIPSOID_RADIUS_SCALE*nose_radius,this.ELLIPSOID_HEIGHT_SCALE*nose_height,this.ELLIPSOID_RADIUS_SCALE*nose_radius);
      rotateX(-PI/2);
      fill(0,255,0);
      model(this.ELLIPSOID_MODEL);
      pop();
    }
    else{
      push();
      translate(0,90 + 9*(nose_height-70)/5);
      scale(this.OGIVE_RADIUS_SCALE*nose_radius,this.OGIVE_HEIGHT_SCALE*nose_height,this.OGIVE_RADIUS_SCALE*nose_radius);
      rotateX(PI/2);
      rotateY(-PI/2);
      fill(0,255,0);
      model(this.OGIVE_MODEL);
      pop();
    }


  }



}
