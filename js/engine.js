/** Engine.js
 *  This file provides the game loop functionality (update entities and render),
 *  draws the initial game board on the screen, and then calls the update and
 *  render methods on your player and enemy objects (defined in your app.js).
 *
 *  A game engine works by drawing the entire game screen over and over, kind of
 *  like a flipbook you may have created as a kid. When your player moves across
 *  the screen, it may look like just that image/character is moving or being
 *  drawn but that is not the case. What's really happening is the entire "scene"
 *  is being drawn over and over, presenting the illusion of animation.
 *
 *  This engine is available globally via the Engine variable and it also makes
 *  the canvas' context (ctx) object globally available to make writing app.js
 *  a little simpler to work with.
 */

var Engine = (function(global) {
    'use strict';
    /** Predefine the variables we'll be using within this scope,
     *  create the canvas element, grab the 2D context for that canvas
     *  set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    /** Create the size of the canvas */
    canvas.width = 909;
    canvas.height = 760;
    doc.body.appendChild(canvas);
    
    document.getElementById('dialogs').style.left = ((screen.width - canvas.width) / 2 - 10) + 'px';
    
    /** This function serves as the kickoff point for the game loop itself
     *  and handles properly calling the update and render methods.
     */
    function main() {
        /** Get our time delta information which is required if your game
         *  requires smooth animation. Because everyone's computer processes
         *  instructions at different speeds we need a constant value that
         *  would be the same for everyone (regardless of how fast their
         *  computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /** Call our update/render functions, pass along the time delta to
         *  our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /** Set our lastTime variable which is used to determine the time delta
         *  for the next time this function is called.
         */
        lastTime = now;

        /** Use the browser's requestAnimationFrame function to call this
         *  function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /** This function does some initial setup that should only occur once,
     *  particularly setting the lastTime variable that is required for the
     *  game loop.
     */
    function init() {
        lastTime = Date.now();
        main();
    }

    /** This function is called by main (our game loop) and itself calls all
     *  of the functions which may need to update entity's data. 
     */
    function update(dt) {
        switch(currentLevel) {
            /** If we are in the starting screen, we don't show the canvas */
            case 0:
                break;
        
            default:
                updateEntities(dt);
                break;
        }
        
        /** There is a bug when rendering the game and the Player 
         *  arrives to the top of the screen, the head of the player 
         *  stays rendered behind the tiles.
         *  Thanks to Sebastian in the forums for this fix.
         */
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    /** This is called by the update function  and loops through all of the
     *  objects within your allEnemies array as defined in app.js and calls
     *  their update() methods. It will then call the update function for your
     *  player object. These update methods should focus purely on updating
     *  the data/properties related to  the object. Do your drawing in your
     *  render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    
    /** This function initially draws the "game level", it will then call
     *  the renderEntities function. Remember, this function is called every
     *  game tick (or loop of the game engine) because that's how games work -
     *  they are flipbooks creating the illusion of animation but in reality
     *  they are just drawing the entire screen over and over.
     */
    function render() {
        /** First we create the variables of the different types of ground we have.
         *  Afterwards we create a matrix for each row/column, where we will put
         *  each type of ground for each spot, that will vary for each level.
         */
        var s = 'img/stone-block.png';
        var g = 'img/grass-block.png';
        var w = 'img/water-block.png';
        var d = 'img/dirt-block.png';
        var f = 'img/wood-block.png';
        var matrix;
         
        /** TODO: find a better way to store and access the matrix for the grounds */
        switch(currentLevel)
        {
            case 1:
                matrix = [
                    [s,s,s,f,f,f,s,s,s], // row 1
                    [s,s,s,f,f,f,s,s,s], // row 2
                    [g,g,g,g,g,g,g,g,g], // row 3
                    [g,g,g,g,g,g,g,g,g], // row 4
                    [g,g,g,g,g,g,g,g,g], // row 5
                    [g,g,g,g,g,g,g,g,g], // row 6
                    [g,g,g,g,g,g,g,g,g], // row 7
                    [s,s,s,s,s,s,s,s,s]  // row 8
                ];
                break;
            
            case 2:
                matrix = [
                    [f,f,f,w,w,w,w,w,w], // row 1
                    [f,f,f,g,g,g,g,g,g], // row 2
                    [g,g,g,g,g,g,g,g,g], // row 3
                    [g,g,g,g,g,g,g,g,g], // row 4
                    [g,g,g,g,g,g,g,g,g], // row 5
                    [g,g,g,g,g,g,g,g,g], // row 6
                    [d,d,d,g,g,g,g,s,s], // row 7
                    [d,d,d,d,g,g,g,s,s]  // row 8
                ];
                break;
            
            case 3:
                matrix = [
                    [d,g,g,g,g,d,d,d,d], // row 1
                    [d,g,g,d,d,g,g,s,s], // row 2
                    [d,d,g,d,d,g,g,f,f], // row 3
                    [w,w,g,d,g,g,g,f,f], // row 4
                    [w,w,d,d,g,g,g,g,g], // row 5
                    [w,w,d,d,g,g,g,g,g], // row 6
                    [s,s,d,g,g,g,g,g,g], // row 7
                    [s,s,d,g,g,g,g,g,g]  // row 8
                ];
                break;
                        
            case 4:
                matrix = [
                    [d,d,d,w,w,s,s,s,s], // row 1
                    [d,w,d,d,d,d,d,d,d], // row 2
                    [d,w,w,d,w,w,w,w,d], // row 3
                    [d,w,w,d,w,w,w,w,w], // row 4
                    [d,d,d,d,w,w,w,w,w], // row 5
                    [d,d,d,d,d,f,f,f,w], // row 6
                    [w,w,w,w,d,f,f,f,w], // row 7
                    [w,w,w,w,d,d,d,w,w]  // row 8
                ];
                break;
        }
        
        if (currentLevel === 0) {
            document.getElementById('menu').hidden = true;
            document.getElementById('opening').hidden = false;
            
        } else {
            document.getElementById('menu').hidden = false;
            document.getElementById('opening').hidden = true;
            
            /* Loop through the number of rows and columns we've defined above
             * and, using the matrix double array, draw the correct image for that
             * portion of the "grid"
             */
            for (var row = 0; row < 8; row++) {
                for (var col = 0; col < 9; col++) {
                    /* The drawImage function of the canvas' context element
                     * requires 3 parameters: the image to draw, the x coordinate
                     * to start drawing and the y coordinate to start drawing.
                     * We're using our Resources helpers to refer to our images
                     * so that we get the benefits of caching these images, since
                     * we're using them over and over.
                     */
                    ctx.drawImage(Resources.get(matrix[row][col]), col * 101, row * 83);
                }
            }
            renderEntities();
        }
        
        /** Function to wrap the text that will appear on the canvas when game_over or game_final */
        var wrapText = function (ctx, text, x, y, maxWidth, lineHeight) {
            var words = text.split(' ');
            var line = '';
                
            for(var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.strokeText(line, x, y);
                    ctx.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
        };
        var maxWidth = 650;
        var lineHeight = 50;
        var x = 470;
        var y = 320;
        var text = '';
        
        if (gameLost) {
            text = 'GAME OVER. The bugs crawl over you, as you lay down, too exhausted to go on... Press Enter to start over.';
            ctx.globalCompositeOperation = 'source-over';
            ctx.font = 'normal 40px "Share Tech Mono"';
            ctx.fillStyle = 'white';
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.textAlign = 'center';
            wrapText(ctx, text, x, y, maxWidth, lineHeight);
        }
        
        if (gameWon) {
            text = 'CONGRATULATIONS! You found your friend\s house!';
            ctx.globalCompositeOperation = 'source-over';
            ctx.font = 'normal 40px "Share Tech Mono"';
            ctx.fillStyle = 'white';
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.textAlign = 'center';
            wrapText(ctx, text, x, y, maxWidth, lineHeight);
        }
    }

    /** This function is called by the render function and is called on each game
     *  tick. It's purpose is to then call the render functions you have defined
     *  on your enemy and player entities within app.js
     */
    function renderEntities() {
        /** Loop through all of the objects within the allEnemies array and call
         *  the render function you have defined.
         */
        allObstacles.forEach(function(obstacle){
           obstacle.render(); 
        });
        
        allItems.forEach(function(item){
           item.render(); 
        });
               
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }
    
    /** Go ahead and load all of the images we know we're going to need to
     *  draw our game level. Then set init as the callback method, so that when
     *  all of these images are properly loaded our game will start.
     */
    Resources.load([
        'img/stone-block.png',
        'img/water-block.png',
        'img/grass-block.png',
        'img/wood-block.png',
        'img/dirt-block.png',
        'img/enemy-bug.png',
        'img/enemy-bug-left.png',
        'img/heart.png',
        'img/key.png',
        'img/rock.png',
        'img/speech-bubble.png',
        'img/char-boy.png',
        'img/char-boy-sad.png',
        'img/char-cat-girl.png',
        'img/char-cat-girl-sad.png',
        'img/char-horn-girl.png',
        'img/char-horn-girl-sad.png',
        'img/char-pink-girl.png',
        'img/char-princess-girl.png',
        'img/char-princess-girl-sad.png',
        'img/chest-closed.png',
        'img/chest-lid.png',
        'img/chest-open.png',
        'img/chest-open-green.png',
        'img/chest-open-blue.png',
        'img/chest-open-orange.png',
        'img/door-tall-closed.png',
        'img/door-tall-open.png',
        'img/door-tall-final.png',
        'img/roof-east.png',
        'img/roof-north.png',
        'img/roof-north-east.png',
        'img/roof-north-west.png',
        'img/roof-south.png',
        'img/roof-south-east.png',
        'img/roof-south-west.png',
        'img/roof-west.png',
        'img/window-tall.png',
        'img/tree-short.png',
        'img/tree-tall.png',
        'img/tree-ugly.png',
        'img/blanc.png'
    ]);
    Resources.onReady(init);

    /** Assign the canvas' context object to the global variable (the window
     *  object when run in a browser) so that developer's can use it more easily
     *  from within their app.js files.
     */
    global.ctx = ctx;
})(this);