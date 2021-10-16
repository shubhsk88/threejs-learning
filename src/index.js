/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { Vector3 } from 'three';
import gsap from 'gsap';
//scene
const scene = new THREE.Scene();

// Objects

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
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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
  width: 800,
  height: 600,
};

//axes
// const axesHelper=new THREE.AxesHelper()

// scene.add(axesHelper)

//Scale
// mesh.scale.set(2,0.5,0.5)

//Camera
//45-75 good range
const camera = new THREE.PerspectiveCamera(
  140,
  size.width / size.height,
  1,
  1000,
);

// camera.lookAt(mesh.position)
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);

// console.log(mesh.position.distanceTo(camera.position))

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
});
renderer.setSize(size.width, size.height);

// gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
// gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });
//Clock
const clock = new THREE.Clock();

let time = Date.now();
//Animations
const tick = () => {
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  const elapsedTime = clock.getElapsedTime();

  //Update objects
  //Try these with mesh options
  mesh.rotation.y = elapsedTime;
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);
  //Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
