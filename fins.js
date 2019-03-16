class Fins{

  constructor(bas = 7, typ = 1, num = 3){
    this.TRAP_BASE_SCALE = 4;
    this.TRAP_HEIGHT_SCALE = 4;
    this.TRAP_MODEL = loadModel('assets/RightTrap.obj');
    this.ISORIGHT_BASE_SCALE = 25;
    this.ISORIGHT_MODEL = loadModel('assets/454590.obj');
    this.NONISORIGHT_BASE_SCALE = 4;
    this.NONISORIGHT_MODEL = loadModel('assets/306090.obj');
    this.THICKNESS_SCALE = 12;

    this.base = bas;
    this.thickness = 5;
    this.height = 5;
    this.type = typ;
    this.num = num;
    this.toDraw = true;
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Trapezoidal', 1);
    this.dropdown.option('45-45-90 Triangles', 2);
    this.dropdown.option('30-60-90 Triangles', 3);
    this.dropdown.changed(function(e){ type = this.value();
      if(type == 1){
        this.input = createInput('');
        this.inputH.position(270,200);
        this.inputH.size(70,20);
        console.log('hi');
      }
      else{
        if(this.inputH)
          this.inputH.remove();
      }
    });
    this.inputB = createInput(''+this.base);
    this.font = loadFont('assets/Avenir.otf');

  }

  activate(){
    if(type == 1){
      this.inputH = createInput('');
      this.inputH.position(270,172);
      this.inputH.size(70,20);
    }
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Trapezoidal', 1);
    this.dropdown.option('45-45-90 Triangles', 2);
    this.dropdown.option('30-60-90 Triangles', 3);
    this.dropdown.changed(function(e){ type = this.value();
      console.log(this);
      if(type == 1){
        this.inputH = createInput('');
        this.inputH.position(270,160);
        this.inputH.size(70,20);
        console.log("HI");
      }
      else{
        if(this.inputH)
          this.inputH.remove();
          console.log("BYE");
      }
    });
    this.inputB = createInput('');
    this.makeGUI();
    this.isActive = true;
  }

  deactivate(){
    this.inputB.remove();
    if(this.inputH)
      this.inputH.remove();
    this.dropdown.remove();
    this.isActive = false;
  }

  makeGUI(){
    this.dropdown.position(50,100);
    this.inputB.position(270,100);
    this.inputB.size(70,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('this.base: ', -windowWidth/2 + 220, -windowHeight/2 + 89, 200, 100);
    text('cm', -windowWidth/2 + 350, -windowHeight/2 + 88, 80, 50);
    if(type == 1){
      text('Height: ', -windowWidth/2 + 210, -windowHeight/2 + 160, 200, 100);
      text('cm', -windowWidth/2 + 350, -windowHeight/2 + 159, 80, 50);

    }
    textSize(20);
    text('Fin Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(body_height, body_radius){
    if(!this.toDraw)
      return;
    this.type = parseInt(this.dropdown.elt.value)
    if(this.inputH){
      if(!isNaN(this.inputH.elt.value) && this.inputH.elt.value >= 0){
        this.height = this.inputH.elt.value;
      }
    }
    if(!isNaN(this.inputB.elt.value)  && this.inputB.elt.value >= 2){
      this.base = this.inputB.elt.value;
    }
    let angle = 2*PI/this.num;
    fill(0,255,0);
    if(this.type == 1){
      push();
      rotateZ(PI/2);
      translate(-body_height,0,0);
      for(let i = 0; i < this.num; i++){
        push();
        rotateX(angle*i);
        translate(0,0,-body_radius);
        scale(this.TRAP_HEIGHT_SCALE*this.height,this.THICKNESS_SCALE*this.thickness,this.TRAP_BASE_SCALE*this.base);
        model(this.TRAP_MODEL);
        pop();
      }
      pop();
    }
    else if(type == 2){
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      scale(this.ISORIGHT_BASE_SCALE*this.base,this.ISOTHICKNESS_SCALE*this.thickness,this.ISORIGHT_BASE_SCALE*this.base);
      model(this.ISORIGHT_MODEL);
      pop();
    }
    else{
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      console.log('hi');
      console.log(this.NONISORIGHT_BASE_SCALE*this.base);
      scale(this.NONISORIGHT_BASE_SCALE*this.base,this.NONISOTHICKNESS_SCALE*this.thickness,this.NONISORIGHT_BASE_SCALE*this.base);
      model(this.NONISORIGHT_MODEL);
      pop();
    }


  }



}
