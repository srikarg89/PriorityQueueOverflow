//Creates scene and camera

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x888888 ); //Light gray

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var controls = new THREE.OrbitControls( camera );
//controls.autoRotate = true;
controls.target = new THREE.Vector3(1, 1, 1);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
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
objLoader.load('Ellipsoid.obj', function (object) {

object.scale.set(20,20,20);
object.position.y -= 60;
scene.add(object);

//    });

});


camera.position.z = 30;

//Rendering

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();
