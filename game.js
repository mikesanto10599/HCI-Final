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
    antialias: false,    // default: false
    transparent: true, // default: false
    resolution: 1,
}
);

document.body.appendChild(app.view);
//Josue: Changed the background to be the house (currently the duck is not becoming invisible)
const background = pixi.Sprite.from('images/room2.png');
const backgroundH = pixi.Sprite.from('images/House-1.png');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background)


loader
  .add("animations/duck.json")
  .add("images/duck.png")
  .add("images/bed.png")
  .add("images/desk.png")
  .add("images/dumbell.png")
  .add("animations/exercise.json")
  .add("animations/working.json")
  .add("animations/sleeping.json")
  .add("images/startButton.png")
  .add("images/sleepButton.png")
  .add("images/workButton.png")
  .add("images/exerciseButton.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

    let exerciseSheet = pixi.Loader.shared.resources["animations/exercise.json"].spritesheet;
    let duckSheet = pixi.Loader.shared.resources["animations/duck.json"].spritesheet;
    let workingSheet = pixi.Loader.shared.resources["animations/working.json"].spritesheet;
    let sleepingSheet = pixi.Loader.shared.resources["animations/sleeping.json"].spritesheet;
    //animations
    animatedExercise = new pixi.AnimatedSprite(exerciseSheet.animations["exercise"]);
    animatedDuck = new pixi.AnimatedSprite(duckSheet.animations["duck"]);
    animatedWorking = new pixi.AnimatedSprite(workingSheet.animations["working"]);
    animatedSleeping = new pixi.AnimatedSprite(sleepingSheet.animations["sleeping"]);

    animatedExercise.animationSpeed = 0.13; 
    animatedExercise.play();
    app.stage.addChild(animatedExercise);
    animatedExercise.visible = false;
    animatedExercise.height = 100;
    animatedExercise.width = 100;

    animatedDuck.animationSpeed = 0.13; 
    animatedDuck.play();
    app.stage.addChild(animatedDuck);
    animatedDuck.height = 100;
    animatedDuck.width = 100;

    animatedWorking.animationSpeed = 0.13; 
    animatedWorking.play();
    app.stage.addChild(animatedWorking);
    animatedWorking.visible = false;

    animatedSleeping.animationSpeed = 0.13; 
    animatedSleeping.play();
    app.stage.addChild(animatedSleeping);
    animatedSleeping.width = 190;
    animatedSleeping.height = 200;
    animatedSleeping.visible = false;

    const duckT = pixi.Texture.from('images/duck.png');
    const finishT = pixi.Texture.from('images/finish.png');
    const bedT = pixi.Texture.from('images/bed.png');
    const deskT = pixi.Texture.from('images/desk.png');
    const dumbellT = pixi.Texture.from('images/dumbell.png');
    //Josue: Added texture and sprite for the Start Button/startButton.png
    const startButtonT = pixi.Texture.from('images/startButton.png');
    const sleepButtonT = pixi.Texture.from('images/sleepButton.png');
    const workButtonT = pixi.Texture.from('images/workButton.png');
    const exerciseButtonT = pixi.Texture.from('images/exerciseButton.png');
    const duck = new pixi.Sprite(duckT);
    const finish = new pixi.Sprite(finishT);
    const bed = new pixi.Sprite(bedT); 
    const desk = new pixi.Sprite(deskT);
    const dumbell = new pixi.Sprite(dumbellT);
    const startButton = new pixi.Sprite(startButtonT);
    const sleepButton = new pixi.Sprite(sleepButtonT);
    const workButton = new pixi.Sprite(workButtonT);
    const exerciseButton = new pixi.Sprite(exerciseButtonT);

    //Josue: Set visible to false (still shows up)
    duck.anchor.set(0.5);
    duck.x = app.screen.width/2;
    duck.y = app.screen.height/2;
    duck.visible = false;
    animatedDuck.x = duck.x - 70;
    animatedDuck.y = duck.y - 30;

    app.stage.addChild(duck);

    finish.anchor.set(0.5);
    finish.x = 80;
    finish.y = 310;
    finish.visible = false;

    app.stage.addChild(finish);

    const furniturePositions = [
        300,290,
        50,100,
        300,app.screen.height/2
    ];

    //Josue: Set visible to false
    dumbell.anchor.set(0.5);
    dumbell.x = furniturePositions[0*2];
    dumbell.y = furniturePositions[0*2+1];
    dumbell.visible = false;

    //Josue: Set visible to false
    bed.anchor.set(0.5);
    bed.x = furniturePositions[2*2];
    bed.y = furniturePositions[2*2+1];
    bed.visible = false;
    animatedSleeping.x = bed.x - 80;
    animatedSleeping.y = bed.y-90;

    //Josue: Set visible to false
    desk.anchor.set(0.5);
    desk.x = furniturePositions[1*2];
    desk.y = furniturePositions[1*2+1];
    desk.visible = false;
    animatedWorking.x = desk.x-75;
    animatedWorking.y = desk.y-80;

    startButton.anchor.set(0.5);
    startButton.x = 170;
    startButton.y = 180;
    startButton.visible = true;
    app.stage.addChild(startButton);

    //Josue: Set visible to false
    exerciseButton.anchor.set(0.5);
    exerciseButton.x = 60;
    exerciseButton.y = 325;
    exerciseButton.visible = false;
    app.stage.addChild(exerciseButton);

    //Josue: Set visible to false
    sleepButton.anchor.set(0.5);
    sleepButton.x = 170;
    sleepButton.y = 325;
    sleepButton.visible = false;
    app.stage.addChild(sleepButton);

    //Josue: Set visible to false
    workButton.anchor.set(0.5);
    workButton.x = 275;
    workButton.y = 325;
    workButton.visible = false;
    app.stage.addChild(workButton);

    //Josue: Added startButton interactive and buttonMode
    startButton.interactive = true;
    startButton.buttonMode = true;
    finish.interactive = true;
    finish.buttonMode = true;
    sleepButton.interactive = true;
    sleepButton.buttonMode = true;
    workButton.interactive = true;
    workButton.buttonMode = true;
    exerciseButton.interactive = true;
    exerciseButton.buttonMode = true;

    //Josue: added startButton.on
    startButton.on('pointerdown', onButtonDownBegin);
    exerciseButton.on('pointerdown', onButtonDownE);
    sleepButton.on('pointerdown', onButtonDownS);
    workButton.on('pointerdown', onButtonDownW);
    finish.on('pointerdown', onButtonDownF);

    app.stage.addChild(dumbell);
    app.stage.addChild(bed);
    app.stage.addChild(desk);

    //Josue: Created function for startbutton (meant to change background and make items appear on screen)
    //Bug Fix Necessary: Makes background cover everything else
    function onButtonDownBegin() {
        const background2 = pixi.Sprite.from('images/room2.png');
        background2.width = app.screen.width;
        background2.height = app.screen.height;
        app.stage.addChild(background2)
        startButton.visible = false;
        exerciseButton.visible = true;
        sleepButton.visible = true;
        workButton.visible = true;
        dumbell.visible = true;
        desk.visible = true;
        bed.visible = true;
        this.isdown = true;
        animatedDuck.visible = true;
        this.alpha = 1;
    }
    
    function onButtonDownE() {
        finish.visible = true;
        exerciseButton.visible = false;
        sleepButton.visible = false;
        workButton.visible = false;
        this.isdown = true;
        dumbell.visible = false;
        animatedExercise.x = dumbell.x - 50;
        animatedExercise.y = dumbell.y - 50;
        animatedExercise.visible = true; 
        animatedDuck.visible = false;
        this.alpha = 1;
    }

    function onButtonDownF() {
        this.isdown = true;
        dumbell.visible = true;
        desk.visible = true;
        bed.visible = true;
        animatedExercise.visible = false;
        animatedSleeping.visible = false;
        animatedWorking.visible = false;
        animatedDuck.visible = true;
        this.alpha = 1;
        finish.visible = false;
        exerciseButton.visible = true;
        sleepButton.visible = true;
        workButton.visible = true;
    }

    function onButtonDownS() {
        finish.visible = true;
        exerciseButton.visible = false;
        sleepButton.visible = false;
        workButton.visible = false;
        this.isdown = true;
        bed.visible = false;
        //bed.visible = false;
        animatedDuck.visible = false;
        animatedSleeping.visible = true;
        this.alpha = 1;
    }
    function onButtonDownW() {
        finish.visible = true;
        exerciseButton.visible = false;
        sleepButton.visible = false;
        workButton.visible = false;
        this.isdown = true;
        desk.visible = false;
        animatedDuck.visible = false;
        animatedWorking.visible = true;
        this.alpha = 1;
    }

}
