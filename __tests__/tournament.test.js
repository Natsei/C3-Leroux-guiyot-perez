const Tournament = require('../tournament');

describe('Tournament', () => {
  let tournament;

  beforeEach(() => {
    tournament = new Tournament('Championnat du Monde', 'Élimination directe');
  });

  test('devrait permettre d\'ajouter une équipe valide', () => {
    const team = { name: 'Les Champions', players: ['Alice', 'Bob'] };
    tournament.addTeam(team);
    expect(tournament.teams).toContain(team);
  });

  test('Erreur - Equipes en double', () => {
    const team1 = { name: 'Les Champions', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Les Champions', players: ['Alice', 'Bob'] };
    tournament.addTeam(team1);
    expect(() => tournament.addTeam(team2)).toThrow("Équipe déjà existante");

  });

  test('devrait lancer une erreur lors de l\'ajout d\'une équipe invalide', () => {
    const team = { name: '', players: [] };
    expect(() => tournament.addTeam(team)).toThrow("Données de l'équipe invalides");
  });

  test('Erreur - Equipe vide', () => {
    const team = { name: 'Les cowboys', players: [] };
    expect(() => tournament.addTeam(team)).toThrow("Données de l'équipe invalides");
  });

  test('Erreur - Valeur null dans les joueurs d\'une équipe', () => {
    const team = { name: 'Les cowboys', players: [null] };
    expect(() => tournament.addTeam(team)).toThrow("Données de l'équipe invalides");
  });

  test('Erreur - Valeur null dans le nom d\'une équipe', () => {
    const team = { name: null, players: ["Alice","Fabien"] };
    expect(() => tournament.addTeam(team)).toThrow("Données de l'équipe invalides");
  });

  test('devrait lancer une erreur lors du démarrage du tournoi avec un nombre insuffisant d\'équipes', () => {
    const team = { name: 'Les Solitaires', players: ['Alice'] };
    tournament.addTeam(team);
    expect(() => tournament.startTournament()).toThrow("Pas assez d'équipes pour commencer le tournoi");
  });

  test('Erreur - Tournoi sans équipe', () => {
    expect(() => tournament.startTournament()).toThrow("Pas assez d'équipes pour commencer le tournoi");
  });

  test('devrait planifier correctement les matchs lors du démarrage du tournoi', () => {
    const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
    tournament.addTeam(team1);
    tournament.addTeam(team2);
    tournament.startTournament();
    expect(tournament.matches.length).toBe(1);
  });

  test('devrait enregistrer correctement les résultats des matchs', () => {
    const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
    tournament.addTeam(team1);
    tournament.addTeam(team2);
    tournament.startTournament();
    tournament.recordMatchResult(0, 'Équipe 1');
    expect(tournament.matches[0].winner).toBe('Équipe 1');
  });

  test('devrait retourner les noms des équipes correctement', () => {
    const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
    tournament.addTeam(team1);
    tournament.addTeam(team2);
    expect(tournament.getTeamNames()).toEqual(['Équipe 1', 'Équipe 2']);
  });

  test('devrait retourner les noms des équipes correctement', () => {
    const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
    tournament.addTeam(team1);
    tournament.addTeam(team2);
    expect(tournament.getTeamNames()).toEqual(['Équipe 1', 'Équipe 2']);
  });  


  test('devrait terminer le tournoi lorsque tous les résultats des matchs sont enregistrés', () => {
    const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
    const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
    tournament.addTeam(team1);
    tournament.addTeam(team2);
    tournament.startTournament();
    tournament.recordMatchResult(0, 'Équipe 1');
    expect(tournament.status).toBe('terminé');
    expect(tournament.winner).toBe('Équipe 1');
  });
});
