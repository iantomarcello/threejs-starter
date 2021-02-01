import * as THREE from 'three';

let canvas;
let width;
let height;
let pixelRatio;

let scene = new THREE.Scene();
let camera;
let renderer;

let gridHelper;
let box;

self.addEventListener('message', ev => {
  let data = ev.data;

  switch (data.id) {
    case 'init':
    default:
      canvas = data.canvas;
      width = data.width;
      height = data.height;
      pixelRatio = data.pixelRatio;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.y = 30;

      renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas});
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(pixelRatio);

      gridHelper = new THREE.GridHelper(1000, 100);
      scene.add(gridHelper);

      box = new THREE.Mesh(
        new THREE.BoxGeometry(60, 60, 60),
        new THREE.MeshBasicMaterial({ color: 0xf5f5f5, })
      );
      box.position.z = -300;
      box.position.y = 30;
      scene.add(box);

      animate();

      break;

    case 'resize':
      width = data.width;
      height = data.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      break;
  }
});

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  box.rotation.y += 0.01;
  box.rotation.x += 0.001;
};
