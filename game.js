let type = "WebGL"

let pixi = PIXI;
var healthBar = new PIXI.Graphics();
var moodBar = new PIXI.Graphics();
var healthFill = new PIXI.Graphics();
var moodFill = new PIXI.Graphics();
const loader = pixi.Loader.shared;
let animatedSprite;

//global

var beginTime = new Date();
var health = 65;
var maxHealth = 100;

var mood = 65;
var maxMood = 100;

var lastActivity = "none";

var doing = false;

//times
var exerciseStart, exerciseEnd, sleepStart, sleepEnd, workStart, workEnd;

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
const startBackground = pixi.Sprite.from('images/House-1.png');
startBackground.width = app.screen.width;
startBackground.height = app.screen.height;
app.stage.addChild(startBackground);


const background = pixi.Sprite.from('images/room2.png');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background)
background.visible = false;




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
  .add("images/mood.png")
  .add("images/health.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

    let exerciseSheet = pixi.Loader.shared.resources["animations/exercise.json"].spritesheet;
    let duckSheet = pixi.Loader.shared.resources["animations/duck.json"].spritesheet;
    let workingSheet = pixi.Loader.shared.resources["animations/working.json"].spritesheet;
    let sleepingSheet = pixi.Loader.shared.resources["animations/sleeping.json"].spritesheet;
    let deathSheet = pixi.Loader.shared.resources["animations/death.json"].spritesheet;
    let sadSheet = pixi.Loader.shared.resources["animations/sad.json"].spritesheet;
    //animations
    animatedExercise = new pixi.AnimatedSprite(exerciseSheet.animations["exercise"]);
    animatedDuck = new pixi.AnimatedSprite(duckSheet.animations["duck"]);
    animatedWorking = new pixi.AnimatedSprite(workingSheet.animations["working"]);
    animatedSleeping = new pixi.AnimatedSprite(sleepingSheet.animations["sleeping"]);
    animatedDeath = new pixi.AnimatedSprite(deathSheet.animations["death"]);
    animatedSad = new pixi.AnimatedSprite(sadSheet.animations["sad"]);

    animatedExercise.animationSpeed = 0.13; 
    animatedExercise.play();
    app.stage.addChild(animatedExercise);
    animatedExercise.visible = false;
    animatedExercise.height = 100;
    animatedExercise.width = 100;

    animatedSad.animationSpeed = 0.13; 
    animatedSad.play();
    app.stage.addChild(animatedSad);
    animatedSad.visible = false;
    animatedSad.height = 100;
    animatedSad.width = 100;

    animatedDeath.animationSpeed = 0.13; 
    animatedDeath.play();
    app.stage.addChild(animatedDeath);
    animatedDeath.visible = false;
    animatedDeath.height = 100;
    animatedDeath.width = 100;

    animatedDuck.animationSpeed = 0.13; 
    animatedDuck.play();
    app.stage.addChild(animatedDuck);
    animatedDuck.height = 100;
    animatedDuck.width = 100;
    animatedDuck.visible = false;

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
    const healthIconT = pixi.Texture.from('images/health.png');
    const moodIconT = pixi.Texture.from('images/mood.png');
    const duck = new pixi.Sprite(duckT);
    const finish = new pixi.Sprite(finishT);
    const bed = new pixi.Sprite(bedT); 
    const desk = new pixi.Sprite(deskT);
    const dumbell = new pixi.Sprite(dumbellT);
    const startButton = new pixi.Sprite(startButtonT);
    const sleepButton = new pixi.Sprite(sleepButtonT);
    const workButton = new pixi.Sprite(workButtonT);
    const exerciseButton = new pixi.Sprite(exerciseButtonT);
    const healthIcon = new pixi.Sprite(healthIconT);
    const moodIcon = new pixi.Sprite(moodIconT);
    
    
    healthBar.beginFill(0xA5A5A5);
    healthBar.lineStyle(6, 0xA5A5A5);
    healthBar.drawRect(240, 7, 100, 20);
    app.stage.addChild(healthBar);
    healthBar.visible = false;

    healthFill.beginFill(0x54D873);
    healthFill.lineStyle(0, 0xA5A5A5);
    healthFill.drawRect(240, 7, 65, 20);
    app.stage.addChild(healthFill);
    healthFill.visible = false;

    moodBar.beginFill(0xA5A5A5);
    moodBar.lineStyle(6, 0xA5A5A5);
    moodBar.drawRect(240, 37, 100, 20);
    app.stage.addChild(moodBar);
    moodBar.visible = false;

    moodFill.beginFill(0x3566D8);
    moodFill.lineStyle(0, 0x3566D8);
    moodFill.drawRect(240, 37, 65, 20);
    app.stage.addChild(moodFill);
    moodFill.visible = false;

    healthIcon.x = 198;
    healthIcon.y = 2;
    healthIcon.width = healthIcon.width * 2;
    healthIcon.height = healthIcon.height * 2;
    healthIcon.visible = true;
    

    moodIcon.x = 202;
    moodIcon.y = 30;
    moodIcon.width = moodIcon.width * 2;
    moodIcon.height = moodIcon.height * 2;
    moodIcon.visible = true;

    app.stage.addChild(healthIcon);
    app.stage.addChild(moodIcon);
    moodIcon.visible = false;
    healthIcon.visible = false;

    //Josue: Set visible to false (still shows up)
    duck.anchor.set(0.5);
    duck.x = app.screen.width/2;
    duck.y = app.screen.height/2;
    duck.visible = false;
    animatedDuck.x = duck.x - 70;
    animatedDuck.y = duck.y - 30;

    // //app.stage.addChild(duck);

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

    dumbell.anchor.set(0.5);
    dumbell.x = furniturePositions[0*2];
    dumbell.y = furniturePositions[0*2+1];
    dumbell.visible = false;

    bed.anchor.set(0.5);
    bed.x = furniturePositions[2*2];
    bed.y = furniturePositions[2*2+1];
    bed.visible = false;
    animatedSleeping.x = bed.x - 80;
    animatedSleeping.y = bed.y-90;

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

    exerciseButton.anchor.set(0.5);
    exerciseButton.x = 60;
    exerciseButton.y = 325;
    exerciseButton.visible = false;
    app.stage.addChild(exerciseButton);

    sleepButton.anchor.set(0.5);
    sleepButton.x = 170;
    sleepButton.y = 325;
    sleepButton.visible = false;
    app.stage.addChild(sleepButton);

    workButton.anchor.set(0.5);
    workButton.x = 275;
    workButton.y = 325;
    workButton.visible = false;
    app.stage.addChild(workButton);

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

    startButton.on('pointerdown', onButtonDownBegin);
    exerciseButton.on('pointerdown', onButtonDownE);
    sleepButton.on('pointerdown', onButtonDownS);
    workButton.on('pointerdown', onButtonDownW);
    finish.on('pointerdown', onButtonDownF);

    app.stage.addChild(dumbell);
    app.stage.addChild(bed);
    app.stage.addChild(desk);

    function onButtonDownBegin() {
        // const background2 = pixi.Sprite.from('images/room2.png');
        startBackground.visble = false;
        startButton.visible = false;
        background.visible = true;
        exerciseButton.visible = true;
        sleepButton.visible = true;
        workButton.visible = true;
        dumbell.visible = true;
        desk.visible = true;
        bed.visible = true;
        this.isdown = true;
        animatedDuck.visible = true;
        moodFill.visible = true;
        moodBar.visible = true;
        healthFill.visible = true;
        healthBar.visible = true;
        moodIcon.visible = true;
        healthIcon.visible = true;
        this.alpha = 1;
        beginTime = new Date();
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
        exerciseStart = new Date();
        doing = true;
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
        doing = false;
        //anytime an activity is finished, stats are updated based on the activity and the time spent
        timeSpent(lastActivity);
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
        lastActivity = 's';
        sleepStart = new Date();
        doing = true;
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
        lastActivity = 'w';
        workStart = new Date();
        doing = true;
    }

    //calculates the time elapsed since an activity was last done, and updates stats accordingly
    function timeSince(activity){
        var now = new Date()
        if (activity == 'e'){
            time = Math.round((now - exerciseEnd) / 1000);
            if ((time/60 > 1)){
                health -= (time/60) * 10;
                mood -= (time/60) * 5;
            }
        
            update(health, mood);
        }
        else if (activity == 's'){
            time = Math.round((now - sleepEnd) / 1000);
            if ((time/20 > 1)){
                health -= (time/20) * 5;
                mood -= (time/20) * 5;
            }            
            update(health, mood);
        }
        else if (activity == 'w'){
            time = Math.round((now - workEnd) / 1000);
            if ((time/60 > 1)){
                mood += (time/60) * 5;
            }
            update(health, mood);
        }
    }

    //calculates the time spent doing an activity, and updates stats accordingly
    function timeSpent(activity){
        console.log("timeSpent")
        var now = new Date()
        if (activity == 'e'){
            exerciseEnd = now;
            time = Math.round((now - exerciseStart) / 1000);
            if ((time / 10) > 1){
                health += (time/10) * 5;
                if (health > maxHealth){
                    health = 100;
                }
            }
            if ((time / 20) > 1){
                mood += (time/20) * 5;
                if (mood > maxMood){
                    mood = 100;
                }
            }
            update(health, mood);
        }
        else if (activity == 's'){
            sleepEnd = now;
            time = Math.round((now - sleepStart) / 1000);
            if ((time / 5) > 1){
                health += (time/5);
                if (health > maxHealth){
                    health = 100;
                }
            }
            if ((time / 5) > 1){
                mood += (time/5);
                if (mood > maxMood){
                    mood = 100;
                }
            }
            update(health, mood);
        }
        else if (activity == 'w'){
            workEnd = now;
            time = Math.round((now - workStart) / 1000);
            if ((time / 30) > 1){
                health += (time/30) * 5;
                if (health > maxHealth){
                    health = 100;
                }
            }
            if ((time / 10) > 1){
                mood -= (time/10) * 5;
                if (mood < 0){
                    mood = 0;
                }
            }
            update(health, mood);
        }
    }

    //redraws the health and mood bars based on updates from activities/lack of activities
    function update(health, mood){
        if (health <= 0){
            health = 0;
        }
        if (mood <= 0){
            mood = 0;
        }
        console.log("update");
        healthFill.clear();
        healthFill.beginFill(0x54D873);
        healthFill.lineStyle(0, 0xA5A5A5);
        healthFill.drawRect(240, 7, health, 20);
        app.stage.addChild(healthFill);

        moodFill.clear();
        moodFill.beginFill(0x3566D8);
        moodFill.lineStyle(0, 0x3566D8);
        moodFill.drawRect(240, 37, mood, 20);
        app.stage.addChild(moodFill);
    }

    //checks time elapsed since each activity was done and updates stats accordingly
    function statCheck(){
        console.log("statcheck");
        if (!doing){
            if (lastActivity == "none"){
                exerciseEnd = beginTime;
                sleepEnd = beginTime;
            }
            timeSince('e');
            timeSince('s');
            console.log(health);
            console.log(mood);
    }
    }

    //checks every thirty seconds
    setInterval(function(){
        statCheck()
    }, 30000);

}


