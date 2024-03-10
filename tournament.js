class Tournament {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.teams = [];
      this.matches = [];
      this.status = 'en attente';
      this.winner = null;
    }
  
    addTeam(team) {
      if (!team.name || !team.players || team.players.length === 0 || !Array.isArray(team.players) || team.players.length === 0 || !team.players.every(player => typeof player === 'string')) {
        throw new Error("Données de l'équipe invalides");
      }

      if (this.teams.some(existingTeam => existingTeam.name === team.name)) {
        throw new Error("Équipe déjà existante");
      }
      this.teams.push(team);
    }

    getTeamNames() {
        return this.teams.map(team => team.name);
    }
  
    getNumberOfTeams() {
      return this.teams.length;
    }
  
    startTournament() {
      if (this.teams.length < 2) {
        throw new Error("Pas assez d'équipes pour commencer le tournoi");
      }
      this.status = 'en cours';
      this.scheduleMatches();
    }
  
    scheduleMatches() {
      for (let i = 0; i < this.teams.length; i += 2) {
        if (this.teams[i + 1]) {
          this.matches.push({ team1: this.teams[i], team2: this.teams[i + 1], winner: null });
        }
      }
    }
  
    recordMatchResult(matchId, winner) {
      if (this.status !== 'en cours') {
        throw new Error("Impossible d'enregistrer les résultats, le tournoi n'est pas en cours");
      }
      let match = this.matches[matchId];
      if (!match) {
        throw new Error("ID de match invalide");
      }
      if (match.winner) {
        throw new Error("Le résultat de ce match a déjà été défini");
      }
      if (![match.team1.name, match.team2.name].includes(winner)) {
        throw new Error("Vainqueur invalide pour le match");
      }
      match.winner = winner;
      this.checkIfTournamentEnded();
    }
  
    checkIfTournamentEnded() {
      let ongoingMatches = this.matches.filter(match => !match.winner);
      if (ongoingMatches.length === 0) {
        this.endTournament();
      }
    }
  
    endTournament() {
      this.status = 'terminé';
      let finalMatch = this.matches[this.matches.length - 1];
      this.winner = finalMatch.winner;
    }
  }
  
  module.exports = Tournament;
  