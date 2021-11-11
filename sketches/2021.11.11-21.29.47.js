const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: 'A4',
  pixelsPerInch: 300,
  orientation: 'landscape'
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    
    context.beginPath();

    context.strokeStyle= "#000";
    context.lineWidth = 20;
    let stepHeight = height / 10;
    for(let i = 0; i < 10; i++)
    {
      context.moveTo( 100, 10 + (i * stepHeight));
      context.lineTo( width-100, 10 + (i * stepHeight));
    }
    context.stroke();
  };
};

canvasSketch(sketch, settings);
