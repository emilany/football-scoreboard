import { Scoreboard } from './index'

describe('Scoreboard', () => {
    let scoreboard: Scoreboard

    beforeEach(() => {
        scoreboard = new Scoreboard()
    })

    it('should start a new match and add it to the scoreboard', () => {
        scoreboard.startNewMatch('Denmark', 'Germany')

        const summary = scoreboard.getMatchSummary()
        expect(summary.length).not.toBe(0)
        
        const currentMatch = summary[0]
        expect(currentMatch.homeTeam).toBe('Denmark')
        expect(currentMatch.awayTeam).toBe('Germany')
        expect(currentMatch.homeTeamScore).toBe(0)
        expect(currentMatch.awayTeamScore).toBe(0)
    })
    
    it('should throw an error when starting a match with an invalid team name', () => {
        expect(() => scoreboard.startNewMatch('Denmark', '')).toThrow('Invalid team name')
    })
    
    it('should update the score of a match', () => {
        const matchId = scoreboard.startNewMatch('Denmark', 'Germany')
        expect(matchId).not.toBeUndefined()
        
        scoreboard.updateMatchScore(matchId, 1, 0)

        const summary = scoreboard.getMatchSummary()
        expect(summary.length).not.toBe(0)
    
        const currentMatch = summary.find(match => match.matchId === matchId)
        expect(currentMatch).not.toBeUndefined()
        expect(currentMatch?.homeTeamScore).toBe(1)
        expect(currentMatch?.awayTeamScore).toBe(0)
    })
    
    it('should throw an error when updating the score of an unknown match', () => {
        const matchId = 'match_id'
        expect(() => scoreboard.updateMatchScore(matchId, 1, 0)).toThrow(`Unable to update score. Match with ID ${matchId} not found`)
    })
    
    it('should throw an error when updating the score with an invalid score', () => {
        const matchId = scoreboard.startNewMatch('Denmark', 'Germany')
        expect(matchId).not.toBeUndefined()
        
        expect(() => scoreboard.updateMatchScore(matchId, -1, 0)).toThrow('Invalid score')
    })
    
    it('should finish a match and remove it from the scoreboard', () => {
        const matchId = scoreboard.startNewMatch('Denmark', 'Germany')
        expect(matchId).not.toBeUndefined()
        
        scoreboard.finishMatch(matchId)
    
        const summary = scoreboard.getMatchSummary()
        expect(summary.length).toBe(0)
    })
    
    it('should finish an unknown match', () => {
        const matchId = 'match_id'
        scoreboard.finishMatch(matchId)
    
        const summary = scoreboard.getMatchSummary()
        expect(summary.length).toBe(0)
    })
    
    it('should get the match summary with different total scores', () => {
        const matchId1 = scoreboard.startNewMatch('Denmark', 'Germany')
        scoreboard.updateMatchScore(matchId1, 1, 0)
        
        const matchId2 = scoreboard.startNewMatch('Netherlands', 'Japan')
        scoreboard.updateMatchScore(matchId2, 1, 2)
    
        const summary = scoreboard.getMatchSummary()
        expect(summary.length).toBe(2)
        expect(summary[0].homeTeam).toBe('Netherlands')
        expect(summary[1].homeTeam).toBe('Denmark')
    })
    
    it('should get the match summary with the same total scores', () => {
        const matchId1 = scoreboard.startNewMatch('Denmark', 'Germany')
        scoreboard.updateMatchScore(matchId1, 1, 0)
        
        const matchId2 = scoreboard.startNewMatch('Netherlands', 'Japan')
        scoreboard.updateMatchScore(matchId2, 0, 1)
    
        const summary = scoreboard.getMatchSummary()
        expect(summary.length).toBe(2)
        expect(summary[0].homeTeam).toBe('Denmark')
        expect(summary[1].homeTeam).toBe('Netherlands')
    })
    
})
