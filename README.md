# Football Scoreboard Library

A scoreboard library for the Live Football World Cup that shows all the ongoing matches and their scores.

## Features

- Start a new match
    - Initialise a new match with home and away teams, and adds it to the scoreboard.
    - Scores are initially set at 0-0.

- Update match score
    - Updates the score of an ongoing match.

- Finish match
    - Finishes a match in progress and removes it from the scoreboard.

- Get match summary
    - Retrieves a summary of all ongoing matches ordered by total score and start time.

## Project Setup

1. Clone the [repository](https://github.com/emilany/football-scoreboard)
2. Navigate to the project directory and install the dependencies with `npm i`
3. Run the tests with `npm test`

## Sample Usage

```ts
import { 
    initialiseScoreboard, 
    startNewMatch, 
    updateMatchScore, 
    finishMatch, 
    getMatchSummary 
} from './index'

// initialise the scoreboard
initialiseScoreboard()

// start new matches
const matchId1 = startNewMatch('Denmark', 'Germany')
const matchId2 = startNewMatch('Netherlands', 'Japan')

// update match scores
updateMatchScore(matchId1, 1, 0)
updateMatchScore(matchId2, 1, 2)

// get match summary
const matchSummary = getMatchSummary()
console.log('Current match summary', matchSummary)

// finish a match
finishMatch(matchId1)

// get updated match summary
const matchSummaryUpdated = getMatchSummary()
console.log('Updated match summary', matchSummaryUpdated)
```

### Running the project:

1. Create a `.ts` file (e.g `scoreboard.ts`) and add the sample usage code
2. Use the `tsc` command to compile the TypeScript file into JavaScript
    - if typescript is not installed, run `npm install -g typescript` 
    - run `tsc scoreboard.ts`
3. Run the JavaScript file with `node [filename].js`

## Assumptions

- match IDs are unique
- all matches have unique teams
- scores are not negative values

## Limitations

- uses in-memory storage; data is not persisted
- the current order is kept if the matches have the same start time and total scores
    - to help, add another sorting criteria (ie using the `matchId` or `homeTeam`)