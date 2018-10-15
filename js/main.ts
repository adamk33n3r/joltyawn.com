import { Jolty } from './jolty';

let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;

let joltyCount = 150;
const joltyArray: Jolty[] = [];

function spawnImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (joltyArray.length < joltyCount) {
    joltyArray.push(new Jolty(canvas.width, canvas.height));
  }

  joltyArray.forEach((jolty) => {
    jolty.update(canvas.width, canvas.height);
    jolty.draw(ctx);
  });

  requestAnimationFrame(spawnImage);
}

$(function () {
  console.log('Welcome, Joltyawn fans!');

  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  resizeCanvas();
  ctx = canvas.getContext('2d')!;

  requestAnimationFrame(spawnImage);
});

function resizeCanvas() {
  // canvas.width = canvas.height * 
  //     (canvas.clientWidth / canvas.clientHeight);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  joltyCount = Math.floor(window.innerWidth / 112);
  joltyCount *= Math.floor(window.innerHeight / 112) + 5;
}

$(window).on('resize', resizeCanvas);

