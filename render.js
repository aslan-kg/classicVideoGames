/* const videosGamesList = [
    {
        name: "Super Mario Bros",
        date: 1983,
        console: "Nintendo Enteraiment System",
    },
    {
        name: "PacMan",
        date: 1982,
        console: "arcade"
    },
    {
        name: "Mega Man",
        date: 1987,
        console: "Nintendo Entertament System"
    },
    {
        name: "Mega Man 2",
        date: 1988,
        console: "Nintendo Entertament System"
    },
    {
        name: "Sonic The Hedgehog",
        date: 1991,
        console: "Sega Geneis/Megadrive"
    },
    {
        name: "Legend of Zelda Orarina of Time",
        date: 1997,
        console: "Nintendo 64"

    }
]; */

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
//detect if tge user presses enter
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

//activate the search at the start of the program incase the user later types
initializeSearch();
//Renders all the game data
renderGames(videosGamesList);
//that parameters are the search term the user inputed. And SearchHistory array from prevouse searches
function renderSearchHistory(SavedTerm, savedHistory){
    //adds the search term into the searchHistory parameter
    savedHistory.push(SavedTerm)
    //console.log("The search history is", savedHistory);

    //Render Search History
    let displaytext = []//variable for the text that will be displayed. The forEach loop will place the search term on by one into the display text
    savedHistory.forEach(term =>{
        console.log(term);
        displaytext.push(" " + term);
    });
    searchList.innerHTML = "Search History: "+ displaytext;//searchList is a DOM variable. And the displaytext is placed into it 
//If the displaytext is more than 6. Restart the Search History and text.
    if(displaytext.length > 6){
        searchList.innerHTML = "Search History: "
        savedHistory = [];
        displaytext.push(" " + SavedTerm);
        searchList.innerHTML = "Search History: "+ SavedTerm;

        SearchHistory = [];
        displaytext = [];
        
        return;
    }

}
let SearchHistory = [];
let searchList = document.getElementById('search-list');
