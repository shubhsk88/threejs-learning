import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import imgSource from './door/color.jpg';
import alphaMap from './door/alpha.jpg';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(imgSource);

/**
 * Object
 */

const material = new THREE.MeshBasicMaterial();
material.map = texture;
// // material.color.set('#2fffff');
// material.color = new THREE.Color('#2fffff');

// // material.wireframe = true;
// material.opacity = 0.5;

// material.transparent = true;

// // material.alphaMap=
// material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material,
);
sphere.position.x = -2;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), material);

plane.position.x = 2;

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.5, 0.3, 16, 32),
  material,
);

scene.add(plane, sphere, torus);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  torus.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;

  torus.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
