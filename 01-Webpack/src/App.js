"use strict";

import * as THREE from "three";
import * as css from "./reset.css";
import WebGL from "three/examples/jsm/capabilities/WebGL";

class App {
  constructor() {}

  init = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    var fov = 75;
    var aspectRatio = window.innerWidth / window.innerHeight;

    var nearPlane = 0.1;
    var farPlane = 1000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      fov,
      aspectRatio,
      nearPlane,
      farPlane
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (WebGL.isWebGL2Available) {
      renderer.setAnimationLoop(animate);
    } else {
      const warning = WebGL.getWebGL2ErrorMessage();
      document.getElementById("container").appendChild(warning);
    }

    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 3, 3);

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
  };
}

export { App };
