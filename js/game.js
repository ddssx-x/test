const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image() 
const pipeBottom = new Image()

bird.src = "img/flappy_bird_bird.png"
bg.src = "img/flappy_bird_bg.png"
fg.src = "img/flappy_bird_fg.png"
pipeUp.src = "img/flappy_bird_pipeUp.png"
pipeBottom.src = "img/flappy_bird_pipeBottom.png"

let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";



let gap = 90
let xPos = 10
let yPos = 150
let gravity = 2
let score = 0
let best_score = 0;

if(localStorage.getItem('best')==null){
    localStorage.setItem('best',0)
}

let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}


document.addEventListener("keydown" , moveUp)

function moveUp(){
    yPos -= 40
    fly.play();
}

function draw(){
    ctx.drawImage(bg , 0, 0)
    for(let i = 0 ;i<pipe.length ; i++){
        ctx.drawImage(pipeUp, pipe[i].x ,pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height + gap)

        pipe[i].x--

        if(pipe[i].x == 100){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeUp.height) - pipeUp.height
            });
        }
        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y +
        pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos+bird.height >= cvs.height - fg.height){
            if(localStorage.getItem('best')<score){
                localStorage.setItem('best',score)
            }
        
            location.reload()
        }
        if(pipe[i].x == 10){
            score++
            score_audio.play()
        }
    }
    ctx.drawImage(fg , 0, cvs.height - fg.height)
    ctx.drawImage(bird , xPos , yPos)
    yPos += gravity
    ctx.fillStyle = "#000"
    ctx.font = "24px Verdana"
    ctx.fillText("Счет: " + score, 10, cvs.height - 20)
    ctx.fillText("Лучший: " + localStorage.getItem('best'), 130 , cvs.height - 20)
   

    requestAnimationFrame(draw)
}

pipeBottom.onload = draw;
