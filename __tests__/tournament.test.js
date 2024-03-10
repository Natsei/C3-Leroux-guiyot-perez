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

  test('devrait lancer une erreur lors de l\'ajout d\'une équipe invalide', () => {
    const team = { name: '', players: [] };
    expect(() => tournament.addTeam(team)).toThrow("Données de l'équipe invalides");
  });

  test('devrait lancer une erreur lors du démarrage du tournoi avec un nombre insuffisant d\'équipes', () => {
    const team = { name: 'Les Solitaires', players: ['Alice'] };
    tournament.addTeam(team);
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

  //Test de gestion des équipes lorsqu'on retire une équipe
test('devrait retirer correctement une équipe', () => {
  const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
  const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
  tournament.addTeam(team1);
  tournament.addTeam(team2);
  tournament.removeTeam('Équipe 1');
  expect(tournament.teams.length).toBe(1);
  expect(tournament.teams).not.toContain(team1);
});

//Test de vérification de tournamentType
test('devrait définir correctement le type de tournoi', () => {
  expect(tournament.tournamentType).toBe('Élimination directe');
});

test('devrait gérer correctement les matchs en cours et terminés', () => {
  const team1 = { name: 'Équipe 1', players: ['Alice', 'Bob'] };
  const team2 = { name: 'Équipe 2', players: ['Charlie', 'David'] };
  const team3 = { name: 'Équipe 3', players: ['Eve', 'Frank'] };
  tournament.addTeam(team1);
  tournament.addTeam(team2);
  tournament.addTeam(team3);
  tournament.startTournament();
  
  tournament.recordMatchResult(0, 'Équipe 1'); //Match 1: Équipe 1 vs Équipe 2
  tournament.recordMatchResult(1, 'Équipe 3'); //Match 2: Équipe 3 vs Équipe 2
  
  expect(tournament.currentMatches.length).toBe(0); //Aucun match en cours après les enregistrements
  expect(tournament.finishedMatches.length).toBe(2); //Deux matchs terminés après les enregistrements
  
  //Vérifier les résultats des matchs
  expect(tournament.matches[0].winner).toBe('Équipe 1');
  expect(tournament.matches[1].winner).toBe('Équipe 3');
  });
});
