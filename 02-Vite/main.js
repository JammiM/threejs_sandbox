import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

const scene = new THREE.Scene();

const fov = 75;

const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const renderer = new THREE.WebGLRenderer({ alpha: true });

scene.background = new THREE.Color(0xffffff);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

function addLights() {
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(30, -10, 20);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040); // soft light
  scene.add(ambientLight);
}

function addModel(_url) {
  // swith to loadAsync
  loader.load(
    _url,
    function (gltf) {
      let tempModel = new THREE.Object3D();

      tempModel = gltf.scene;
      tempModel.position.x = -50;

      scene.add(tempModel);
    },
    (xhr) => {
      console.log(`--: ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    function (error) {
      console.error(error);
    }
  );
}

addModel("./models/low_poly_cloud.glb");
addCube();
addLights();

function addCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = "doggy";
  scene.add(cube);
}

// scene.getObjectsByProperty("type", "Mesh");
// scene.getObjectByName();

// scene.traverse((element) => {
//   if (element instanceof THREE.Mesh) {
//     console.log(element);
//   }
// });

function animate() {
  scene.getObjectByName("doggy").position.z -= 0.01;
  scene.getObjectById(5).position.x += 0.01;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
