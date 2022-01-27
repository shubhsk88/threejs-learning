import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog('#262837', 1, 15);

scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */

const house = new THREE.Group();

scene.add(house);

const bricksColorTexture = textureLoader.load('textures/bricks/color.jpg');
const bricksAmbientOcculsion = textureLoader.load(
  'textures/bricks/ambientOcclusion.jpg',
);
const bricksNormalTexture = textureLoader.load('textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load(
  'textures/bricks/roughness.jpg',
);

const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
    aoMap: bricksAmbientOcculsion,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  }),
);

walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv, 2),
);
walls.position.y = 1.25;
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' }),
);

roof.rotation.y = 0.25 * Math.PI;
roof.position.y = 3;

house.add(roof);

/**Door */

const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorTextAlphaTexture = textureLoader.load('textures/door/alpha.jpg');
const doorAmbientOcculsionTexture = textureLoader.load(
  'textures/door/ambientOcculsion.jpg',
);
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const doorHeightTexture = textureLoader.load('textures/door/height.jpg');

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorTextAlphaTexture,
    aoMap: doorAmbientOcculsionTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    displacementMap: doorHeightTexture,
  }),
);

door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv, 2),
);

door.position.y = 1;

door.position.z = 2.01;

house.add(door);

//Bushes

const bushesGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushesMaterial = new THREE.MeshStandardMaterial({
  color: '#89C854',
});

const bush1 = new THREE.Mesh(bushesGeometry, bushesMaterial);

bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushesGeometry, bushesMaterial);

bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushesGeometry, bushesMaterial);

bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.1);

house.add(bush1, bush2, bush3);

const graves = new THREE.Group();

scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  color: '#b2b6b1',
});

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 5;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.4, z);
  grave.castShadow = true;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

// Floor

const grassColorTexture = textureLoader.load('textures/grass/color.jpg');
const grassAmbientOcculsionTexture = textureLoader.load(
  'textures/grass/ambientOcculsion.jpg',
);
const grassNormalTexture = textureLoader.load('textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load(
  'textures/grass/roughness.jpg',
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcculsionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcculsionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcculsionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcculsionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  }),
);

floor.receiveShadow = true;
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv, 2),
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2, 2.7);
house.add(doorLight);

/**
 * Ghost
 */

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);

scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);

scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);

scene.add(ghost3);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;
moonLight.castShadow = true;
ghost1.castShadow = true;

ghost2.castShadow = true;
ghost3.castShadow = true;

doorLight.castShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Ghost

  const ghost1Angle = 0.5 * elapsedTime;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -0.32 * elapsedTime;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -0.18 * elapsedTime;
  ghost3.position.x = Math.cos(ghost3Angle) * (Math.sin(elapsedTime * 0.3) + 7);
  ghost3.position.z = Math.sin(ghost3Angle) * (Math.sin(elapsedTime * 0.5) + 7);
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
