let type = "WebGL"

let pixi = PIXI;
const loader = pixi.Loader.shared;
let animatedSprite;

if(!pixi.utils.isWebGLSupported()){
    type = "canvas"
}

pixi.utils.sayHello(type)
//Create a pixi Applications
let app = new pixi.Application({ 
    width: 350,         // default: 800
    height: 350,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1,
}
);

document.body.appendChild(app.view);

const background = pixi.Sprite.from('images/room2.png');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background)

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);


loader
  .add("5.json")
  .add("images/duck.png")
  .add("images/exercise.png")
  .add("images/sleeping.png")
  .add("images/working.png")
  .add("images/bed.png")
  .add("images/desk.png")
  .add("images/dumbell.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {
    // let sheet = loader.resources["5.json"].spritesheet;
    // animatedSprite = new pixi.AnimatedSprite(sheet.animations["duck"]);

    // animatedSprite.x = app.screen.width/2;
    // animatedSprite.y = app.screen.height/2;
    // animatedSprite.achor.set(0.5);
    // animatedSprite.animationSpeed = 0.5;
    // animatedSprite.play();

    // app.stage.addChild(animatedSprite);

    // console.log(animatedSprite);

    const duckT = pixi.Texture.from('images/duck.png');
    const finishT = pixi.Texture.from('images/finish.png');
    const exerciseT = pixi.Texture.from('images/exercise.png');
    const sleepingT = pixi.Texture.from('images/sleeping.png');
    const workingT = pixi.Texture.from('images/working.png');
    const bedT = pixi.Texture.from('images/bed.png');
    const deskT = pixi.Texture.from('images/desk.png');
    const dumbellT = pixi.Texture.from('images/dumbell.png');
    const duck = new pixi.Sprite(duckT);
    const finish = new pixi.Sprite(finishT);
    const exercise = new pixi.Sprite(exerciseT);
    const sleeping = new pixi.Sprite(sleepingT);
    const working = new pixi.Sprite(workingT);
    const bed = new pixi.Sprite(bedT); 
    const desk = new pixi.Sprite(deskT);
    const dumbell = new pixi.Sprite(dumbellT);

    duck.anchor.set(0.5);
    duck.x = app.screen.width/2;
    duck.y = app.screen.height/2;

    app.stage.addChild(duck);

    finish.anchor.set(0.5);
    finish.x = 80;
    finish.y = 300;
    finish.visible = false;

    app.stage.addChild(finish);

    working.width = 50;
    working.height= 50;
    

    const buttons = [];

    const buttonPositions = [
        300,290,
        50,100,
        280,app.screen.height/2
    ];

    dumbell.anchor.set(0.5);
    dumbell.x = buttonPositions[0*2];
    dumbell.y = buttonPositions[0*2+1];

    bed.anchor.set(0.5);
    bed.x = buttonPositions[2*2];
    bed.y = buttonPositions[2*2+1];

    desk.anchor.set(0.5);
    desk.x = buttonPositions[1*2];
    desk.y = buttonPositions[1*2+1];
    // desk.width = 300;
    // desk.height = 300;

    

    finish.interactive = true;
    finish.buttonMode = true;


    dumbell.interactive = true;
    dumbell.buttonMode = true;

    bed.interactive = true;
    bed.buttonMode = true;

    desk.interactive = true;
    desk.buttonMode = true;

    // duck.interactive = true;
    // duck.buttonMode = true;

    dumbell 
        .on('pointerdown', onButtonDownE);
        //.on('pointerdown', onButtonDownD);
        // .on('pointerupoutside', onButtonUp);
        // .on('pointerover', onButtonOver)
        // .on('pointerout', onButtonOut);

    
    bed 
        .on('pointerdown', onButtonDownS);
        // .on('pointerupoutside', onButtonUp);


    desk
        .on('pointerdown', onButtonDownW);
        // .on('pointerupoutside', onButtonUp);

    finish
        .on('pointerdown', onButtonDownF);

    app.stage.addChild(dumbell);
    app.stage.addChild(bed);
    app.stage.addChild(desk);
    
    function onButtonDownE() {
        finish.visible = true;
        this.isdown = true;
        dumbell.texture = exerciseT;
        //bed.visible = false;
        duck.visible = false;
        this.alpha = 1;
    }

    function onButtonDownF() {
        this.isdown = true;
        dumbell.texture = dumbellT;
        bed.texture = bedT;
        desk.texture = deskT;
        duck.visible = true;
        this.alpha = 1;
        finish.visible = false;
    }

    // function onButtonUp() {
    //     this.isdown = true;
    //     duck.texture = duckT;
    //     duck.x = app.screen.width/2;
    //     duck.y = app.screen.height/2;
    //     this.alpha = 1;
    // }

    function onButtonDownS() {
        finish.visible = true;
        this.isdown = true;
        bed.texture = sleepingT;
        //bed.visible = false;
        duck.visible = false;
        this.alpha = 1;
    }
    function onButtonDownW() {
        finish.visible = true;
        this.isdown = true;
        desk.texture = workingT; //should be desk.texture = workingT
        duck.visible = false;
        this.alpha = 1;
    }

}
