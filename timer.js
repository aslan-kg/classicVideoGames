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
    document.getElementById('timerArea');

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

    let timeText = `Time on page`;
    if(hours > 0){
        timeText += `${hours}h`;
    }
    if(hours > 0 || minutes > 0){
        timeText += `${minutes}m`;
    }
    timeText += `${seconds}s`;

    element.textContent = timeText;
}

//Show Message for users spending long time on the site