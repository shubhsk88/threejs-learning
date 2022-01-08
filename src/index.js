/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
import './style.css';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import imgSource from './door/color.jpg';

console.log(imgSource);

/**
 * Textures

 */

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(imgSource);
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   console.log('loadede');
//   texture.needsUpdate = true;
// };
// image.src = imgSource;

//scene
const scene = new THREE.Scene();

// Objects

//Cursors
const cursor = { x: 0, y: 0 };

// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / size.width - 0.5;
//   cursor.y = -(event.clientY / size.height - 0.5);
// });

// const group=new THREE.Group()
// group.position.y=1
// group.scale.y=1
// group.rotation.y=1
// scene.add(group)

// const cube1=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:"green"}))

// group.add(cube1)

// const cube2=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:"green"}))

// cube2.position.x=-2
// group.add(cube2)

// const cube3=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:"peachpuff"}))
// cube3.position.x=2
// group.add(cube3)
//geomery of object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
//position
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 1;

// mesh.position.set(0.1,1,-1)

//Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x=Math.PI/4
// mesh.rotation.y=Math.PI/4
scene.add(mesh);
// mesh.position.distanceTo(new Vector3(1,2,3))

// mesh.position.normalize()
//Size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  //Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(size.width, size.height);
});

window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//axes
// const axesHelper=new THREE.AxesHelper()

// scene.add(axesHelper)

//Scale
// mesh.scale.set(2,0.5,0.5)

//Camera
//45-75 good range
const camera = new THREE.PerspectiveCamera(70, size.width / size.height);
camera.position.z = -1;
camera.lookAt(mesh.position);
// const aspectRatio = size.width / size.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   -1,
//   1,
//   0.1,
//   100,
// );

// camera.lookAt(mesh.position)
// camera.position.z = -1;
// camera.lookAt(mesh.position);

// console.log(mesh.position.distanceTo(camera.position))

scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);

// gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
// gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });
//Clock
const clock = new THREE.Clock();

//Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;

let time = Date.now();
//Animations
const tick = () => {
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  const elapsedTime = clock.getElapsedTime();

  controls.update();

  // camera.position.x = Math.sin(cursor.x * 10) * 3;
  // camera.position.z = Math.cos(cursor.x * 10) * 3;
  // camera.lookAt(mesh.position);
  //Update objects
  //Try these with mesh options
  // mesh.rotation.y = elapsedTime;
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);
  //Render
  renderer.render(scene, camera);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  window.requestAnimationFrame(tick);
};

tick();
