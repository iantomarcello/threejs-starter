import * as Comlink from 'comlink';
import { Scene, PerspectiveCamera, WebGLRenderer, GridHelper, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

class Three {
  constructor() {
    this.canvas;
    this.scene = new Scene();
    this.camera;
    this.renderer;
    this.gridHelper;
    this.box;
  }

  init(data) {
    this.canvas = data.canvas;
    let width = data.width;
    let height = data.height;
    let pixelRatio = data.pixelRatio;

    this.camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.y = 30;

    this.renderer = new WebGLRenderer({ antialias: true, canvas: this.canvas});
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(pixelRatio);

    this.gridHelper = new GridHelper(1000, 100);
    this.scene.add(this.gridHelper);

    this.box = new Mesh(
      new BoxGeometry(60, 60, 60),
      new MeshBasicMaterial({ color: 0xf5f5f5, })
    );
    this.box.position.z = -300;
    this.box.position.y = 30;
    this.scene.add(this.box);

    this.animateBinded = this.animate.bind(this);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animateBinded);
    this.renderer.render(this.scene, this.camera);
    this.box.rotation.y += 0.01;
    this.box.rotation.x += 0.001;
  }

  resize(data) {
    let width = data.width;
    let height = data.height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
}
Comlink.expose(Three);
