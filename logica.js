/* =====================================================
   CAPA DE LÓGICA
   Reglas del juego
===================================================== */

function geneBlock(){
    var myRand = Math.floor(Math.random()*numOfTiles);
    var i;
    var flag = true;
    for( i = 0; i < numOfTiles; ++i){
        if(!eachState[i]){
            flag = false;
        }
    }
    if(flag)return;

    while(eachState[myRand])
        myRand = Math.floor(Math.random()*numOfTiles);
    myTiles[myRand] = new Block(myRand);
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

function afterRight(index){
    myScore++;
    myTiles[index].live = false;
    eachState[index] = false;
}

function gameLoop(timestamp){
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    const textWidth = context_score.measureText(myScore.toString()).width;
    context_score.clearRect(0,0,a.width,70);
    context_score.font = "30px Verdana";
    context_score.textAlign = 'center';
    paintScoreBar();
    context_score.fillStyle = "rgba(88,38,255,0.8)";
    context_score.fillText(myScore.toString(), (a.width / 2) - (textWidth / 2) + 9, 50);

    context.clearRect(0,0,c.width,c.height);
    const speed = 0.2;

    for(let i = 0; i < numOfTiles; ++i){
        if(eachState[i] && myTiles[i] && myTiles[i].live){
            myTiles[i].y += speed * delta;
            context.fillStyle = "black";
            context.fillRect(myTiles[i].x, Math.round(myTiles[i].y), myTiles[i].width, myTiles[i].height);

            if(myTiles[i].y < 470 && myTiles[i].y > 350){
                if((keyState[65] && myTiles[i].x === 0) ||
                   (keyState[83] && myTiles[i].x === 75) ||
                   (keyState[68] && myTiles[i].x === 152) ||
                   (keyState[70] && myTiles[i].x === 228)){
                    afterRight(i);
                }
            }

            if(myTiles[i].y > 470){
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
                return; 
            }
        }
    }

    rafId = window.requestAnimationFrame(gameLoop);
}
