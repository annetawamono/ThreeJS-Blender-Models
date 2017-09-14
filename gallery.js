var scene, camera, renderer, container;

var WIDTH = document.getElementById('world').offsetWidth;
var HEIGHT = document.getElementById('world').offsetHeight;

window.addEventListener('load', init, false);

function init() {
	initScene();
	initCamera();
	initLights();
	initRenderer();

	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	initModel();

	document.addEventListener('mousemove', handleMouseMove, false);

	render();
}

var mousePos = {x: 0, y:0};

function handleMouseMove(event) {
	var tx = -1 + (event.clientX/WIDTH)*2;
	var ty = 1 - (event.clientY/HEIGHT)*2;

	mousePos = {x: tx, y:ty};
}

function initScene() {
	scene = new THREE.Scene();	
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10);
	camera.position.set(0, 3.5, 5);
	camera.lookAt(scene.position);
}

function initRenderer() {
	renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
	renderer.setSize(WIDTH, HEIGHT);
}

var mesh = null;
function initModel() {
	//this.mesh = null;
	var loader = new THREE.JSONLoader();
	loader.load('characterfixednormals.json', function(geometry, materials) {
		var material1 = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('apparel.png'), side: THREE.DoubleSide});
		var material2 = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('head.png'), side: THREE.DoubleSide});
		materials2 = [material2, material1, materials[2]];
		mesh = new THREE.Mesh(geometry, materials2);
		mesh.scale.set(0.5, 0.5, 0.5);
		mesh.position.y -= 5;
		scene.add(this.mesh);
	});
	console.log("Mesh is " + mesh);
}

function rotateModel() {
	if(!mesh){
		//console.log("Mesh is " + this.mesh);
		return;
	}
	if(mousePos.x >= 0) {
		mesh.rotation.y += 0.005*mousePos.x;
	} else {
		mesh.rotation.y += 0.005*mousePos.x;
	}
};

function render() {
	requestAnimationFrame(render);
	rotateModel();
	renderer.render(scene, camera);
}

function initLights() {
	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);
}