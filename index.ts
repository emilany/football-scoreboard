interface Match {
	matchId: string
	homeTeam: string
	awayTeam: string
	homeTeamScore: number
	awayTeamScore: number
	startTime: number
}

export class Scoreboard {
	private scoreboard: Match[] = []

	/**
	 * Starts a new match and adds it to the scoreboard.
	 * This assumes that the initial scores for the teams are set at 0-0. 
	 * @param homeTeam the home team name
	 * @param awayTeam the away team name
	 * @returns the match ID
	 */
	startNewMatch(homeTeam: string, awayTeam: string): string {
		if (homeTeam === '' || awayTeam === '') throw new Error('Invalid team name')

		const newMatch: Match = {
			matchId: crypto.randomUUID(),
			homeTeam,
			awayTeam,
			homeTeamScore: 0,
			awayTeamScore: 0,
			startTime: new Date().getTime(),
		}
		this.scoreboard.push(newMatch)

		return newMatch.matchId
	}

	/**
	 * Updates the scores for an ongoing match.
	 * @param matchId the match ID
	 * @param homeTeamScore the home team score
	 * @param awayTeamScore the away team score
	 */
	updateMatchScore(matchId: string, homeTeamScore: number, awayTeamScore: number) {
		const currentMatch = this.scoreboard.find(match => match.matchId === matchId)
		if (!currentMatch) throw new Error(`Unable to update score. Match with ID ${matchId} not found`)
		
		if (homeTeamScore < 0 || awayTeamScore < 0) throw new Error('Invalid score')
		
		const updatedMatch: Match = { ...currentMatch, homeTeamScore, awayTeamScore }
		const updatedScoreboard = this.scoreboard.filter(match => match.matchId !== matchId)

		this.scoreboard = [...updatedScoreboard, updatedMatch]
	}

	/**
	 * Finishes a match in progress and removes it from the scoreboard.
	 * @param matchId the match ID
	 */
	finishMatch(matchId: string) {
		const currentMatch = this.scoreboard.find(match => match.matchId === matchId)
		if (!currentMatch) throw new Error(`Unable to finish match. Match with ID ${matchId} not found`)

		this.scoreboard = this.scoreboard.filter(match => match.matchId !== matchId)
	}

	/**
	 * Gets the match summary and orders the matches based on:
	 * - total score (descending)
	 * - start time (ascending)
	 * @returns the match summary
	 */
	getMatchSummary(): Match[] {
		return this.scoreboard
			.map(match => ({
				match,
				totalScore: match.homeTeamScore + match.awayTeamScore
			}))
			.sort((a, b) => {
				if (a.totalScore === b.totalScore) {
					return a.match.startTime - b.match.startTime
				}
				return b.totalScore - a.totalScore
			})
			.map(match => match.match)
	}

	getMatchById(matchId: string): Match {
		const currentMatch = this.scoreboard.find(match => match.matchId === matchId)
		if (!currentMatch) throw new Error(`Unable to get match. Match with ID ${matchId} not found`)

		return currentMatch
	}
}
