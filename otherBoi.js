window.onload = function() {

       var renderer = new THREE.WebGLRenderer();
       var width = 640;
       var height = 480;
       renderer.setSize( width, height );
       var div = document.body;
       div.appendChild( renderer.domElement );

       var scene = new THREE.Scene();

           camera = new THREE.PerspectiveCamera(
           70,
           width / height,
           0.1,
           10000
       );
       camera.position.set( 0, 10, 10 );
       camera.lookAt( scene.position );

       control = new THREE.OrbitControls( camera );

       var geometry = new THREE.CubeGeometry( 5, 5, 5 );
       var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
        mesh = new THREE.Mesh( geometry, material );
       scene.add( mesh );

       var light = new THREE.PointLight( 0xFFFF00 );
       light.position.set( 10, 0, 10 );
       scene.add( light );

       var dt = 30;
       var renderFunc = function() {
         update(dt);
         renderer.render(scene,camera);
       };

       setInterval(renderFunc,dt);

       //MY ZOOMING CODE.
       var mouseVector = new THREE.Vector3();
       var projector = new THREE.Projector();
       var startMousePos = new THREE.Vector3();
       var intersectedPoint = new THREE.Vector3();
       var intersectedOffset = new THREE.Vector3();

//FIND INTERSECTED POSITION ON THE CUBE
       canvas.onmousemove = function (event)
       {
           mouseVector.x = ( event.clientX / 640 ) * 2 - 1;
           mouseVector.y = - ( event.clientY / 480 ) * 2 + 1;
           startMousePos.x = mouseVector.x;
           startMousePos.y = mouseVector.y;

           var vector = new THREE.Vector3( mouseVector.x, mouseVector.y, 1 );
           projector.unprojectVector( vector, camera );
           var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

           var intersects = ray.intersectObjects( scene.children );

           if ( intersects.length > 0 )
           {
                intersectedPoint = intersects[0].point;
           }
       }
//HERE I THINK I MUST TRANSLATE MY CAMERA.
       canvas.onmousewheel = function(event)
       {
           if(event.wheelDelta > 0)
           {
               camera.position.x -= intersectedPoint.x;
               camera.position.y -= intersectedPoint.y;
               camera.position.z -= intersectedPoint.z;
           }
           else
           {
               camera.position.x += intersectedPoint.x;
               camera.position.y += intersectedPoint.y;
               camera.position.z += intersectedPoint.z;

           }
       }
   };
