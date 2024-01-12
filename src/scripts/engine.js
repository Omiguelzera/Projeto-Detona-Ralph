const state = {
    view : {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#lives"),
    },
    values: {
        playerLife: 3,
        gameVelocity : 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        counDownTimerId: setInterval(countDown, 1000),
        timerId : setInterval(randomSquare, 1000),
    }
};

function losingLife(){
    state.values.playerLife--;
    state.view.live.textContent = ": x" + state.values.playerLife;

    if(state.values.playerLife <= 0){
       
        state.values.result = 0;
        state.view.score.textContent = state.values.result
        state.values.playerLife = 3;
        state.view.live.textContent =": x" + state.values.playerLife
        state.values.currentTime = 60
        state.view.timeLeft.textContent = state.values.currentTime
        
        alert("Game Over! Sua vida acabou.");

    }
       
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.counDownTimerId);
        clearInterval(state.actions.timerId);
        playSound("vine-boom");
        alert("Game Over! O seu resultado foi : " + state.values.result  );
    }
}



function playSound(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}





function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
          square.addEventListener("mousedown", () =>{
             if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
             }else{
                losingLife();
            }
          });
    });
}


function init(){
    
    addListenerHitBox();
}



init();