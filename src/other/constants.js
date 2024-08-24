import AsyncStorage from '@react-native-async-storage/async-storage';

// Styles

export const colors = {
  light: 'warmGray.50',
  lightRGB: '#fafaf9',
  dark: 'coolGray.800',
  darkRGB: '#1f2937',
  primary: 'emerald',
  primaryRGB: '#10b981',
  secondary: 'danger',
  disabled: 'gray.600',
  disabledRGB: '#57534e',
  scorePositive: 'green.500',
  scoreNegative: 'red.500',
  diffPositive: 'green.600',
  diffPositiveRGB: '#16a34a',
  diffNegative: 'red.600',
  diffNegativeRGB: '#dc2626',
  spadesSymbol: 'gray',
  clubsSymbol: 'gray',
  diamondsSymbol: '#b91c1c',
  heartsSymbol: '#b91c1c',
  noTrumpSymbol: 'darkred',
};

// State

export const anyAsyncStorage = {
  getItem: key => AsyncStorage.getItem(key).then(str => JSON.parse(str || '')),
  setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),
  delayInit: true,
};

export const roundsInit = [
  {
    text: '#',
    isHeader: true,
    isFirstColumn: true,
  },
  {
    text: 'C',
    isHeader: true,
    isSecondColumn: true,
  },
  {
    text: 'Player 1',
    isHeader: true,
    isThirdColumn: true,
  },
  {
    text: 'Player 2',
    isHeader: true,
  },
  {
    text: 'Player 3',
    isHeader: true,
  },
  {
    text: '-',
    isFirstColumn: true,
    isSecondRow: true,
  },
  {
    text: '-',
    isSecondColumn: true,
    isSecondRow: true,
  },
  {
    text: 0,
    isSecondRow: true,
    isThirdColumn: true,
  },
  {
    text: 0,
    isSecondRow: true,
  },
  {
    text: 0,
    isSecondRow: true,
  },
];

// Translations

export const i18nStrings = {
  en: {
    add: 'ADD',
    addRound: 'ADD ROUND',
    addedRound: 'Added round',
    allPass: 'All Pass',
    allPassInitials: 'AP',
    application: 'Application',
    auto: 'Auto',
    bidder: 'Bidder',
    c: 'C',
    cancel: 'CANCEL',
    congratulations: 'Congratulations !',
    contract: 'Contract',
    delete: 'DELETE',
    deleteLastRound: 'DELETE LAST ROUND',
    deleteRound: 'Delete round',
    deletedRound: 'Deleted round',
    game: 'GAME',
    gameControl: 'Game Control',
    gameIsOver: 'Game is over',
    gameOver: 'Game Over !',
    gamePoints: 'Game Points',
    gameProgress: 'Game Progress',
    goodLuckAndHaveFun: 'Good luck and have fun !',
    helper: 'Helper',
    inAppNotifications: 'In-App Notifications',
    misere: 'Misere',
    misereInitial: 'M',
    newGame: 'NEW GAME',
    pass: 'Pass',
    player: 'Player',
    player1: 'Player 1',
    player2: 'Player 2',
    player3: 'Player 3',
    playerNames: 'Player Names',
    points: 'Points',
    preferences: 'Preferences',
    rateUs: 'RATE US',
    roles: 'Roles',
    rounds: 'ROUNDS',
    score: 'SCORE',
    sendUsAMessage: 'SEND US A MESSAGE',
    start: 'START',
    startedANewGame: 'New game',
    tricks: 'Tricks',
    trump: 'Trump',
  },
  el: {
    add: 'ΠΡΟΣΘΗΚΗ',
    addRound: 'ΠΡΟΣΘΗΚΗ ΓΥΡΟΥ',
    addedRound: 'Προστέθηκε ο γύρος',
    allPass: 'Όλοι Πάσο',
    allPassInitials: 'ΟΠ',
    application: 'Εφαρμογή',
    auto: 'Αυτόματο',
    bidder: 'Τζογαδόρος',
    c: 'Σ',
    cancel: 'ΑΚΥΡΟ',
    congratulations: 'Συγχαρητήρια !',
    contract: 'Συμβόλαιο',
    delete: 'ΔΙΑΓΡΑΦΗ',
    deleteLastRound: 'ΔΙΑΓΡΑΦΗ ΤΕΛΕΥΤΑΙΟΥ ΓΥΡΟΥ',
    deleteRound: 'Διαγραφή γύρου',
    deletedRound: 'Διαγράφηκε ο γύρος',
    game: 'ΠΑΙΧΝΙΔΙ',
    gameControl: 'Χειρισμός Παιχνιδιού',
    gameIsOver: 'Τέλος παιχνιδιού',
    gameOver: 'Τέλος Παιχνιδιού !',
    gamePoints: 'Πόντοι Παιχνιδιού',
    gameProgress: 'Πρόοδος Παιχνιδιού',
    goodLuckAndHaveFun: 'Καλή τύχη και καλή διασκέδαση !',
    helper: 'Βοηθός',
    inAppNotifications: 'Εσωτερικές Ειδοποιήσεις',
    misere: 'Μιζέρι',
    misereInitial: 'Μ',
    newGame: 'ΝΕΟ ΠΑΙΧΝΙΔΙ',
    pass: 'Πάσο',
    player: 'Παίκτης',
    player1: 'Παίκτης 1',
    player2: 'Παίκτης 2',
    player3: 'Παίκτης 3',
    points: 'Πόντοι',
    playerNames: 'Ονόματα Παικτών',
    preferences: 'Προτιμήσεις',
    rateUs: 'ΒΑΘΜΟΛΟΓΗΣΤΕ ΜΑΣ',
    roles: 'Ρόλοι',
    rounds: 'ΓΥΡΟΙ',
    score: 'ΣΚΟΡ',
    sendUsAMessage: 'ΣΤΕΙΛΤΕ ΜΑΣ ΕΝΑ ΜΗΝΥΜΑ',
    start: 'ΕΝΑΡΞΗ',
    startedANewGame: 'Νέο παιχνίδι',
    tricks: 'Μπάζες',
    trump: 'Ατού',
  },
};

// Other

export const CONTRACT = {
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  allPass: 'allpass',
  misere: 'misere',
};

export const TRUMP = {
  spades: 'S',
  clubs: 'C',
  diamonds: 'D',
  hearts: 'H',
  noTrump: 'NT',
  none: 'none',
};

export const ROLE = {
  player: 'player',
  bidder: 'bidder',
  helper: 'helper',
  pass: 'pass',
};

export const ROUND_RESULT = {
  allWin: 'allwin',
  playersWin: 'playerswin',
  bidderWin: 'bidderwin',
};

export const PLAY_CHOICE = {
  twoPlay: 'twoplay',
  onePlay: 'oneplay',
  nonePlay: 'noneplay',
};

export const SOLO = 2;

export const ROUND_TABLE_COLUMNS = 5;

export const SCORE_TAB_INDEX = 0;
export const ROUNDS_TAB_INDEX = 1;
export const GAME_TAB_INDEX = 2;
