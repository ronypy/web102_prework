/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    //var j = 0;
    for(let i = 0; i < games.length; i++) {
        //j += i
        // Get the current game object
        const game = games[i];

        // Create a new div element that will become the game card
        const gameCard = document.createElement('div');
        
        // Add the class 'game-card' to the div's class list
        gameCard.classList.add('game-card');
        
        // Set the inner HTML with a template literal,
        // including an image with class 'game-img' and at least two other attributes
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
        `;
        
        // Append the game card to the games container in the DOM
        gamesContainer.appendChild(gameCard);

    }



        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
// Using reduce to sum all backers from each game object in GAMES_JSON
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// Change the inner HTML of the contributionsCard element to display this total, formatted with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;
// Calculate the total amount pledged across all games
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
  }, 0);
  
  // Update the raisedCard element to display the total with a dollar sign
  raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
  

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // First, clear the existing game cards from the page
    deleteChildElements(gamesContainer);
    
    // Filter GAMES_JSON to include only games where pledged < goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
    // Add the filtered games to the page
    addGamesToPage(unfundedGames);
    
    // Log the number of unfunded games to the console for verification
    console.log(unfundedGames.length);
    
    // Return the unfunded games array (optional, but useful for further processing)
    return unfundedGames;
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    
    // Add the filtered funded games to the page
    addGamesToPage(fundedGames);

    // (Optional) Log the number of fully funded games to the console
    console.log("Number of fully funded games:", fundedGames.length);


}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    // (Optional) Log that all games are being displayed
    console.log("Showing all games. Total:", GAMES_JSON.length);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((acc, game) => {
    return acc + (game.pledged < game.goal ? 1 : 0);
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
// Calculate the total amount raised
//const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Get the total number of games
const totalGames = GAMES_JSON.length;

// Get the number of unfunded games (games where pledged < goal)
//const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create a template string for the summary message using ternary operators 
const summaryMessage = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames === 1 ? "" : "s"}. There ${unfundedGamesCount === 1 ? "is" : "are"} currently ${unfundedGamesCount} unfunded game${unfundedGamesCount === 1 ? "" : "s"}. We need your help to fund these amazing games!`;

console.log(summaryMessage);


// create a new DOM element containing the template string and append it to the description container
const newParagraph = document.createElement('p');
newParagraph.innerHTML = summaryMessage;
//const descriptionContainer = document.getElementById("description-container");
descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp, ...others] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameNameElement = document.createElement('h3');
topGameNameElement.textContent = `${topGame.name}`;   // display the name using a template literal
firstGameContainer.appendChild(topGameNameElement);
// do the same for the runner up item
const runnerUpNameElement = document.createElement('h3');
runnerUpNameElement.textContent = `${runnerUp.name}`;   // display the name using a template literal
secondGameContainer.appendChild(runnerUpNameElement);


// Grab the search input element
const searchInput = document.getElementById('game-search');

// Listen for the 'keyup' event to detect changes as the user types
searchInput.addEventListener('keyup', function () {
    // Get the search term and convert it to lower case for case-insensitive matching
    const query = searchInput.value.toLowerCase();

    // Filter the games array to find games whose name includes the query string
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(query));

    // Clear the current game cards
    deleteChildElements(gamesContainer);

    // Add the filtered games to the DOM
    addGamesToPage(filteredGames);
});
