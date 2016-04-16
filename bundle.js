(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Players = function(game) {
    var players = [{
      name: 'Blue',
      color: 'blue',
      gamepad: game.input.gamepad.pad1,
      keys: {
        up: 'W', down: 'S', left: 'A', right: 'D', attack: 'Q'
      },
    }, {
      name: 'Pink',
      color: 'pink',
      gamepad: game.input.gamepad.pad2,
      orientation: 'left',
    }, {
      name: 'Green',
      color: 'green',
      gamepad: game.input.gamepad.pad3,
      keys: {
        up: 'I', down: 'K', left: 'J', right: 'L', attack: 'U'
      },
    }, {
      name: 'Purple',
      color: 'purple',
      gamepad: game.input.gamepad.pad4,
      orientation: 'left',
      keys: {
        up: 'T', down: 'G', left: 'F', right: 'H', attack: 'R'
      },
  }];
  
  return players;
};

module.exports = Players;

},{}],2:[function(require,module,exports){
var stages = require('./stages');

var settings = {
  playerCount: {
    options: [2, 3, 4],
    selected: 4,
  },
  bgm: {
    options: ['hangar', 'waterfall', 'title', 'None'],
    selected: 'hangar',
  },
  stage: {
    options: stages.map(function(stage) {
      return stage.name;
    }),
    selected: 'Hangar',
  }
};

module.exports = settings;

},{"./stages":3}],3:[function(require,module,exports){
var stages = [{
  "name": "Waterfall0",
  "theme": "waterfall",
  "backgroundColor": "#000",
  "platforms": {
    "positions": [
      [10, 7],
      [45, 7],
      [27, 15],
      [10, 25],
      [45, 25],
      [10, 44],
      [45, 44],
      [27, 52],
      [10, 62],
      [45, 62]
    ],
    "color": "yellow"
  },
  "backgrounds": [{
    "image": "waterfall0",
  }],
  "foregrounds": [{
    "image": "clouds",
    "scrolling": true,
  }],
  "spawnPoints": [
    { "x": 14, "y": 0 },
    { "x": 48, "y": 0 },
    { "x": 14, "y": 18 },
    { "x": 48, "y": 18 }
  ],
  "uiColor": "#28F129"
},{
  "name": "B",
  "backgroundColor": "#000",
  "platforms": {
    "positions": [
      [27, 6],
      [10, 13],
      [45, 13],
      [4, 22],
      [50, 22],
      [18, 31],
      [27, 31],
      [37, 31],
      [4, 44],
      [50, 44],
      [27, 60]
    ],
    "color": "gray"
  },
  "backgrounds": [],
  "foregrounds": [{
    "image": "clear"
  }],
  "spawnPoints": [
    { "x": 14, "y": 6 },
    { "x": 48, "y": 6 },
    { "x": 9, "y": 15 },
    { "x": 54, "y": 15 }
  ],
  "uiColor": "#28D6F1"
},{
  "name": "Hangar",
  "theme": "hangar",
  "backgroundColor": "#000",
  "platforms": {
    "positions": [
      [8, 34],
      [12, 34],
      [22, 34],
      [31, 34],
      [41, 34],
      [46, 34],
    ],
    "color": "gray"
  },
  "backgrounds": [{
    image: "hangar"
  }],
  "foregrounds": [{
    "image": "clear",
  }],
  "spawnPoints": [
    { "x": 10, "y": 27 },
    { "x": 19, "y": 27 },
    { "x": 41, "y": 27 },
    { "x": 50, "y": 27 }
  ],
  "uiColor": "#8D8D8D"
},{
  "name": "Waterfall",
  "theme": "waterfall",
  "backgroundColor": "#000",
  "platforms": {
    "positions": [
      [10, 13],
      [45, 13],
      [27, 21],
      [10, 31],
      [45, 31]
    ],
    "color": "brown"
  },
  "backgrounds": [{
    image: 'waterfall'
  }],
  "foregrounds": [{
    "image": "clear"
  }],
  "spawnPoints": [
    { "x": 14, "y": 6 },
    { "x": 48, "y": 6 },
    { "x": 14, "y": 24 },
    { "x": 48, "y": 24 }
  ],
  "uiColor": "#783E08"
}];

module.exports = stages;

},{}],4:[function(require,module,exports){
var resize = function resize() {
  document.body.style.zoom = window.innerHeight / game.height;
};

var main = {
  preload: function preload() {
    var utils = require('./utils');

    resize();
    window.onresize = utils.debounce(resize, 100);
    
    // allow anything up to height of world to fall off-screen up or down
    game.world.setBounds(0, -game.width, game.width, game.height * 3);
    
    // prevent game pausing when it loses focus
    game.stage.disableVisibilityChange = true;
    
    // assets used in loading screen
    game.load.image('loading', 'images/loading.gif');
  },

  create: function create() {
    game.state.add('loading', require('./states/loading')(game));
    game.state.start('loading');
  }
};

var game = new Phaser.Game(64, 64, Phaser.AUTO, 'game', {
  preload: main.preload,
  create: main.create
}, false, false); // disable anti-aliasing

game.state.add('main', main);
game.state.start('main');

},{"./states/loading":10,"./utils":13}],5:[function(require,module,exports){
var buildMenu = function buildMenu(game, state) {
  var settings = require('./data/settings');

  var cycleSetting = function cycleSetting() {
    var optionIndex = this.setting.options.indexOf(this.setting.selected);
    optionIndex++;
    if (optionIndex === this.setting.options.length) {
      optionIndex = 0;
    }
    this.setting.selected = this.setting.options[optionIndex];
  };

  var menu = [{
    name: 'Players',
    setting: settings.playerCount,
    action: function() {
      cycleSetting.call(this);
      state.restart();
    },
    selected: true
  }, {
    name: 'BGM',
    setting: settings.bgm,
    action: function() {
      cycleSetting.call(this);
      game.bgm.play(settings.bgm.selected);
    },
  }, {
    name: 'Stage',
    setting: settings.stage,
    action: function() {
      cycleSetting.call(this);

      // if stage has a default bgm, load it
      var stages = require('./data/stages');
      var selectedStage = stages[settings.stage.options.indexOf(settings.stage.selected)];
      if (selectedStage.theme) {
        settings.bgm.selected = selectedStage.theme;
      }
      game.bgm.play(settings.bgm.selected);

      state.restart();
    },
  }, {
    name: 'Start',
    action: function() {
      state.restart();
    }
  }];

  var changePlayerCount = menu[0].action.bind(menu[0]);
  var changeBgm = menu[1].action.bind(menu[1]);
  var changeStage = menu[2].action.bind(menu[2]);
  var restart = menu[3].action.bind(menu[3]);

  game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(changePlayerCount);
  game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(changeStage);
  game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add(changeBgm);
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(restart);
  if (game.input.gamepad.supported && game.input.gamepad.active) {
    if (game.input.gamepad.pad1.connected) {
      game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_START).onDown.add(restart);
    }
    if (game.input.gamepad.pad2.connected) {
      game.input.gamepad.pad2.getButton(Phaser.Gamepad.XBOX360_START).onDown.add(restart);
    }
    if (game.input.gamepad.pad3.connected) {
      game.input.gamepad.pad3.getButton(Phaser.Gamepad.XBOX360_START).onDown.add(restart);
    }
    if (game.input.gamepad.pad4.connected) {
      game.input.gamepad.pad4.getButton(Phaser.Gamepad.XBOX360_START).onDown.add(restart);
    }
  }

  return menu;
};

module.exports = buildMenu;

},{"./data/settings":2,"./data/stages":3}],6:[function(require,module,exports){
var bgm = function() {
  var player = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));

  return {
    play: function(fileName) {
      if (fileName === 'None') {
        player.stop.call(player);
      } else {
        player.load('./music/' + fileName + '.xm', function(buffer) {
          player.play(buffer);
        });
      }
    }
  };
};

module.exports = bgm;

},{}],7:[function(require,module,exports){
var createPlayer = function createPlayer(game, options, onDeath) {
  var defaults = {
    orientation: 'right',
    keys: {
      up: 'UP',
      down: 'DOWN',
      left: 'LEFT',
      right: 'RIGHT',
      attack: 'SHIFT'
    },
    scale: {
      x: 1,
      y: 2
    },
    color: 'pink',
    gamepad: game.input.gamepad.pad1,
  };

  var settings = Object.assign({}, defaults, options);

  var keys = {
    up: game.input.keyboard.addKey(Phaser.Keyboard[settings.keys.up]),
    down: game.input.keyboard.addKey(Phaser.Keyboard[settings.keys.down]),
    left: game.input.keyboard.addKey(Phaser.Keyboard[settings.keys.left]),
    right: game.input.keyboard.addKey(Phaser.Keyboard[settings.keys.right]),
    attack: game.input.keyboard.addKey(Phaser.Keyboard[settings.keys.attack]),
  };

  var gamepad = settings.gamepad;

  var actions = {
    attack: function attack() {
      var duration = 200;
      var interval = 600;
      var velocity = 100;

      var canAttack = (Date.now() > player.lastAttacked + interval) && !player.isDucking && !player.isPermadead;
      if (!canAttack) {
        return;
      }

      player.isAttacking = true;
      player.lastAttacked = Date.now();

      game.sfx.play('attack');

      switch(player.orientation) {
        case 'left':
          player.body.velocity.x = -velocity;
          break;
        case 'right':
          player.body.velocity.x = velocity;
          break;
      }

      player.loadTexture('white');
      setTimeout(actions.endAttack, duration);
    },

    endAttack: function endAttack() {
      if (player.alive && player.isAttacking) {
        player.loadTexture(settings.color);
        player.isAttacking = false;
      }
    },

    run: function run(direction) {
      var maxSpeed = 32;
      var acceleration = player.body.touching.down ? 8 : 3; // players have less control in the air
      player.orientation = direction;

      switch (direction) {
        case 'left':
          // if player is going faster than max running speed (due to attack, etc), slow them down over time
          if (player.body.velocity.x < -maxSpeed) {
            player.body.velocity.x += acceleration;
          } else {
            player.body.velocity.x = Math.max(player.body.velocity.x - acceleration, -maxSpeed);
          }
          break;
        case 'right':
          if (player.body.velocity.x > maxSpeed) {
            player.body.velocity.x -= acceleration;
          } else {
            player.body.velocity.x = Math.min(player.body.velocity.x + acceleration, maxSpeed);
          }
          break;
      }
    },

    jump: function jump() {
      if (!player.body.touching.down && !player.body.touching.left && !player.body.touching.right) {
        return;
      }

      var dust;

      if (player.body.touching.down) {
        player.body.velocity.y = -100;
        game.sfx.play('jump');
        dust = game.add.sprite(0, 0, 'jump');
        dust.position.x = player.body.position.x - 4;
        dust.position.y = player.body.position.y + player.body.height - 2;
      // wall jumps
      } else if (player.body.touching.left) {
        player.body.velocity.y = -120;
        player.body.velocity.x = 45;
        game.sfx.play('jump');
        dust = game.add.sprite(0, 0, 'land');
        dust.position.x = player.body.position.x + 2;
        dust.position.y = player.body.position.y - player.body.height;
        dust.angle = 90;
      } else if (player.body.touching.right) {
        player.body.velocity.y = -120;
        player.body.velocity.x = -45;
        game.sfx.play('jump');
        dust = game.add.sprite(0, 0, 'land');
        dust.position.x = player.body.position.x;
        dust.position.y = player.body.position.y + player.body.height;
        dust.angle = -90;
      }

      game.subUi.fx.add(dust); // mount below foreground & ui
      var anim = dust.animations.add('dust');
      dust.animations.play('dust', 32/3);
      anim.onComplete.add(function() {
        dust.kill();
      }, this);
    },

    dampenJump: function dampenJump() {
      // soften upward velocity when player releases jump key
        var dampenToPercent = 0.5;

        if (player.body.velocity.y < 0) {
          player.body.velocity.y *= dampenToPercent;
        }
    },

    duck: function duck() {
      if (player.isAttacking || player.isPermadead) {
        return;
      }

      if (!player.isDucking && player.hp > 2) {
        player.scale.setTo(settings.scale.x, settings.scale.y / 2);
        actions.applyOrientation();
        player.y += settings.scale.y;
      }
      player.isDucking = true;

      (function roll() {
        var canRoll = Math.abs(player.body.velocity.x) > 25 && player.body.touching.down;
        if (canRoll) {
          player.isRolling = true;
        }
      }());
    },

    stand: function stand() {
      if (player.hp > 2) {
        player.y -= settings.scale.y;
      }
      actions.applyHealthEffects();
      player.isDucking = false;
      player.isRolling = false;
    },

    takeDamage: function takeDamage(amount) {
      // prevent taking more damage than hp remaining in current life
      if (amount > 1 && (player.hp - amount) % 2 !== 0) {
        amount = 1;
      }

      player.hp -= amount;

      if (player.hp < 0) {
        player.hp = 0;
      }
      if (player.hp % 2 === 0) {
        actions.die();
      }
      actions.applyHealthEffects();
    },

    applyHealthEffects: function() {
      var newPlayerHeight = Math.max(Math.round(player.hp / 2), 1);
      player.scale.setTo(settings.scale.x, newPlayerHeight);
      actions.applyOrientation();

      if (player.hp === 0) {
        return; // bit's becoming a ghost; leaves its scarf (or lack thereof) alone
      } else if (player.hp % 2 === 1) {
        player.scarf.visible = false;
      } else {
        player.scarf.visible = true;
      }
    },

    applyOrientation: function() {
      player.scale.setTo(player.orientation === 'left' ? settings.scale.x : -settings.scale.x, player.scale.y);
    },

    die: function() {
      if (player.isPermadead) {
        return;
      }

      if (player.hp > 0) {
        actions.applyInvulnerability();

        game.sfx.play('die');
        actions.endAttack();
        player.lastAttacked = 0;

        var utils = require('./utils');
        var respawnPosition = utils.getRandomArrayElement(utils.getStage().spawnPoints);
        player.position.x = respawnPosition.x;
        player.position.y = respawnPosition.y;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
      } else {
        game.sfx.play('permadie');
        player.alpha = 0.5;
        player.isPermadead = true;
        onDeath(); // TODO: this could probably be better architected
      }
    },

    applyInvulnerability: function() {
      player.isCollidable = false;

      var setColor = function(color) {
        // in case game restarts and player no longer exists...
        if (!player.alive) {
          clearInterval(colorInterval);
          clearInterval(whiteInterval);
          return;
        }
        player.loadTexture(color);
      };

      var colorInterval = setInterval(function() {
        setColor(settings.color);
      }, 150);
      var whiteInterval;
      setTimeout(function() {
        whiteInterval = setInterval(function() {
          setColor('white');
        }, 150);
      }, 75);

      setTimeout(function() {
        if (!player.alive) {
          return;
        }
        clearInterval(whiteInterval);
        clearInterval(colorInterval);
        setColor(settings.color); // ensure player color returns to normal
        player.isCollidable = true;
      }, 1500);
    },
  };

  var player = game.add.sprite(0, 0, settings.color);
  player.name = settings.name;
  player.orientation = settings.orientation;
  player.anchor.setTo(0.5, 0.5); // anchor to center to allow flipping

  player.scarf = game.add.sprite(-1, -1, settings.color + 'Scarf');
  player.scarf.animations.add('scarf');
  player.scarf.animation = player.scarf.animations.play('scarf', 32/3, true);
  player.scarf.setScaleMinMax(-1, 1, 1, 1);
  player.addChild(player.scarf);

  // track health
  player.hp = player.maxHp = 6; // TODO: allow setting custom hp amount for each player
  player.actions = actions;
  player.actions.applyHealthEffects(); // TODO: add giant mode

  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.2; // TODO: allow bounce configuration
  player.body.gravity.y = 380; // TODO: allow gravity configuration

  player.upWasDown = false; // track input change for variable jump height
  player.isFalling = false;
  player.isRolling = false;
  player.isDucking = false;
  player.isAttacking = false;
  player.isPermadead = false;
  player.lastAttacked = 0;
  player.isCollidable = true;

  // phaser apparently automatically calls any function named update attached to a sprite!
  player.update = function() {
    // kill player if he falls off the screen
    if (player.position.y > 64 && player.hp !== 0) { // TODO: how to access native height from game.js?
      actions.takeDamage(2);
    }

    if (player.body.velocity.y > 85) {
      player.isFalling = true;
    }

    player.scarf.animation.speed = Math.abs(player.body.velocity.x) * 0.75 + 32/3;

    var input = {
      left:   (keys.left.isDown && !keys.right.isDown) ||
              (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) && !gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) ||
              gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 ||
              gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) < -0.1,
      right:  (keys.right.isDown && !keys.left.isDown) ||
              (gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) && !gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) ||
              gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ||
              gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) > 0.1,
      up:     keys.up.isDown ||
              gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) ||
              gamepad.isDown(Phaser.Gamepad.XBOX360_A),
      down:   keys.down.isDown ||
              gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) ||
              gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 ||
              gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) > 0.1,
      attack: keys.attack.isDown ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_X) ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_Y) ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_B) ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER) ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_LEFT_TRIGGER) ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER) ||
              gamepad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER),
    };

    if (input.left) {
      actions.run('left');
      player.actions.applyOrientation();
    } else if (input.right) {
      actions.run('right');
      player.actions.applyOrientation();
    } else if (player.body.touching.down && !player.isRolling) {
      // apply friction
      if (Math.abs(player.body.velocity.x) < 2) {
        player.body.velocity.x *= 0.5; // quickly bring slow-moving players to a stop
      } else if (player.body.velocity.x > 0) {
        player.body.velocity.x -= 2;
      } else if (player.body.velocity.x < 0) {
        player.body.velocity.x += 2;
      }
    }

    if (input.up) {
      player.upWasDown = true;
      actions.jump();
    } else if (player.upWasDown) {
      player.upWasDown = false;
      actions.dampenJump();
    }

    if (input.down) {
      actions.duck();
    } else if (player.isDucking) {
      actions.stand();
    }

    if (input.attack) {
      actions.attack();
    }
  };

  return player;
};

