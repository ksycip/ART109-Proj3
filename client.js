// Art 109 Three.js Demo Site
// client6.js
// A three.js scene which loads a static and animated model.

// The pink model is static (contains no animation data in the file)
// It is animated manually in Three.js

// The green model is preanimated (contains animation data created in blender)
// 3D model is from Blender default

// Implements Orbit controls and font loader

// Import required source code
// Import three.js core
// import * as THREE from "./build/three.module.js";
import * as THREE from "./build/three.module.js";

// Import add-ons for glTF models, orbit controls, and font loader
import {
  OrbitControls
} from "./src/OrbitControls.js";
import {
  GLTFLoader
} from "./src/GLTFLoader.js";
import {
  FontLoader
} from "./src/FontLoader.js"

let container, scene, camera, renderer, mesh, mesh2, mixer, controls, clock;

let ticker = 0;

// Call init and animate functions (defined below)
init();
animate();

function init() {

  //Identify div in HTML to place scene
  container = document.getElementById("space");

  //Crate clock for animation
  clock = new THREE.Clock();

  //Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xdfdfdf);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  // Add scene to gltf.html
  container.appendChild(renderer.domElement);

  // Material to be added to preanimated model
  var newMaterial = new THREE.MeshStandardMaterial({
    // color: 0x2E5939
  });

  // Load preanimated model, add material, and add it to the scene
  const loader = new GLTFLoader().load(
    "./assets/planet_animation.glb",
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = newMaterial;
        }
      });
      // set position and scale
      mesh = gltf.scene;
      mesh.position.set(4, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      // Add model to scene
      scene.add(mesh);
      //Check for and play animation frames
      mixer = new THREE.AnimationMixer(mesh);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

    },
    undefined,
    function(error) {
      console.error(error);
    }
  );
