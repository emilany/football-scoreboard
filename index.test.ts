import { finishMatch, getMatchSummary, initialiseScoreboard, scoreboard, startNewMatch, updateMatchScore } from './index'

beforeEach(() => {
    initialiseScoreboard()
})

it('should start a new match and add it to the scoreboard', () => {
    startNewMatch('Denmark', 'Germany')
    expect(scoreboard.length).not.toBe(0)
    
    const currentMatch = scoreboard[0]
    expect(currentMatch.homeTeam).toBe('Denmark')
    expect(currentMatch.awayTeam).toBe('Germany')
    expect(currentMatch.homeTeamScore).toBe(0)
    expect(currentMatch.awayTeamScore).toBe(0)
})

it('should throw an error when starting a match with an invalid team name', () => {
    expect(() => startNewMatch('Denmark', '')).toThrow('Invalid team name')
})

it('should update the score of a match', () => {
    const matchId = startNewMatch('Denmark', 'Germany')
    expect(matchId).not.toBeUndefined()
    
    updateMatchScore(matchId, 1, 0)

    const currentMatch = scoreboard.find(match => match.matchId === matchId)
    expect(currentMatch).not.toBeUndefined()
    expect(currentMatch?.homeTeamScore).toBe(1)
    expect(currentMatch?.awayTeamScore).toBe(0)
})

it('should throw an error when updating the score of an unknown match', () => {
    const matchId = 'match_id'
    expect(() => updateMatchScore(matchId, 1, 0)).toThrow(`Unable to update score. Match with ID ${matchId} not found`)
})

it('should throw an error when updating the score with an invalid score', () => {
    const matchId = startNewMatch('Denmark', 'Germany')
    expect(matchId).not.toBeUndefined()
    
    expect(() => updateMatchScore(matchId, -1, 0)).toThrow('Invalid score')
})

it('should finish a match and remove it from the scoreboard', () => {
    const matchId = startNewMatch('Denmark', 'Germany')
    expect(matchId).not.toBeUndefined()
    
    finishMatch(matchId)

    const finishedMatch = scoreboard.find(match => match.matchId === matchId)
    expect(finishedMatch).toBeUndefined()
})

it('should finish an unknown match', () => {
    const matchId = 'match_id'
    finishMatch(matchId)

    const finishedMatch = scoreboard.find(match => match.matchId === matchId)
    expect(finishedMatch).toBeUndefined()
})

it('should get the match summary with different total scores', () => {
    const matchId1 = startNewMatch('Denmark', 'Germany')
    updateMatchScore(matchId1, 1, 0)
    
    const matchId2 = startNewMatch('Netherlands', 'Japan')
    updateMatchScore(matchId2, 1, 2)

    const summary = getMatchSummary()
    expect(summary.length).toBe(2)
    expect(summary[0].homeTeam).toBe('Netherlands')
    expect(summary[1].homeTeam).toBe('Denmark')
})

it('should get the match summary with the same total scores', () => {
    const matchId1 = startNewMatch('Denmark', 'Germany')
    updateMatchScore(matchId1, 1, 0)
    
    const matchId2 = startNewMatch('Netherlands', 'Japan')
    updateMatchScore(matchId2, 0, 1)

    const summary = getMatchSummary()
    expect(summary.length).toBe(2)
    expect(summary[0].homeTeam).toBe('Denmark')
    expect(summary[1].homeTeam).toBe('Netherlands')
})
