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
  });
}

loader.onComplete.add(startGame); // called once when the queued resources all load.
