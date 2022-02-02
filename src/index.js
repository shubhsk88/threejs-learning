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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// const particleGeometry = new THREE.SphereBufferGeometry(1, 32, 32);

const particleGeometry = new THREE.BufferGeometry();

const particleTexture = textureLoader.load('textures/particles/2.png');

const count = 5000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i += 1) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particleGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3),
);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.1,
});

// particleMaterial.color = new THREE.Color('#ff88cc');
particleMaterial.alphaMap = particleTexture;
particleMaterial.transparent = true;
// particleMaterial.alphaTest = 0.001;
// particleMaterial.depthTest = false ;

particleMaterial.depthWrite = false;

const particles = new THREE.Points(particleGeometry, particleMaterial);

scene.add(particles);
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
camera.position.z = 3;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
