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
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

const loader = PIXI.loader;
const sprites = {};
loader.add("drop", "droplette-faded.png");

loader.onProgress.add(() => {}); // called once per loaded/errored file
loader.onError.add(() => {}); // called once per errored file
loader.onLoad.add(() => {}); // called once per loaded file

loader.load((loader, resources) => {
  sprites.drop = new PIXI.Sprite(resources.drop.texture);
});

function startGame() {
  app.stage.addChild(sprites.drop);
  sprites.drop.anchor.set(0.5);
  sprites.drop.x = app.screen.width / 2;
  sprites.drop.y = sprites.drop.height / 2;

  app.ticker.add(function(delta) {
    sprites.drop.rotation += 0.001 * delta;
    sprites.drop.position.y += 1 * delta;
    const speed = window.innerWidth / 300;
    if (keyboard["ArrowLeft"]) {
      sprites.drop.position.x -= speed * delta;
    }
    if (keyboard["ArrowRight"]) {
      sprites.drop.position.x += speed * delta;
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
