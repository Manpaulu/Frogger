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
let cars = [];


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
    this.load.image("deadFrog", "./assets/images/deadFrog.png")
    
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
    deadFrog = this.add.image(rnd_x, 312, "deadFrog");
    deadFrog.setVisible(false);
    
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
    let i;
    for(let j = 0; j < 3; j++) {
        let randomSpeed = Phaser.Math.Between(60, 100)
        for (let i = 0; i < 7; i++) {
            
            let randomNumber = Phaser.Math.Between(1, 3);
            let espaceRandom = (Phaser.Math.Between (-15, 15));
            
            cars[i+7*j] = this.physics.add.image (26 + i * 65 + espaceRandom, 72 + j * 32,"car"+randomNumber); //pour la position, 26 c'est la position de base à laquelle on ajoute (i*x).x=42 est un espace de base. On ajoute en plus un espacement random. C'est la même logique pour j, on doit mettre une base ici 72, et ensuite on le met à un interval régulier * j. On doit mettre une base, parce que j vaut 0 et la multiplication donnerait 0.
            cars[i+7*j].setVelocity(randomSpeed,0); //cars[i+7*j] car on a fait juste une liste et pas un tableau, on doit donc cibler les voitures 11, 12, 13 ... jusqu'à 33.

        }};
        
    for(let l = 0; l < 3; l++) {
        randomSpeed = Phaser.Math.Between(60, 100);
        for (let k = 0; k < 7; k++) {
        
            randomNumber = Phaser.Math.Between(1, 3);
            espaceRandom = (Phaser.Math.Between (-15, 15));
            
            cars[21+k+7*l] = this.physics.add.image(26 + k * 65 + espaceRandom, 180 + l * 32,"car"+randomNumber) 
            cars[21+k+7*l].setAngle(180);
            cars[21+k+7*l].setVelocity(-randomSpeed,0);
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

    for(let i = 0; i < cars.length; i++) {

        if (cars[i].x > 480) cars[i].x = 0;
        if (cars[i].x < 0) cars[i].x = 480;
        if(Phaser.Geom.Intersects.RectangleToRectangle(
            frog.getBounds(),cars[i].getBounds()
            )) {
                deadFrog.x = frog.x;
                deadFrog.y = frog.y;
                deadFrog.setVisible(true)
                frog.setVisible(false)
                let timer = this.time.addEvent({
                    delay : 4000,
                    callback: function(){this.scene.restart();},
                    callbackScope:this, 
                    repeat:0 })
                };
    }                    
}