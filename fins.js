var fin_type, base, thickness, height;
class Fin{

  constructor(bas = 7, typ = 1){
    this.TRAP_BASE_SCALE = 4;
    this.TRAP_HEIGHT_SCALE = 4;
    this.TRAP_THICKNESS_SCALE = 12;
    this.TRAP_MODEL = loadModel('assets/RightTrap.obj');
    this.ISORIGHT_BASE_SCALE = 25;
    this.ISORIGHT_THICKNESS_SCALE = 12;
    this.ISORIGHT_MODEL = loadModel('assets/454590.obj');
    this.NONISORIGHT_BASE_SCALE = 4;
    this.NONISORIGHT_THICKNESS_SCALE = 12;
    this.NONISORIGHT_MODEL = loadModel('assets/306090.obj');

    base = bas;
    thickness = 5;
    height = 5;
    fin_type = typ;
    this.toDraw = true;
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Trapezoidal', 1);
    this.dropdown.option('45-45-90 Triangles', 2);
    this.dropdown.option('30-60-90 Triangles', 3);
    this.dropdown.changed(function(e){ fin_type = this.value();
      if(fin_type == 1){
        this.inpH = createInput('');
        this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){height = this.value()}} });
        this.inpH.position(270,200);
        this.inpH.size(70,20);
        console.log('hi');
      }
      else{
        if(this.inpH)
          this.inpH.remove();
      }
    });
    this.inpB = createInput('');
    this.inpB.input(function(e){ if(!isNaN(this.value())){if(this.value() > 15 && this.value() <= 100){base = this.value();}} });
    this.font = loadFont('assets/Avenir.otf');

  }

  activate(){
    if(fin_type == 1){
      this.inpH = createInput('');
      this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){height = this.value()}} });
      this.inpH.position(270,172);
      this.inpH.size(70,20);
    }
    this.dropdown = createSelect(); // or create dropdown?
    this.dropdown.option('Trapezoidal', 1);
    this.dropdown.option('45-45-90 Triangles', 2);
    this.dropdown.option('30-60-90 Triangles', 3);
    this.dropdown.changed(function(e){ fin_type = this.value();
      console.log(this);
      if(fin_type == 1){
        this.inpH = createInput('');
        this.inpH.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){height = this.value()}} });
        this.inpH.position(270,160);
        this.inpH.size(70,20);
        console.log("HI");
      }
      else{
        if(this.inpH)
          this.inpH.remove();
          console.log("BYE");
      }
    });
    this.inpB = createInput('');
    this.inpB.input(function(e){ if(!isNaN(this.value())){if(this.value() > 5 && this.value() < 120){base = this.value(); base = this.value();}} });
    this.makeGUI();
    this.isActive = true;
  }

  deactivate(){
    this.inpB.remove();
    if(this.inpH)
      this.inpH.remove();
    this.dropdown.remove();
    this.isActive = false;
  }

  makeGUI(){
    this.dropdown.position(50,100);
    this.inpB.position(270,100);
    this.inpB.size(70,20);

    textFont(this.font);
    fill(0,0,0);
    textSize(15);

    text('Base: ', -windowWidth/2 + 220, -windowHeight/2 + 89, 200, 100);
    text('cm', -windowWidth/2 + 350, -windowHeight/2 + 88, 80, 50);
    if(fin_type == 1){
      text('Height: ', -windowWidth/2 + 210, -windowHeight/2 + 160, 200, 100);
      text('cm', -windowWidth/2 + 350, -windowHeight/2 + 159, 80, 50);

    }
    textSize(20);
    text('Fin Variables and Parameters',-windowWidth/2 + 90,-windowHeight/2 + 30, 500,100);
  }

  draw(angle){
    if(!this.toDraw)
      return;
    if(fin_type == 1){
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      scale(this.TRAP_HEIGHT_SCALE*height,this.TRAP_THICKNESS_SCALE*thickness,this.TRAP_BASE_SCALE*base);
      model(this.TRAP_MODEL);
      pop();
    }
    else if(fin_type == 2){
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      scale(this.ISORIGHT_BASE_SCALE*base,this.ISORIGHT_THICKNESS_SCALE*thickness,this.ISORIGHT_BASE_SCALE*base);
      model(this.ISORIGHT_MODEL);
      pop();
    }
    else{
      push();
      rotateX(angle);
      translate(0,0,-40);
      fill(0,255,0);
      console.log('hi');
      console.log(this.NONISORIGHT_BASE_SCALE*base);
      scale(this.NONISORIGHT_BASE_SCALE*base,this.NONISORIGHT_THICKNESS_SCALE*thickness,this.NONISORIGHT_BASE_SCALE*base);
      model(this.NONISORIGHT_MODEL);
      pop();
    }


  }



}
