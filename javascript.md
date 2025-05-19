# Javascript documentation
## Table of contents
* Intoduction
* Greet.js
* Data.js
* Render.js Part 1: Rendering the data
* Render.js Part 2: Rendering User's Search
* Timer.js
* Theme.js

## Intoduction
The Capstone project has five JS files working on diffrent funtionalities of page. The scripts are:
* greet.js for sending a alert if the user first visits the site
* data.js to store JSON data of games. It will be used by render.js script
* render.js renders the JSON data. Receives the user inputs from the searchbox. Then it filter out the data to match the typed input and display the data. It also saves and displays the users most receant searches below the searchbox. 
* timer.js creates a timer that counts up every second. It calculates the minutes and hours from the secounds.
* theme.js tracks button click and D key inputs. Then it changes the theme the body elements class from light to dark. Therefore changing the Style of the page.

## Greet.js
Greet.js is a one function script that immediately calls ``` greetUser() ``` when opening the webpage. When the function is called a ``` document.cookie ``` tracks if the user has been on the site before. If the player has been before it will just send a ``` alert() ```. If the player has not vistied before, the cookie will the a expiration date set. Then the cookie's ``` vistedBofore='' ``` will be set as ``` 'true' ```.

```js
function greetUser(){
    //Check if visitedBefore cookie exists
    const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
    if (hasVisitedBefore){
        alert("Welcom Back to Classic Video Game Explorer");
    }else{
        //sets cookie with a 7 days expiry
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `visitedBefore=true;
        expires=${expiryDate.toUTCString()}; path=/`;
        alert("Welcome to Classic Video Game Explorer!!! Your go to place to know about games of the past");
    }
}
greetUser();
```

## data.js
Data.js only contains the JSON data of ``` const videosGamesList = [] ```. Each of the objects have 
* ``` image: ```
* ``` name: ```
* ``` date: ```
* ``` console: ```

Each of the objects has data that will be displayed by ``` render.js ```.
```js
const videosGamesList = [
    {   
        image: "Mario.jpg",
        name: "Super Mario Bros",
        date: 1983,
        console: "Nintendo Enteraiment System",
    },
    {
        image: "Pacman.jpg",
        name: "PacMan",
        date: 1982,
        console: "arcade"
    },
    {
        image: "Rockman_1987.jpg",
        name: "Mega/Rock Man",
        date: 1987,
        console: "Nintendo Entertament System"
    },
    {
        image: "Megaman2.jpg",
        name: "Mega/Rock Man 2",
        date: 1988,
        console: "Nintendo Entertament System"
    },
    {
        image: "Sonic1.jpg",
        name: "Sonic The Hedgehog",
        date: 1991,
        console: "Sega Geneis/Megadrive"
    },
    {
        image: "Ocarina_of_Time.jpg",
        name: "Legend of Zelda Ocarina of Time",
        date: 1997,
        console: "Nintendo 64"

    }
];
```

## Render.js Part 1: Rendering the data
Render.js script collects the data from the JSON or the filtered data as a function parameter called ```selectGame``` of the user search to then display it created DOM elements.

The ``` renderGames()``` function is initialy called by ```renderGames(videosGamesList);``` as soon as the program starts. The function starts off getting the DOM of ``` 'gameSection' ``` from the document. Then a if ``` 'gamesSection' ``` was not found it will give a error on console. Then it will check if the parameter that is in the form of an array has anything in it. If not it will display ``` <p id="noResults">No Games found</p> ``` back in the html document. After getting data instead a new variable ``` const gameElements = [];``` is created to store an array elements to be displayed in the document. A forEach loop for the ```(selectGame)``` parameter goes through each of the objects and creates DOM elements as ```const gameDiv = document.createElement('div');```. Each element is then pushed into the ```gameElements``` Finally the ```gameElements``` variable is appended as a child of the ```gameSection``` DOM
```js
function renderGames(selectGame){
    console.log('RenderGames is called with', selectGame.length, 'game');
    const gameSection = document.getElementById('gameSection');

    //Check if results container exist
    if(!gameSection){
        console.error('Game section not found');
        return;
    }

    //Clear the container
    gameSection.innerHTML = '';

    //If no games found show a message
    if (selectGame.length === 0){
        console.log("No games found");
        gameSection.innerHTML = `<p id="noResults">No Games found</p>`;
        return;
    }
    //Instead of document fragment, we can use an array to collect elements to then join them, or create a container div.
    const gameElements = [];
    selectGame.forEach(game =>{
        //Validate game object
        if (!game || typeof game.name !== 'string'){
            console.warn('Invalid game object:', game);
            return
        }
        const gameDiv = document.createElement('div');
        gameDiv.className = 'gameClass';
        gameDiv.innerHTML = `
        <div class="game-header">
            <img src="images/${game.image || ''}" alt="Game Cover of ${game.name}" class="gameImage">
            <h3>${game.name}</h3>
        </div>
        <p><strong>Date:</strong> ${game.date || 'Unknown'}<p>
        <p><strong>Console:</strong> ${game.console || 'Unknown'}<p>
        `;
        gameElements.push(gameDiv);
    });

    //Append all game cards at once
    gameElements.forEach(element =>{
        gameSection.appendChild(element);
    });

    console.log(`Successfully renderd ${selectGame}`)

}

renderGames(videosGamesList);
```

## Render.js Part 2: Rendering User Search

The second half of the Render.js script handles user's search input and having the ```renderGames``` function as the output of the search. Lastly renders the most receant search terms in short list.