module.exports = createPlayer;

},{"./utils":13}],8:[function(require,module,exports){
/**
 * Each time a unique sound filename is passed in, a new instance of chiptune.js will be created with that sound as a buffer.
 * If the play method is called on sound file passed in previously, its respective instance will play the existing buffer.
 * This ensures the file system is only hit once per sound, as needed.
 * It will also prevent sounds from 'stacking' -- the same sound played repeatedly will interrupt itself each time.
 */
var sfx = function() {
  var soundbank = {};

  return {
    play: function(fileName) {
      if (soundbank[fileName]) {
        soundbank[fileName].play(soundbank[fileName].buffer);
      } else {
        soundbank[fileName] = new ChiptuneJsPlayer(new ChiptuneJsConfig(0));
        soundbank[fileName].load('./sfx/' + fileName + '.xm', function(buffer) {
          soundbank[fileName].buffer = buffer;
          soundbank[fileName].play(buffer);
        });
      }
    }
  };
};

module.exports = sfx;

},{}],9:[function(require,module,exports){
var stageBuilder = function stageBuilder(game) {
  var settings = require('./data/settings');
  var utils = require('./utils');
  var stage = utils.getStage();

  game.stage.backgroundColor = stage.backgroundColor;

  var buildPlatforms = function buildPlatforms() {
    var platforms = game.add.group();
    platforms.enableBody = true;

    var platformPositions = stage.platforms.positions;
    platformPositions.forEach(function(position) {
      var platform = platforms.create(position[0], position[1], stage.platforms.color);
      platform.scale.setTo(5, 1);
      platform.body.immovable = true;
    });

    var walls = [];
    walls.push(platforms.create(-3, -12, stage.platforms.color));
    walls.push(platforms.create(61, -12, stage.platforms.color));
    walls.forEach(function(wall) {
      wall.scale.setTo(3, 38);
      wall.body.immovable = true;
    });

    var ceiling = platforms.create(0, -12, stage.platforms.color);
    ceiling.scale.setTo(32, 3);
    ceiling.body.immovable = true;
    
    return platforms;
  };

  var buildLayer = function buildLayer(sublayers) {
    return function() {
      var layer = game.add.group();

      sublayers.forEach(function(sublayer) {
        var bg;
        if (sublayer.scrolling) {
          bg = game.add.tileSprite(0, 0, game.width, game.height, sublayer.image);
          layer.loop = game.time.events.loop(Phaser.Timer.QUARTER, function() {
            bg.tilePosition.x -=1;
          }, this);
        } else {
          bg = game.add.sprite(0, 0, sublayer.image);
        }
        layer.add(bg);
      });

    return layer;
    };
  };
  
  return {
    buildPlatforms: buildPlatforms,
    buildForegrounds: buildLayer(stage.foregrounds),
    buildBackgrounds: buildLayer(stage.backgrounds),
  };
};

module.exports = stageBuilder;

},{"./data/settings":2,"./utils":13}],10:[function(require,module,exports){
var Loading = function(game) {
  var loading = {
    init: function() {
      game.add.sprite(0, 0, 'loading');
      document.getElementById('loading').style.display = 'none';
    },

    preload: function() {
      // images
      game.load.spritesheet('title', 'images/spritesheet-title.gif', 64, 64);
      game.load.spritesheet('victoryMsg', 'images/spritesheet-winner.gif', 52, 22);
      game.load.spritesheet('blueScarf', 'images/spritesheet-scarf-bluebit.gif', 5, 2);
      game.load.spritesheet('pinkScarf', 'images/spritesheet-scarf-pinkbit.gif', 5, 2);
      game.load.spritesheet('greenScarf', 'images/spritesheet-scarf-greenbit.gif', 5, 2);
      game.load.spritesheet('purpleScarf', 'images/spritesheet-scarf-purplebit.gif', 5, 2);
      game.load.spritesheet('jump', 'images/spritesheet-jump.gif', 10, 2);
      game.load.spritesheet('land', 'images/spritesheet-land.gif', 10, 2);
      game.load.image('clear', 'images/clear.png');
      game.load.image('white', 'images/white.png');
      game.load.image('pink', 'images/pink.png');
      game.load.image('yellow', 'images/yellow.png');
      game.load.image('blue', 'images/blue.png');
      game.load.image('purple', 'images/purple.png');
      game.load.image('orange', 'images/orange.png');
      game.load.image('green', 'images/green.png');
      game.load.image('gray', 'images/gray.png');
      game.load.image('brown', 'images/brown.png');
      game.load.image('clouds', 'images/clouds.png');
      game.load.image('waterfall0', 'images/waterfall0.gif');
      game.load.image('waterfall', 'images/waterfall.gif');
      game.load.image('hangar', 'images/level-hangar-wip.gif');

      // sound
      game.bgm = require('../music')();
      game.sfx = require('../sfx')();
    },

    create: function() {
      game.input.gamepad.start();

      game.state.add('splash', require('./splash')(game));
      game.state.add('play', require('./play')(game));
      game.state.start('splash');
    }
  };
  
  return loading;
};

module.exports = Loading;

},{"../music":6,"../sfx":8,"./play":11,"./splash":12}],11:[function(require,module,exports){
var Play = function(game) {
  var play = {
    create: function create() {
      var self = this;

      game.subUi = game.add.group(); // place to keep anything on-screen that's not UI to depth sort below UI

      // game over victory message declaring the winner
      self.victoryMsg = game.add.sprite(6, 21, 'victoryMsg');
      self.victoryMsg.visible = false;
      self.victoryMsg.animations.add('Blue', [0, 4, 8, 12], 32/3, true);
      self.victoryMsg.animations.add('Pink', [1, 5, 9, 13], 32/3, true);
      self.victoryMsg.animations.add('Green', [2, 6, 10, 14], 32/3, true);
      self.victoryMsg.animations.add('Purple', [3, 7, 11, 15], 32/3, true);

      // menu
      var buildMenu = require('../menu');
      buildMenu(game, self); // TODO: is there a better approach than injecting the whole state into the menu to let it access functions for resetting stage, players, music?

      self.restart();
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.input.gamepad.start();

      var settings = require('../data/settings')
      game.bgm.play(settings.bgm.selected);
    },

    restart: function restart() {
      var self = this;
      var players = require('../data/players')(game);
      var settings = require('../data/settings');
      var utils = require('../utils');
      var stageBuilder = require('../stageBuilder')(game);
      var stage = utils.getStage();

      // destroy and rebuild stage and players
      var destroyGroup = function destroyGroup(group) {
        if (!group) {
          return;
        }

        while (group.children.length > 0) {
          group.children[0].destroy();
        }

        group.destroy();
      }

      destroyGroup(self.players);
      destroyGroup(self.platforms);
      destroyGroup(self.backgrounds);
      destroyGroup(self.foregrounds);

      // TODO: ugh, clean this up!
      if (self.backgrounds && self.backgrounds.loop) {
        game.time.events.remove(self.backgrounds.loop);
      }
      if (self.foregrounds && self.foregrounds.loop) {
        game.time.events.remove(self.foregrounds.loop);
      }

      self.platforms = stageBuilder.buildPlatforms();
      self.backgrounds = stageBuilder.buildBackgrounds();
      game.subUi.add(self.platforms);
      game.subUi.add(self.backgrounds);

      self.players = game.add.group();
      game.subUi.add(self.players);

      game.subUi.fx = game.add.group();
      game.subUi.add(game.subUi.fx);

      var addPlayer = function addPlayer(player) {
        var checkForGameOver = function checkForGameOver() {
          var alivePlayers = [];
          self.players.children.forEach(function(player, i) {
            if (!player.isPermadead) {
              alivePlayers.push(player.name);
            }
          });
          if (alivePlayers.length === 1) {
            self.victoryMsg.play(alivePlayers[0]);
            self.victoryMsg.visible = true;
            game.sfx.play('victory');
            setTimeout(function() {
              self.victoryMsg.visible = false;
              self.restart();
            }, 3000);
          }
        };
        var createPlayer = require('../player');
        var newPlayer = self.players.add(createPlayer(game, player, checkForGameOver));
        var pos = stage.spawnPoints[i];
        newPlayer.position.x = pos.x;
        newPlayer.position.y = pos.y;
      };

      //players.forEach(addPlayer);
      for (var i=0; i<settings.playerCount.selected; i++) {
        addPlayer(players[i], i);
      }

      self.foregrounds = stageBuilder.buildForegrounds();
      game.subUi.add(self.foregrounds);

      game.sfx.play('roundStart');
    },

    update: function update() {
      var self = this;
      
      game.physics.arcade.collide(this.players, this.platforms, function handlePlatformCollision(player, platform) {
        if (player.body.touching.down && player.isFalling) {
          player.isFalling = false;
          // kick up dust
          var dust = game.add.sprite(0, 0, 'land');
          game.subUi.fx.add(dust);
          dust.position.x = player.body.position.x - 4;
          dust.position.y = player.body.position.y + player.body.height - 2;

          var anim = dust.animations.add('dust');
          dust.animations.play('dust', 32/3);
          anim.onComplete.add(function() {
            dust.kill();
          }, this);
        }
      });

      // TODO: how do i do this on the player itself without access to players? or should i add a ftn to player and set that as the cb?
      game.physics.arcade.collide(this.players, this.players, function handlePlayerCollision(playerA, playerB) {
         /* let's not knock anybody around if something's on one of these dudes'/dudettes' heads.
         prevents cannonball attacks and the like, and allows standing on heads.
         note: still need to collide in order to test touching.up, so don't move this to allowPlayerCollision! */
        if (playerA.body.touching.up || playerB.body.touching.up) {
          return;
        }

        function temporarilyDisableCollision(player) {
          player.isCollidable = false;
          setTimeout(function() {
            player.isCollidable = true;
          }, 100);
        }

        function bounce() {
          game.sfx.play('bounce');;

          var bounceVelocity = 50;
          var velocityA, velocityB;
          velocityA = velocityB = bounceVelocity;
          if (playerA.position.x > playerB.position.x) {
            velocityB *= -1;
          } else {
            velocityA *= -1;
          }
          playerA.body.velocity.x = velocityA;
          playerB.body.velocity.x = velocityB;
          playerA.isRolling = false;
          playerB.isRolling = false;
        }

        function fling() {
          game.sfx.play('bounce');

          var playerToFling;
          var playerToLeave;
          if (playerA.isDucking) {
            playerToFling = playerB;
            playerToLeave = playerA;
          } else {
            playerToFling = playerA;
            playerToLeave = playerB;
          }
          temporarilyDisableCollision(playerToFling);
          var flingXVelocity = 75;
          if (playerToFling.position.x > playerToLeave.position.x) {
            flingXVelocity *= -1;
          }
          playerToFling.body.velocity.x = flingXVelocity;
          playerToFling.body.velocity.y = -75;
        }

        function pop() {
          game.sfx.play('bounce');

          var playerToPop;
          if (playerA.isRolling) {
            playerToPop = playerB;
          } else {
            playerToPop = playerA;
          }
          temporarilyDisableCollision(playerToPop);
          playerToPop.body.velocity.y = -75;
        }

        var bothRolling = playerA.isRolling && playerB.isRolling;
        var bothStanding = !playerA.isDucking && !playerB.isDucking;
        var neitherRolling = !playerA.isRolling && !playerB.isRolling;
        var eitherDucking = playerA.isDucking || playerB.isDucking;
        var eitherRunning = Math.abs(playerA.body.velocity.x) > 28 || Math.abs(playerB.body.velocity.x) >= 28;
        var eitherRolling = playerA.isRolling || playerB.isRolling;
        var eitherStanding = !playerA.isDucking || !playerB.isDucking;

        switch (true) {
          case bothRolling || bothStanding:
            bounce();
            break;
          case neitherRolling && eitherRunning && eitherDucking:
            fling();
            break;
          case eitherRolling && eitherStanding:
            pop();
            break;
        }

        // if only one of the touching players is attacking...
        if (playerA.isAttacking !== playerB.isAttacking) {
          var victim = playerA.isAttacking ? playerB : playerA;
          if (playerA.orientation !== playerB.orientation) {
            victim.actions.takeDamage(1);
          } else {
            victim.actions.takeDamage(2); // attacked from behind for double damage
          }
        }

      }, function allowPlayerCollision(playerA, playerB) {
        // don't allow collision if either player isn't collidable.
        // also disallow if player is in limbo below the screen :]
        if (!playerA.isCollidable || !playerB.isCollidable || playerA.position.y > game.height || playerB.position.y > game.height) {
          return false;
        }
        return true;
      });
    }
  };
  
  return play;
};

module.exports = Play;

},{"../data/players":1,"../data/settings":2,"../menu":5,"../player":7,"../stageBuilder":9,"../utils":13}],12:[function(require,module,exports){
var Splash = function(game) {
  var splash = {
    create: function() {
      game.bgm.play('title');
      game.add.sprite(0, 0, 'hangar');
      var title = game.add.sprite(0, 0, 'title');
      title.animations.add('title');
      title.animations.play('title', 32/3, true);

      var startGame = function startGame() {
        if (game.state.current === 'splash') {
          game.bgm.play('None');
          game.state.start('play');
        }
      };
      
      // start game when start/enter is pressed
      game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(startGame);
      if (game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
        game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_START).onDown.addOnce(startGame);
      }
    }
  };
  
  return splash;
};

module.exports = Splash;

},{}],13:[function(require,module,exports){
var utils = {
  // from underscore
  debounce: function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
  },

  center: function(entity) {
    entity.anchor.setTo(0.5);
  },

  // TODO: consider injecting dependencies
  getStage: function() {
    var stages = require('./data/stages');
    var settings = require('./data/settings');
    var stage = stages.filter(function(stage) {
      return stage.name === settings.stage.selected;
    })[0];
    return stage;
  },

  getRandomArrayElement: function(array) {
    return array[Math.floor(Math.random() * array.length)];
  },
};

module.exports = utils;

},{"./data/settings":2,"./data/stages":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2NyaXB0cy9kYXRhL3BsYXllcnMuanMiLCJzY3JpcHRzL2RhdGEvc2V0dGluZ3MuanMiLCJzY3JpcHRzL2RhdGEvc3RhZ2VzLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9tZW51LmpzIiwic2NyaXB0cy9tdXNpYy5qcyIsInNjcmlwdHMvcGxheWVyLmpzIiwic2NyaXB0cy9zZnguanMiLCJzY3JpcHRzL3N0YWdlQnVpbGRlci5qcyIsInNjcmlwdHMvc3RhdGVzL2xvYWRpbmcuanMiLCJzY3JpcHRzL3N0YXRlcy9wbGF5LmpzIiwic2NyaXB0cy9zdGF0ZXMvc3BsYXNoLmpzIiwic2NyaXB0cy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBQbGF5ZXJzID0gZnVuY3Rpb24oZ2FtZSkge1xuICAgIHZhciBwbGF5ZXJzID0gW3tcbiAgICAgIG5hbWU6ICdCbHVlJyxcbiAgICAgIGNvbG9yOiAnYmx1ZScsXG4gICAgICBnYW1lcGFkOiBnYW1lLmlucHV0LmdhbWVwYWQucGFkMSxcbiAgICAgIGtleXM6IHtcbiAgICAgICAgdXA6ICdXJywgZG93bjogJ1MnLCBsZWZ0OiAnQScsIHJpZ2h0OiAnRCcsIGF0dGFjazogJ1EnXG4gICAgICB9LFxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdQaW5rJyxcbiAgICAgIGNvbG9yOiAncGluaycsXG4gICAgICBnYW1lcGFkOiBnYW1lLmlucHV0LmdhbWVwYWQucGFkMixcbiAgICAgIG9yaWVudGF0aW9uOiAnbGVmdCcsXG4gICAgfSwge1xuICAgICAgbmFtZTogJ0dyZWVuJyxcbiAgICAgIGNvbG9yOiAnZ3JlZW4nLFxuICAgICAgZ2FtZXBhZDogZ2FtZS5pbnB1dC5nYW1lcGFkLnBhZDMsXG4gICAgICBrZXlzOiB7XG4gICAgICAgIHVwOiAnSScsIGRvd246ICdLJywgbGVmdDogJ0onLCByaWdodDogJ0wnLCBhdHRhY2s6ICdVJ1xuICAgICAgfSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiAnUHVycGxlJyxcbiAgICAgIGNvbG9yOiAncHVycGxlJyxcbiAgICAgIGdhbWVwYWQ6IGdhbWUuaW5wdXQuZ2FtZXBhZC5wYWQ0LFxuICAgICAgb3JpZW50YXRpb246ICdsZWZ0JyxcbiAgICAgIGtleXM6IHtcbiAgICAgICAgdXA6ICdUJywgZG93bjogJ0cnLCBsZWZ0OiAnRicsIHJpZ2h0OiAnSCcsIGF0dGFjazogJ1InXG4gICAgICB9LFxuICB9XTtcbiAgXG4gIHJldHVybiBwbGF5ZXJzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJzO1xuIiwidmFyIHN0YWdlcyA9IHJlcXVpcmUoJy4vc3RhZ2VzJyk7XG5cbnZhciBzZXR0aW5ncyA9IHtcbiAgcGxheWVyQ291bnQ6IHtcbiAgICBvcHRpb25zOiBbMiwgMywgNF0sXG4gICAgc2VsZWN0ZWQ6IDQsXG4gIH0sXG4gIGJnbToge1xuICAgIG9wdGlvbnM6IFsnaGFuZ2FyJywgJ3dhdGVyZmFsbCcsICd0aXRsZScsICdOb25lJ10sXG4gICAgc2VsZWN0ZWQ6ICdoYW5nYXInLFxuICB9LFxuICBzdGFnZToge1xuICAgIG9wdGlvbnM6IHN0YWdlcy5tYXAoZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICAgIHJldHVybiBzdGFnZS5uYW1lO1xuICAgIH0pLFxuICAgIHNlbGVjdGVkOiAnSGFuZ2FyJyxcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXR0aW5ncztcbiIsInZhciBzdGFnZXMgPSBbe1xuICBcIm5hbWVcIjogXCJXYXRlcmZhbGwwXCIsXG4gIFwidGhlbWVcIjogXCJ3YXRlcmZhbGxcIixcbiAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDAwXCIsXG4gIFwicGxhdGZvcm1zXCI6IHtcbiAgICBcInBvc2l0aW9uc1wiOiBbXG4gICAgICBbMTAsIDddLFxuICAgICAgWzQ1LCA3XSxcbiAgICAgIFsyNywgMTVdLFxuICAgICAgWzEwLCAyNV0sXG4gICAgICBbNDUsIDI1XSxcbiAgICAgIFsxMCwgNDRdLFxuICAgICAgWzQ1LCA0NF0sXG4gICAgICBbMjcsIDUyXSxcbiAgICAgIFsxMCwgNjJdLFxuICAgICAgWzQ1LCA2Ml1cbiAgICBdLFxuICAgIFwiY29sb3JcIjogXCJ5ZWxsb3dcIlxuICB9LFxuICBcImJhY2tncm91bmRzXCI6IFt7XG4gICAgXCJpbWFnZVwiOiBcIndhdGVyZmFsbDBcIixcbiAgfV0sXG4gIFwiZm9yZWdyb3VuZHNcIjogW3tcbiAgICBcImltYWdlXCI6IFwiY2xvdWRzXCIsXG4gICAgXCJzY3JvbGxpbmdcIjogdHJ1ZSxcbiAgfV0sXG4gIFwic3Bhd25Qb2ludHNcIjogW1xuICAgIHsgXCJ4XCI6IDE0LCBcInlcIjogMCB9LFxuICAgIHsgXCJ4XCI6IDQ4LCBcInlcIjogMCB9LFxuICAgIHsgXCJ4XCI6IDE0LCBcInlcIjogMTggfSxcbiAgICB7IFwieFwiOiA0OCwgXCJ5XCI6IDE4IH1cbiAgXSxcbiAgXCJ1aUNvbG9yXCI6IFwiIzI4RjEyOVwiXG59LHtcbiAgXCJuYW1lXCI6IFwiQlwiLFxuICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDBcIixcbiAgXCJwbGF0Zm9ybXNcIjoge1xuICAgIFwicG9zaXRpb25zXCI6IFtcbiAgICAgIFsyNywgNl0sXG4gICAgICBbMTAsIDEzXSxcbiAgICAgIFs0NSwgMTNdLFxuICAgICAgWzQsIDIyXSxcbiAgICAgIFs1MCwgMjJdLFxuICAgICAgWzE4LCAzMV0sXG4gICAgICBbMjcsIDMxXSxcbiAgICAgIFszNywgMzFdLFxuICAgICAgWzQsIDQ0XSxcbiAgICAgIFs1MCwgNDRdLFxuICAgICAgWzI3LCA2MF1cbiAgICBdLFxuICAgIFwiY29sb3JcIjogXCJncmF5XCJcbiAgfSxcbiAgXCJiYWNrZ3JvdW5kc1wiOiBbXSxcbiAgXCJmb3JlZ3JvdW5kc1wiOiBbe1xuICAgIFwiaW1hZ2VcIjogXCJjbGVhclwiXG4gIH1dLFxuICBcInNwYXduUG9pbnRzXCI6IFtcbiAgICB7IFwieFwiOiAxNCwgXCJ5XCI6IDYgfSxcbiAgICB7IFwieFwiOiA0OCwgXCJ5XCI6IDYgfSxcbiAgICB7IFwieFwiOiA5LCBcInlcIjogMTUgfSxcbiAgICB7IFwieFwiOiA1NCwgXCJ5XCI6IDE1IH1cbiAgXSxcbiAgXCJ1aUNvbG9yXCI6IFwiIzI4RDZGMVwiXG59LHtcbiAgXCJuYW1lXCI6IFwiSGFuZ2FyXCIsXG4gIFwidGhlbWVcIjogXCJoYW5nYXJcIixcbiAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDAwXCIsXG4gIFwicGxhdGZvcm1zXCI6IHtcbiAgICBcInBvc2l0aW9uc1wiOiBbXG4gICAgICBbOCwgMzRdLFxuICAgICAgWzEyLCAzNF0sXG4gICAgICBbMjIsIDM0XSxcbiAgICAgIFszMSwgMzRdLFxuICAgICAgWzQxLCAzNF0sXG4gICAgICBbNDYsIDM0XSxcbiAgICBdLFxuICAgIFwiY29sb3JcIjogXCJncmF5XCJcbiAgfSxcbiAgXCJiYWNrZ3JvdW5kc1wiOiBbe1xuICAgIGltYWdlOiBcImhhbmdhclwiXG4gIH1dLFxuICBcImZvcmVncm91bmRzXCI6IFt7XG4gICAgXCJpbWFnZVwiOiBcImNsZWFyXCIsXG4gIH1dLFxuICBcInNwYXduUG9pbnRzXCI6IFtcbiAgICB7IFwieFwiOiAxMCwgXCJ5XCI6IDI3IH0sXG4gICAgeyBcInhcIjogMTksIFwieVwiOiAyNyB9LFxuICAgIHsgXCJ4XCI6IDQxLCBcInlcIjogMjcgfSxcbiAgICB7IFwieFwiOiA1MCwgXCJ5XCI6IDI3IH1cbiAgXSxcbiAgXCJ1aUNvbG9yXCI6IFwiIzhEOEQ4RFwiXG59LHtcbiAgXCJuYW1lXCI6IFwiV2F0ZXJmYWxsXCIsXG4gIFwidGhlbWVcIjogXCJ3YXRlcmZhbGxcIixcbiAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDAwXCIsXG4gIFwicGxhdGZvcm1zXCI6IHtcbiAgICBcInBvc2l0aW9uc1wiOiBbXG4gICAgICBbMTAsIDEzXSxcbiAgICAgIFs0NSwgMTNdLFxuICAgICAgWzI3LCAyMV0sXG4gICAgICBbMTAsIDMxXSxcbiAgICAgIFs0NSwgMzFdXG4gICAgXSxcbiAgICBcImNvbG9yXCI6IFwiYnJvd25cIlxuICB9LFxuICBcImJhY2tncm91bmRzXCI6IFt7XG4gICAgaW1hZ2U6ICd3YXRlcmZhbGwnXG4gIH1dLFxuICBcImZvcmVncm91bmRzXCI6IFt7XG4gICAgXCJpbWFnZVwiOiBcImNsZWFyXCJcbiAgfV0sXG4gIFwic3Bhd25Qb2ludHNcIjogW1xuICAgIHsgXCJ4XCI6IDE0LCBcInlcIjogNiB9LFxuICAgIHsgXCJ4XCI6IDQ4LCBcInlcIjogNiB9LFxuICAgIHsgXCJ4XCI6IDE0LCBcInlcIjogMjQgfSxcbiAgICB7IFwieFwiOiA0OCwgXCJ5XCI6IDI0IH1cbiAgXSxcbiAgXCJ1aUNvbG9yXCI6IFwiIzc4M0UwOFwiXG59XTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdGFnZXM7XG4iLCJ2YXIgcmVzaXplID0gZnVuY3Rpb24gcmVzaXplKCkge1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLnpvb20gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyBnYW1lLmhlaWdodDtcbn07XG5cbnZhciBtYWluID0ge1xuICBwcmVsb2FkOiBmdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuICAgIHJlc2l6ZSgpO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IHV0aWxzLmRlYm91bmNlKHJlc2l6ZSwgMTAwKTtcbiAgICBcbiAgICAvLyBhbGxvdyBhbnl0aGluZyB1cCB0byBoZWlnaHQgb2Ygd29ybGQgdG8gZmFsbCBvZmYtc2NyZWVuIHVwIG9yIGRvd25cbiAgICBnYW1lLndvcmxkLnNldEJvdW5kcygwLCAtZ2FtZS53aWR0aCwgZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQgKiAzKTtcbiAgICBcbiAgICAvLyBwcmV2ZW50IGdhbWUgcGF1c2luZyB3aGVuIGl0IGxvc2VzIGZvY3VzXG4gICAgZ2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XG4gICAgXG4gICAgLy8gYXNzZXRzIHVzZWQgaW4gbG9hZGluZyBzY3JlZW5cbiAgICBnYW1lLmxvYWQuaW1hZ2UoJ2xvYWRpbmcnLCAnaW1hZ2VzL2xvYWRpbmcuZ2lmJyk7XG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoJ2xvYWRpbmcnLCByZXF1aXJlKCcuL3N0YXRlcy9sb2FkaW5nJykoZ2FtZSkpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoJ2xvYWRpbmcnKTtcbiAgfVxufTtcblxudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoNjQsIDY0LCBQaGFzZXIuQVVUTywgJ2dhbWUnLCB7XG4gIHByZWxvYWQ6IG1haW4ucHJlbG9hZCxcbiAgY3JlYXRlOiBtYWluLmNyZWF0ZVxufSwgZmFsc2UsIGZhbHNlKTsgLy8gZGlzYWJsZSBhbnRpLWFsaWFzaW5nXG5cbmdhbWUuc3RhdGUuYWRkKCdtYWluJywgbWFpbik7XG5nYW1lLnN0YXRlLnN0YXJ0KCdtYWluJyk7XG4iLCJ2YXIgYnVpbGRNZW51ID0gZnVuY3Rpb24gYnVpbGRNZW51KGdhbWUsIHN0YXRlKSB7XG4gIHZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vZGF0YS9zZXR0aW5ncycpO1xuXG4gIHZhciBjeWNsZVNldHRpbmcgPSBmdW5jdGlvbiBjeWNsZVNldHRpbmcoKSB7XG4gICAgdmFyIG9wdGlvbkluZGV4ID0gdGhpcy5zZXR0aW5nLm9wdGlvbnMuaW5kZXhPZih0aGlzLnNldHRpbmcuc2VsZWN0ZWQpO1xuICAgIG9wdGlvbkluZGV4Kys7XG4gICAgaWYgKG9wdGlvbkluZGV4ID09PSB0aGlzLnNldHRpbmcub3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbkluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy5zZXR0aW5nLnNlbGVjdGVkID0gdGhpcy5zZXR0aW5nLm9wdGlvbnNbb3B0aW9uSW5kZXhdO1xuICB9O1xuXG4gIHZhciBtZW51ID0gW3tcbiAgICBuYW1lOiAnUGxheWVycycsXG4gICAgc2V0dGluZzogc2V0dGluZ3MucGxheWVyQ291bnQsXG4gICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGN5Y2xlU2V0dGluZy5jYWxsKHRoaXMpO1xuICAgICAgc3RhdGUucmVzdGFydCgpO1xuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHRydWVcbiAgfSwge1xuICAgIG5hbWU6ICdCR00nLFxuICAgIHNldHRpbmc6IHNldHRpbmdzLmJnbSxcbiAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgY3ljbGVTZXR0aW5nLmNhbGwodGhpcyk7XG4gICAgICBnYW1lLmJnbS5wbGF5KHNldHRpbmdzLmJnbS5zZWxlY3RlZCk7XG4gICAgfSxcbiAgfSwge1xuICAgIG5hbWU6ICdTdGFnZScsXG4gICAgc2V0dGluZzogc2V0dGluZ3Muc3RhZ2UsXG4gICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGN5Y2xlU2V0dGluZy5jYWxsKHRoaXMpO1xuXG4gICAgICAvLyBpZiBzdGFnZSBoYXMgYSBkZWZhdWx0IGJnbSwgbG9hZCBpdFxuICAgICAgdmFyIHN0YWdlcyA9IHJlcXVpcmUoJy4vZGF0YS9zdGFnZXMnKTtcbiAgICAgIHZhciBzZWxlY3RlZFN0YWdlID0gc3RhZ2VzW3NldHRpbmdzLnN0YWdlLm9wdGlvbnMuaW5kZXhPZihzZXR0aW5ncy5zdGFnZS5zZWxlY3RlZCldO1xuICAgICAgaWYgKHNlbGVjdGVkU3RhZ2UudGhlbWUpIHtcbiAgICAgICAgc2V0dGluZ3MuYmdtLnNlbGVjdGVkID0gc2VsZWN0ZWRTdGFnZS50aGVtZTtcbiAgICAgIH1cbiAgICAgIGdhbWUuYmdtLnBsYXkoc2V0dGluZ3MuYmdtLnNlbGVjdGVkKTtcblxuICAgICAgc3RhdGUucmVzdGFydCgpO1xuICAgIH0sXG4gIH0sIHtcbiAgICBuYW1lOiAnU3RhcnQnLFxuICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBzdGF0ZS5yZXN0YXJ0KCk7XG4gICAgfVxuICB9XTtcblxuICB2YXIgY2hhbmdlUGxheWVyQ291bnQgPSBtZW51WzBdLmFjdGlvbi5iaW5kKG1lbnVbMF0pO1xuICB2YXIgY2hhbmdlQmdtID0gbWVudVsxXS5hY3Rpb24uYmluZChtZW51WzFdKTtcbiAgdmFyIGNoYW5nZVN0YWdlID0gbWVudVsyXS5hY3Rpb24uYmluZChtZW51WzJdKTtcbiAgdmFyIHJlc3RhcnQgPSBtZW51WzNdLmFjdGlvbi5iaW5kKG1lbnVbM10pO1xuXG4gIGdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZC5QKS5vbkRvd24uYWRkKGNoYW5nZVBsYXllckNvdW50KTtcbiAgZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLk0pLm9uRG93bi5hZGQoY2hhbmdlU3RhZ2UpO1xuICBnYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQikub25Eb3duLmFkZChjaGFuZ2VCZ20pO1xuICBnYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuRU5URVIpLm9uRG93bi5hZGQocmVzdGFydCk7XG4gIGlmIChnYW1lLmlucHV0LmdhbWVwYWQuc3VwcG9ydGVkICYmIGdhbWUuaW5wdXQuZ2FtZXBhZC5hY3RpdmUpIHtcbiAgICBpZiAoZ2FtZS5pbnB1dC5nYW1lcGFkLnBhZDEuY29ubmVjdGVkKSB7XG4gICAgICBnYW1lLmlucHV0LmdhbWVwYWQucGFkMS5nZXRCdXR0b24oUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9TVEFSVCkub25Eb3duLmFkZChyZXN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGdhbWUuaW5wdXQuZ2FtZXBhZC5wYWQyLmNvbm5lY3RlZCkge1xuICAgICAgZ2FtZS5pbnB1dC5nYW1lcGFkLnBhZDIuZ2V0QnV0dG9uKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfU1RBUlQpLm9uRG93bi5hZGQocmVzdGFydCk7XG4gICAgfVxuICAgIGlmIChnYW1lLmlucHV0LmdhbWVwYWQucGFkMy5jb25uZWN0ZWQpIHtcbiAgICAgIGdhbWUuaW5wdXQuZ2FtZXBhZC5wYWQzLmdldEJ1dHRvbihQaGFzZXIuR2FtZXBhZC5YQk9YMzYwX1NUQVJUKS5vbkRvd24uYWRkKHJlc3RhcnQpO1xuICAgIH1cbiAgICBpZiAoZ2FtZS5pbnB1dC5nYW1lcGFkLnBhZDQuY29ubmVjdGVkKSB7XG4gICAgICBnYW1lLmlucHV0LmdhbWVwYWQucGFkNC5nZXRCdXR0b24oUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9TVEFSVCkub25Eb3duLmFkZChyZXN0YXJ0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWVudTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRNZW51O1xuIiwidmFyIGJnbSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGxheWVyID0gbmV3IENoaXB0dW5lSnNQbGF5ZXIobmV3IENoaXB0dW5lSnNDb25maWcoLTEpKTtcblxuICByZXR1cm4ge1xuICAgIHBsYXk6IGZ1bmN0aW9uKGZpbGVOYW1lKSB7XG4gICAgICBpZiAoZmlsZU5hbWUgPT09ICdOb25lJykge1xuICAgICAgICBwbGF5ZXIuc3RvcC5jYWxsKHBsYXllcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF5ZXIubG9hZCgnLi9tdXNpYy8nICsgZmlsZU5hbWUgKyAnLnhtJywgZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgICAgcGxheWVyLnBsYXkoYnVmZmVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZ207XG4iLCJ2YXIgY3JlYXRlUGxheWVyID0gZnVuY3Rpb24gY3JlYXRlUGxheWVyKGdhbWUsIG9wdGlvbnMsIG9uRGVhdGgpIHtcbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIG9yaWVudGF0aW9uOiAncmlnaHQnLFxuICAgIGtleXM6IHtcbiAgICAgIHVwOiAnVVAnLFxuICAgICAgZG93bjogJ0RPV04nLFxuICAgICAgbGVmdDogJ0xFRlQnLFxuICAgICAgcmlnaHQ6ICdSSUdIVCcsXG4gICAgICBhdHRhY2s6ICdTSElGVCdcbiAgICB9LFxuICAgIHNjYWxlOiB7XG4gICAgICB4OiAxLFxuICAgICAgeTogMlxuICAgIH0sXG4gICAgY29sb3I6ICdwaW5rJyxcbiAgICBnYW1lcGFkOiBnYW1lLmlucHV0LmdhbWVwYWQucGFkMSxcbiAgfTtcblxuICB2YXIgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgdmFyIGtleXMgPSB7XG4gICAgdXA6IGdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZFtzZXR0aW5ncy5rZXlzLnVwXSksXG4gICAgZG93bjogZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkW3NldHRpbmdzLmtleXMuZG93bl0pLFxuICAgIGxlZnQ6IGdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZFtzZXR0aW5ncy5rZXlzLmxlZnRdKSxcbiAgICByaWdodDogZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkW3NldHRpbmdzLmtleXMucmlnaHRdKSxcbiAgICBhdHRhY2s6IGdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFBoYXNlci5LZXlib2FyZFtzZXR0aW5ncy5rZXlzLmF0dGFja10pLFxuICB9O1xuXG4gIHZhciBnYW1lcGFkID0gc2V0dGluZ3MuZ2FtZXBhZDtcblxuICB2YXIgYWN0aW9ucyA9IHtcbiAgICBhdHRhY2s6IGZ1bmN0aW9uIGF0dGFjaygpIHtcbiAgICAgIHZhciBkdXJhdGlvbiA9IDIwMDtcbiAgICAgIHZhciBpbnRlcnZhbCA9IDYwMDtcbiAgICAgIHZhciB2ZWxvY2l0eSA9IDEwMDtcblxuICAgICAgdmFyIGNhbkF0dGFjayA9IChEYXRlLm5vdygpID4gcGxheWVyLmxhc3RBdHRhY2tlZCArIGludGVydmFsKSAmJiAhcGxheWVyLmlzRHVja2luZyAmJiAhcGxheWVyLmlzUGVybWFkZWFkO1xuICAgICAgaWYgKCFjYW5BdHRhY2spIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwbGF5ZXIuaXNBdHRhY2tpbmcgPSB0cnVlO1xuICAgICAgcGxheWVyLmxhc3RBdHRhY2tlZCA9IERhdGUubm93KCk7XG5cbiAgICAgIGdhbWUuc2Z4LnBsYXkoJ2F0dGFjaycpO1xuXG4gICAgICBzd2l0Y2gocGxheWVyLm9yaWVudGF0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtdmVsb2NpdHk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gdmVsb2NpdHk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHBsYXllci5sb2FkVGV4dHVyZSgnd2hpdGUnKTtcbiAgICAgIHNldFRpbWVvdXQoYWN0aW9ucy5lbmRBdHRhY2ssIGR1cmF0aW9uKTtcbiAgICB9LFxuXG4gICAgZW5kQXR0YWNrOiBmdW5jdGlvbiBlbmRBdHRhY2soKSB7XG4gICAgICBpZiAocGxheWVyLmFsaXZlICYmIHBsYXllci5pc0F0dGFja2luZykge1xuICAgICAgICBwbGF5ZXIubG9hZFRleHR1cmUoc2V0dGluZ3MuY29sb3IpO1xuICAgICAgICBwbGF5ZXIuaXNBdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcnVuOiBmdW5jdGlvbiBydW4oZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgbWF4U3BlZWQgPSAzMjtcbiAgICAgIHZhciBhY2NlbGVyYXRpb24gPSBwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duID8gOCA6IDM7IC8vIHBsYXllcnMgaGF2ZSBsZXNzIGNvbnRyb2wgaW4gdGhlIGFpclxuICAgICAgcGxheWVyLm9yaWVudGF0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAvLyBpZiBwbGF5ZXIgaXMgZ29pbmcgZmFzdGVyIHRoYW4gbWF4IHJ1bm5pbmcgc3BlZWQgKGR1ZSB0byBhdHRhY2ssIGV0YyksIHNsb3cgdGhlbSBkb3duIG92ZXIgdGltZVxuICAgICAgICAgIGlmIChwbGF5ZXIuYm9keS52ZWxvY2l0eS54IDwgLW1heFNwZWVkKSB7XG4gICAgICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS54ICs9IGFjY2VsZXJhdGlvbjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IE1hdGgubWF4KHBsYXllci5ib2R5LnZlbG9jaXR5LnggLSBhY2NlbGVyYXRpb24sIC1tYXhTcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgaWYgKHBsYXllci5ib2R5LnZlbG9jaXR5LnggPiBtYXhTcGVlZCkge1xuICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCAtPSBhY2NlbGVyYXRpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLm1pbihwbGF5ZXIuYm9keS52ZWxvY2l0eS54ICsgYWNjZWxlcmF0aW9uLCBtYXhTcGVlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBqdW1wOiBmdW5jdGlvbiBqdW1wKCkge1xuICAgICAgaWYgKCFwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmICFwbGF5ZXIuYm9keS50b3VjaGluZy5sZWZ0ICYmICFwbGF5ZXIuYm9keS50b3VjaGluZy5yaWdodCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBkdXN0O1xuXG4gICAgICBpZiAocGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gLTEwMDtcbiAgICAgICAgZ2FtZS5zZngucGxheSgnanVtcCcpO1xuICAgICAgICBkdXN0ID0gZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdqdW1wJyk7XG4gICAgICAgIGR1c3QucG9zaXRpb24ueCA9IHBsYXllci5ib2R5LnBvc2l0aW9uLnggLSA0O1xuICAgICAgICBkdXN0LnBvc2l0aW9uLnkgPSBwbGF5ZXIuYm9keS5wb3NpdGlvbi55ICsgcGxheWVyLmJvZHkuaGVpZ2h0IC0gMjtcbiAgICAgIC8vIHdhbGwganVtcHNcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyLmJvZHkudG91Y2hpbmcubGVmdCkge1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gLTEyMDtcbiAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDQ1O1xuICAgICAgICBnYW1lLnNmeC5wbGF5KCdqdW1wJyk7XG4gICAgICAgIGR1c3QgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ2xhbmQnKTtcbiAgICAgICAgZHVzdC5wb3NpdGlvbi54ID0gcGxheWVyLmJvZHkucG9zaXRpb24ueCArIDI7XG4gICAgICAgIGR1c3QucG9zaXRpb24ueSA9IHBsYXllci5ib2R5LnBvc2l0aW9uLnkgLSBwbGF5ZXIuYm9keS5oZWlnaHQ7XG4gICAgICAgIGR1c3QuYW5nbGUgPSA5MDtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyLmJvZHkudG91Y2hpbmcucmlnaHQpIHtcbiAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC0xMjA7XG4gICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtNDU7XG4gICAgICAgIGdhbWUuc2Z4LnBsYXkoJ2p1bXAnKTtcbiAgICAgICAgZHVzdCA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnbGFuZCcpO1xuICAgICAgICBkdXN0LnBvc2l0aW9uLnggPSBwbGF5ZXIuYm9keS5wb3NpdGlvbi54O1xuICAgICAgICBkdXN0LnBvc2l0aW9uLnkgPSBwbGF5ZXIuYm9keS5wb3NpdGlvbi55ICsgcGxheWVyLmJvZHkuaGVpZ2h0O1xuICAgICAgICBkdXN0LmFuZ2xlID0gLTkwO1xuICAgICAgfVxuXG4gICAgICBnYW1lLnN1YlVpLmZ4LmFkZChkdXN0KTsgLy8gbW91bnQgYmVsb3cgZm9yZWdyb3VuZCAmIHVpXG4gICAgICB2YXIgYW5pbSA9IGR1c3QuYW5pbWF0aW9ucy5hZGQoJ2R1c3QnKTtcbiAgICAgIGR1c3QuYW5pbWF0aW9ucy5wbGF5KCdkdXN0JywgMzIvMyk7XG4gICAgICBhbmltLm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICBkdXN0LmtpbGwoKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBkYW1wZW5KdW1wOiBmdW5jdGlvbiBkYW1wZW5KdW1wKCkge1xuICAgICAgLy8gc29mdGVuIHVwd2FyZCB2ZWxvY2l0eSB3aGVuIHBsYXllciByZWxlYXNlcyBqdW1wIGtleVxuICAgICAgICB2YXIgZGFtcGVuVG9QZXJjZW50ID0gMC41O1xuXG4gICAgICAgIGlmIChwbGF5ZXIuYm9keS52ZWxvY2l0eS55IDwgMCkge1xuICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnkgKj0gZGFtcGVuVG9QZXJjZW50O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGR1Y2s6IGZ1bmN0aW9uIGR1Y2soKSB7XG4gICAgICBpZiAocGxheWVyLmlzQXR0YWNraW5nIHx8IHBsYXllci5pc1Blcm1hZGVhZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghcGxheWVyLmlzRHVja2luZyAmJiBwbGF5ZXIuaHAgPiAyKSB7XG4gICAgICAgIHBsYXllci5zY2FsZS5zZXRUbyhzZXR0aW5ncy5zY2FsZS54LCBzZXR0aW5ncy5zY2FsZS55IC8gMik7XG4gICAgICAgIGFjdGlvbnMuYXBwbHlPcmllbnRhdGlvbigpO1xuICAgICAgICBwbGF5ZXIueSArPSBzZXR0aW5ncy5zY2FsZS55O1xuICAgICAgfVxuICAgICAgcGxheWVyLmlzRHVja2luZyA9IHRydWU7XG5cbiAgICAgIChmdW5jdGlvbiByb2xsKCkge1xuICAgICAgICB2YXIgY2FuUm9sbCA9IE1hdGguYWJzKHBsYXllci5ib2R5LnZlbG9jaXR5LngpID4gMjUgJiYgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93bjtcbiAgICAgICAgaWYgKGNhblJvbGwpIHtcbiAgICAgICAgICBwbGF5ZXIuaXNSb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSgpKTtcbiAgICB9LFxuXG4gICAgc3RhbmQ6IGZ1bmN0aW9uIHN0YW5kKCkge1xuICAgICAgaWYgKHBsYXllci5ocCA+IDIpIHtcbiAgICAgICAgcGxheWVyLnkgLT0gc2V0dGluZ3Muc2NhbGUueTtcbiAgICAgIH1cbiAgICAgIGFjdGlvbnMuYXBwbHlIZWFsdGhFZmZlY3RzKCk7XG4gICAgICBwbGF5ZXIuaXNEdWNraW5nID0gZmFsc2U7XG4gICAgICBwbGF5ZXIuaXNSb2xsaW5nID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHRha2VEYW1hZ2U6IGZ1bmN0aW9uIHRha2VEYW1hZ2UoYW1vdW50KSB7XG4gICAgICAvLyBwcmV2ZW50IHRha2luZyBtb3JlIGRhbWFnZSB0aGFuIGhwIHJlbWFpbmluZyBpbiBjdXJyZW50IGxpZmVcbiAgICAgIGlmIChhbW91bnQgPiAxICYmIChwbGF5ZXIuaHAgLSBhbW91bnQpICUgMiAhPT0gMCkge1xuICAgICAgICBhbW91bnQgPSAxO1xuICAgICAgfVxuXG4gICAgICBwbGF5ZXIuaHAgLT0gYW1vdW50O1xuXG4gICAgICBpZiAocGxheWVyLmhwIDwgMCkge1xuICAgICAgICBwbGF5ZXIuaHAgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllci5ocCAlIDIgPT09IDApIHtcbiAgICAgICAgYWN0aW9ucy5kaWUoKTtcbiAgICAgIH1cbiAgICAgIGFjdGlvbnMuYXBwbHlIZWFsdGhFZmZlY3RzKCk7XG4gICAgfSxcblxuICAgIGFwcGx5SGVhbHRoRWZmZWN0czogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbmV3UGxheWVySGVpZ2h0ID0gTWF0aC5tYXgoTWF0aC5yb3VuZChwbGF5ZXIuaHAgLyAyKSwgMSk7XG4gICAgICBwbGF5ZXIuc2NhbGUuc2V0VG8oc2V0dGluZ3Muc2NhbGUueCwgbmV3UGxheWVySGVpZ2h0KTtcbiAgICAgIGFjdGlvbnMuYXBwbHlPcmllbnRhdGlvbigpO1xuXG4gICAgICBpZiAocGxheWVyLmhwID09PSAwKSB7XG4gICAgICAgIHJldHVybjsgLy8gYml0J3MgYmVjb21pbmcgYSBnaG9zdDsgbGVhdmVzIGl0cyBzY2FyZiAob3IgbGFjayB0aGVyZW9mKSBhbG9uZVxuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIuaHAgJSAyID09PSAxKSB7XG4gICAgICAgIHBsYXllci5zY2FyZi52aXNpYmxlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF5ZXIuc2NhcmYudmlzaWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFwcGx5T3JpZW50YXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgcGxheWVyLnNjYWxlLnNldFRvKHBsYXllci5vcmllbnRhdGlvbiA9PT0gJ2xlZnQnID8gc2V0dGluZ3Muc2NhbGUueCA6IC1zZXR0aW5ncy5zY2FsZS54LCBwbGF5ZXIuc2NhbGUueSk7XG4gICAgfSxcblxuICAgIGRpZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocGxheWVyLmlzUGVybWFkZWFkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXllci5ocCA+IDApIHtcbiAgICAgICAgYWN0aW9ucy5hcHBseUludnVsbmVyYWJpbGl0eSgpO1xuXG4gICAgICAgIGdhbWUuc2Z4LnBsYXkoJ2RpZScpO1xuICAgICAgICBhY3Rpb25zLmVuZEF0dGFjaygpO1xuICAgICAgICBwbGF5ZXIubGFzdEF0dGFja2VkID0gMDtcblxuICAgICAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4gICAgICAgIHZhciByZXNwYXduUG9zaXRpb24gPSB1dGlscy5nZXRSYW5kb21BcnJheUVsZW1lbnQodXRpbHMuZ2V0U3RhZ2UoKS5zcGF3blBvaW50cyk7XG4gICAgICAgIHBsYXllci5wb3NpdGlvbi54ID0gcmVzcGF3blBvc2l0aW9uLng7XG4gICAgICAgIHBsYXllci5wb3NpdGlvbi55ID0gcmVzcGF3blBvc2l0aW9uLnk7XG4gICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdhbWUuc2Z4LnBsYXkoJ3Blcm1hZGllJyk7XG4gICAgICAgIHBsYXllci5hbHBoYSA9IDAuNTtcbiAgICAgICAgcGxheWVyLmlzUGVybWFkZWFkID0gdHJ1ZTtcbiAgICAgICAgb25EZWF0aCgpOyAvLyBUT0RPOiB0aGlzIGNvdWxkIHByb2JhYmx5IGJlIGJldHRlciBhcmNoaXRlY3RlZFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhcHBseUludnVsbmVyYWJpbGl0eTogZnVuY3Rpb24oKSB7XG4gICAgICBwbGF5ZXIuaXNDb2xsaWRhYmxlID0gZmFsc2U7XG5cbiAgICAgIHZhciBzZXRDb2xvciA9IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgIC8vIGluIGNhc2UgZ2FtZSByZXN0YXJ0cyBhbmQgcGxheWVyIG5vIGxvbmdlciBleGlzdHMuLi5cbiAgICAgICAgaWYgKCFwbGF5ZXIuYWxpdmUpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGNvbG9ySW50ZXJ2YWwpO1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2hpdGVJbnRlcnZhbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllci5sb2FkVGV4dHVyZShjb2xvcik7XG4gICAgICB9O1xuXG4gICAgICB2YXIgY29sb3JJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRDb2xvcihzZXR0aW5ncy5jb2xvcik7XG4gICAgICB9LCAxNTApO1xuICAgICAgdmFyIHdoaXRlSW50ZXJ2YWw7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB3aGl0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2V0Q29sb3IoJ3doaXRlJyk7XG4gICAgICAgIH0sIDE1MCk7XG4gICAgICB9LCA3NSk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghcGxheWVyLmFsaXZlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFySW50ZXJ2YWwod2hpdGVJbnRlcnZhbCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoY29sb3JJbnRlcnZhbCk7XG4gICAgICAgIHNldENvbG9yKHNldHRpbmdzLmNvbG9yKTsgLy8gZW5zdXJlIHBsYXllciBjb2xvciByZXR1cm5zIHRvIG5vcm1hbFxuICAgICAgICBwbGF5ZXIuaXNDb2xsaWRhYmxlID0gdHJ1ZTtcbiAgICAgIH0sIDE1MDApO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIHBsYXllciA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCBzZXR0aW5ncy5jb2xvcik7XG4gIHBsYXllci5uYW1lID0gc2V0dGluZ3MubmFtZTtcbiAgcGxheWVyLm9yaWVudGF0aW9uID0gc2V0dGluZ3Mub3JpZW50YXRpb247XG4gIHBsYXllci5hbmNob3Iuc2V0VG8oMC41LCAwLjUpOyAvLyBhbmNob3IgdG8gY2VudGVyIHRvIGFsbG93IGZsaXBwaW5nXG5cbiAgcGxheWVyLnNjYXJmID0gZ2FtZS5hZGQuc3ByaXRlKC0xLCAtMSwgc2V0dGluZ3MuY29sb3IgKyAnU2NhcmYnKTtcbiAgcGxheWVyLnNjYXJmLmFuaW1hdGlvbnMuYWRkKCdzY2FyZicpO1xuICBwbGF5ZXIuc2NhcmYuYW5pbWF0aW9uID0gcGxheWVyLnNjYXJmLmFuaW1hdGlvbnMucGxheSgnc2NhcmYnLCAzMi8zLCB0cnVlKTtcbiAgcGxheWVyLnNjYXJmLnNldFNjYWxlTWluTWF4KC0xLCAxLCAxLCAxKTtcbiAgcGxheWVyLmFkZENoaWxkKHBsYXllci5zY2FyZik7XG5cbiAgLy8gdHJhY2sgaGVhbHRoXG4gIHBsYXllci5ocCA9IHBsYXllci5tYXhIcCA9IDY7IC8vIFRPRE86IGFsbG93IHNldHRpbmcgY3VzdG9tIGhwIGFtb3VudCBmb3IgZWFjaCBwbGF5ZXJcbiAgcGxheWVyLmFjdGlvbnMgPSBhY3Rpb25zO1xuICBwbGF5ZXIuYWN0aW9ucy5hcHBseUhlYWx0aEVmZmVjdHMoKTsgLy8gVE9ETzogYWRkIGdpYW50IG1vZGVcblxuICBnYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZShwbGF5ZXIpO1xuICBwbGF5ZXIuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICBwbGF5ZXIuYm9keS5ib3VuY2UueSA9IDAuMjsgLy8gVE9ETzogYWxsb3cgYm91bmNlIGNvbmZpZ3VyYXRpb25cbiAgcGxheWVyLmJvZHkuZ3Jhdml0eS55ID0gMzgwOyAvLyBUT0RPOiBhbGxvdyBncmF2aXR5IGNvbmZpZ3VyYXRpb25cblxuICBwbGF5ZXIudXBXYXNEb3duID0gZmFsc2U7IC8vIHRyYWNrIGlucHV0IGNoYW5nZSBmb3IgdmFyaWFibGUganVtcCBoZWlnaHRcbiAgcGxheWVyLmlzRmFsbGluZyA9IGZhbHNlO1xuICBwbGF5ZXIuaXNSb2xsaW5nID0gZmFsc2U7XG4gIHBsYXllci5pc0R1Y2tpbmcgPSBmYWxzZTtcbiAgcGxheWVyLmlzQXR0YWNraW5nID0gZmFsc2U7XG4gIHBsYXllci5pc1Blcm1hZGVhZCA9IGZhbHNlO1xuICBwbGF5ZXIubGFzdEF0dGFja2VkID0gMDtcbiAgcGxheWVyLmlzQ29sbGlkYWJsZSA9IHRydWU7XG5cbiAgLy8gcGhhc2VyIGFwcGFyZW50bHkgYXV0b21hdGljYWxseSBjYWxscyBhbnkgZnVuY3Rpb24gbmFtZWQgdXBkYXRlIGF0dGFjaGVkIHRvIGEgc3ByaXRlIVxuICBwbGF5ZXIudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8ga2lsbCBwbGF5ZXIgaWYgaGUgZmFsbHMgb2ZmIHRoZSBzY3JlZW5cbiAgICBpZiAocGxheWVyLnBvc2l0aW9uLnkgPiA2NCAmJiBwbGF5ZXIuaHAgIT09IDApIHsgLy8gVE9ETzogaG93IHRvIGFjY2VzcyBuYXRpdmUgaGVpZ2h0IGZyb20gZ2FtZS5qcz9cbiAgICAgIGFjdGlvbnMudGFrZURhbWFnZSgyKTtcbiAgICB9XG5cbiAgICBpZiAocGxheWVyLmJvZHkudmVsb2NpdHkueSA+IDg1KSB7XG4gICAgICBwbGF5ZXIuaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5ZXIuc2NhcmYuYW5pbWF0aW9uLnNwZWVkID0gTWF0aC5hYnMocGxheWVyLmJvZHkudmVsb2NpdHkueCkgKiAwLjc1ICsgMzIvMztcblxuICAgIHZhciBpbnB1dCA9IHtcbiAgICAgIGxlZnQ6ICAgKGtleXMubGVmdC5pc0Rvd24gJiYgIWtleXMucmlnaHQuaXNEb3duKSB8fFxuICAgICAgICAgICAgICAoZ2FtZXBhZC5pc0Rvd24oUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9EUEFEX0xFRlQpICYmICFnYW1lcGFkLmlzRG93bihQaGFzZXIuR2FtZXBhZC5YQk9YMzYwX0RQQURfUklHSFQpKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmF4aXMoUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9TVElDS19MRUZUX1gpIDwgLTAuMSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmF4aXMoUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9TVElDS19SSUdIVF9YKSA8IC0wLjEsXG4gICAgICByaWdodDogIChrZXlzLnJpZ2h0LmlzRG93biAmJiAha2V5cy5sZWZ0LmlzRG93bikgfHxcbiAgICAgICAgICAgICAgKGdhbWVwYWQuaXNEb3duKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfRFBBRF9SSUdIVCkgJiYgIWdhbWVwYWQuaXNEb3duKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfRFBBRF9MRUZUKSkgfHxcbiAgICAgICAgICAgICAgZ2FtZXBhZC5heGlzKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfU1RJQ0tfTEVGVF9YKSA+IDAuMSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmF4aXMoUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9TVElDS19SSUdIVF9YKSA+IDAuMSxcbiAgICAgIHVwOiAgICAga2V5cy51cC5pc0Rvd24gfHxcbiAgICAgICAgICAgICAgZ2FtZXBhZC5pc0Rvd24oUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9EUEFEX1VQKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmlzRG93bihQaGFzZXIuR2FtZXBhZC5YQk9YMzYwX0EpLFxuICAgICAgZG93bjogICBrZXlzLmRvd24uaXNEb3duIHx8XG4gICAgICAgICAgICAgIGdhbWVwYWQuaXNEb3duKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfRFBBRF9ET1dOKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmF4aXMoUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9TVElDS19MRUZUX1kpID4gMC4xIHx8XG4gICAgICAgICAgICAgIGdhbWVwYWQuYXhpcyhQaGFzZXIuR2FtZXBhZC5YQk9YMzYwX1NUSUNLX1JJR0hUX1kpID4gMC4xLFxuICAgICAgYXR0YWNrOiBrZXlzLmF0dGFjay5pc0Rvd24gfHxcbiAgICAgICAgICAgICAgZ2FtZXBhZC5qdXN0UHJlc3NlZChQaGFzZXIuR2FtZXBhZC5YQk9YMzYwX1gpIHx8XG4gICAgICAgICAgICAgIGdhbWVwYWQuanVzdFByZXNzZWQoUGhhc2VyLkdhbWVwYWQuWEJPWDM2MF9ZKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmp1c3RQcmVzc2VkKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfQikgfHxcbiAgICAgICAgICAgICAgZ2FtZXBhZC5qdXN0UHJlc3NlZChQaGFzZXIuR2FtZXBhZC5YQk9YMzYwX0xFRlRfQlVNUEVSKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmp1c3RQcmVzc2VkKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfTEVGVF9UUklHR0VSKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmp1c3RQcmVzc2VkKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfUklHSFRfQlVNUEVSKSB8fFxuICAgICAgICAgICAgICBnYW1lcGFkLmp1c3RQcmVzc2VkKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfUklHSFRfVFJJR0dFUiksXG4gICAgfTtcblxuICAgIGlmIChpbnB1dC5sZWZ0KSB7XG4gICAgICBhY3Rpb25zLnJ1bignbGVmdCcpO1xuICAgICAgcGxheWVyLmFjdGlvbnMuYXBwbHlPcmllbnRhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXQucmlnaHQpIHtcbiAgICAgIGFjdGlvbnMucnVuKCdyaWdodCcpO1xuICAgICAgcGxheWVyLmFjdGlvbnMuYXBwbHlPcmllbnRhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJiAhcGxheWVyLmlzUm9sbGluZykge1xuICAgICAgLy8gYXBwbHkgZnJpY3Rpb25cbiAgICAgIGlmIChNYXRoLmFicyhwbGF5ZXIuYm9keS52ZWxvY2l0eS54KSA8IDIpIHtcbiAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCAqPSAwLjU7IC8vIHF1aWNrbHkgYnJpbmcgc2xvdy1tb3ZpbmcgcGxheWVycyB0byBhIHN0b3BcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyLmJvZHkudmVsb2NpdHkueCA+IDApIHtcbiAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCAtPSAyO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIuYm9keS52ZWxvY2l0eS54IDwgMCkge1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS54ICs9IDI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlucHV0LnVwKSB7XG4gICAgICBwbGF5ZXIudXBXYXNEb3duID0gdHJ1ZTtcbiAgICAgIGFjdGlvbnMuanVtcCgpO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLnVwV2FzRG93bikge1xuICAgICAgcGxheWVyLnVwV2FzRG93biA9IGZhbHNlO1xuICAgICAgYWN0aW9ucy5kYW1wZW5KdW1wKCk7XG4gICAgfVxuXG4gICAgaWYgKGlucHV0LmRvd24pIHtcbiAgICAgIGFjdGlvbnMuZHVjaygpO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLmlzRHVja2luZykge1xuICAgICAgYWN0aW9ucy5zdGFuZCgpO1xuICAgIH1cblxuICAgIGlmIChpbnB1dC5hdHRhY2spIHtcbiAgICAgIGFjdGlvbnMuYXR0YWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBwbGF5ZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBsYXllcjtcbiIsIi8qKlxuICogRWFjaCB0aW1lIGEgdW5pcXVlIHNvdW5kIGZpbGVuYW1lIGlzIHBhc3NlZCBpbiwgYSBuZXcgaW5zdGFuY2Ugb2YgY2hpcHR1bmUuanMgd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhhdCBzb3VuZCBhcyBhIGJ1ZmZlci5cbiAqIElmIHRoZSBwbGF5IG1ldGhvZCBpcyBjYWxsZWQgb24gc291bmQgZmlsZSBwYXNzZWQgaW4gcHJldmlvdXNseSwgaXRzIHJlc3BlY3RpdmUgaW5zdGFuY2Ugd2lsbCBwbGF5IHRoZSBleGlzdGluZyBidWZmZXIuXG4gKiBUaGlzIGVuc3VyZXMgdGhlIGZpbGUgc3lzdGVtIGlzIG9ubHkgaGl0IG9uY2UgcGVyIHNvdW5kLCBhcyBuZWVkZWQuXG4gKiBJdCB3aWxsIGFsc28gcHJldmVudCBzb3VuZHMgZnJvbSAnc3RhY2tpbmcnIC0tIHRoZSBzYW1lIHNvdW5kIHBsYXllZCByZXBlYXRlZGx5IHdpbGwgaW50ZXJydXB0IGl0c2VsZiBlYWNoIHRpbWUuXG4gKi9cbnZhciBzZnggPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNvdW5kYmFuayA9IHt9O1xuXG4gIHJldHVybiB7XG4gICAgcGxheTogZnVuY3Rpb24oZmlsZU5hbWUpIHtcbiAgICAgIGlmIChzb3VuZGJhbmtbZmlsZU5hbWVdKSB7XG4gICAgICAgIHNvdW5kYmFua1tmaWxlTmFtZV0ucGxheShzb3VuZGJhbmtbZmlsZU5hbWVdLmJ1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb3VuZGJhbmtbZmlsZU5hbWVdID0gbmV3IENoaXB0dW5lSnNQbGF5ZXIobmV3IENoaXB0dW5lSnNDb25maWcoMCkpO1xuICAgICAgICBzb3VuZGJhbmtbZmlsZU5hbWVdLmxvYWQoJy4vc2Z4LycgKyBmaWxlTmFtZSArICcueG0nLCBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICBzb3VuZGJhbmtbZmlsZU5hbWVdLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICBzb3VuZGJhbmtbZmlsZU5hbWVdLnBsYXkoYnVmZmVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZng7XG4iLCJ2YXIgc3RhZ2VCdWlsZGVyID0gZnVuY3Rpb24gc3RhZ2VCdWlsZGVyKGdhbWUpIHtcbiAgdmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi9kYXRhL3NldHRpbmdzJyk7XG4gIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgdmFyIHN0YWdlID0gdXRpbHMuZ2V0U3RhZ2UoKTtcblxuICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IHN0YWdlLmJhY2tncm91bmRDb2xvcjtcblxuICB2YXIgYnVpbGRQbGF0Zm9ybXMgPSBmdW5jdGlvbiBidWlsZFBsYXRmb3JtcygpIHtcbiAgICB2YXIgcGxhdGZvcm1zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBwbGF0Zm9ybXMuZW5hYmxlQm9keSA9IHRydWU7XG5cbiAgICB2YXIgcGxhdGZvcm1Qb3NpdGlvbnMgPSBzdGFnZS5wbGF0Zm9ybXMucG9zaXRpb25zO1xuICAgIHBsYXRmb3JtUG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgIHZhciBwbGF0Zm9ybSA9IHBsYXRmb3Jtcy5jcmVhdGUocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBzdGFnZS5wbGF0Zm9ybXMuY29sb3IpO1xuICAgICAgcGxhdGZvcm0uc2NhbGUuc2V0VG8oNSwgMSk7XG4gICAgICBwbGF0Zm9ybS5ib2R5LmltbW92YWJsZSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICB2YXIgd2FsbHMgPSBbXTtcbiAgICB3YWxscy5wdXNoKHBsYXRmb3Jtcy5jcmVhdGUoLTMsIC0xMiwgc3RhZ2UucGxhdGZvcm1zLmNvbG9yKSk7XG4gICAgd2FsbHMucHVzaChwbGF0Zm9ybXMuY3JlYXRlKDYxLCAtMTIsIHN0YWdlLnBsYXRmb3Jtcy5jb2xvcikpO1xuICAgIHdhbGxzLmZvckVhY2goZnVuY3Rpb24od2FsbCkge1xuICAgICAgd2FsbC5zY2FsZS5zZXRUbygzLCAzOCk7XG4gICAgICB3YWxsLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHZhciBjZWlsaW5nID0gcGxhdGZvcm1zLmNyZWF0ZSgwLCAtMTIsIHN0YWdlLnBsYXRmb3Jtcy5jb2xvcik7XG4gICAgY2VpbGluZy5zY2FsZS5zZXRUbygzMiwgMyk7XG4gICAgY2VpbGluZy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG4gICAgXG4gICAgcmV0dXJuIHBsYXRmb3JtcztcbiAgfTtcblxuICB2YXIgYnVpbGRMYXllciA9IGZ1bmN0aW9uIGJ1aWxkTGF5ZXIoc3VibGF5ZXJzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxheWVyID0gZ2FtZS5hZGQuZ3JvdXAoKTtcblxuICAgICAgc3VibGF5ZXJzLmZvckVhY2goZnVuY3Rpb24oc3VibGF5ZXIpIHtcbiAgICAgICAgdmFyIGJnO1xuICAgICAgICBpZiAoc3VibGF5ZXIuc2Nyb2xsaW5nKSB7XG4gICAgICAgICAgYmcgPSBnYW1lLmFkZC50aWxlU3ByaXRlKDAsIDAsIGdhbWUud2lkdGgsIGdhbWUuaGVpZ2h0LCBzdWJsYXllci5pbWFnZSk7XG4gICAgICAgICAgbGF5ZXIubG9vcCA9IGdhbWUudGltZS5ldmVudHMubG9vcChQaGFzZXIuVGltZXIuUVVBUlRFUiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBiZy50aWxlUG9zaXRpb24ueCAtPTE7XG4gICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmcgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgc3VibGF5ZXIuaW1hZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLmFkZChiZyk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBsYXllcjtcbiAgICB9O1xuICB9O1xuICBcbiAgcmV0dXJuIHtcbiAgICBidWlsZFBsYXRmb3JtczogYnVpbGRQbGF0Zm9ybXMsXG4gICAgYnVpbGRGb3JlZ3JvdW5kczogYnVpbGRMYXllcihzdGFnZS5mb3JlZ3JvdW5kcyksXG4gICAgYnVpbGRCYWNrZ3JvdW5kczogYnVpbGRMYXllcihzdGFnZS5iYWNrZ3JvdW5kcyksXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWdlQnVpbGRlcjtcbiIsInZhciBMb2FkaW5nID0gZnVuY3Rpb24oZ2FtZSkge1xuICB2YXIgbG9hZGluZyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnbG9hZGluZycpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0sXG5cbiAgICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGltYWdlc1xuICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCd0aXRsZScsICdpbWFnZXMvc3ByaXRlc2hlZXQtdGl0bGUuZ2lmJywgNjQsIDY0KTtcbiAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgndmljdG9yeU1zZycsICdpbWFnZXMvc3ByaXRlc2hlZXQtd2lubmVyLmdpZicsIDUyLCAyMik7XG4gICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2JsdWVTY2FyZicsICdpbWFnZXMvc3ByaXRlc2hlZXQtc2NhcmYtYmx1ZWJpdC5naWYnLCA1LCAyKTtcbiAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncGlua1NjYXJmJywgJ2ltYWdlcy9zcHJpdGVzaGVldC1zY2FyZi1waW5rYml0LmdpZicsIDUsIDIpO1xuICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdncmVlblNjYXJmJywgJ2ltYWdlcy9zcHJpdGVzaGVldC1zY2FyZi1ncmVlbmJpdC5naWYnLCA1LCAyKTtcbiAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgncHVycGxlU2NhcmYnLCAnaW1hZ2VzL3Nwcml0ZXNoZWV0LXNjYXJmLXB1cnBsZWJpdC5naWYnLCA1LCAyKTtcbiAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnanVtcCcsICdpbWFnZXMvc3ByaXRlc2hlZXQtanVtcC5naWYnLCAxMCwgMik7XG4gICAgICBnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2xhbmQnLCAnaW1hZ2VzL3Nwcml0ZXNoZWV0LWxhbmQuZ2lmJywgMTAsIDIpO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCdjbGVhcicsICdpbWFnZXMvY2xlYXIucG5nJyk7XG4gICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3doaXRlJywgJ2ltYWdlcy93aGl0ZS5wbmcnKTtcbiAgICAgIGdhbWUubG9hZC5pbWFnZSgncGluaycsICdpbWFnZXMvcGluay5wbmcnKTtcbiAgICAgIGdhbWUubG9hZC5pbWFnZSgneWVsbG93JywgJ2ltYWdlcy95ZWxsb3cucG5nJyk7XG4gICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2JsdWUnLCAnaW1hZ2VzL2JsdWUucG5nJyk7XG4gICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3B1cnBsZScsICdpbWFnZXMvcHVycGxlLnBuZycpO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCdvcmFuZ2UnLCAnaW1hZ2VzL29yYW5nZS5wbmcnKTtcbiAgICAgIGdhbWUubG9hZC5pbWFnZSgnZ3JlZW4nLCAnaW1hZ2VzL2dyZWVuLnBuZycpO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCdncmF5JywgJ2ltYWdlcy9ncmF5LnBuZycpO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCdicm93bicsICdpbWFnZXMvYnJvd24ucG5nJyk7XG4gICAgICBnYW1lLmxvYWQuaW1hZ2UoJ2Nsb3VkcycsICdpbWFnZXMvY2xvdWRzLnBuZycpO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCd3YXRlcmZhbGwwJywgJ2ltYWdlcy93YXRlcmZhbGwwLmdpZicpO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCd3YXRlcmZhbGwnLCAnaW1hZ2VzL3dhdGVyZmFsbC5naWYnKTtcbiAgICAgIGdhbWUubG9hZC5pbWFnZSgnaGFuZ2FyJywgJ2ltYWdlcy9sZXZlbC1oYW5nYXItd2lwLmdpZicpO1xuXG4gICAgICAvLyBzb3VuZFxuICAgICAgZ2FtZS5iZ20gPSByZXF1aXJlKCcuLi9tdXNpYycpKCk7XG4gICAgICBnYW1lLnNmeCA9IHJlcXVpcmUoJy4uL3NmeCcpKCk7XG4gICAgfSxcblxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICBnYW1lLmlucHV0LmdhbWVwYWQuc3RhcnQoKTtcblxuICAgICAgZ2FtZS5zdGF0ZS5hZGQoJ3NwbGFzaCcsIHJlcXVpcmUoJy4vc3BsYXNoJykoZ2FtZSkpO1xuICAgICAgZ2FtZS5zdGF0ZS5hZGQoJ3BsYXknLCByZXF1aXJlKCcuL3BsYXknKShnYW1lKSk7XG4gICAgICBnYW1lLnN0YXRlLnN0YXJ0KCdzcGxhc2gnKTtcbiAgICB9XG4gIH07XG4gIFxuICByZXR1cm4gbG9hZGluZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGluZztcbiIsInZhciBQbGF5ID0gZnVuY3Rpb24oZ2FtZSkge1xuICB2YXIgcGxheSA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgZ2FtZS5zdWJVaSA9IGdhbWUuYWRkLmdyb3VwKCk7IC8vIHBsYWNlIHRvIGtlZXAgYW55dGhpbmcgb24tc2NyZWVuIHRoYXQncyBub3QgVUkgdG8gZGVwdGggc29ydCBiZWxvdyBVSVxuXG4gICAgICAvLyBnYW1lIG92ZXIgdmljdG9yeSBtZXNzYWdlIGRlY2xhcmluZyB0aGUgd2lubmVyXG4gICAgICBzZWxmLnZpY3RvcnlNc2cgPSBnYW1lLmFkZC5zcHJpdGUoNiwgMjEsICd2aWN0b3J5TXNnJyk7XG4gICAgICBzZWxmLnZpY3RvcnlNc2cudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgc2VsZi52aWN0b3J5TXNnLmFuaW1hdGlvbnMuYWRkKCdCbHVlJywgWzAsIDQsIDgsIDEyXSwgMzIvMywgdHJ1ZSk7XG4gICAgICBzZWxmLnZpY3RvcnlNc2cuYW5pbWF0aW9ucy5hZGQoJ1BpbmsnLCBbMSwgNSwgOSwgMTNdLCAzMi8zLCB0cnVlKTtcbiAgICAgIHNlbGYudmljdG9yeU1zZy5hbmltYXRpb25zLmFkZCgnR3JlZW4nLCBbMiwgNiwgMTAsIDE0XSwgMzIvMywgdHJ1ZSk7XG4gICAgICBzZWxmLnZpY3RvcnlNc2cuYW5pbWF0aW9ucy5hZGQoJ1B1cnBsZScsIFszLCA3LCAxMSwgMTVdLCAzMi8zLCB0cnVlKTtcblxuICAgICAgLy8gbWVudVxuICAgICAgdmFyIGJ1aWxkTWVudSA9IHJlcXVpcmUoJy4uL21lbnUnKTtcbiAgICAgIGJ1aWxkTWVudShnYW1lLCBzZWxmKTsgLy8gVE9ETzogaXMgdGhlcmUgYSBiZXR0ZXIgYXBwcm9hY2ggdGhhbiBpbmplY3RpbmcgdGhlIHdob2xlIHN0YXRlIGludG8gdGhlIG1lbnUgdG8gbGV0IGl0IGFjY2VzcyBmdW5jdGlvbnMgZm9yIHJlc2V0dGluZyBzdGFnZSwgcGxheWVycywgbXVzaWM/XG5cbiAgICAgIHNlbGYucmVzdGFydCgpO1xuICAgICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgICBnYW1lLmlucHV0LmdhbWVwYWQuc3RhcnQoKTtcblxuICAgICAgdmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi4vZGF0YS9zZXR0aW5ncycpXG4gICAgICBnYW1lLmJnbS5wbGF5KHNldHRpbmdzLmJnbS5zZWxlY3RlZCk7XG4gICAgfSxcblxuICAgIHJlc3RhcnQ6IGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgcGxheWVycyA9IHJlcXVpcmUoJy4uL2RhdGEvcGxheWVycycpKGdhbWUpO1xuICAgICAgdmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi4vZGF0YS9zZXR0aW5ncycpO1xuICAgICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbiAgICAgIHZhciBzdGFnZUJ1aWxkZXIgPSByZXF1aXJlKCcuLi9zdGFnZUJ1aWxkZXInKShnYW1lKTtcbiAgICAgIHZhciBzdGFnZSA9IHV0aWxzLmdldFN0YWdlKCk7XG5cbiAgICAgIC8vIGRlc3Ryb3kgYW5kIHJlYnVpbGQgc3RhZ2UgYW5kIHBsYXllcnNcbiAgICAgIHZhciBkZXN0cm95R3JvdXAgPSBmdW5jdGlvbiBkZXN0cm95R3JvdXAoZ3JvdXApIHtcbiAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChncm91cC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZ3JvdXAuY2hpbGRyZW5bMF0uZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXAuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBkZXN0cm95R3JvdXAoc2VsZi5wbGF5ZXJzKTtcbiAgICAgIGRlc3Ryb3lHcm91cChzZWxmLnBsYXRmb3Jtcyk7XG4gICAgICBkZXN0cm95R3JvdXAoc2VsZi5iYWNrZ3JvdW5kcyk7XG4gICAgICBkZXN0cm95R3JvdXAoc2VsZi5mb3JlZ3JvdW5kcyk7XG5cbiAgICAgIC8vIFRPRE86IHVnaCwgY2xlYW4gdGhpcyB1cCFcbiAgICAgIGlmIChzZWxmLmJhY2tncm91bmRzICYmIHNlbGYuYmFja2dyb3VuZHMubG9vcCkge1xuICAgICAgICBnYW1lLnRpbWUuZXZlbnRzLnJlbW92ZShzZWxmLmJhY2tncm91bmRzLmxvb3ApO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGYuZm9yZWdyb3VuZHMgJiYgc2VsZi5mb3JlZ3JvdW5kcy5sb29wKSB7XG4gICAgICAgIGdhbWUudGltZS5ldmVudHMucmVtb3ZlKHNlbGYuZm9yZWdyb3VuZHMubG9vcCk7XG4gICAgICB9XG5cbiAgICAgIHNlbGYucGxhdGZvcm1zID0gc3RhZ2VCdWlsZGVyLmJ1aWxkUGxhdGZvcm1zKCk7XG4gICAgICBzZWxmLmJhY2tncm91bmRzID0gc3RhZ2VCdWlsZGVyLmJ1aWxkQmFja2dyb3VuZHMoKTtcbiAgICAgIGdhbWUuc3ViVWkuYWRkKHNlbGYucGxhdGZvcm1zKTtcbiAgICAgIGdhbWUuc3ViVWkuYWRkKHNlbGYuYmFja2dyb3VuZHMpO1xuXG4gICAgICBzZWxmLnBsYXllcnMgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgICAgZ2FtZS5zdWJVaS5hZGQoc2VsZi5wbGF5ZXJzKTtcblxuICAgICAgZ2FtZS5zdWJVaS5meCA9IGdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICBnYW1lLnN1YlVpLmFkZChnYW1lLnN1YlVpLmZ4KTtcblxuICAgICAgdmFyIGFkZFBsYXllciA9IGZ1bmN0aW9uIGFkZFBsYXllcihwbGF5ZXIpIHtcbiAgICAgICAgdmFyIGNoZWNrRm9yR2FtZU92ZXIgPSBmdW5jdGlvbiBjaGVja0ZvckdhbWVPdmVyKCkge1xuICAgICAgICAgIHZhciBhbGl2ZVBsYXllcnMgPSBbXTtcbiAgICAgICAgICBzZWxmLnBsYXllcnMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihwbGF5ZXIsIGkpIHtcbiAgICAgICAgICAgIGlmICghcGxheWVyLmlzUGVybWFkZWFkKSB7XG4gICAgICAgICAgICAgIGFsaXZlUGxheWVycy5wdXNoKHBsYXllci5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoYWxpdmVQbGF5ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgc2VsZi52aWN0b3J5TXNnLnBsYXkoYWxpdmVQbGF5ZXJzWzBdKTtcbiAgICAgICAgICAgIHNlbGYudmljdG9yeU1zZy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGdhbWUuc2Z4LnBsYXkoJ3ZpY3RvcnknKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHNlbGYudmljdG9yeU1zZy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIHNlbGYucmVzdGFydCgpO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgY3JlYXRlUGxheWVyID0gcmVxdWlyZSgnLi4vcGxheWVyJyk7XG4gICAgICAgIHZhciBuZXdQbGF5ZXIgPSBzZWxmLnBsYXllcnMuYWRkKGNyZWF0ZVBsYXllcihnYW1lLCBwbGF5ZXIsIGNoZWNrRm9yR2FtZU92ZXIpKTtcbiAgICAgICAgdmFyIHBvcyA9IHN0YWdlLnNwYXduUG9pbnRzW2ldO1xuICAgICAgICBuZXdQbGF5ZXIucG9zaXRpb24ueCA9IHBvcy54O1xuICAgICAgICBuZXdQbGF5ZXIucG9zaXRpb24ueSA9IHBvcy55O1xuICAgICAgfTtcblxuICAgICAgLy9wbGF5ZXJzLmZvckVhY2goYWRkUGxheWVyKTtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZXR0aW5ncy5wbGF5ZXJDb3VudC5zZWxlY3RlZDsgaSsrKSB7XG4gICAgICAgIGFkZFBsYXllcihwbGF5ZXJzW2ldLCBpKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5mb3JlZ3JvdW5kcyA9IHN0YWdlQnVpbGRlci5idWlsZEZvcmVncm91bmRzKCk7XG4gICAgICBnYW1lLnN1YlVpLmFkZChzZWxmLmZvcmVncm91bmRzKTtcblxuICAgICAgZ2FtZS5zZngucGxheSgncm91bmRTdGFydCcpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIFxuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVycywgdGhpcy5wbGF0Zm9ybXMsIGZ1bmN0aW9uIGhhbmRsZVBsYXRmb3JtQ29sbGlzaW9uKHBsYXllciwgcGxhdGZvcm0pIHtcbiAgICAgICAgaWYgKHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgcGxheWVyLmlzRmFsbGluZykge1xuICAgICAgICAgIHBsYXllci5pc0ZhbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAvLyBraWNrIHVwIGR1c3RcbiAgICAgICAgICB2YXIgZHVzdCA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnbGFuZCcpO1xuICAgICAgICAgIGdhbWUuc3ViVWkuZnguYWRkKGR1c3QpO1xuICAgICAgICAgIGR1c3QucG9zaXRpb24ueCA9IHBsYXllci5ib2R5LnBvc2l0aW9uLnggLSA0O1xuICAgICAgICAgIGR1c3QucG9zaXRpb24ueSA9IHBsYXllci5ib2R5LnBvc2l0aW9uLnkgKyBwbGF5ZXIuYm9keS5oZWlnaHQgLSAyO1xuXG4gICAgICAgICAgdmFyIGFuaW0gPSBkdXN0LmFuaW1hdGlvbnMuYWRkKCdkdXN0Jyk7XG4gICAgICAgICAgZHVzdC5hbmltYXRpb25zLnBsYXkoJ2R1c3QnLCAzMi8zKTtcbiAgICAgICAgICBhbmltLm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZHVzdC5raWxsKCk7XG4gICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBUT0RPOiBob3cgZG8gaSBkbyB0aGlzIG9uIHRoZSBwbGF5ZXIgaXRzZWxmIHdpdGhvdXQgYWNjZXNzIHRvIHBsYXllcnM/IG9yIHNob3VsZCBpIGFkZCBhIGZ0biB0byBwbGF5ZXIgYW5kIHNldCB0aGF0IGFzIHRoZSBjYj9cbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllcnMsIHRoaXMucGxheWVycywgZnVuY3Rpb24gaGFuZGxlUGxheWVyQ29sbGlzaW9uKHBsYXllckEsIHBsYXllckIpIHtcbiAgICAgICAgIC8qIGxldCdzIG5vdCBrbm9jayBhbnlib2R5IGFyb3VuZCBpZiBzb21ldGhpbmcncyBvbiBvbmUgb2YgdGhlc2UgZHVkZXMnL2R1ZGV0dGVzJyBoZWFkcy5cbiAgICAgICAgIHByZXZlbnRzIGNhbm5vbmJhbGwgYXR0YWNrcyBhbmQgdGhlIGxpa2UsIGFuZCBhbGxvd3Mgc3RhbmRpbmcgb24gaGVhZHMuXG4gICAgICAgICBub3RlOiBzdGlsbCBuZWVkIHRvIGNvbGxpZGUgaW4gb3JkZXIgdG8gdGVzdCB0b3VjaGluZy51cCwgc28gZG9uJ3QgbW92ZSB0aGlzIHRvIGFsbG93UGxheWVyQ29sbGlzaW9uISAqL1xuICAgICAgICBpZiAocGxheWVyQS5ib2R5LnRvdWNoaW5nLnVwIHx8IHBsYXllckIuYm9keS50b3VjaGluZy51cCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRlbXBvcmFyaWx5RGlzYWJsZUNvbGxpc2lvbihwbGF5ZXIpIHtcbiAgICAgICAgICBwbGF5ZXIuaXNDb2xsaWRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBsYXllci5pc0NvbGxpZGFibGUgPSB0cnVlO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBib3VuY2UoKSB7XG4gICAgICAgICAgZ2FtZS5zZngucGxheSgnYm91bmNlJyk7O1xuXG4gICAgICAgICAgdmFyIGJvdW5jZVZlbG9jaXR5ID0gNTA7XG4gICAgICAgICAgdmFyIHZlbG9jaXR5QSwgdmVsb2NpdHlCO1xuICAgICAgICAgIHZlbG9jaXR5QSA9IHZlbG9jaXR5QiA9IGJvdW5jZVZlbG9jaXR5O1xuICAgICAgICAgIGlmIChwbGF5ZXJBLnBvc2l0aW9uLnggPiBwbGF5ZXJCLnBvc2l0aW9uLngpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5QiAqPSAtMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmVsb2NpdHlBICo9IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwbGF5ZXJBLmJvZHkudmVsb2NpdHkueCA9IHZlbG9jaXR5QTtcbiAgICAgICAgICBwbGF5ZXJCLmJvZHkudmVsb2NpdHkueCA9IHZlbG9jaXR5QjtcbiAgICAgICAgICBwbGF5ZXJBLmlzUm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgIHBsYXllckIuaXNSb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmbGluZygpIHtcbiAgICAgICAgICBnYW1lLnNmeC5wbGF5KCdib3VuY2UnKTtcblxuICAgICAgICAgIHZhciBwbGF5ZXJUb0ZsaW5nO1xuICAgICAgICAgIHZhciBwbGF5ZXJUb0xlYXZlO1xuICAgICAgICAgIGlmIChwbGF5ZXJBLmlzRHVja2luZykge1xuICAgICAgICAgICAgcGxheWVyVG9GbGluZyA9IHBsYXllckI7XG4gICAgICAgICAgICBwbGF5ZXJUb0xlYXZlID0gcGxheWVyQTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxheWVyVG9GbGluZyA9IHBsYXllckE7XG4gICAgICAgICAgICBwbGF5ZXJUb0xlYXZlID0gcGxheWVyQjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGVtcG9yYXJpbHlEaXNhYmxlQ29sbGlzaW9uKHBsYXllclRvRmxpbmcpO1xuICAgICAgICAgIHZhciBmbGluZ1hWZWxvY2l0eSA9IDc1O1xuICAgICAgICAgIGlmIChwbGF5ZXJUb0ZsaW5nLnBvc2l0aW9uLnggPiBwbGF5ZXJUb0xlYXZlLnBvc2l0aW9uLngpIHtcbiAgICAgICAgICAgIGZsaW5nWFZlbG9jaXR5ICo9IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwbGF5ZXJUb0ZsaW5nLmJvZHkudmVsb2NpdHkueCA9IGZsaW5nWFZlbG9jaXR5O1xuICAgICAgICAgIHBsYXllclRvRmxpbmcuYm9keS52ZWxvY2l0eS55ID0gLTc1O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9wKCkge1xuICAgICAgICAgIGdhbWUuc2Z4LnBsYXkoJ2JvdW5jZScpO1xuXG4gICAgICAgICAgdmFyIHBsYXllclRvUG9wO1xuICAgICAgICAgIGlmIChwbGF5ZXJBLmlzUm9sbGluZykge1xuICAgICAgICAgICAgcGxheWVyVG9Qb3AgPSBwbGF5ZXJCO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXJUb1BvcCA9IHBsYXllckE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRlbXBvcmFyaWx5RGlzYWJsZUNvbGxpc2lvbihwbGF5ZXJUb1BvcCk7XG4gICAgICAgICAgcGxheWVyVG9Qb3AuYm9keS52ZWxvY2l0eS55ID0gLTc1O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJvdGhSb2xsaW5nID0gcGxheWVyQS5pc1JvbGxpbmcgJiYgcGxheWVyQi5pc1JvbGxpbmc7XG4gICAgICAgIHZhciBib3RoU3RhbmRpbmcgPSAhcGxheWVyQS5pc0R1Y2tpbmcgJiYgIXBsYXllckIuaXNEdWNraW5nO1xuICAgICAgICB2YXIgbmVpdGhlclJvbGxpbmcgPSAhcGxheWVyQS5pc1JvbGxpbmcgJiYgIXBsYXllckIuaXNSb2xsaW5nO1xuICAgICAgICB2YXIgZWl0aGVyRHVja2luZyA9IHBsYXllckEuaXNEdWNraW5nIHx8IHBsYXllckIuaXNEdWNraW5nO1xuICAgICAgICB2YXIgZWl0aGVyUnVubmluZyA9IE1hdGguYWJzKHBsYXllckEuYm9keS52ZWxvY2l0eS54KSA+IDI4IHx8IE1hdGguYWJzKHBsYXllckIuYm9keS52ZWxvY2l0eS54KSA+PSAyODtcbiAgICAgICAgdmFyIGVpdGhlclJvbGxpbmcgPSBwbGF5ZXJBLmlzUm9sbGluZyB8fCBwbGF5ZXJCLmlzUm9sbGluZztcbiAgICAgICAgdmFyIGVpdGhlclN0YW5kaW5nID0gIXBsYXllckEuaXNEdWNraW5nIHx8ICFwbGF5ZXJCLmlzRHVja2luZztcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIGJvdGhSb2xsaW5nIHx8IGJvdGhTdGFuZGluZzpcbiAgICAgICAgICAgIGJvdW5jZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBuZWl0aGVyUm9sbGluZyAmJiBlaXRoZXJSdW5uaW5nICYmIGVpdGhlckR1Y2tpbmc6XG4gICAgICAgICAgICBmbGluZygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBlaXRoZXJSb2xsaW5nICYmIGVpdGhlclN0YW5kaW5nOlxuICAgICAgICAgICAgcG9wKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG9ubHkgb25lIG9mIHRoZSB0b3VjaGluZyBwbGF5ZXJzIGlzIGF0dGFja2luZy4uLlxuICAgICAgICBpZiAocGxheWVyQS5pc0F0dGFja2luZyAhPT0gcGxheWVyQi5pc0F0dGFja2luZykge1xuICAgICAgICAgIHZhciB2aWN0aW0gPSBwbGF5ZXJBLmlzQXR0YWNraW5nID8gcGxheWVyQiA6IHBsYXllckE7XG4gICAgICAgICAgaWYgKHBsYXllckEub3JpZW50YXRpb24gIT09IHBsYXllckIub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIHZpY3RpbS5hY3Rpb25zLnRha2VEYW1hZ2UoMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpY3RpbS5hY3Rpb25zLnRha2VEYW1hZ2UoMik7IC8vIGF0dGFja2VkIGZyb20gYmVoaW5kIGZvciBkb3VibGUgZGFtYWdlXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0sIGZ1bmN0aW9uIGFsbG93UGxheWVyQ29sbGlzaW9uKHBsYXllckEsIHBsYXllckIpIHtcbiAgICAgICAgLy8gZG9uJ3QgYWxsb3cgY29sbGlzaW9uIGlmIGVpdGhlciBwbGF5ZXIgaXNuJ3QgY29sbGlkYWJsZS5cbiAgICAgICAgLy8gYWxzbyBkaXNhbGxvdyBpZiBwbGF5ZXIgaXMgaW4gbGltYm8gYmVsb3cgdGhlIHNjcmVlbiA6XVxuICAgICAgICBpZiAoIXBsYXllckEuaXNDb2xsaWRhYmxlIHx8ICFwbGF5ZXJCLmlzQ29sbGlkYWJsZSB8fCBwbGF5ZXJBLnBvc2l0aW9uLnkgPiBnYW1lLmhlaWdodCB8fCBwbGF5ZXJCLnBvc2l0aW9uLnkgPiBnYW1lLmhlaWdodCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgXG4gIHJldHVybiBwbGF5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5O1xuIiwidmFyIFNwbGFzaCA9IGZ1bmN0aW9uKGdhbWUpIHtcbiAgdmFyIHNwbGFzaCA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgZ2FtZS5iZ20ucGxheSgndGl0bGUnKTtcbiAgICAgIGdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnaGFuZ2FyJyk7XG4gICAgICB2YXIgdGl0bGUgPSBnYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ3RpdGxlJyk7XG4gICAgICB0aXRsZS5hbmltYXRpb25zLmFkZCgndGl0bGUnKTtcbiAgICAgIHRpdGxlLmFuaW1hdGlvbnMucGxheSgndGl0bGUnLCAzMi8zLCB0cnVlKTtcblxuICAgICAgdmFyIHN0YXJ0R2FtZSA9IGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgaWYgKGdhbWUuc3RhdGUuY3VycmVudCA9PT0gJ3NwbGFzaCcpIHtcbiAgICAgICAgICBnYW1lLmJnbS5wbGF5KCdOb25lJyk7XG4gICAgICAgICAgZ2FtZS5zdGF0ZS5zdGFydCgncGxheScpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgXG4gICAgICAvLyBzdGFydCBnYW1lIHdoZW4gc3RhcnQvZW50ZXIgaXMgcHJlc3NlZFxuICAgICAgZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLkVOVEVSKS5vbkRvd24uYWRkT25jZShzdGFydEdhbWUpO1xuICAgICAgaWYgKGdhbWUuaW5wdXQuZ2FtZXBhZC5zdXBwb3J0ZWQgJiYgZ2FtZS5pbnB1dC5nYW1lcGFkLmFjdGl2ZSAmJiBnYW1lLmlucHV0LmdhbWVwYWQucGFkMS5jb25uZWN0ZWQpIHtcbiAgICAgICAgZ2FtZS5pbnB1dC5nYW1lcGFkLnBhZDEuZ2V0QnV0dG9uKFBoYXNlci5HYW1lcGFkLlhCT1gzNjBfU1RBUlQpLm9uRG93bi5hZGRPbmNlKHN0YXJ0R2FtZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBcbiAgcmV0dXJuIHNwbGFzaDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3BsYXNoO1xuIiwidmFyIHV0aWxzID0ge1xuICAvLyBmcm9tIHVuZGVyc2NvcmVcbiAgZGVib3VuY2U6IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuXHR2YXIgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0aWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0fTtcblx0XHR2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHRcdGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHR9O1xuICB9LFxuXG4gIGNlbnRlcjogZnVuY3Rpb24oZW50aXR5KSB7XG4gICAgZW50aXR5LmFuY2hvci5zZXRUbygwLjUpO1xuICB9LFxuXG4gIC8vIFRPRE86IGNvbnNpZGVyIGluamVjdGluZyBkZXBlbmRlbmNpZXNcbiAgZ2V0U3RhZ2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFnZXMgPSByZXF1aXJlKCcuL2RhdGEvc3RhZ2VzJyk7XG4gICAgdmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi9kYXRhL3NldHRpbmdzJyk7XG4gICAgdmFyIHN0YWdlID0gc3RhZ2VzLmZpbHRlcihmdW5jdGlvbihzdGFnZSkge1xuICAgICAgcmV0dXJuIHN0YWdlLm5hbWUgPT09IHNldHRpbmdzLnN0YWdlLnNlbGVjdGVkO1xuICAgIH0pWzBdO1xuICAgIHJldHVybiBzdGFnZTtcbiAgfSxcblxuICBnZXRSYW5kb21BcnJheUVsZW1lbnQ6IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCldO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcbiJdfQ==