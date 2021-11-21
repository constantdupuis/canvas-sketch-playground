const canvasSketch = require('canvas-sketch');
import Particle = require('../tslib/Particle');
import Vec2 = require('../tslib/Vec2');

let manager;

const settings = {
  duration: 5,
  animate: true,
  dimensions: [ 512, 512 ]
};

interface Props {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  playhead: number;
}

// const init = async (canvas_width : number, canvas_height : number) => {
//   for( let i = 0; i < particle_nbr; i++)
//   {
//     let p = new Particle(new Vec2(Math.random() * canvas_width, Math.random() * canvas_height));
//     ps.push(p);
//   }
// }

const particle_nbr = 1;
const ps : Array<Particle> = new Array<Particle>();
// let v : Vide;

// v = new Vide(10);

for( let i = 0; i < particle_nbr; i++)
  {
    let p = new Particle(new Vec2(Math.random() * 215, Math.random() * 215));
    ps.push(p);
  }

const sketch = ({ context, width, height, playhead }: Props) => {

  //init(width, height);

  return ({ context, width, height, playhead }: Props) => {
    context.fillStyle = 'hsl(0, 0%, 95%)';
    context.fillRect(0, 0, width, height);

    const x: number = width / 2;
    const y: number = height / 2;
    const radius: number = width * 0.25;
    const start: number = Math.sin(playhead * Math.PI * 2) * Math.PI;
    const end: number = start + Math.PI / 2 + Math.sin(playhead * Math.PI * 2 + Math.PI / 2) * Math.PI * 0.4;
    const thickness: number = width * 0.01 + (Math.sin(playhead * Math.PI * 2) * 0.5 + 0.5) * width * 0.05;

    context.beginPath();
    context.arc(x, y, radius, start, end, false);
    context.lineWidth = thickness;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = 'tomato';
    context.stroke();
  };
};

const start = async () => {
  const manager =  await canvasSketch(sketch, settings);
}

start();

