const Tournament = require('../tournament');

describe('Tournament', () => {
  let tournament;

  beforeEach(() => {
    tournament = new Tournament('Championnat du Monde', 'Élimination directe');
  });

  test('should allow adding a valid team', () => {
    const team = { name: 'Les Champions', players: ['Alice', 'Bob'] };
    tournament.addTeam(team);
    expect(tournament.getNumberOfTeams()).toBe(1);
  });

  test('should throw an error when adding an invalid team', () => {
    const invalidTeam = { name: '', players: [] };
    
    expect(() => {
      tournament.addTeam(invalidTeam);
    }).toThrow("Invalid team data");
  });

  test('should return correct team names', () => {
    const team1 = { name: 'Les Champions', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Les Vainqueurs', players: ['Charlie', 'David'] };
    tournament.addTeam(team1);
    tournament.addTeam(team2);
    expect(tournament.getTeamNames()).toEqual(['Les Champions', 'Les Vainqueurs']);
  });
});
