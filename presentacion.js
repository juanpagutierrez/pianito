/* =====================================================
   CAPA DE PRESENTACIÓN
   Referencias al DOM y canvas (elementos visuales)
===================================================== */

const c = document.getElementById("piano");
const context = c.getContext("2d");
const b = document.getElementById("background");
const context_back = b.getContext("2d");
const a = document.getElementById("score_bar");
const context_score = a.getContext("2d");

const startBtn = document.getElementById('start_btn');
const controlBtn = document.getElementById('btn');
const musicEl = document.getElementById('music');


/* =====================================================
   PRESENTACIÓN (Inicialización)
===================================================== */

paintWindow();
paintScoreBar();


/* =====================================================
   EVENTOS (Conectan Presentación + Lógica + Datos)
===================================================== */

controlBtn.addEventListener('click', function () {
    if (startBtn.innerHTML === "START" || startBtn.innerHTML === "GG") {
        
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

window.addEventListener('keydown', function (e) { keyState[e.keyCode] = true; });
window.addEventListener('keyup', function (e) { keyState[e.keyCode] = false; });


/* =====================================================
   CAPA DE PRESENTACIÓN
   Funciones que dibujan en pantalla
===================================================== */

function paintScoreBar(){
    score_gradient = context_score.createLinearGradient(0,0,0,80);
    score_gradient.addColorStop(0,"rgba(74,171,254,0)");
    score_gradient.addColorStop(0.5,"rgba(74,84,254,0)");
    score_gradient.addColorStop(1,"rgba(116,74,254,0)");
    context_score.fillStyle = score_gradient;
    context_score.fillRect(0,0,300,70);    
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

function move(index){
    if(myTiles[index].live){
        myTiles[index].y += 1;
        context.fillStyle = "black";
        context.fillRect(myTiles[index].x,myTiles[index].y,70,120);   
        context.clearRect(myTiles[index].x,myTiles[index].y-1,70,1);
    }
}
