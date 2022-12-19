import './style.css';

import kaboom from 'kaboom';
import { level1 } from './levels';

const bgColor = '#242424';

let onFloor = false;

const config = {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  centerX: document.body.clientWidth / 2,
  centerY: document.body.clientHeight / 2,
  bottom: document.body.clientHeight,
  top: 0,
  left: 0,
  right: document.body.clientWidth,
};

const bgs = [];

kaboom({
  width: config.width,
  height: config.height,
  background: [10, 10, 30],
});

gravity(0);
// 85 x 50
loadSprite('bg', 'parallax-industrial-pack/layers/skill-desc_0003_bg.png');
loadSprite('farbldg', 'parallax-industrial-pack/layers/skill-desc_0002_far-buildings.png');
loadSprite('bldg', 'parallax-industrial-pack/layers/skill-desc_0001_buildings.png');
loadSprite('fg', 'parallax-industrial-pack/layers/skill-desc_0000_foreground.png');
loadSprite('player', 'player.png');
loadSprite('floor', 'floor.png');

const levelConf = {
  width: 32,
  height: 32,
  pos: vec2(0, 0),
  "-": () => [
    sprite('floor'),
    area(),
    solid(),
    origin('bot'),
    'platform'
  ],
  "=": () => [
    sprite('floor'),
    area(),
    solid(),
    origin('bot'),
    'floor'
  ],
  "*": () => [
    sprite('floor'),
    area(),
    solid(),
    origin('bot'),
    'wall'
  ]
};

const bg = add([
  sprite('bg', {
    width: 2720,
    height: 1600,
  }),
  area({
    width: 2720,
    height: 1600,
  }),
  // pos(config.centerX, config.centerY),
  // origin('center')
  pos(0, 0),
]);

bgs.push(bg);

const farbldgs = add([
  sprite('farbldg', {
    width: 2130,
    height: 1420,
  }),
  area({ width: 2130, height: 1420 }),
  // pos(config.centerX, config.bottom),
  // origin('bot')
  pos(0, (bg.area.height - 1420)),
]);

bgs.push(farbldgs);

const bldgs = add([
  sprite('bldg', {
    width: 2720,
    height: 1500,
  }),
  area({ width: 2720, height: 1500 }),
  // pos(config.centerX, config.bottom + 200),
  // origin('bot')
  pos(0, bg.area.height - 1500),
]);

bgs.push(bldgs);

const fg = add([
  sprite('fg', {
    width: 2720,
    height: 1040
  }),
  // pos(config.centerX, config.bottom + 200),
  // origin('bot')
  area({ width: 2720, height: 1040 }),
  pos(0, bg.area.height - 1040),
]);
bgs.push(fg);

const level = addLevel(level1, levelConf);

const player = add([
  sprite('player'),
  area(),
  pos(config.centerX, config.centerY),
  origin('bot'),
  body(),
]);

player.onGround(() => {
  player.isGrounded();
});

onKeyPress('space', () => {
  if (player.isGrounded()) {
    player.jump(700);
  }

});

keyDown('right', () => {
  player.flipX(false);
  player.move(288, 0);
  farbldgs.move(-32, 0);
  bldgs.move(-64, 0);
});

keyDown('left', () => {
  player.flipX(true);
  player.move(-288, 0);
  farbldgs.move(32, 0);
  bldgs.move(64, 0);
});

// onKeyPress('up', () => {
// if(player.isGrounded()) {
// player.jump(700);
// }
// player.move(0, -288);
// });

onKeyDown('up', () => {
  player.move(0, -288);
});

keyDown('down', () => {
  player.move(0, 288);
});

player.onUpdate(() => {
  // const currentCam = camPos();

  // let newCamX, newCamY;

  // newCamX = lerp(currentCam.x, player.pos.x, 0.075);

  // if(player.isGrounded()) {
  //   if(player.curPlatform().is('floor')) {
  //     newCamY = lerp(currentCam.y, player.pos.y - 250, 0.075);      
  //   } else {
  //     newCamY = lerp(currentCam.y, player.pos.y, 0.075);
  //   }
  // } else {
  //   newCamY = lerp(currentCam.y, player.pos.y, 0.075);
  // } 

  // camPos(newCamX, newCamY);
  // const scale = vec2(1.5, 1.5);
});


// console.log(width() / 2);
onUpdate(() => {

  camScale(vec2(1.5, 1.5));
  const curCamPos = camPos();

  let newCamX = player.pos.x;
  let newCamY = player.pos.y;

  const camMax = vec2(newCamX + (width() / 2), newCamY + (height() / 2));
  const camMin = vec2(newCamX - (width() / 2), newCamY - (height() / 2));

  if (camMax.x >= level.width()) {
    newCamX = curCamPos.x;
  }

  if (camMax.y >= level.height()) {
    newCamY = curCamPos.y;
  }

  // console.log(camMax);

  if (camMin.x <= 0) {
    newCamX = curCamPos.x;
  }

  if (camMin.y <= 0) {
    newCamY = curCamPos.y;
  }

  // console.log(camMax.x > level.width());
  // console.log('newCamX: ', newCamX);
  // console.log('max x: ', camMax.x);
  // console.log('level: ', level.width());
  // console.log('levelscreen: ', levelScreen);
  // console.log('level: ', vec2(level.width(), level.height()));
  // console.log('cam: ', {x: camPos().x + (width() / 2), y: camPos().y + (height() / 2)});
  // if(newWorldMax.x >= level.width()) {
  //     newCamX = width() / 2;
  // }

  // if(newWorldMax.y >= level.height()) {
  //   newCamY = height() / 2;
  // }

  camPos(newCamX, newCamY);

  for (let b of bgs) {
    if (b.pos + b.area.width) { }
  }
});
