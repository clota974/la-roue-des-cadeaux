
let wheelParts = [];
const items = ['BIPBIPBIP','bIPBIP',3,4,5,6,7,8,9,10,11,12,13,14];
const color1 = '#00F';
const color2 = '#F00'
const textColor = '#FFF';

let rotation = 0;
let r;

function drawWheel() {
  wheelParts = [];
  r = ($('svg').width() - 50) / 2;
  const leftPad = r;
  const topPad = 0;
  const pad = 0;

  const snap = Snap('#mainSvg');
  snap.clear();

  const wheel = snap.group();
  wheel.attr({id: 'wheelGroup'});

  const dtheta = (1 / (items.length / 2)) * Math.PI;
  for (let i = 0; i < items.length; i++) {
    const angle = i*dtheta;
    const angle2 = ((i+1) / (items.length / 2)) * Math.PI;
    const x1 = r+r*Math.cos(angle);
    const y1 = r+r*Math.sin(angle);
    const x2 = r+r*Math.cos(angle2);
    const y2 = r+r*Math.sin(angle2);
    const pathStr = `M${leftPad},${r} L${x1},${y1} A${r},${r}  0,0,1 ${x2},${y2} Z`;
    const path = wheel.path(pathStr)
    const background =  i % 2 ? color1 : color2;
    path.attr({ fill: background });

    wheelParts.push(path);

    let transform, anchor;
    if (angle > Math.PI/2  && angle < 1.5 * Math.PI) {
      transform = `rotate(${((angle * 180) / Math.PI - 180)} ${r} ${r})`;
      anchor = 'end';
      // xPad = ;
    }
    else {
      transform = `rotate(${((angle * 180) / Math.PI)} ${r} ${r})`
      anchor = 'start';
      xPad = 5;
    }

    const text = wheel.text(r, r, items[i]);

    text.attr({
      fill: textColor,
      'text-anchor': 'end',
      'alignment-baseline': 'middle',
      'font-size': r*2/(items.length+items[i].toString().length),
      transform: `rotate(${(angle+dtheta/2)*180/Math.PI} ${r} ${r})`,
      dx: r-r/15
    });
  }

  const indicator = snap.path(`M${r*2+r/4},${r-r/4} L${r*2},${r} L${r*2+r/4},${r+r/4}`);
  indicator.attr({
    fill: 'white'
  })

  const size = r/2.75;
  const circle = snap.circle(r, r, size);
  circle.attr({ fill: 'white' });

  const qrSize = r/2.5
  const qrImg = snap.image('https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg', r-qrSize/2, r-qrSize/2, qrSize, qrSize);
}

function turnWheel() {
  const wheelGroup = Snap('#wheelGroup');
  rotation = 0;
  speed = 100;

  rotInterval = setInterval(() => {
    rotation += speed / 50;
    rotation = rotation > 360 ? rotation - 360 : rotation;

    if (speed <= 1) {
      clearInterval(rotInterval);
      return false;
    }

    const concerned = Math.ceil((rotation / 360) * items.length);
    console.log(concerned);
    for (let i = 0; i < wheelParts.length; i += 1) {
      wheelParts[i].attr({ fill: i%2 ? color1 : color2 });
    }

    wheelParts[items.length - concerned].attr({fill: 'black'});

    wheelGroup.attr({
      transform: `rotate(${rotation} ${r} ${r})`,
    })
  }, 1);
}

function stopWheel() {
  speedInt = setInterval(function() {
    speed -= speed/1000;
    if (speed < 1) clearInterval(speedInt);
  }, 1);
}

$(() => {
  drawWheel();
  $(window).resize(() => drawWheel());
});

$(document).keydown((ev) => {
  if(ev.key.toLowerCase() === ' ') {
    turnWheel();
  } else if (ev.key.toLowerCase() === 's') {
    stopWheel();
  }
})