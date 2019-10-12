var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var teclas = {};

var bola = {
    x: canvas.height / 2 -10,
    y: canvas.width / 2 - 10,
    altura: 20,
    largura: 20,
    mod: 0,
    dirx: -1,
    diry: 1,
    speed: 1
};

var esquerda = {
    x: 10,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    score: 0,
    speed: 5
};

var direita = {
    x: 560,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    score: 0,
    speed: 5
};

var linha = {
    x: canvas.width / 2 - 2,
    y: 0,
    largura: 4,
    altura: canvas.height,

}

document.addEventListener("keydown", function(e){
    teclas[e.keyCode] = true;
    //alert(e.keyCode);
}, false);

document.addEventListener("keyup", function(e){
    delete teclas[e.keyCode];
}, false);

function movebloco(){
    
    if( 87 in teclas && esquerda.y > 0 ){
        esquerda.y -= esquerda.speed;
    }
    else if( 83 in teclas && esquerda.y + esquerda.altura < canvas.height ){
        esquerda.y += esquerda.speed;
    }
    if( 38 in teclas && direita.y > 0 ){
        direita.y -= direita.speed;
    }
    else if( 40 in teclas && direita.y + direita.altura < canvas.height ){
        direita.y += direita.speed;
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function movebola(){
    if( bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura ){
        if(bola.y + bola.altura < (esquerda.y + esquerda.altura) / 2 - 20 ){
            bola.diry = 0.5;
        }
        else if(bola.y >= (esquerda.y + esquerda.altura) / 2  + 20 ){
            bola.diry = -0.5;
        }
        else{
            bola.diry = getRandomInt(-2, 2);
        }
        bola.dirx = 0.5;
        bola.mod += 0.2;
    }
    else if( bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x ){
        if(bola.y + bola.altura < (direita.y + direita.altura) / 2 - 20 ){
            bola.diry = 0.5;
        }
        else if(bola.y >= (direita.y + direita.altura) / 2  + 20 ){
            bola.diry = -0.5;
        }
        else{
            bola.diry = getRandomInt(-2, 2);
        }
        bola.dirx = -0.5;
        bola.mod += 0.2;
    }

    if( bola.y <= 0 ){
        bola.diry = 1;
    }
    else if( bola.y + bola.altura >= canvas.height ){
        bola.diry = -1;
    }

    bola.x += ( bola.speed + bola.mod ) * bola.dirx;
    bola.y += ( bola.speed + bola.mod ) * bola.diry;

    if( bola.x < esquerda.x + esquerda.largura - 15 ){
        newgame("player 2");
    }
    else if( bola.x + bola.largura > direita.x + 15 ){
        newgame("player 1");
    }
};

function newgame(winner){
    if( winner == "player 1" ){
        esquerda.score++;
    }
    else{
        direita.score++;
    }

    esquerda.y = canvas.height / 2 - esquerda.altura / 2;
    direita.y = esquerda.y;
    bola.y = canvas.height / 2 - bola.altura / 2;
    bola.x = canvas.width / 2 - bola.largura / 2;

    bola.mod = 0;
};

function desenha(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movebloco();
    movebola();
    ctx.fillStyle = "white";
    ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
    ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
    ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
    ctx.fillRect(linha.x, linha.y, linha.largura, linha.altura);

    ctx.font = "20px Arial";
    ctx.fillText("Player 1: " + esquerda.score, 50, 20);
    ctx.fillText("Player 2: " + direita.score, canvas.width - 150, 20);
}

setInterval(desenha, 5);