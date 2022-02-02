import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import imgSource from './door/color.jpg';
import alphaMap from './door/alpha.jpg';

// import gradientTexture from './textures/gradients/3.jpg';
import * as dat from 'dat.gui';
import ambientOcclusion from './door/ambientOcclusion.jpg';
import heightMap from './door/height.jpg';
import metalnessMap from './door/metalness.jpg';
import roughnessMap from './door/roughness.jpg';
import normalMap from './door/normal.jpg';
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

/**
 * Debug
 */

const gui = new dat.GUI();
// Scene
const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager();

const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(imgSource);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusion);
const heightMapTexture = textureLoader.load(heightMap);
const metalnessTexture = textureLoader.load(metalnessMap);
const roughtnessTexture = textureLoader.load(roughnessMap);
const matCapMaterial = textureLoader.load('textures/matcaps/3.png');
const normalTexture = textureLoader.load(normalMap);

// const gradientTextureMaterial = textureLoader.load(gradientTexture);

// gradientTextureMaterial.minFilter = THREE.NearestFilter;
// gradientTextureMaterial.magFilter = THREE.NearestFilter;

/**
 * Object
 */

// const material = new THREE.MeshNormalMaterial();

// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matCapMaterial;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color('red');

// const material = new THREE.MeshToonMaterial();

// material.map = gradientTextureMaterial;

const material = new THREE.MeshStandardMaterial();
// material.map = texture;
// material.roughness = 0.3;
// material.metalness = 0.5;
// material.aoMap = ambientOcclusionTexture;
// material.displacementMap = heightMapTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughtnessTexture;
// material.normalMap = normalTexture;

material.roughness = 0.7;
material.metalness = 0.2;
const environmentMap = cubeTextureLoader.load([
  'textures/environmentMaps/2/px.jpg',
  'textures/environmentMaps/2/nx.jpg',
  'textures/environmentMaps/2/py.jpg',
  'textures/environmentMaps/2/ny.jpg',
  'textures/environmentMaps/2/pz.jpg',
  'textures/environmentMaps/2/nz.jpg',
]);
material.envMap = environmentMap;

gui.add(material, 'metalness', 0, 1, 0.001);
gui.add(material, 'roughness', 0, 1, 0.001);
gui.add(material, 'aoMapIntensity', 0, 10, 0.001);
gui.add(material, 'displacementScale', 0, 1, 0.001);
// material.map = texture;
// // material.color.set('#2fffff');
// material.color = new THREE.Color('#2fffff');

// // material.wireframe = true;
// material.opacity = 0.5;

// material.transparent = true;

// // material.alphaMap=
// material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material,
);
sphere.position.x = -1.5;

sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphere.geometry.getAttribute('uv').array, 2),
);
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material,
);

plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.getAttribute('uv').array, 2),
);
plane.position.x = 1.5;

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.5, 0.3, 64, 128),
  material,
);

torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(torus.geometry.getAttribute('uv').array, 2),
);
scene.add(sphere, plane, torus);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

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

  // torus.rotation.y = 0.1 * elapsedTime;
  // plane.rotation.y = 0.1 * elapsedTime;

  // torus.rotation.x = 0.15 * elapsedTime;
  // plane.rotation.x = 0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
