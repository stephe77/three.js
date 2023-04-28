const div = document.querySelector('.threejs');

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = div.clientWidth / div.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(div.clientWidth, div.clientHeight);
};

document.forms[0].addEventListener('change', (e) => {
  spotLight1.intensity = e.target.value;
})

document.forms[1].addEventListener('change', (e) => {
  directionalLight.intensity = e.target.value;
})

document.forms[2].addEventListener('change', (e) => {
  spotLight2.intensity = e.target.value;
})

document.forms[3].addEventListener('change', (e) => {
  box.material.color.set(e.target.value);
})

document.forms[4].addEventListener('change', (e) => {
  pyramid.material.color.set(e.target.value);
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, div.clientWidth / div.clientHeight, 0.1, 50);
camera.position.set(0, 3, 7.5);
cameraTarget = new THREE.Vector3(0, 0.1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(div.clientWidth, div.clientHeight);
renderer.shadowMap.enabled = true;
div.appendChild(renderer.domElement);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.MeshPhysicalMaterial({
    color: 0xDCDCDC,
    side: THREE.DoubleSide
  })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhysicalMaterial({
    color: 0x42AAFF,
    side: THREE.DoubleSide
  })
);
box.position.set(1, 1, 0);
box.castShadow = true;
scene.add(box);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0, 1, 4);
directionalLight.castShadow = true;
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);

var geometry1 = new THREE.BufferGeometry();
const vertices1 = new Float32Array([
  -10, 0, 0,
  10, 0, 0,
  10, 10, 0,

  10, 10, 0,
  -10, 10, 0,
  -10, 0, 0,
]);

geometry1.setAttribute('position', new THREE.Float32BufferAttribute(vertices1, 3));
geometry1.computeVertexNormals();
const material1 = new THREE.MeshPhongMaterial({ color: 0x99958C, side: THREE.DoubleSide });
const plane2 = new THREE.Mesh(geometry1, material1);
plane2.receiveShadow = true;
plane2.position.z = -2;
scene.add(plane2);

var geometry2 = new THREE.BufferGeometry();
const vertices2 = new Float32Array([
  0, 0, 0.7,
  0.7, 0, 0,
  -0.49, -Math.sqrt(0.7 * 0.7 - 0.49 * 0.49), 0,

  0, 0, 0.7,
  0.7, 0, 0,
  -0.49, Math.sqrt(0.7 * 0.7 - 0.49 * 0.49), 0,

  0, 0, 0.7,
  -0.49, -Math.sqrt(0.7 * 0.7 - 0.49 * 0.49), 0,
  -0.49, Math.sqrt(0.7 * 0.7 - 0.49 * 0.49), 0,

  0.7, 0, 0,
  -0.49, -Math.sqrt(0.7 * 0.7 - 0.49 * 0.49), 0,
  -0.49, Math.sqrt(0.7 * 0.7 - 0.49 * 0.49), 0
]);
geometry2.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));
geometry2.computeVertexNormals();
const material2 = new THREE.MeshPhongMaterial({ color: 0x42AAFF, side: THREE.DoubleSide });
const pyramid = new THREE.Mesh(geometry2, material2);
pyramid.castShadow = true;
pyramid.position.set(-1, 1, 0)
scene.add(pyramid);

const spotLight1 = new THREE.SpotLight(0xFBE7ED, 0.4);
spotLight1.position.set(-6, 1, 10);
spotLight1.angle = 0.5;
spotLight1.castShadow = true;
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xFBE7ED, 0.5);
spotLight2.position.set(6, 4, -3);
spotLight2.angle = 0.3;
spotLight2.castShadow = true;
scene.add(spotLight2);

camera.lookAt(cameraTarget);
renderer.render(scene, camera);

function render(time) {
  time *= 0.001;

  box.rotation.x = time;
  box.rotation.y = time;

  pyramid.rotation.x = time;
  pyramid.rotation.z = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);