// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 *
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 *
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
 */
function processFirstItem(stringList, callback) {
  return callback(stringList[0]);
}

// ⭐️ Example Challenge END ⭐️

///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 *
 * 1. What is the difference between counter1 and counter2?
 *  counter1 creates a count variable in function scope while counter2 has a global count variable.
 *
 * 2. Which of the two uses a closure? How can you tell?
 *  counter1 uses closure because it calls the counter2 function inside of it.
 *
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better?
 *  counter1 would be preferable because you could assign it to a variable and have different variables run the same function simiultaneously. The let count is protected.
 *  counter2 would be better becuase it could be used when many functions need access to the count variable.
 */

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    return count++;
  };
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}

/* Task 2: inning() 

Write a function called `inning` that returns a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning() {
  return Math.floor(Math.random() * 3);
}

console.log(inning());

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/

function finalScore(inningCB, numOfInnings) {
  let homeScore = 0;
  let awayScore = 0;

  for (let i = 0; i < numOfInnings; i++) {
    homeScore = homeScore + inningCB();
    awayScore = awayScore + inningCB();
  }

  return {
    Home: homeScore,
    Away: awayScore
  };
}

console.log(finalScore(inning, 9));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(3) A number of innings

and returns the score at each pont in the game, like so:
1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam
Final Score: awayTeam - homeTeam */

function getInningScore(inningCB) {
  return {
    Home: inningCB(),
    Away: inningCB()
  };
}

console.log(getInningScore(inning));

function scoreboard(inningScoreCB, inningCB, numOfInnings) {
  const scoreInning = [];

  let homeScore = 0;
  let awayScore = 0;

  for (let i = 0; i < numOfInnings; i++) {
    const currentInning = inningScoreCB(inningCB);
    homeScore = homeScore + currentInning.Home;
    awayScore = awayScore + currentInning.Away;

    scoreInning.push(
      `Inning ${i + 1}: Away ${currentInning.Away} - Home ${currentInning.Home}`
    );
  }

  if (homeScore === awayScore) {
    scoreInning.push(
      `This game will require extra inning: Away ${awayScore} - Home ${homeScore}`
    );
  } else {
    scoreInning.push(`Final Score: Away ${awayScore} - Home ${homeScore}`);
  }

  return scoreInning;
}

console.log(scoreboard(getInningScore, inning, 9));
