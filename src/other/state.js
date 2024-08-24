import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import {getPlayerRank} from '../util/stateUtil';
import {CONTRACT, ROLE, ROUND_TABLE_COLUMNS, TRUMP} from './constants';
import {anyAsyncStorage, roundsInit, SCORE_TAB_INDEX} from './constants';
import {t} from '../util/otherUtil';

// Tabs
export const tabIndexAtom = atom(SCORE_TAB_INDEX);

// Contract
export const contractAtom = atom('6');

// Trump
const trumpAtom = atom(TRUMP.spades);
export const trumpAPIAtom = atom(
  get => (get(allPassOrMisereContractAtom) ? TRUMP.none : get(trumpAtom)),
  (get, set, trump) => set(trumpAtom, trump),
);

// Tricks
export const autoModeAtom = atom(true);

// Players
export const player1DisplayNameAtom = atomWithStorage(
  'player1DisplayName',
  'Player 1',
  anyAsyncStorage,
);
const player1RoleAtom = atom(ROLE.player);
const player1Atom = atom({
  tricks: 0,
  points: 0,
  pointsInput: '',
});
export const player1RoleAPIAtom = atom(
  get => (get(allPassContractAtom) ? ROLE.player : get(player1RoleAtom)),
  (get, set, role) => set(player1RoleAtom, role),
);
export const player1PlayedAPIAtom = atom(
  get => get(player1RoleAPIAtom) !== ROLE.pass,
);
export const player1TricksAPIAtom = atom(
  get => (get(player1PlayedAPIAtom) ? get(player1Atom).tricks : 0),
  (get, set, tricks) => set(player1Atom, {...get(player1Atom), tricks}),
);
export const player1PointsAPIAtom = atom(
  get => (get(player1PlayedAPIAtom) ? get(player1Atom).points : 0),
  (get, set, points) => set(player1Atom, {...get(player1Atom), points}),
);
export const player1PointsInputAPIAtom = atom(
  get => (get(player1PlayedAPIAtom) ? get(player1Atom).pointsInput : '0'),
  (get, set, pointsInput) =>
    set(player1Atom, {...get(player1Atom), pointsInput}),
);

export const player2DisplayNameAtom = atomWithStorage(
  'player2DisplayName',
  'Player 2',
  anyAsyncStorage,
);
const player2RoleAtom = atom(ROLE.player);
const player2Atom = atom({
  tricks: 0,
  points: 0,
  pointsInput: '',
});
export const player2RoleAPIAtom = atom(
  get => (get(allPassContractAtom) ? ROLE.player : get(player2RoleAtom)),
  (get, set, role) => set(player2RoleAtom, role),
);
export const player2PlayedAPIAtom = atom(
  get => get(player2RoleAPIAtom) !== ROLE.pass,
);
export const player2TricksAPIAtom = atom(
  get => (get(player2PlayedAPIAtom) ? get(player2Atom).tricks : 0),
  (get, set, tricks) => set(player2Atom, {...get(player2Atom), tricks}),
);
export const player2PointsAPIAtom = atom(
  get => (get(player2PlayedAPIAtom) ? get(player2Atom).points : 0),
  (get, set, points) => set(player2Atom, {...get(player2Atom), points}),
);
export const player2PointsInputAPIAtom = atom(
  get => (get(player2PlayedAPIAtom) ? get(player2Atom).pointsInput : '0'),
  (get, set, pointsInput) =>
    set(player2Atom, {...get(player2Atom), pointsInput}),
);

export const player3DisplayNameAtom = atomWithStorage(
  'player3DisplayName',
  'Player 3',
  anyAsyncStorage,
);
const player3RoleAtom = atom(ROLE.player);
const player3Atom = atom({
  tricks: 0,
  points: 0,
  pointsInput: '',
});
export const player3RoleAPIAtom = atom(
  get => (get(allPassContractAtom) ? ROLE.player : get(player3RoleAtom)),
  (get, set, role) => set(player3RoleAtom, role),
);
export const player3PlayedAPIAtom = atom(
  get => get(player3RoleAPIAtom) !== ROLE.pass,
);
export const player3TricksAPIAtom = atom(
  get => (get(player3PlayedAPIAtom) ? get(player3Atom).tricks : 0),
  (get, set, tricks) => set(player3Atom, {...get(player3Atom), tricks}),
);
export const player3PointsAPIAtom = atom(
  get => (get(player3PlayedAPIAtom) ? get(player3Atom).points : 0),
  (get, set, points) => set(player3Atom, {...get(player3Atom), points}),
);
export const player3PointsInputAPIAtom = atom(
  get => (get(player3PlayedAPIAtom) ? get(player3Atom).pointsInput : '0'),
  (get, set, pointsInput) =>
    set(player3Atom, {...get(player3Atom), pointsInput}),
);

