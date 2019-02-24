class NoseCone{

  constructor(radius = 40, height = 70, type){
    this.radius = radius;
    this.height = height;
    this.type = type;
    this.ELLIPSOID_SCALE = 40;
    this.ELLIPSOID_MODEL = loadModel('Ellipsoid.obj');
  }

  setRadius(radius){
    this.radius = radius;
  }

  setHeight(height){
    this.height = height;
  }

  getRadius(){
    return radius;
  }

  getHeight(){
    return height;
  }

  draw(toDraw){
    if(!toDraw)
      return;
    if(this.type == 1){
      cone(40,70);
    }
    else{
      push();
      translate(0,-35);
      scale(this.ELLIPSOID_SCALE);
      rotateX(-PI/2);
      fill(0,255,0);
      model(this.ELLIPSOID_MODEL);
      pop();
    }

  }



}
