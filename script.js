import * as Comlink from 'comlink';

const canvas = document.getElementById('webgl-canvas');
const offscreen = canvas.transferControlToOffscreen();
const ThreeClass = Comlink.wrap(new Worker('worker.js', { type: 'module', }));

(async () => {
  const Three = await new ThreeClass();
  await Comlink.transfer(offscreen, [offscreen]);

  await Three.init({
    canvas: offscreen,
    width: canvas.clientWidth,
    height: canvas.clientHeight,
    pixelRatio: window.devicePixelRatio,
  }, offscreen);

  window.addEventListener('resize', () => {
    Three.resize({
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    });
  });
})();
