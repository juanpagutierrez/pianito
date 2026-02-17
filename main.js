const c = document.getElementById("piano");
const context = c.getContext("2d");
const b = document.getElementById("background");
const context_back = b.getContext("2d");
const a = document.getElementById("score_bar");
const context_score = a.getContext("2d");

const startBtn = document.getElementById('start_btn');
const controlBtn = document.getElementById('btn');
const musicEl = document.getElementById('music');

const numOfTiles = 5;
let myScore = 0;
const eachState = [false,false,false,false,false];
const myTiles = [];

let geneTmp = null;
let rafId = null;
let lastTimestamp = 0;
const keyState = {};

paintWindow();
paintScoreBar();

controlBtn.addEventListener('click', function () {
    if (startBtn.innerHTML === "START" || startBtn.innerHTML === "GG") {
        // start game
        lastTimestamp = performance.now();
        rafId = window.requestAnimationFrame(gameLoop);
        geneTmp = window.setInterval(geneBlock, 600);
        musicEl && musicEl.play();
        startBtn.innerHTML = "PAUSE";
    } else {
        // pause
        musicEl && musicEl.pause();
        window.cancelAnimationFrame(rafId);
        rafId = null;
        window.clearInterval(geneTmp);
        geneTmp = null;
        startBtn.innerHTML = "START";
    }
});

// global keyboard handlers (single attachment)
window.addEventListener('keydown', function (e) { keyState[e.keyCode] = true; });
window.addEventListener('keyup', function (e) { keyState[e.keyCode] = false; });
function paintScoreBar(){
    score_gradient = context_score.createLinearGradient(0,0,0,80);
    score_gradient.addColorStop(0,"rgba(74,171,254,0)");
    score_gradient.addColorStop(0.5,"rgba(74,84,254,0)");
    score_gradient.addColorStop(1,"rgba(116,74,254,0)");
    context_score.fillStyle = score_gradient;
    context_score.fillRect(0,0,300,70);    
}
function geneBlock(){
    var myRand = Math.floor(Math.random()*numOfTiles);
    var i;
    var flag = true;
    for( i = 0; i < numOfTiles; ++i){
        if(!eachState[i]){
            flag = false;
        }
    }
    if(flag)return;//if mytiles array didn't have false element, then return

    while(eachState[myRand])
        myRand = Math.floor(Math.random()*numOfTiles);
    myTiles[myRand] = new Block(myRand);
     
}
function paintWindow(){
    my_gradient = context_back.createLinearGradient(0,0,0,600);
    my_gradient.addColorStop(0,"rgba(65,234,246,0.6)");
    my_gradient.addColorStop(1,"rgba(254,74,251,0.5)");

    context_back.fillStyle = my_gradient;
    context_back.fillRect(0,0,300,600);

    context_back.beginPath();
    context_back.moveTo(72,0);
    context_back.lineTo(72,600);
    context_back.strokeStyle = "white";
    context_back.stroke();

    context_back.beginPath();
    context_back.moveTo(148,0);
    context_back.lineTo(148,600);
    context_back.strokeStyle = "white";
    context_back.stroke();

    context_back.beginPath();
    context_back.moveTo(226,0);
    context_back.lineTo(226,600);
    context_back.strokeStyle = "white";
    context_back.stroke();

    context_back.beginPath();
    context_back.moveTo(0,470);
    context_back.lineTo(300,470);
    context_back.strokeStyle = "white";
    context_back.stroke();
}
function Block(index){
    if(!eachState[index])
        eachState[index] = true;

    this.index = index;
    this.appearPos = Math.floor(Math.random()*4);
   
    this.width = 70;
    this.height = 120;
    this.color = "black";
    switch(this.appearPos){
        case 0:
            this.x = 0;
            this.y = -120;
            break;
        case 1:
            this.x = 75;
            this.y = -120;
            break;
        case 2:
            this.x = 152;
            this.y = -120;
            break;
        case 3:
            this.x = 228;
            this.y = -120;
            break;
    }
    this.live = true;
    this.keyCode = false;
}
function move(index){
    if(myTiles[index].live){
        myTiles[index].y += 1;
        context.fillStyle = "black";
        context.fillRect(myTiles[index].x,myTiles[index].y,70,120);   
        context.clearRect(myTiles[index].x,myTiles[index].y-1,70,1);
    }
}
function afterRight(index){
    myScore++;
    myTiles[index].live = false;
    eachState[index] = false;
}
function gameLoop(timestamp){
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // update score display
    const textWidth = context_score.measureText(myScore.toString()).width;
    context_score.clearRect(0,0,a.width,70);
    context_score.font = "30px Verdana";
    context_score.textAlign = 'center';
    paintScoreBar();
    context_score.fillStyle = "rgba(88,38,255,0.8)";
    context_score.fillText(myScore.toString(), (a.width / 2) - (textWidth / 2) + 9, 50);

    // clear main canvas and redraw alive tiles
    context.clearRect(0,0,c.width,c.height);
    const speed = 0.2; // pixels per ms (about 200 px/s)

    for(let i = 0; i < numOfTiles; ++i){
        if(eachState[i] && myTiles[i] && myTiles[i].live){
            myTiles[i].y += speed * delta;
            context.fillStyle = "black";
            context.fillRect(myTiles[i].x, Math.round(myTiles[i].y), myTiles[i].width, myTiles[i].height);

            // hit check in zone
            if(myTiles[i].y < 470 && myTiles[i].y > 350){
                if((keyState[65] && myTiles[i].x === 0) ||
                   (keyState[83] && myTiles[i].x === 75) ||
                   (keyState[68] && myTiles[i].x === 152) ||
                   (keyState[70] && myTiles[i].x === 228)){
                    afterRight(i);
                }
            }

            if(myTiles[i].y > 470){
                // miss -> show red and end game
                context.fillStyle = "rgba(245,13,13,0.8)";
                context.fillRect(myTiles[i].x, Math.round(myTiles[i].y), myTiles[i].width, myTiles[i].height);
                myTiles[i].live = false;
                eachState[i] = false;
                musicEl && musicEl.pause();
                window.clearInterval(geneTmp);
                window.cancelAnimationFrame(rafId);
                rafId = null;
                geneTmp = null;
                startBtn.innerHTML = "GG";
                return; // stop loop
            }
        }
    }

    rafId = window.requestAnimationFrame(gameLoop);
}
 