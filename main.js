import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.addEventListener('DOMContentLoaded', () => {
  const modelContainer = document.querySelector('.modelo3d');
  
  if (modelContainer) {
    const canvas = document.createElement('canvas');
    modelContainer.appendChild(canvas);
  } else {
    console.error('El contenedor .modelo3d no se encontró en el DOM.');
  }
});

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let hemiLight;
const scene = new THREE.Scene()

// Añadir luces
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Luz ambiental
scene.add(ambientLight);

let light1 = new THREE.PointLight(0xe499e4, 2);
light1.position.set(0, 1.5, 2.5);
scene.add(light1);

let light2 = new THREE.PointLight(0xe499e4, 2);
light2.position.set(2.5, 0.5, 0);
scene.add(light2);

let light3 = new THREE.PointLight(0xe499e4, 2);
light3.position.set(0, 0.75, -4);
scene.add(light3);

let light4 = new THREE.PointLight(0xe499e4, 2);
light4.position.set(-2.5, 1.5, 0);
scene.add(light4);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.8;
camera.position.y = 1.5;
camera.position.x = 1.3;
light1.castShadow = true;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.3;

const modelContainer = document.querySelector('.modelo3d');
modelContainer.appendChild(renderer.domElement);

renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2.5;
controls.enablePan = false;
controls.enableZoom = false;

const loader = new GLTFLoader();
let carModel;
let leftFrontDoor, rightFrontDoor, leftRearDoor, rightRearDoor, trunkDoor;

hemiLight = new THREE.HemisphereLight(0xd7e2e5, 0x080820, 2);
scene.add(hemiLight);

loader.load(
  '3d/omoda-movil.glb',
  function (gltf) {
      const model = gltf.scene;

      carModel = gltf.scene;
      carModel.traverse(function (child) {
          if (child.name === 'Puerta-izquierda') {
              leftFrontDoor = child;
          }
          if (child.name === 'Puerta-derecha') {
              rightFrontDoor = child;
          }
          if (child.name === 'Puerta-trasera-izquierda') {
              leftRearDoor = child;
          }
          if (child.name === 'Puerta-trasera-derecha') {
              rightRearDoor = child;
          }
          if (child.name === 'puertatrasera') {
            trunkDoor = child;
        }
      });

      model.position.x = 0.4;
      model.rotation.y = 0;

      scene.add(carModel);
  },
  (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
      console.log(error);
  }
);

function openLeftFrontDoor() {
  if (leftFrontDoor) {
      leftFrontDoor.rotation.y = -Math.PI / 0.566; 
      abrirDoor.play();
  }
}

function closeLeftFrontDoor() {
  if (leftFrontDoor) {
      leftFrontDoor.rotation.y = 1.566; 
      cerrarDoor.play();
  }
}

function openRightFrontDoor() {
  if (rightFrontDoor) {
      rightFrontDoor.rotation.y = Math.PI / 0.45; 
      abrirDoor.play();
  }
}

function closeRightFrontDoor() {
  if (rightFrontDoor) {
      rightFrontDoor.rotation.y = 1.56; 
      cerrarDoor.play();
  }
}

function openLeftRearDoor() {
  if (leftRearDoor) {
      leftRearDoor.rotation.y = -Math.PI / 0.26; 
      abrirDoor.play();
  }
}

function closeLeftRearDoor() {
  if (leftRearDoor) {
      leftRearDoor.rotation.y =  1.568;  
      cerrarDoor.play();
  }
}

function openRightRearDoor() {
  if (rightRearDoor) {
      rightRearDoor.rotation.y = Math.PI / 3.2; 
      abrirDoor.play();
  }
}

function closeRightRearDoor() {
  if (rightRearDoor) {
      rightRearDoor.rotation.y =1.56; 
      cerrarDoor.play();
  }
}

function openTrunkDoor() {
  if (trunkDoor) {
    trunkDoor.rotation.x = -Math.PI / 0.66; 
    abrirDoor.play();
  }
}

function closeTrunkDoor() {
  if (trunkDoor) {
    trunkDoor.rotation.x = 0; 
    cerrarDoor.play();
  }
}

const abrirDoor = new Audio('audio/abrir.mp3');
const cerrarDoor = new Audio('audio/cerrar.mp3');

document.getElementById('openLeftFrontDoorButton').addEventListener('click', openLeftFrontDoor);
document.getElementById('closeLeftFrontDoorButton').addEventListener('click', closeLeftFrontDoor);
document.getElementById('openRightFrontDoorButton').addEventListener('click', openRightFrontDoor);
document.getElementById('closeRightFrontDoorButton').addEventListener('click', closeRightFrontDoor);
document.getElementById('openLeftRearDoorButton').addEventListener('click', openLeftRearDoor);
document.getElementById('closeLeftRearDoorButton').addEventListener('click', closeLeftRearDoor);
document.getElementById('openRightRearDoorButton').addEventListener('click', openRightRearDoor);
document.getElementById('closeRightRearDoorButton').addEventListener('click', closeRightRearDoor);
document.getElementById('openTrunkDoorButton').addEventListener('click', openTrunkDoor);
document.getElementById('closeTrunkDoorButton').addEventListener('click', closeTrunkDoor);

const originalCameraPosition = new THREE.Vector3(1.9, 2.6, 2.5);
const originalTargetPosition = new THREE.Vector3(0, 0, 0);
camera.position.x += 1;

function resetCamera() {
  camera.position.copy(originalCameraPosition);
  camera.lookAt(originalTargetPosition);
  controls.minAzimuthAngle = -Infinity; 
  controls.maxAzimuthAngle = Infinity;  
  controls.minPolarAngle = 0;           
  controls.maxPolarAngle = Math.PI;
  controls.update();
}

const resetCameraButton = document.getElementById('resetCameraButton');
resetCameraButton.addEventListener('click', resetCamera);

function moveCamera() {
  camera.position.set(0, 0, 0);
  camera.position.x -= 0;
  camera.position.z -= 0.01;
  camera.position.y += 3.5;
  controls.update();
}

const moveCameraButton = document.getElementById('moveCameraButton');
moveCameraButton.addEventListener('click', moveCamera);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
controls.update();

animate();
