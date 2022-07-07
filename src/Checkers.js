import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
    Group,
	WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;

class App {

	init() {

		camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
		camera.position.z = 4;

		scene = new Scene();

		const square = new BoxGeometry(1, 0.1, 1);
		const lightsquare = new MeshBasicMaterial({color: 0xE0C4A8});
		const darksquare = new MeshBasicMaterial({color: 0x6A4236});
        const board = new Group();
        
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                let cube;
                if (z % 2 == 0) {
                    cube = new Mesh(square, x % 2 == 0 ? lightsquare : darksquare);
                } else {
                    cube = new Mesh(square, x % 2 == 0 ? darksquare : lightsquare);
                }   
                cube.position.set(x, 0, z);
                board.add(cube);
            }
        }

		const cube = new Mesh( square, lightsquare );
		scene.add( board );
		renderer = new WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		window.addEventListener( 'resize', onWindowResize, false );

		const controls = new OrbitControls( camera, renderer.domElement );

		animate();

	}

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

export default App;