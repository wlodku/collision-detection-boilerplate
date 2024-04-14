import { Player } from './player.js';
import { Obstacle } from './obstacle.js';

let left, right, up, down, beng = false;

function push(event) {
      var keyCode = event.keyCode;
      beng = false;
      switch (keyCode) {
          case 37: //d
              left = true;              
              right = false;              
              break;
          case 38: //s
              up = true;
              down = false;              
              break;
          case 39: //a
              right = true;
              left = false;              
              break;
          case 40: //w
              down = true;
              up = false;              
              break;
      }
      event.stopPropagation();
      event.preventDefault();
}

function release(event) {
    var keyCode = event.keyCode;
    beng = false;
    switch (keyCode) {
        case 37:
            left = false;
            break;
        case 38:
            up = false;
            break;
        case 39:
            right = false;
            break;
        case 40:
            down = false;
            break;
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// code from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collision(rect1, rect2) {
  if(rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y ) {
      return true;
    }
}


window.addEventListener('keydown', push,false);
window.addEventListener('keyup', release,false);

window.addEventListener('load', () => {
    const canva = document.getElementById('root');
    canva.width = 800;
    canva.height = 600;

    const c = canva.getContext('2d');

    const player = new Player();

    const obstacle = new Obstacle(400, 400, 50, 100);    

    // useless delta, screw it
    let delta = 0;

    function update(delta) {
      if(down) {
        player.forward(delta);        
      }
  
      if(up) {
        player.back(delta);         
      }
        
      if(left) {
        player.left(delta);              
      }

      if(right) {
        player.right(delta);              
      }

      // how simple!
      if(collision(player, obstacle)) {
        console.log("bang!");
        obstacle.width = 0;
        obstacle.height = 0;
      }    

    }

    function draw() {
      c.clearRect(0, 0, canva.width, canva.height);
      player.draw(c);

      // don't forget about it
      obstacle.draw(c);
    }

    function mainLoop() {       
      update();
      draw();
      requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);


});
