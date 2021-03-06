import * as THREE from 'three';

const canvas = document.getElementById('webgl-canvas');
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const pixelRatio = window.devicePixelRatio;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.y = 30;

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(width, height);
renderer.setPixelRatio(pixelRatio);

const gridHelper = new THREE.GridHelper(1000, 100);
scene.add(gridHelper);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(60, 60, 60),
  new THREE.MeshBasicMaterial({ color: 0xf5f5f5, })
);
box.position.z = -300;
box.position.y = 30;
scene.add(box);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  box.rotation.y += 0.01;
  box.rotation.x += 0.001;
};
animate();

const onResize = () => {
  let width = canvas.clientWidth;
  let height = canvas.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

window.addEventListener('resize', onResize);
