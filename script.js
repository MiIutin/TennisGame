var ballX=50;
var ballY=50;
var canvasContext;
var canvas;
var ballSpeedX=10;
var ballSpeedY=10;

var player1Score = 0;
var player2Score = 0;
var WINNING_SCORE = 10;

var showingWinScreen = true;

var paddle1Y=250;
var paddle2Y=250;
var PADDLE_HEIGHT=100;
var PADDLE_THICKNESS=10;

function calculateMousePos(evt){
var rect = canvas.getBoundingClientRect();
var root = document.documentElement;
var mouseX = evt.clientX - rect.Left - root.scrollLeft;
var mouseY = evt.clientY - rect.top - root.scrollTop;
return{
    x : mouseX,
    y : mouseY
};



}

window.onload=function(){
    
     canvas=document.getElementById("canvasGame");
     canvasContext=canvas.getContext("2d");
    var framesPerSecond=30;
     setInterval(function(){
         moveEveything();
         drawEverything();
     },1000/framesPerSecond);

    this.canvas.addEventListener("mousedown", handleMouseClick);

    canvas.addEventListener("mousemove",function(evt){
       
        var mousePos=calculateMousePos(evt);
        paddle1Y=mousePos.y-(PADDLE_HEIGHT/2);

    });

}

function computerMovement(){
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;

    if(paddle2YCenter < ballY - 35){              //above the ball
        paddle2Y +=9;

    } else  if(paddle2YCenter > ballY + 35){      // below the ball
        paddle2Y -=9;
    }
}
    function moveEveything(){

        if(showingWinScreen){
            return;
        }

        
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        computerMovement();

        if(ballX>canvas.width){
            if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
                ballSpeedX=-ballSpeedX;
                var deltaY=ballY -(paddle2Y + PADDLE_HEIGHT/2);
                ballSpeedY = deltaY *0.35;
               } else {
    
                player1Score++; // must before reset
                ballReset();
                
               }
            
        }
        if(ballX < 0 ){
           if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            
            ballSpeedX=-ballSpeedX;
                var deltaY=ballY -(paddle1Y + PADDLE_HEIGHT/2);
                ballSpeedY = deltaY *0.35;
           } else {

            ballReset();
            player2Score++;
           }
        }

        if(ballY>canvas.height){
            ballSpeedY=-ballSpeedY;
        }
        if(ballY <0 ){
            ballSpeedY=-ballSpeedY;
        }

        }
    

    function drawEverything(){

    
    colorRect(0,0,canvas.width,canvas.height,"black"); 
   
    if(showingWinScreen){
        canvasContext.fillStyle ="white";


       if( player1Score >= WINNING_SCORE ){
        canvasContext.fillText("Left Player Won",350,200);
       }

       else if( player2Score >= WINNING_SCORE){
        canvasContext.fillText("Right Player Won",350,200);
       }
        
       
       canvasContext.fillText("Click to continue",350,500);
        return;
    }
    
    drawNet();

    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"white"); // paddle left

    colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"white"); // padle right

    colorCircle(ballX,ballY,PADDLE_THICKNESS,"white");

    canvasContext.fillText(player1Score,100,100);
    canvasContext.fillText(player2Score,canvas.width-100,100);   
    
   
    
}

function colorRect(leftX,topY,width,height,color){ // for canvas
    canvasContext.fillStyle=color;
    canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle(centerX,centerY,radius,drawColor){ // for ball

    canvasContext.fillStyle=drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,10,Math.PI^2,true);
    canvasContext.fill();
}

function ballReset(){

    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
       
        showingWinScreen=true;
    }
    ballSpeedX=-ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;

}

function handleMouseClick(){
    if(showingWinScreen){
        player2Score=0;
        player1Score=0;
        showingWinScreen=false;
    }
}

function drawNet(){

    for(var i=0;i<canvas.height;i+=40){

        colorRect(canvas.width/2-1,i,2,20,"white");

    }
}