"use strict";
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x292929
});
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	

// pre-load the images (this code works with PIXI v6)
app.loader.
    add([
        "",
        " "
    ]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();

// aliases
let stage;

// scenes
let startScene;
let gameScene;
let gameOverScene;

// game variables
let timer, timerDisplay;
let formula1, formula2, number1, number2;

let levelNum = 1;
let paused = true;

function setup() {
	stage = app.stage;
	startScene = new PIXI.Container();
    stage.addChild(startScene);

    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

	gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

	createLabelsAndButtons();

    app.ticker.add(gameLoop);
}

function createLabelsAndButtons() {
    // Styles
    let headStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF, 
        fontSize: 96,
        fontFamily: "Hedvig Letters Serif"
    });
    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 48,
        fontFamily: "Hedvig Letters Serif"
    });
    let formulaStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 60,
        fontFamily: "Hedvig Letters Serif"
    })

    // StartScene
    let title = new PIXI.Text("Fast Math");
    title.style = headStyle;
    title.x = 180;
    title.y = 160;
    startScene.addChild(title);

    let startButton = new PIXI.Text("Start");
    startButton.style = buttonStyle;
    startButton.x = 340;
    startButton.y = sceneHeight - 200;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame);
    startButton.on("pointerover", e => e.target.alpha = 0.7);
    startButton.on("pointerout", e => e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);



    // GameScene
    timerDisplay = new PIXI.Text();
    timerDisplay.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 40,
        fontFamily: "Hedvig Letters Serif"
    });
    timerDisplay.x = 10;
    timerDisplay.y = 10;
    gameScene.addChild(timerDisplay);
    setTimer(10);

    number1 = new PIXI.Text();
    number1.style = formulaStyle;
    number1.x = 20;
    number1.y = sceneHeight - 300;
    number1.interactive = true;
    number1.buttonMode = true;
    // playAgain.on("pointerup", startGame);
    number1.on("pointerover", e => e.target.alpha = 0.7);
    number1.on("pointerout", e => e.currentTarget.alpha = 1.0);
    gameScene.addChild(number1);
    setFormula1(1);

    number2 = new PIXI.Text();
    number2.style = formulaStyle;
    number2.x = 420;
    number2.y = sceneHeight - 300;
    number2.interactive = true;
    number2.buttonMode = true;
    // playAgain.on("pointerup", startGame);
    number2.on("pointerover", e => e.target.alpha = 0.7);
    number2.on("pointerout", e => e.currentTarget.alpha = 1.0);
    gameScene.addChild(number2);
    setFormula2(2);



    // GameOverScene
    let gameOverText = new PIXI.Text("Game Over");
    gameOverText.style = headStyle;
    gameOverText.x = 140;
    gameOverText.y = 160;
    gameOverScene.addChild(gameOverText);

    let playAgain = new PIXI.Text("Play Again");
    playAgain.style = buttonStyle;
    playAgain.x = 280;
    playAgain.y = sceneHeight - 200;
    playAgain.interactive = true;
    playAgain.buttonMode = true;
    playAgain.on("pointerup", startGame);
    playAgain.on("pointerover", e => e.target.alpha = 0.7);
    playAgain.on("pointerout", e => e.currentTarget.alpha = 1.0);
    gameOverScene.addChild(playAgain);

}

function gameLoop(){
	if (paused) return;

    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;

    setTimer(timer - dt);

    if (timer <= 0) {
        end();
        return;
    }

}

function end() {
    paused = true;

    gameOverScene.visible = true;
    gameScene.visible = false;
}

function startGame() {
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;
    loadLevel();
}

function setTimer(value) {
    timer = value;
    timerDisplay.text = `${Math.round(timer * 100) / 100}`;
}

function setFormula1(value) {
    formula1 = value;
    number1.text = `${formula1}`;
}

function setFormula2(value) {
    formula2 = value;
    number2.text = `${formula2}`;
}

function loadLevel() {
    setFormula1(Math.floor(Math.random() * 10) + 1);
    do {
        setFormula2(Math.floor(Math.random() * 10) + 1);
    } while (formula1 == formula2);

    setTimer(5);

    paused = false;
}