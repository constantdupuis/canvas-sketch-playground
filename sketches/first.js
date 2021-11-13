const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const rand = require('canvas-sketch-util/random');
const Tweakpane = require("tweakpane");

class Particle {
  constructor(x, y) {
    this.posx = x;
    this.posy = y;
    this.prev_posx = x;
    this.prev_posy = y;
    this.velx = 1.0;
    this.vely = 1.0;
    this.accx = 1.0;
    this.accy = 1.0;
    this.life = Number.MAX_SAFE_INTEGER;
    this.start_life = Number.MAX_SAFE_INTEGER;
    this.dead = false;
    this.normalized_life = 1.0;
  }

  update() {
    if (this.dead) return;
    this.update(1.0);
  }


  update(deltaTime) {
    if (this.dead) return;
    //this.velx = this.accx * deltaTime;
    //this.vely = this.accy * deltaTime;
    this.posx += this.velx;
    this.posy += this.vely;
    this.updateLife();
  }

  updateLife() {
    this.life--;
    if (this.life == 0) dead = true;
    this.normalized_life = this.life / this.start_life;
  }

  isDead() {
    return this.dead;
  }

  life() {
    return this.life;
  }

  resurect(newLife) {
    this.start_life = newLife;
    this.life = newLife;
    if (newLife > 0) dead = false;
  }

}

const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300,
  orientation: 'landscape',
  animate: false
};



const sketch = ({ context: ctx, canvasWidth, canvasHeight }) => {

  //console.log(`sketch::init width ${canvasWidth}x${canvasHeight}` );

  const pcount = 10000;
  const particles = [];

  for (let pi = 0; pi < pcount; pi++) {
    particles.push(new Particle(canvasWidth * rand.value(), canvasHeight * rand.value()));
  }

  const rows = 10;
  const cols = 10;
  const marginx = canvasWidth * 0.05;
  const marginy = canvasHeight * 0.05;

  const cellw = (canvasWidth - 2 * marginx) / cols;
  const cellh = (canvasHeight - 2 * marginy) / rows;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.strokeStyle = "#000";
  ctx.fillStyle = '#00ff0080';

  return ({ context: ctx, canvasWidth, canvasHeight, time }) => {

    for (let pi = 0; pi < pcount; pi++) {
      let p = particles[pi];

      //console.log(`Particle [${pi}] x ${p.posx} y ${p.posy}`);
      ctx.fillStyle = '#00000005';
      ctx.fillRect(p.posx, p.posy, 5, 5);

      let dir = rand.noise2D(p.posx, p.posy, 0.0005);
      //console.log(`Noise dir ${dir}`);
      p.velx = Math.sin(dir * Math.PI) * 4.0;
      p.vely = Math.cos(dir * Math.PI) * 4.0;
      //console.log(`p.velx ${p.velx}`);
      p.update();

      if( p.pox < 0 || p.pox > canvasWidth || p.posy < 0 || p.posy > canvasHeight)
      {
        p.posx = canvasWidth * rand.value();
        p.posy = canvasHeight * rand.value();
      }
    }

    // for(let x = 0; x < cols; x++)
    //   for(let y = 0; y < rows; y++)
    //   {
    //     ctx.save();

    //     ctx.translate( marginx + x * cellw, marginy + y * cellh );
    //     ctx.beginPath();
    //     let n = rand.noise3D(x , y, time * 2, 0.1);
    //     n = n * 0.5 + 0.5;
    //     ctx.lineWidth = 100 * n;
    //     ctx.rect(0,0, cellw * 0.8, cellh * 0.8);
    //     ctx.stroke();

    //     ctx.restore();
    //   }
  };


};

const createPane = () => {
const pane = new Tweakpane.Pane();
let folderCanvas = pane.addFolder({title : 'Canvas'});
};

createPane();
canvasSketch(sketch, settings);