### initializeSearch()
The ```initializeSearch()``` is the first function. It activates at the start of the program waiting for user input. ```const searchInput = document.getElementById('searchBox');``` gets searchBox input. The variable ```const searchTerm``` gets any input that have potentialy been typed. The value is adjusted with ```.toLowerCase().trim()```. If the search term is not emtpy the if statment will call ```preformSearch()```. If the search term is emtpy as it usually is at the start. The else statment will call ```renderGames()``` with the complete list being unchanged. The ```searchInput``` has a event listener is set for the for the Enter key. If the searchterm value is not empty. The searchterm will be sent to the proformSearch and renderSearchHistory fucntions. If it is empty render all the data. 

### preformSearch()

The ```preformSearch()``` is where the data is filtered and called back to the ```renderGames()```. It starts with reseting the gamesection DOM element. 

```js
function initializeSearch()
{
    const searchInput = document.getElementById('searchBox');
/* const searchItems = videosGamesList; */
console.log("Search successful");
const searchTerm = searchInput.value.toLowerCase().trim();
console.log(searchTerm)
//if searchbox is not blank
if(searchTerm !== ''){
    preformSearch(searchTerm);
}
else{
    //if searchbox is blank render all the games
    renderGames(videosGamesList);
}
//detect if the user presses enter
searchInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){

        const searchTerm = searchInput.value.toLowerCase().trim();
        if(searchTerm !== ''){
            //searchbox has input and not blank. Start the search function and search history function
            preformSearch(searchTerm);
            renderSearchHistory(searchTerm, SearchHistory)
            searchInput.value='';
        }else{
            renderGames(videosGamesList);
        }

            
    }
});

//activate the search at the start of the program incase the user later types an input
initializeSearch();

//Renders all the game data in the begining of the program
renderGames(videosGamesList);

```
### preformSearch()

The ```preformSearch()``` is where the data is filtered and called back to the ```renderGames()```. It starts with reseting the gamesection DOM element. A new variable called ```const filteredGames``` is created. It values are determined by putting ```videoGamesList``` to filter data in a arrow loop in the parameter ```game```. If the game's ```.name``` is not a string, return filteredGames as false. If the game.name is a string retrun but ```includes(term)``` for only games that match term. It will then call the ```renderGames(filterGames)``` 

```js
}

function preformSearch(term){
    gameSection.innerHTML = '';
 
    if(term === ''){
        renderGames(videosGamesList)
        return;
    }

    const filteredGames = videosGamesList.filter(game => {
        if(!game || typeof game.name !== 'string'){
            console.warn("Invalid game object", game);
            return false;
        }
        return game.name.toLowerCase().includes(term.toLowerCase());
    });
    

    renderGames(filteredGames);
}
```

### renderSearchHistory()
Search history was called from the ```preformSearch```. SearchHistory is global variable, it is sent as a SavedHistory parameter. The searchTerm from the preformSearch is sent as ```SavedTerm```. The Saved term is ```.push``` into savedHistory. That means that every input that is entered will add up to the SavedHistory. ```displayText``` is the array that text are going to be displayed. Then the ```savedHistory.forEach``` loop will insert ```" " + SavedTerm```. After that ```searchList``` which is a global variable outside the function is used. It is a DOM ID from the document. It is combined with the displayText in ```searchList.innerHTML = "Search History: "+ displayText;```. It is now displaying the history in the document. The last section of the function is used to limit the amount of receant search to 5 only.
```js
//that parameters are the search term the user inputed. And SearchHistory array from prevouse searches
function renderSearchHistory(SavedTerm, savedHistory){
    //adds the search term into the searchHistory parameter
    savedHistory.push(SavedTerm)
    //console.log("The search history is", savedHistory);

    //Render Search History
    let displayText = []//variable for the text that will be displayed. The forEach loop will place the search term on by one into the display text
    savedHistory.forEach(term =>{
        console.log(term);
        displayText.push(" " + SavedTerm);
    });
    searchList.innerHTML = "Search History: "+ displayText;//searchList is a DOM variable. And the displaytext is placed into it 
//If the displaytext is more than 6. Restart the Search History and text.
    if(displayText.length > 6){
        searchList.innerHTML = "Search History: "
        savedHistory = [];
        displayText.push(" " + SavedTerm);
        searchList.innerHTML = "Search History: "+ SavedTerm;

        SearchHistory = [];
        displayText = [];
        
        return;
    }

}
let SearchHistory = [];
let searchList = document.getElementById('search-list');
```

## Timer.js
Timer.js refences the document ID ```'sessionTimer'```. Then it uses DOM elements. Then ```sessionSeconds``` variable is created to track seconds. sessionSeconds is counted up per second with ```setInterval```. Then it creates a new element for the timer to display called ```timerElement```. The timerElement is passed as a parameter ```element``` in the function updateTimerDisplay. The fucntion calculates seconds into hours and minutes variables that are then put together into a ```timeText``` variable. The timeText is applyed to the ```element``` as ```.textContent```. The last thing that feature of this script is the display messages. if the timer goes up to 5 minutes a message in the form of a DOM element is displayed.

```js
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
```
## Theme.js
Tracks button click and D key inputs. Then it changes the theme the body elements class from light to dark. Therefore changing the Style of the page.

```js
const themeToggle = document.getElementById('toggleTheme');

//load theme from localStorage
if (localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
}

//Save theme preference to localStorage
themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    }
});

//Add keyboard shortcut for dark mode toggle
document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        themeToggle.click();
    }
});
```