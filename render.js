const videosGamesList = [
    {
        name: "Super Mario Bros",
        date: 1983,
        console: "Nintendo Enteraiment System"
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
        name: "Sonic The HedgeHog",
        date: 1991,
        console: "Sega Geneis/Megadrive"
    }
];

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
            <img src="${game.image || ''}" alt="Game Cover of ${game.name}" class="gameImage">
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