class Tournament {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.teams = [];
    }
  
    addTeam(team) {
      if (!team.name || !team.players || team.players.length === 0) {
        throw new Error("Invalid team data");
      }
      this.teams.push(team);
    }
  
    getNumberOfTeams() {
      return this.teams.length;
    }
  
    getTeamNames() {
      return this.teams.map(team => team.name);
    }
  }
  
  module.exports = Tournament;
  