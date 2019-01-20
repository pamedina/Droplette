var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

// create a new Sprite from anchor image path

var bunny = PIXI.Sprite.fromImage("droplette-faded.png");
// var scaleX = 0.1;
// var scaleY = 0.1;
// bunny.scale.set(scaleX , scaleY );
console.log(bunny);

// center the sprite's anchor point
bunny.anchor.set(0.5);

// // move the sprite to the center of the screen
// bunny.x = app.screen.width / 2;
// bunny.y = bunny.height;

app.stage.addChild(bunny);
// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = 0;

// Listen for animate update
app.ticker.add(function(delta) {
  // just for fun, let's rotate mr rabbit a little
  // delta is 1 if running at 100% performance
  // creates frame-independent transformation
  bunny.rotation += 0.001 * delta;
  bunny.position.y += 1 * delta;
});
