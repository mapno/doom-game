function Background(game, player) {
    //this array stores the frames that compose the bg gif
    this.bgFrames = [];

    //postions where bg is to be painted
    this.x = 0;
    this.y = 0;

    //fetch the game so it can paint on the canvas obj
    this.game = game;

    //fetch the player instance so bg moves based on the player movement & velocity
    this.player = player;
    this.vx = this.player.vx;

    //frameIndex is a frame counter which is slower than the base frame counter for the game. It counts up till 8, bc number of frames bg has
    this.frameIndex = 0;

    this.getImages();
}


//gets bg images and stores them in bgFrames array
Background.prototype.getImages = function () {
    let img;
    for (let i = 0; i < 8; i++) {
        img = new Image(); //img instance of Image obj needs to be created for every iteration of the loop
        img.src = './assets/backgrounds/hell-cave-frames/frame_' + i + '.gif'; //creates img obj with corresponding frame
        this.bgFrames.push(img);
    }
    this.health = new Image();
    this.health.src = "./assets/scoreboard/health.png";
    this.percentage = new Image();
    this.percentage.src = "./assets/scoreboard/percentage.png";
    this.numbers = [];
    for(let i = 0; i <= 9; i++){
        img = new Image();
        img.src = './assets/scoreboard/' + i + '.png';
        this.numbers.push(img);
    }
}

//draws the bg twice so it is continued when player moves and white canvas doesn't appear
Background.prototype.draw = function () {
    this.game.ctx.drawImage(this.bgFrames[this.frameIndex], this.x, this.y);
    this.game.ctx.drawImage(this.bgFrames[this.frameIndex], this.x + this.game.c.width, this.y);
    this.drawSb();
}


//moves the bg according to player movement & velocity. when bg moves an entire game screen, it moves back to original position
Background.prototype.move = function () {
    this.player.x >= this.player.x0 ? this.x -= this.player.vx : 0;

    this.x < -this.game.c.width || this.x > 0 ? this.x = 0 : 0;

}

//counter from 0 to 7, relying on game fps
Background.prototype.imgfps = function () {
    this.game.frames % 8 === 0 ? this.frameIndex++ : 0;
    this.frameIndex === 8 ? this.frameIndex = 0 : 0;

}

Background.prototype.drawSb = function() {
    let healthy = this.game.player.life.toString();
    if(this.game.player.life < 0){ healthy = '00';}
    this.game.ctx.drawImage(this.health, 0, 0);
    if(healthy == '100') {
        this.game.ctx.drawImage(this.numbers[1], 5, 5);
        this.game.ctx.drawImage(this.numbers[0], 20, 5);
        this.game.ctx.drawImage(this.numbers[0], 35, 5);

    } else {
        this.game.ctx.drawImage(this.numbers[parseInt(healthy[0])], 20, 5);
        this.game.ctx.drawImage(this.numbers[parseInt(healthy[1])], 35, 5);
    }
}
