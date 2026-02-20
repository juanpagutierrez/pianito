/* =====================================================
   CAPA DE DATOS
   Aquí se almacena el estado del juego
===================================================== */

const numOfTiles = 5;
let myScore = 0;
const eachState = [false,false,false,false,false];
const myTiles = [];

let geneTmp = null;
let rafId = null;
let lastTimestamp = 0;
const keyState = {};
