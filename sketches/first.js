const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const rand = require('canvas-sketch-util/random');
const Tweakpane = require("tweakpane");
const TweakpaneThumbnailListPlugin = require('tweakpane-plugin-thumbnail-list');


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

const gradiantCanvas = document.createElement('canvas');
const gradiantCtx = gradiantCanvas.getContext('2d');
let gradiantPixels;
let gradiantPixelsData;
let gradiantLoaded = false;
const gradiantImg = new Image();

gradiantImg.onload = () =>{
  console.log(`Gradient loaded`);
  gradiantLoaded = true;
  gradiantCanvas.width = gradiantImg.width;
  gradiantCanvas.height = gradiantImg.height;
  gradiantCtx.drawImage( gradiantImg, 0, 0);
  gradiantPixels = gradiantCtx.getImageData(0, 0, gradiantImg.width, gradiantImg.height);
};
gradiantImg.src = 'gradiants/01.png';

const pickGradiantColor = (where) => {
  if( where < 0.0 || where > 1.0) return 'pink';
  if( gradiantLoaded )
  {
    const where_to_pick_x = Math.floor(gradiantImg.width * where);
    const where_to_pick_index = ((gradiantImg.width * 4) * Math.Floor(gradiantImg.height / 2)) + (where_to_pick_x * 4);
    const htmlColor = String.Format(CultureInfo.InvariantCulture, 
      "rgba({0},{1},{2},{3})", 
        gradiantPixels.data[where_to_pick_index], 
        gradiantPixels.data[where_to_pick_index+1], 
        gradiantPixels.data[where_to_pick_index+2], 
        gradiantPixels.data[where_to_pick_index+3] / 255);
        return htmlColor;
  }
  return 'pink';
}

const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300,
  orientation: 'landscape',
  animate: true,
};

const PARAMS = {
  bg_color: '#DDBEA9',

  pen_color: '#6B705C20', 
  use_gradiants : false,
  gradiants : '0',
  pen_speed : 4.0,
  rand_seed : 127,
  
  animate : false,
  clear_bg: false,
  frame_count : 0
};


const sketch = ({ context: ctx, canvasWidth, canvasHeight }) => {

  //console.log(`sketch::init width ${canvasWidth}x${canvasHeight}` );

  const pcount = 10000;
  const particles = [];

  for (let pi = 0; pi < pcount; pi++) {
    particles.push(new Particle(canvasWidth * rand.value(), canvasHeight * rand.value()));
  }

  // const rows = 10;
  // const cols = 10;
  // const marginx = canvasWidth * 0.05;
  // const marginy = canvasHeight * 0.05;

  // const cellw = (canvasWidth - 2 * marginx) / cols;
  // const cellh = (canvasHeight - 2 * marginy) / rows;

  ctx.fillStyle = PARAMS.bg_color;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.strokeStyle = "#000";
  ctx.fillStyle = '#00ff0080';
  rand.setSeed(PARAMS.rand_seed);

  return ({ context: ctx, canvasWidth, canvasHeight, time, frame }) => {

    if( PARAMS.clear_bg)
    {
      PARAMS.clear_bg = false;
      ctx.fillStyle = PARAMS.bg_color;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    if( gradiantLoaded)
        ctx.putImageData(gradiantPixels, 0, 0);

    if( !PARAMS.animate) return;

    PARAMS.frame_count = frame;

    for (let pi = 0; pi < pcount; pi++) {
      let p = particles[pi];

      //console.log(`Particle [${pi}] x ${p.posx} y ${p.posy}`);
      
      if( PARAMS.use_gradiants)
      {
        ctx.fillStyle = pickGradiantColor( Math.random());
      }
      else
      {
        ctx.fillStyle = PARAMS.pen_color;
      }
      
      ctx.fillRect(p.posx, p.posy, 2, 2);

      let dir = rand.noise2D(p.posx, p.posy, 0.0005);
      //console.log(`Noise dir ${dir}`);
      p.velx = Math.sin(dir * Math.PI) * PARAMS.pen_speed;
      p.vely = Math.cos(dir * Math.PI) * PARAMS.pen_speed;
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
  pane.registerPlugin(TweakpaneThumbnailListPlugin);

  let folderCanvas = pane.addFolder({title : 'Canvas'});

  folderCanvas.addInput(PARAMS, 'bg_color');
  const btnClearBg = folderCanvas.addButton({title:'clear', label:'background'});
  btnClearBg.on('click', ()=>{
    PARAMS.clear_bg = true;
  });

  let folderDrawer = pane.addFolder({title : 'Drawer'});

  folderDrawer.addInput(PARAMS, 'pen_color');
  folderDrawer.addInput(PARAMS, 'pen_speed', {min:0.5, max:10.0});
  const rand_seed = folderDrawer.addInput(PARAMS, 'rand_seed');
  rand_seed.on('change', (ev) => {
    rand.setSeed(ev.value);
  })

  folderDrawer.addInput(PARAMS, 'use_gradiants');

  folderDrawer.addInput(PARAMS, 'gradiants',{
    view :'thumbnail-list',
    options:[
      {text : '01', value: '0', src:'./gradiants/00.png'},
      {text : '02', value: '1', src:'./gradiants/01.png'},
      {text : '03', value: '2', src:'./gradiants/02.png'}
    ]
  });

  let folderAnim = pane.addFolder({title : 'Animation'});

  PARAMS.playing = settings.playing;
  const animate = folderAnim.addInput(PARAMS, 'animate');

  folderAnim.addMonitor(PARAMS, 'frame_count');
};

createPane();
canvasSketch(sketch, settings);
