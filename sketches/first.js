const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const rand = require('canvas-sketch-util/random');

class Particle {
  constructor(x, y) {
    this.posx = x;
    this.posy = y;
    this.prev_posx = x;
    this.prev_posy = y;
    this.velx = 0;
    this.vely = 0;
    this.accx = 0;
    this.accy = 0;
    this.life = Number.MAX_SAFE_INTEGER;
    this.start_life = Number.MAX_SAFE_INTEGER;
    this.dead = false;
    this.normalized_life = 1.0;
  }


}


const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300,
  orientation: 'landscape',
  animate : true
};

const sketch = () => {
  return ({ context: ctx, width, height, time }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const rows = 10;
    const cols = 10;
    const marginx = width * 0.05;
    const marginy = height * 0.05;

    const cellw = (width - 2 * marginx) / cols;
    const cellh = (height - 2 * marginy) / rows;

    ctx.strokeStyle= "#000";
    
    for(let x = 0; x < cols; x++)
      for(let y = 0; y < rows; y++)
      {
        ctx.save();
        
        ctx.translate( marginx + x * cellw, marginy + y * cellh );
        ctx.beginPath();
        let n = random.noise3D(x , y, time * 2, 0.1);
        n = n * 0.5 + 0.5;
        ctx.lineWidth = 100 * n;
        ctx.rect(0,0, cellw * 0.8, cellh * 0.8);
        ctx.stroke();

        ctx.restore();
      }
  };
};

canvasSketch(sketch, settings);
