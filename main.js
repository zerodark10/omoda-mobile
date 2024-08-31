import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

document.addEventListener('DOMContentLoaded', () => {
  // Crear contenedor para el canvas y agregarlo al DOM
  const modelContainer = document.createElement('div');
  modelContainer.classList.add('modelo3d');
  document.body.appendChild(modelContainer);

  // Crear el canvas y agregarlo al contenedor
  const canvas = document.createElement('canvas');
  modelContainer.appendChild(canvas);

  // Crear la escena
  const scene = new THREE.Scene();

  // Añadir luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const light1 = new THREE.PointLight(0xe499e4, 2);
  light1.position.set(0, 1.5, 2.5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xe499e4, 2);
  light2.position.set(2.5, 0.5, 0);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xe499e4, 2);
  light3.position.set(0, 0.75, -4);
  scene.add(light3);

  const light4 = new THREE.PointLight(0xe499e4, 2);
  light4.position.set(-2.5, 1.5, 0);
  scene.add(light4);

  // Configurar la cámara
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 4); // Ajustar según el modelo
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Configurar el renderizador
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Configurar los controles de la cámara
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.enablePan = false;
  controls.enableZoom = false;

  // Cargar el modelo 3D
  const loader = new GLTFLoader();
  let carModel;
  let leftFrontDoor, rightFrontDoor, leftRearDoor, rightRearDoor, trunkDoor;

  loader.load(
    '3d/omoda-movil.glb',
    (gltf) => {
      carModel = gltf.scene;
      carModel.position.set(0, 0, 0);
      carModel.scale.set(0.8, 0.8, 0.8); // Ajustar según el modelo
      carModel.traverse((child) => {
        if (child.name === 'Puerta-izquierda') leftFrontDoor = child;
        if (child.name === 'Puerta-derecha') rightFrontDoor = child;
        if (child.name === 'Puerta-trasera-izquierda') leftRearDoor = child;
        if (child.name === 'Puerta-trasera-derecha') rightRearDoor = child;
        if (child.name === 'puertatrasera') trunkDoor = child;
      });
      scene.add(carModel);
    },
    (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
    (error) => console.log(error)
  );

  // Funciones para abrir y cerrar puertas
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
      leftRearDoor.rotation.y = 1.568;
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
      rightRearDoor.rotation.y = 1.56;
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

  // Cargar sonidos
  const abrirDoor = new Audio('audio/abrir.mp3');
  const cerrarDoor = new Audio('audio/cerrar.mp3');

  // Añadir eventos para botones
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

  // Función para resetear la cámara
  const originalCameraPosition = new THREE.Vector3(1.9, 2.6, 2.5);
  const originalTargetPosition = new THREE.Vector3(0, 0, 0);

  function resetCamera() {
    camera.position.copy(originalCameraPosition);
    camera.lookAt(originalTargetPosition);
    controls.update();
  }

  const resetCameraButton = document.getElementById('resetCameraButton');
  resetCameraButton.addEventListener('click', resetCamera);

  // Función para mover la cámara
  function moveCamera() {
    camera.translateX(0.1);
    camera.translateY(2.3);
    camera.translateZ(-3.8);
    controls.update();
  }

  const moveCameraButton = document.getElementById('moveCameraButton');
  moveCameraButton.addEventListener('click', moveCamera);

  // Función para ajustar la ventana
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  });

  // Animación
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  animate();
});
