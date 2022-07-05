let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    audio: {         
        disableWebAudio: true     
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
let frog; 
let upKey;
let downKey;
let rightKey;
let leftKey;
let MumFrog;
let heart;
let carRight = [];
let carLeft = [];

//
function init() {
     
}

function preload() {

    this.load.image("background", "./assets/images/FroggerBackground.png")
    this.load.image("frog", "./assets/images/Frog.png")
    this.load.image("mumfrog", "./assets/images/MumFrog.png")
    this.load.image("heart", "./assets/images/heart.png")
    this.load.image("car1", "./assets/images/car.png")
    this.load.image("car2", "./assets/images/snowCar.png" )
    this.load.image("car3", "./assets/images/F1-1.png")
    
}

function create() {

    let backImage = this.add.image(0,0,"background");
    backImage.setOrigin(0, 0);

    
    let rnd_x = (16 * Phaser.Math.Between(0,29)) ;
    let rndx = (16 * Phaser.Math.Between(1, 29)) ;
    
    // let rndx = 16 * (Math.round(Math.random() * 29));   // autre manière de faire. le random est un float entre 0 et 1 (non compris). 
    // let rndy = 16 * (Math.round(Math.random() * 19));

    MumFrog = this.add.image(rndx, 24, "mumfrog");
    
    frog = this.add.image(rnd_x, 312, "frog");

    
    upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    heart = this.add.image(240, 160,  "heart");
    heart.setScale(0); 
    heart.tweenScale = this.tweens.add({
        targets: heart,
        scale: 5,
        ease: 'Linear',
        duration: 4000,
        yoyo: false,
        repeat: 0,
        paused : true
    });

    // let car_RndX = (16 * Phaser.Math.Between(0,29));
    // let car_RndY = (16 * Phaser.Math.Between(4, 16));
    // car = this.add.image(car_RndX, car_RndY, "car"+randomNumber);
    
    for(let j = 0; j < 3; j++) {
        for (let i = 0; i < 10; i++) {
    
            let randomNumber = Phaser.Math.Between(1, 3);
            let espaceRandom = (Phaser.Math.Between (-15, 15));
            
            carRight[i] = this.physics.add.image (26+i*42+ espaceRandom, 72+ j * 32,"car"+randomNumber); //26 c'est la position de base à laquelle on ajoute (i*42).42 est un espace de base. On ajoute en plus un espacement random. 
            carRight[i].setVelocity(100,0);
            if (carRight[i].x > 480) carRight[i].x == 0;
        
    }};
    
    for(let l = 0; l < 3; l++) {
        for (let k = 0; k < 10; k++) {
        
            randomNumber = Phaser.Math.Between(1, 3);
            espaceRandom = (Phaser.Math.Between (-15, 15));
            
            carLeft[k] = this.physics.add.image(26+k*42 + espaceRandom, 180 + l * 32,"car"+randomNumber)
            carLeft[k].setAngle(180);
            carLeft[k].setVelocity(-100,0);
    }};
    
}


function update() {
    if (Phaser.Input.Keyboard.JustDown(upKey) && (frog.y > 16)) {
        frog.setAngle(0);
        frog.y -= 16 } 
    if (Phaser.Input.Keyboard.JustDown(downKey) && (frog.y < 300)) {
        frog.setAngle(180);
        frog.y += 16;}
    if (Phaser.Input.Keyboard.JustDown(rightKey) && (frog.x < 460)) {
        frog.setAngle(90);
        frog.x += 16;}
    if (Phaser.Input.Keyboard.JustDown(leftKey) && (frog.x > 16)) {
        frog.setAngle(-90);
        frog.x -= 16; }
                    
                    
    // if (frog.x == MumFrog.x && frog.y == MumFrog.y) alert("tu as retrouvé maman grenouille")

    if (Phaser.Geom.Intersects.RectangleToRectangle( 
        frog.getBounds(),MumFrog.getBounds() )) {
            heart.tweenScale.play()
            if (heart.scale > 4) this.scene.restart();   
        }
        
                            
    // car1.x += 2;
                            
}