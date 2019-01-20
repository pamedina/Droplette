function lerp(a, b, t) {
  return (1 - t) * a + b * t;
}
const keyboard = {};
window.addEventListener("keydown", e => {
  keyboard[e.key] = true;
});
window.addEventListener("keyup", e => {
  keyboard[e.key] = false;
});

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  //backgroundColor: 0x1099bb
  backgroundColor: 0xffffff
});

document.body.appendChild(app.view);

const loader = PIXI.loader;
const sprites = {};
loader.add("drop", "droplette-dark.png").add("fallingdrop","dropspritesheet.json");

// create a new background sprite
var background = new PIXI.Sprite.fromImage('background.png');
background.width = 1600;
background.height = 1200;
app.stage.addChild(background);



loader.onProgress.add(() => {}); // called once per loaded/errored file
loader.onError.add(() => {}); // called once per errored file
loader.onLoad.add(() => {}); // called once per loaded file

loader.load((loader, resources) => {
console.log("A");
    sprites.drop = new PIXI.Sprite(resources.drop.texture);
    let sheet = PIXI.loader.resources["fallingdrop"].spritesheet;
    sprites.animatedDrop = new PIXI.extras.AnimatedSprite(sheet.animations["droplette-dark-original"]);
    sprites.animatedDrop.animationSpeed = 0.2;
    sprites.animatedDrop.play();
    app.stage.addChild(sprites.animatedDrop);    
});

function startGame() {
console.log("B");
console.log(sprites);
  app.stage.addChild(sprites.animatedDrop);
  sprites.animatedDrop.anchor.set(0.5);
  sprites.animatedDrop.x = app.screen.width / 2;
  sprites.animatedDrop.y = sprites.animatedDrop.height / 2;


  app.ticker.add(function(delta) {
    //sprites.animatedDrop.rotation += 0.1 * delta;
    sprites.animatedDrop.position.y += 1 * delta;
    const speed = window.innerWidth / 300;
    if (keyboard["ArrowLeft"]) {
      sprites.animatedDrop.position.x -= speed * delta;
    }
    if (keyboard["ArrowRight"]) {
      sprites.animatedDrop.position.x += speed * delta;
    }
    if (keyboard["ArrowDown"]) {
      sprites.animatedDrop.position.y += speed * delta; 
    }
    if (keyboard["ArrowUp"]) {
      sprites.animatedDrop.position.y -= speed*0.1 * delta; 
    }
    const squeezed = 0.8;
    const long = 1.15;
    if (keyboard["ArrowDown"]) {
      sprites.drop.scale.x = lerp(sprites.drop.scale.x, squeezed, 0.3);
      sprites.drop.scale.y = lerp(sprites.drop.scale.y, long, 0.3);
      sprites.drop.position.y += speed * delta;
    } else {
      sprites.drop.scale.x = lerp(sprites.drop.scale.x, 1, 0.3);
      sprites.drop.scale.y = lerp(sprites.drop.scale.y, 1, 0.3);
    }
  });
}

loader.onComplete.add(startGame); // called once when the queued resources all load.
