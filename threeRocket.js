//Creates scene and camera

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x888888 ); //Light gray

//var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
var controls = new THREE.OrbitControls( camera );
//controls.autoRotate = true;
controls.target = new THREE.Vector3(1, 1, 1);
//controls.enableDamping = true;
//controls.dampingFactor = 0.25;
//controls.enableZoom = false;
//Creates renderer and adds it to the DOM

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var keyLight = new THREE.DirectionalLight(new THREE.Color(0xff0000), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color(0xff0000), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xff0000, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

/*
var factor = 10;

$('body').on('mousewheel', function (event){

	var mX = ( event.clientX / window.innerWidth ) * 2 - 1;
	var mY = - ( event.clientY / window.innerHeight ) * 2 + 1;
	if(e.originalEvent.deltaY < 0){
		var mX = ( event.clientX / window.innerWidth ) * 2 - 1;
		var mY = - ( event.clientY / window.innerHeight ) * 2 + 1;
		var vector = new THREE.Vector3(mX, mY, 1 );
		vector.unproject(camera);
		vector.sub(camera.position);
		camera.position.addVectors(camera.position,vector.setLength(factor));
		controls.target.addVectors(controls.target,vector.setLength(factor));
	}
	else{
		var vector = new THREE.Vector3(-mX, -mY, 1 );
		vector.unproject(camera);
		vector.add(camera.position);
		camera.position.addVectors(camera.position,vector.setLength(factor));
		controls.target.addVectors(controls.target,vector.setLength(factor));
	}
});
*/

//The Cylinder!

/*
var geometry = new THREE.CylinderGeometry( 5, 5, 15, 26 , openEnded=true);
//Yellow
var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.scale.set(1, 1, 1);
cylinder.position.set(0,-7.5,0);

scene.add( cylinder );
*/
/*
//Conical Nose Cone
geometry = new THREE.ConeGeometry( 5, 10, 26 );
material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var cone = new THREE.Mesh( geometry, material );
cone.position.set(0,5,0);
scene.add( cone );
*/
//Elliptical Nose Cone
//geometry = new THREE.ConeGeometry( 5, 10, 26 );
//material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//var cone = new THREE.Mesh( geometry, material );
//cone.position.set(0,5,0);
//scene.add( cone );

/*
var loader = new THREE.OBJLoader();
    loader.load( 'Ellipsoid.obj', function ( object ) {
      object.rotation.z = Math.PI;
      object.position.set(0,0,0);
      object.scale.set(20,20,20);
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('/examples/3d-obj-loader/assets/');

      scene.add( object );
    } );
*/
//Sets camera's distance away from cube (using this explanation only for simplicity's sake - in reality this actually sets the 'depth' of the camera's position)

var objLoader = new THREE.OBJLoader();
objLoader.setPath('/assets/');
objLoader.load('Ogive.obj', function (object) {

object.position.y = 1;
object.position.x = 2;
object.position.z = 1;
object.rotation.y = Math.PI/2;
object.rotation.z = -Math.PI/2;
object.scale.set(.001,.001,.001);
scene.add(object);

});


//camera.position.z = 30;

//Rendering

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

mousewheel = function (event) {
                var factor = 15;
                var mX = (event.clientX / jQuery(container).width()) * 2 - 1;
                var mY = -(event.clientY / jQuery(container).height()) * 2 + 1;
                var vector = new THREE.Vector3(mX, mY, 0.1);

                vector.unproject(camera);
                vector.sub(camera.position);
                if (event.deltaY < 0) {
                    camera.position.addVectors(camera.position, vector.setLength(factor));
                    trackBallControls.target.addVectors(trackBallControls.target, vector.setLength(factor));
                } else {
                    camera.position.subVectors(camera.position, vector.setLength(factor));
                    trackBallControls.target.subVectors(trackBallControls.target, vector.setLength(factor));
                }
    };

animate();
