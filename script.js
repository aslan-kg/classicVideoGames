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
    }
];

let gameSection = document.getElementById('gameSection');

//create div for the individual games from the JSON

for(let i = 0; i < videosGamesList.length; i++){
    let selectGame = videosGamesList[i];
    let game = document.createElement("div");
    const gameClass = game.classList
    gameClass.add("gameClass")

    let gameName = document.createElement("p");
    gameName.textContent = selectGame.name;

    let gameDate = document.createElement("p");
    gameDate.textContent = selectGame.date;

    let gameConsole = document.createElement("p");
    gameConsole.textContent = selectGame.console;

    game.appendChild(gameName);
    game.appendChild(gameDate);
    game.appendChild(gameConsole);

    gameSection.appendChild(game);
}
/* 
let game = videosGamesList[0];

let card = document.createElement("div");

let gameName = document.createElement("div");
gameName.textContent = game.name;

let gameDate = document.createElement("div");
gameDate.textContent = game.date;

card.appendChild(gameName);
card.appendChild(gameDate);

gameSection.appendChild(card); */