"use strict";

function lerp(a, b, t) {
  return (1 - t) * a + b * t;
}

const pixiGame = {
  pixiStart() {
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      //backgroundColor: 0x1099bb
      backgroundColor: 0xffffff
    });
    this.finished = false;
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      const loader = new PIXI.loaders.Loader();
      this.sprites = {};
      loader
        .add("drop", "img/droplette-dark.png")
        .add("fallingdrop", "img/dropspritesheet.json");

      // create a new background sprite
      var background = new PIXI.Sprite.fromImage("img/background.png");
      background.width = 1600;
      background.height = 1200;
      this.app.stage.addChild(background);

      loader.onProgress.add(() => {}); // called once per loaded/errored file
      loader.onError.add(() => {}); // called once per errored file
      loader.onLoad.add(() => {}); // called once per loaded file

      const setupAssets = (loader, resources) => {
        let sprites = this.sprites;
        sprites.drop = new PIXI.Sprite(resources.drop.texture);
        let sheet = loader.resources["fallingdrop"].spritesheet;
        sprites.animatedDrop = new PIXI.extras.AnimatedSprite(
          sheet.animations["droplette-dark-original"]
        );
        sprites.animatedDrop.animationSpeed = 0.2;
        sprites.animatedDrop.play();
        this.app.stage.addChild(sprites.animatedDrop);
      };

      loader.load(setupAssets);

      const startGame = () => {
        this.app.stage.addChild(this.sprites.animatedDrop);
        this.app.view.setAttribute(
          "style",
          "position: absolute; top: 0px; display: block;"
        );
      };

      loader.onComplete.add(startGame); // called once when the queued resources all load.
    });
  },

  pixiResume() {
    let sprites = this.sprites;
    document.body.appendChild(this.app.view);
    sprites.animatedDrop.anchor.set(0.5);
    sprites.animatedDrop.x = this.app.screen.width / 2;
    sprites.animatedDrop.y = 0;
    this.finished = false;
    const keyboard = {};
    window.addEventListener("keydown", e => {
      keyboard[e.key] = true;
    });
    window.addEventListener("keyup", e => {
      keyboard[e.key] = false;
    });
    this.animatedDropTick = delta => {
      if (this.finished) {
        this.pixiEnd();
        this.resolve(true);
        return true;
      }
      //sprites.animatedDrop.rotation += 0.1 * delta;
      sprites.animatedDrop.position.y += 1 * delta;
      const speed = window.innerWidth / 300;
      if (keyboard["a"]) {
        sprites.animatedDrop.position.x -= speed * delta;
      }
      if (keyboard["d"]) {
        sprites.animatedDrop.position.x += speed * delta;
      }
      if (keyboard["s"]) {
        sprites.animatedDrop.position.y += speed * delta;
      }
      if (keyboard["w"]) {
        sprites.animatedDrop.position.y -= speed * 0.1 * delta;
      }
      const squeezed = 0.8;
      const long = 1.15;
      if (keyboard["ArrowDown"]) {
        sprites.animatedDrop.scale.x = lerp(
          sprites.animatedDrop.scale.x,
          squeezed,
          0.3
        );
        sprites.animatedDrop.scale.y = lerp(
          sprites.animatedDrop.scale.y,
          long,
          0.3
        );
        sprites.animatedDrop.position.y += speed * delta;
      } else {
        sprites.animatedDrop.scale.x = lerp(
          sprites.animatedDrop.scale.x,
          1,
          0.3
        );
        sprites.animatedDrop.scale.y = lerp(
          sprites.animatedDrop.scale.y,
          1,
          0.3
        );
      }

      if (
        sprites.animatedDrop.position.y >
        window.innerHeight + sprites.animatedDrop.height / 2
      ) {
        this.finished = true;
        //	sprites.animatedDrop.position.y =
        //		-sprites.animatedDrop.height / 2;
      }
    };
    this.app.ticker.add(this.animatedDropTick);
  },
  pixiEnd() {
    this.app.ticker.remove(this.animatedDropTick);
    //this.app.stage.destroy(true);
    this.app.renderer.gl.canvas.parentNode.removeChild(this.app.view);
    //this.app.renderer.destroy(true);
    //this.app.stage = null;

    //delete this.app.renderer;
    //this.app.renderer = null;
    //delete this.app.ticker;
    //this.app.ticker = null;
    //delete this.app.loader;
    //delete this.app;
    //this.app = null;
  }
};
pixiGame.pixiStart = pixiGame.pixiStart.bind(pixiGame);
pixiGame.pixiResume = pixiGame.pixiResume.bind(pixiGame);
pixiGame.pixiEnd = pixiGame.pixiEnd.bind(pixiGame);
pixiGame.pixiStart();

/* exported messages */
/* exported notifications */
/* exported particles */
/* exported music */
/* exported voice */
/* exported sound */
/* exported videos */
/* exported images */
/* exported scenes */
/* exported characters */
/* exported script */

/* global storage */

// Define the messages used in the game.
let messages = {
  Help: {
    Title: "Help",
    Subtitle: "Some useful Links",
    Message:
      "<p><a href='https://monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p><p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>"
  }
};

// Define the notifications used in the game
let notifications = {};

// Define the Particles JS Configurations used in the game
let particles = {};

// Define the music used in the game.
const music = {};

// Define the voice files used in the game.
const voice = {};

// Define the sounds used in the game.
const sound = {};

// Define the videos used in the game.
const videos = {};

// Define the images used in the game.
const images = {
  globe: "globe.png"
};

// Define the backgrounds for each scene.
const scenes = {
  snowy: "snowy.jpg"
};

// Define the Characters
const characters = {
  d: {
    Name: "Droppy",
    Color: "#5bcaff",
    Face: "happyDrop.png",
    Side: {
      happy: "happyDrop.png"
    }
  }
};

let script = {
  Start: [
    "scene snowy",
    "d:happy Hi! I'm Droplette the rain drop here to talk about my journey learning about consent!",
    "d:happy As a raindrop, born at the top of the sky, I had many encounters with other people as I fell to the earth.",
    "d:happy It took me a little bit at first, but in no time, I realized different people felt different ways about getting wet with raindrops!",
    "d:happy Some of them wanted to hang out, and some of them wanted to be left alone!",
    "d:happy I learned that both choices are okay! And embracing the hands and tongues, and respecting the umbrellas, make me a better raindrop.",
    "d:happy At first, I didn't understand why someone wouldn't want to be rained on--I'm so cute!--but over time I learned it wasn't about me personally, it had more to do with that persons own experience, and respecting their decisions! This is how I came to understand the beauty of consent.",
    "d:happy Now, as a fall from the sky, imagine what consent looks like and means to you!",
    {
      Choice: {
        Dialog: "d:happy Ready to play?",
        Yes: {
          Text: "Yes",
          Do: "jump Yes"
        },
        No: {
          Text: "No",
          Do: "jump No"
        }
      }
    }
  ],

  Yes: ["d:happy Great! Here we goo...", pixiGame.pixiResume, "jump Played"],

  Played: ["scene snowy", "d:happy You did it!", "Thanks for playing!", "end"],

  No: ["d:happy That's Ok. Maybe another time...", "end"]
};
