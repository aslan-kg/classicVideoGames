function startTimer(){
    console.log('Starting session timer');
    
    //Check if timer already exists to prevent duplicates
    if (document.getElementById('sessionTimer')){
        console.log('Timer already exists, not creating a new one');
        return;
    }

    //Initialize session timer at 0 seconds
    let sessionSeconds = 0;

    //Create timer display element
    const timerElement = document.createElement('div');
    timerElement.id = "sessionTimer";
    const timerArea = document.getElementById('timerArea');
    timerArea.appendChild(timerElement);

    //Update timer display initially
    updateTimerDisplay(timerElement, sessionSeconds);

    //Update timer every second
    let timerInterval = setInterval(()=>{
        sessionSeconds++; 
        updateTimerDisplay(timerElement, sessionSeconds);

        //Store current time in sessionStorage (automatically cleared when tab closes)
        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());

        //Trigger special message for long session (over 5 minutes)
        if(sessionStorage === 300){
            showLongSessionMessage();
        }
    }, 1000);

    //When page is about to unload, stop the timer
    window.addEventListener('beforeunload', ()=>{
        console.log('page unloading, stopping timer');
        clearInterval(timerInterval);
    });
}

//Helper function to formate and display time
function updateTimerDisplay(element, totalSeconds){
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600)/ 60);
    const seconds = totalSeconds % 60;

    let timeText = `Time on page `;
    if(hours > 0){
        timeText += `${hours}h `;
    }
    if(hours > 0 || minutes > 0){
        timeText += `${minutes}m `;
    }
    timeText += `${seconds}s`;

    element.textContent = timeText;
}

//Show Message for users spending long time on the site
function showLongSessionMessage(){
    console.log('Showing long message already exists');
    //Check if message already exists to prevent duplicates
    if(document.getElementById('longSessionMessage')){
        console.log('Long session message already exists');
        return
    };

    const messageDiv = document.createElement('div');
    messageDiv.id = "longSessionMessage";
    messageDiv.innerHTML = `
    <p>You have been exploring for 5 minutes! Thank you for your suppor.</p>
    <button id="dismissMessage">Dismiss</button>
    `;

    //Check if timer element exists
    const timerElement = document.getElementById('sessionTimer');
    if(timerElement){
        document.body.insertBefore(messageDiv, timerElement);
    }else{
        document.body.appendChild(messageDiv);
    }

    //Add event listener to dismiss button
    const dismissButton = document.getElementById('dismissMessage');
    if(dismissButton){
        dismissButton.addEventListener('click', function(){
            const message = document.getElementById('longSessionMessage');
            if(message){
                message.remove();
            }
        });
    }
}

startTimer();