// Rounds
const roundsAtom = atomWithStorage('rounds', roundsInit, anyAsyncStorage);
export const roundsAtomAPI = atom(get => {
  const rounds = get(roundsAtom);
  rounds[1].text = t('c', get(appLanguageAtom));
  rounds[2].text = get(player1DisplayNameAtom);
  rounds[3].text = get(player2DisplayNameAtom);
  rounds[4].text = get(player3DisplayNameAtom);
  return rounds;
});
export const addRoundAtomAPI = atom(null, (get, set, round) => {
  set(roundsAtom, get(roundsAtom).concat(round));
});
export const deleteLastRoundAtomAPI = atom(null, (get, set) => {
  let rounds = get(roundsAtom);
  for (let i = 0; i < ROUND_TABLE_COLUMNS; i++) {
    rounds.pop();
  }
  set(roundsAtom, rounds);
});
const roundsLengthAtom = atom(get => {
  return get(roundsAtom).length;
});
export const lastRoundNumberAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  const roundCellData = rounds[roundsLength - ROUND_TABLE_COLUMNS];
  return roundCellData.text === '-' ? 0 : roundCellData.text;
});
export const initRoundsAtom = atom(null, (get, set) => {
  set(roundsAtom, roundsInit);
});

// Score
export const player1TotalScoreAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  let totalScore = 0;
  for (
    let i = ROUND_TABLE_COLUMNS + 2;
    i < roundsLength;
    i += ROUND_TABLE_COLUMNS
  ) {
    totalScore += rounds[i].text;
  }
  return totalScore;
});
export const player1LastScoreAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  return rounds[roundsLength - 3].text;
});
export const player1ScoreStatusAtom = atom(get => {
  return getPlayerRank(get(player1DisplayNameAtom), get(playerRankingsAtom));
});
export const player2TotalScoreAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  let totalScore = 0;
  for (
    let i = ROUND_TABLE_COLUMNS + 3;
    i < roundsLength;
    i += ROUND_TABLE_COLUMNS
  ) {
    totalScore += rounds[i].text;
  }
  return totalScore;
});
export const player2LastScoreAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  return rounds[roundsLength - 2].text;
});
export const player2ScoreStatusAtom = atom(get => {
  return getPlayerRank(get(player2DisplayNameAtom), get(playerRankingsAtom));
});
export const player3TotalScoreAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  let totalScore = 0;
  for (
    let i = ROUND_TABLE_COLUMNS + 4;
    i < roundsLength;
    i += ROUND_TABLE_COLUMNS
  ) {
    totalScore += rounds[i].text;
  }
  return totalScore;
});
export const player3LastScoreAtom = atom(get => {
  const rounds = get(roundsAtom);
  const roundsLength = get(roundsLengthAtom);
  return rounds[roundsLength - 1].text;
});
export const player3ScoreStatusAtom = atom(get => {
  return getPlayerRank(get(player3DisplayNameAtom), get(playerRankingsAtom));
});

// Game
export const gamePointsAtom = atomWithStorage(
  'gamePoints',
  '300',
  anyAsyncStorage,
);
export const playersPointsSumAtom = atom(
  get =>
    get(player1TotalScoreAtom) +
    get(player2TotalScoreAtom) +
    get(player3TotalScoreAtom),
);
export const isGameOverAtom = atom(
  get => get(playersPointsSumAtom) >= get(gamePointsAtom),
);
export const shouldShowGameOverMessageAtom = atomWithStorage(
  'shouldShowGameOverMessage',
  'false',
  anyAsyncStorage,
);
const playerRankingsAtom = atom(get => {
  const playerRankings = [
    {name: get(player1DisplayNameAtom), score: get(player1TotalScoreAtom)},
    {name: get(player2DisplayNameAtom), score: get(player2TotalScoreAtom)},
    {name: get(player3DisplayNameAtom), score: get(player3TotalScoreAtom)},
  ];
  playerRankings.sort((player1, player2) => player2.score - player1.score);
  return playerRankings;
});

// Preferences
export const inAppNotificationsAtom = atomWithStorage(
  'inAppNotifications',
  'true',
  anyAsyncStorage,
);

export const appLanguageAtom = atomWithStorage(
  'appLanguage',
  'el',
  anyAsyncStorage,
);

// Utils
export const allPassContractAtom = atom(
  get => get(contractAtom) === CONTRACT.allPass,
);
export const misereContractAtom = atom(
  get => get(contractAtom) === CONTRACT.misere,
);
export const allPassOrMisereContractAtom = atom(
  get => get(allPassContractAtom) || get(misereContractAtom),
);
