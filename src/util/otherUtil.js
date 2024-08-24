import {
  CONTRACT,
  i18nStrings,
  PLAY_CHOICE,
  ROLE,
  ROUND_RESULT,
  SOLO,
  TRUMP,
} from '../other/constants';

export const showToast = (toast, toastObject, inAppNotifications) => {
  if (inAppNotifications === 'true') {
    toast.show(toastObject);
  }
};

export const t = (word, appLanguage) => {
  return i18nStrings[appLanguage][word];
};

export const calculatePointsFromTricks = (
  player1Tricks,
  player2Tricks,
  player3Tricks,
  player1Role,
  player2Role,
  player3Role,
  contract,
  trump,
) => {
  let p1Tricks = +player1Tricks;
  let p2Tricks = +player2Tricks;
  let p3Tricks = +player3Tricks;

  if (
    !isInputValid(
      p1Tricks,
      p2Tricks,
      p3Tricks,
      player1Role,
      player2Role,
      player3Role,
      contract,
      trump,
    )
  ) {
    console.error('Input is not valid');
    return getFaultyScore();
  }

  switch (contract) {
    case CONTRACT.allPass:
      return calculateAllPassScore(p1Tricks, p2Tricks, p3Tricks);
    case CONTRACT.misere:
      return calculateMisereScore(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        player1Role,
        player2Role,
        player3Role,
      );
    default:
      return calculateRegularContractScore(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        player1Role,
        player2Role,
        player3Role,
        contract,
        trump,
      );
  }
};

export const contractRoleCheck = (contract, p1Role, p2Role, p3Role) => {
  if (contract === CONTRACT.allPass) {
    return allPlay(p1Role, p2Role, p3Role);
  }

  if (contract === CONTRACT.misere) {
    return oneBidOthersPlay(p1Role, p2Role, p3Role);
  }

  return oneBid(p1Role, p2Role, p3Role) && helpCheck(p1Role, p2Role, p3Role);
};

const allPlay = (p1Role, p2Role, p3Role) =>
  p1Role === ROLE.player && p2Role === ROLE.player && p3Role === ROLE.player;

const oneBidOthersPlay = (p1Role, p2Role, p3Role) =>
  (p1Role === ROLE.bidder &&
    p2Role === ROLE.player &&
    p3Role === ROLE.player) ||
  (p1Role === ROLE.player &&
    p2Role === ROLE.bidder &&
    p3Role === ROLE.player) ||
  (p1Role === ROLE.player && p2Role === ROLE.player && p3Role === ROLE.bidder);

const oneBid = (p1Role, p2Role, p3Role) =>
  (p1Role === ROLE.bidder &&
    p2Role !== ROLE.bidder &&
    p3Role !== ROLE.bidder) ||
  (p1Role !== ROLE.bidder &&
    p2Role === ROLE.bidder &&
    p3Role !== ROLE.bidder) ||
  (p1Role !== ROLE.bidder && p2Role !== ROLE.bidder && p3Role === ROLE.bidder);

const onePlay = (p1Role, p2Role, p3Role) =>
  (p1Role === ROLE.player &&
    p2Role !== ROLE.player &&
    p3Role !== ROLE.player) ||
  (p1Role !== ROLE.player &&
    p2Role === ROLE.player &&
    p3Role !== ROLE.player) ||
  (p1Role !== ROLE.player && p2Role !== ROLE.player && p3Role === ROLE.player);

const getHelpCount = (p1Role, p2Role, p3Role) => {
  let helpCount = 0;
  if (p1Role === ROLE.helper) {
    helpCount++;
  }
  if (p2Role === ROLE.helper) {
    helpCount++;
  }
  if (p3Role === ROLE.helper) {
    helpCount++;
  }
  return helpCount;
};

const helpCheck = (p1Role, p2Role, p3Role) => {
  const helpCount = getHelpCount(p1Role, p2Role, p3Role);

  if (helpCount > 1) {
    return false;
  }

  if (helpCount === 1) {
    return onePlay(p1Role, p2Role, p3Role);
  }

  return true;
};

const calculateAllPassScore = (p1Tricks, p2Tricks, p3Tricks) => {
  const p1Points = calculateAllPassPoints(p1Tricks);
  const p2Points = calculateAllPassPoints(p2Tricks);
  const p3Points = calculateAllPassPoints(p3Tricks);

  return {p1Points, p2Points, p3Points};
};

/**
 * Calculates points from tricks in all pass contract.
 */
const calculateAllPassPoints = tricks => {
  // 0, 1, 2, 3 --> 0
  if (tricks < 4) {
    return 0;
  }

  // 4 --> -10, 5 --> -20, etc.
  return -10 * (tricks - 3);
};

const calculateMisereScore = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
) => {
  const p1Points = p1Role === ROLE.bidder ? calculateMiserePoints(p1Tricks) : 0;
  const p2Points = p2Role === ROLE.bidder ? calculateMiserePoints(p2Tricks) : 0;
  const p3Points = p3Role === ROLE.bidder ? calculateMiserePoints(p3Tricks) : 0;

  return {p1Points, p2Points, p3Points};
};

/**
 * Calculates points from tricks for the bidder in misere contract.
 */
const calculateMiserePoints = tricks => {
  // 0 --> 100, 1 --> -100, > 1 --> -200
  if (tricks === 0) {
    return 100;
  } else if (tricks === 1) {
    return -100;
  } else {
    return -200;
  }
};

const getFaultyScore = () => {
  return {p1Points: 0, p2Points: 0, p3Points: 0};
};

export const isInputValid = (
  player1Tricks,
  player2Tricks,
  player3Tricks,
  player1Role,
  player2Role,
  player3Role,
  contract,
  trump,
) =>
  isContractInputValid(contract) &&
  isTrumpInputValid(trump) &&
  isRoleInputValid(player1Role, player2Role, player3Role) &&
  isTricksInputValid(player1Tricks, player2Tricks, player3Tricks) &&
  contractRoleCheck(contract, player1Role, player2Role, player3Role);

const isContractInputValid = contract => {
  const possibleContracts = Object.values(CONTRACT);
  return possibleContracts.includes(contract);
};

const isTrumpInputValid = trump => {
  const possibleTrumps = Object.values(TRUMP);
  return possibleTrumps.includes(trump);
};

const isRoleInputValid = (p1Role, p2Role, p3Role) => {
  const possibleRoles = Object.values(ROLE);
  return (
    possibleRoles.includes(p1Role) &&
    possibleRoles.includes(p2Role) &&
    possibleRoles.includes(p3Role)
  );
};

export const isTricksInputValid = (p1Tricks, p2Tricks, p3Tricks) => {
  return (
    p1Tricks >= 0 &&
    p1Tricks <= 10 &&
    p2Tricks >= 0 &&
    p2Tricks <= 10 &&
    p3Tricks >= 0 &&
    p3Tricks <= 10 &&
    p1Tricks + p2Tricks + p3Tricks === 10
  );
};

const calculateRegularContractScore = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  contract,
  trump,
) => {
  const roundResult = getRoundResult(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
    contract,
  );

  const pointsPerTrick = getPointsPerTrick(contract, trump);

  switch (roundResult) {
    case ROUND_RESULT.allWin:
      return calculateAllWinScore(
        pointsPerTrick,
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
      );
    case ROUND_RESULT.bidderWin:
      return calculateBidderWinScore(
        pointsPerTrick,
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        contract,
      );
    case ROUND_RESULT.playersWin:
      return calculatePlayersWinScore(
        pointsPerTrick,
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        contract,
      );
    default:
      console.error('Invalid roundResult value:', roundResult);
      return {p1Points: 0, p2Points: 0, p3Points: 0};
  }
};

const calculateAllWinScore = (
  pointsPerTrick,
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
) => {
  let p1PointsBeforeHelp = p1Tricks * pointsPerTrick;
  let p2PointsBeforeHelp = p2Tricks * pointsPerTrick;
  let p3PointsBeforeHelp = p3Tricks * pointsPerTrick;

  let {p1Points, p2Points, p3Points} = giveHelperPointsToPlayer(
    p1PointsBeforeHelp,
    p2PointsBeforeHelp,
    p3PointsBeforeHelp,
    p1Role,
    p2Role,
    p3Role,
  );

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinScore = (
  pointsPerTrick,
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  contract,
) => {
  switch (contract) {
    case CONTRACT.six:
      return calculateBidderWinSix(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
      );
    case CONTRACT.seven:
      return calculateBidderWinSeven(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
      );
    case CONTRACT.eight:
      return calculateBidderWinEight(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
      );
    case CONTRACT.nine:
      return calculateBidderWinNine(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
      );
    default:
      console.error('Unexpected contract value:', contract);
      break;
  }
};

const calculatePlayersWinScore = (
  pointsPerTrick,
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  contract,
) => {
  switch (contract) {
    case CONTRACT.six:
      return calculatePlayersWin(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
        6,
      );
    case CONTRACT.seven:
      return calculatePlayersWin(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
        7,
      );
    case CONTRACT.eight:
      return calculatePlayersWin(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
        8,
      );
    case CONTRACT.nine:
      return calculatePlayersWin(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
        9,
      );
    case CONTRACT.ten:
      return calculatePlayersWin(
        p1Tricks,
        p2Tricks,
        p3Tricks,
        p1Role,
        p2Role,
        p3Role,
        pointsPerTrick,
        10,
      );
    default:
      console.error('Unexpected contract value:', contract);
      break;
  }
};

const calculatePlayersWin = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  pointsPerTrick,
  contractTricks,
) => {
  // A is the player that scored more tricks than player B
  const {bidderTricks, pATricks, pBTricks} = calculatePlayersWinPlayerTricks(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
  );

  const {bidderPoints, pAPoints, pBPoints} = calculatePlayersWinPlayerPoints(
    bidderTricks,
    pATricks,
    pBTricks,
    pointsPerTrick,
    contractTricks,
  );

  const {
    p1Points: p1PointsBeforeHelp,
    p2Points: p2PointsBeforeHelp,
    p3Points: p3PointsBeforeHelp,
  } = calculatePlayersWinFinalPoints(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
    bidderPoints,
    pAPoints,
    pBPoints,
  );

  let {p1Points, p2Points, p3Points} = giveHelperPointsToPlayer(
    p1PointsBeforeHelp,
    p2PointsBeforeHelp,
    p3PointsBeforeHelp,
    p1Role,
    p2Role,
    p3Role,
  );

  return {p1Points, p2Points, p3Points};
};

const calculatePlayersWinPlayerTricks = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
) => {
  let bidderTricks;
  let pATricks;
  let pBTricks;

  if (p1Role === ROLE.bidder) {
    bidderTricks = p1Tricks;
    if (p2Tricks > p3Tricks) {
      pATricks = p2Tricks;
      pBTricks = p3Tricks;
    } else {
      pATricks = p3Tricks;
      pBTricks = p2Tricks;
    }
  } else if (p2Role === ROLE.bidder) {
    bidderTricks = p2Tricks;
    if (p1Tricks > p3Tricks) {
      pATricks = p1Tricks;
      pBTricks = p3Tricks;
    } else {
      pATricks = p3Tricks;
      pBTricks = p1Tricks;
    }
  } else if (p3Role === ROLE.bidder) {
    bidderTricks = p3Tricks;
    if (p1Tricks > p2Tricks) {
      pATricks = p1Tricks;
      pBTricks = p2Tricks;
    } else {
      pATricks = p2Tricks;
      pBTricks = p1Tricks;
    }
  } else {
    console.error('No bidder found in players win case');
  }

  return {bidderTricks, pATricks, pBTricks};
};

const calculatePlayersWinPlayerPoints = (
  bidderTricks,
  pATricks,
  pBTricks,
  ppt,
  contractTricks,
) => {
  let pAPoints = 0;
  let pBPoints = 0;
  let bidderPoints = 0;

  if (bidderTricks === contractTricks - 1) {
    pAPoints = pATricks * ppt;
    pBPoints = pBTricks * ppt;
    bidderPoints = -10 * ppt + -1 * (pAPoints + pBPoints);
  } else if (bidderTricks < contractTricks - 1) {
    pAPoints = pATricks * SOLO * ppt;
    pBPoints = pBTricks * SOLO * ppt;
    bidderPoints = -10 * SOLO * ppt + -1 * (pAPoints + pBPoints);
  } else {
    console.error('Unexpected bidderTricks value:', bidderTricks);
  }

  return {bidderPoints, pAPoints, pBPoints};
};

const calculatePlayersWinFinalPoints = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  bidderPoints,
  pAPoints,
  pBPoints,
) => {
  let p1Points = 0;
  let p2Points = 0;
  let p3Points = 0;

  if (p1Role === ROLE.bidder) {
    p1Points = bidderPoints;
    if (p2Tricks > p3Tricks) {
      p2Points = pAPoints;
      p3Points = pBPoints;
    } else {
      p2Points = pBPoints;
      p3Points = pAPoints;
    }
  } else if (p2Role === ROLE.bidder) {
    p2Points = bidderPoints;
    if (p1Tricks > p3Tricks) {
      p1Points = pAPoints;
      p3Points = pBPoints;
    } else {
      p1Points = pBPoints;
      p3Points = pAPoints;
    }
  } else if (p3Role === ROLE.bidder) {
    p3Points = bidderPoints;
    if (p2Tricks > p1Tricks) {
      p2Points = pAPoints;
      p1Points = pBPoints;
    } else {
      p2Points = pBPoints;
      p1Points = pAPoints;
    }
  } else {
    console.error('Invalid player win');
  }

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinSix = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  pointsPerTrick,
) => {
  // A is the player that scored more tricks than player B
  const {bidderTricks, pATricks} = calculateBidderWinSixOrEightPlayerTricks(
    p1Tricks,
    p2Tricks,
    p3Tricks,
  );

  const pBPlayed =
    p1Role !== ROLE.pass && p2Role !== ROLE.pass && p3Role !== ROLE.pass;

  const {bidderPoints, pAPoints, pBPoints} = calculateBidderWinSixPlayerPoints(
    bidderTricks,
    pATricks,
    pointsPerTrick,
    pBPlayed,
  );

  const {
    p1Points: p1PointsBeforeHelp,
    p2Points: p2PointsBeforeHelp,
    p3Points: p3PointsBeforeHelp,
  } = calculateBidderWinSixOrEightFinalPoints(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
    bidderPoints,
    pAPoints,
    pBPoints,
  );

  let {p1Points, p2Points, p3Points} = giveHelperPointsToPlayer(
    p1PointsBeforeHelp,
    p2PointsBeforeHelp,
    p3PointsBeforeHelp,
    p1Role,
    p2Role,
    p3Role,
  );

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinSixOrEightPlayerTricks = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
) => {
  const tricksArray = [p1Tricks, p2Tricks, p3Tricks];
  tricksArray.sort((a, b) => b - a);
  const bidderTricks = tricksArray[0];
  const pATricks = tricksArray[1];
  return {bidderTricks, pATricks};
};

const calculateBidderWinSevenOrNinePlayerTricks = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
) => {
  let bidderTricks;
  let pATricks;
  let pAPlayed;

  const setPlayerTricks = (bidder, pA, pAp) => {
    bidderTricks = bidder;
    pATricks = pA;
    pAPlayed = pAp;
  };

  if (p1Tricks > p2Tricks && p1Tricks > p3Tricks) {
    setPlayerTricks(p1Tricks, p2Tricks, p2Role !== ROLE.pass);
  } else if (p2Tricks > p1Tricks && p2Tricks > p3Tricks) {
    setPlayerTricks(p2Tricks, p3Tricks, p3Role !== ROLE.pass);
  } else if (p3Tricks > p1Tricks && p3Tricks > p2Tricks) {
    setPlayerTricks(p3Tricks, p1Tricks, p1Role !== ROLE.pass);
  } else {
    console.error('Invalid player tricks:', p1Tricks, p2Tricks, p3Tricks);
    setPlayerTricks(0, 0, 0, true);
  }

  return {bidderTricks, pATricks, pAPlayed};
};

const calculateBidderWinSixPlayerPoints = (
  bidderTricks,
  pATricks,
  ppt,
  pBPlayed,
) => {
  let pAPoints = 0;
  let pBPoints = 0;

  switch (bidderTricks) {
    case 7:
      switch (pATricks) {
        case 3:
          pAPoints = 3 * ppt;
          pBPoints = -10 * ppt;
          break;
        case 2:
          pAPoints = 2 * ppt;
          pBPoints = -9 * ppt;
          break;
        default:
          console.error('Unexpected pATricks value:', pATricks);
          break;
      }
      break;
    case 8:
      switch (pATricks) {
        case 2:
          pAPoints = 2 * SOLO * ppt;
          pBPoints = -10 * SOLO * ppt;
          break;
        case 1:
          pAPoints = -9 * ppt;
          pBPoints = -9 * ppt;
          break;
        default:
          console.error('Unexpected pATricks value:', pATricks);
          break;
      }
      break;
    case 9:
      pAPoints = -9 * ppt;
      pBPoints = pBPlayed ? -10 * SOLO * ppt : 0;
      break;
    case 10:
      pAPoints = -10 * SOLO * ppt;
      pBPoints = pBPlayed ? -10 * SOLO * ppt : 0;
      break;
    default:
      console.error('Unexpected bidderTricks value:', bidderTricks);
      break;
  }

  const bidderPoints = -1 * (pAPoints + pBPoints);

  return {bidderPoints, pAPoints, pBPoints};
};

const calculateBidderWinSixOrEightFinalPoints = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  bidderPoints,
  pAPoints,
  pBPoints,
) => {
  let p1Points = 0;
  let p2Points = 0;
  let p3Points = 0;

  if (p1Tricks > p2Tricks && p1Tricks > p3Tricks) {
    p1Points = bidderPoints;
    if (p2Tricks > p3Tricks) {
      p2Points = pAPoints;
      p3Points = pBPoints;
    } else if (p2Tricks === p3Tricks && p2Tricks === 0) {
      if (p2Role !== ROLE.pass) {
        p2Points = pAPoints;
        p3Points = pBPoints;
      } else {
        p2Points = pBPoints;
        p3Points = pAPoints;
      }
    } else {
      p2Points = pBPoints;
      p3Points = pAPoints;
    }
  } else if (p2Tricks > p1Tricks && p2Tricks > p3Tricks) {
    p2Points = bidderPoints;
    if (p1Tricks > p3Tricks) {
      p1Points = pAPoints;
      p3Points = pBPoints;
    } else if (p1Tricks === p3Tricks && p1Tricks === 0) {
      if (p1Role !== ROLE.pass) {
        p1Points = pAPoints;
        p3Points = pBPoints;
      } else {
        p1Points = pBPoints;
        p3Points = pAPoints;
      }
    } else {
      p1Points = pBPoints;
      p3Points = pAPoints;
    }
  } else if (p3Tricks > p1Tricks && p3Tricks > p2Tricks) {
    p3Points = bidderPoints;
    if (p2Tricks > p1Tricks) {
      p2Points = pAPoints;
      p1Points = pBPoints;
    } else if (p2Tricks === p1Tricks && p2Tricks === 0) {
      if (p2Role !== ROLE.pass) {
        p2Points = pAPoints;
        p1Points = pBPoints;
      } else {
        p2Points = pBPoints;
        p1Points = pAPoints;
      }
    } else {
      p2Points = pBPoints;
      p1Points = pAPoints;
    }
  } else {
    console.error('Invalid bidder win');
  }

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinSeven = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  pointsPerTrick,
) => {
  // A is the player that plays after the bidder
  const {bidderTricks, pATricks, pAPlayed} =
    calculateBidderWinSevenOrNinePlayerTricks(
      p1Tricks,
      p2Tricks,
      p3Tricks,
      p1Role,
      p2Role,
      p3Role,
    );

  const bothPlayed =
    p1Role !== ROLE.pass && p2Role !== ROLE.pass && p3Role !== ROLE.pass;

  const {bidderPoints, pAPoints, pBPoints} =
    calculateBidderWinSevenPlayerPoints(
      bidderTricks,
      pATricks,
      pointsPerTrick,
      bothPlayed,
      pAPlayed,
    );

  const {
    p1Points: p1PointsBeforeHelp,
    p2Points: p2PointsBeforeHelp,
    p3Points: p3PointsBeforeHelp,
  } = calculateBidderWinSevenOrNineFinalPoints(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    bidderPoints,
    pAPoints,
    pBPoints,
  );

  let {p1Points, p2Points, p3Points} = giveHelperPointsToPlayer(
    p1PointsBeforeHelp,
    p2PointsBeforeHelp,
    p3PointsBeforeHelp,
    p1Role,
    p2Role,
    p3Role,
  );

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinEight = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  pointsPerTrick,
) => {
  // A is the player that scored more tricks than player B
  const {bidderTricks} = calculateBidderWinSixOrEightPlayerTricks(
    p1Tricks,
    p2Tricks,
    p3Tricks,
  );

  const pBPlayed =
    p1Role !== ROLE.pass && p2Role !== ROLE.pass && p3Role !== ROLE.pass;

  const {bidderPoints, pAPoints, pBPoints} =
    calculateBidderWinEightPlayerPoints(bidderTricks, pointsPerTrick, pBPlayed);

  const {
    p1Points: p1PointsBeforeHelp,
    p2Points: p2PointsBeforeHelp,
    p3Points: p3PointsBeforeHelp,
  } = calculateBidderWinSixOrEightFinalPoints(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
    bidderPoints,
    pAPoints,
    pBPoints,
  );

  let {p1Points, p2Points, p3Points} = giveHelperPointsToPlayer(
    p1PointsBeforeHelp,
    p2PointsBeforeHelp,
    p3PointsBeforeHelp,
    p1Role,
    p2Role,
    p3Role,
  );

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinNine = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  pointsPerTrick,
) => {
  // A is the player that plays after the bidder
  const {bidderTricks, pAPlayed} = calculateBidderWinSevenOrNinePlayerTricks(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
  );

  const bothPlayed =
    p1Role !== ROLE.pass && p2Role !== ROLE.pass && p3Role !== ROLE.pass;

  const {bidderPoints, pAPoints, pBPoints} = calculateBidderWinNinePlayerPoints(
    bidderTricks,
    pointsPerTrick,
    bothPlayed,
    pAPlayed,
  );

  const {
    p1Points: p1PointsBeforeHelp,
    p2Points: p2PointsBeforeHelp,
    p3Points: p3PointsBeforeHelp,
  } = calculateBidderWinSevenOrNineFinalPoints(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    bidderPoints,
    pAPoints,
    pBPoints,
  );

  let {p1Points, p2Points, p3Points} = giveHelperPointsToPlayer(
    p1PointsBeforeHelp,
    p2PointsBeforeHelp,
    p3PointsBeforeHelp,
    p1Role,
    p2Role,
    p3Role,
  );

  return {p1Points, p2Points, p3Points};
};

const calculateBidderWinEightPlayerPoints = (bidderTricks, ppt, pBPlayed) => {
  let pAPoints = 0;
  let pBPoints = 0;

  switch (bidderTricks) {
    case 9:
      pAPoints = 1 * ppt;
      pBPoints = pBPlayed ? -10 * ppt : 0;
      break;
    case 10:
      pAPoints = -10 * ppt;
      pBPoints = pBPlayed ? -10 * ppt : 0;
      break;
    default:
      console.error('Unexpected bidderTricks value:', bidderTricks);
      break;
  }

  const bidderPoints = -1 * (pAPoints + pBPoints);

  return {bidderPoints, pAPoints, pBPoints};
};

const calculateBidderWinSevenPlayerPoints = (
  bidderTricks,
  pATricks,
  ppt,
  bothPlayed,
  pAPlayed,
) => {
  let pAPoints = 0;
  let pBPoints = 0;

  switch (bidderTricks) {
    case 8:
      switch (pATricks) {
        case 2:
          pAPoints = 2 * ppt;
          pBPoints = -10 * ppt;
          break;
        case 1:
          pAPoints = -9 * ppt;
          pBPoints = 1 * ppt;
          break;
        case 0:
          pAPoints = -10 * ppt;
          pBPoints = 2 * ppt;
          break;
        default:
          console.error('Unexpected pATricks value:', pATricks);
          break;
      }
      break;
    case 9:
      if (bothPlayed) {
        switch (pATricks) {
          case 1:
            pAPoints = -9 * ppt;
            pBPoints = -9 * ppt;
            break;
          case 0:
            pAPoints = -10 * SOLO * ppt;
            pBPoints = 1 * SOLO * ppt;
            break;
          default:
            console.error('Unexpected pATricks value:', pATricks);
            break;
        }
      } else if (pAPlayed) {
        pAPoints = -9 * ppt;
        pBPoints = 0;
      } else {
        pAPoints = 0;
        pBPoints = -9 * ppt;
      }
      break;
    case 10:
      if (bothPlayed) {
        pAPoints = -10 * SOLO * ppt;
        pBPoints = -10 * ppt;
      } else if (pAPlayed) {
        pAPoints = -10 * SOLO * ppt;
        pBPoints = 0;
      } else {
        pAPoints = 0;
        pBPoints = -10 * SOLO * ppt;
      }
      break;
    default:
      console.error('Unexpected bidderTricks value:', bidderTricks);
      break;
  }

  const bidderPoints = -1 * (pAPoints + pBPoints);

  return {bidderPoints, pAPoints, pBPoints};
};

const calculateBidderWinNinePlayerPoints = (
  bidderTricks,
  ppt,
  bothPlayed,
  pAPlayed,
) => {
  let pAPoints = 0;
  let pBPoints = 0;

  if (bidderTricks === 10) {
    if (bothPlayed || pAPlayed) {
      pAPoints = -10 * ppt;
      pBPoints = 0;
    } else {
      pAPoints = 0;
      pBPoints = -10 * ppt;
    }
  } else {
    console.error('Unexpected bidderTricks value:', bidderTricks);
  }

  const bidderPoints = -1 * (pAPoints + pBPoints);

  return {bidderPoints, pAPoints, pBPoints};
};

const calculateBidderWinSevenOrNineFinalPoints = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  bidderPoints,
  pAPoints,
  pBPoints,
) => {
  let p1Points = 0;
  let p2Points = 0;
  let p3Points = 0;

  const setPlayerPoints = (p1, p2, p3) => {
    p1Points = p1;
    p2Points = p2;
    p3Points = p3;
  };

  if (p1Tricks > p2Tricks && p1Tricks > p3Tricks) {
    setPlayerPoints(bidderPoints, pAPoints, pBPoints);
  } else if (p2Tricks > p1Tricks && p2Tricks > p3Tricks) {
    setPlayerPoints(pBPoints, bidderPoints, pAPoints);
  } else if (p3Tricks > p1Tricks && p3Tricks > p2Tricks) {
    setPlayerPoints(pAPoints, pBPoints, bidderPoints);
  } else {
    console.error('Invalid bidder win');
  }

  return {p1Points, p2Points, p3Points};
};

const giveHelperPointsToPlayer = (
  p1Points,
  p2Points,
  p3Points,
  p1Role,
  p2Role,
  p3Role,
) => {
  if (p1Role === ROLE.bidder) {
    if (p2Role === ROLE.helper) {
      p3Points += p2Points;
      p2Points = 0;
    } else if (p3Role === ROLE.helper) {
      p2Points += p3Points;
      p3Points = 0;
    }
  } else if (p2Role === ROLE.bidder) {
    if (p1Role === ROLE.helper) {
      p3Points += p1Points;
      p1Points = 0;
    } else if (p3Role === ROLE.helper) {
      p1Points += p3Points;
      p3Points = 0;
    }
  } else if (p3Role === ROLE.bidder) {
    if (p1Role === ROLE.helper) {
      p2Points += p1Points;
      p1Points = 0;
    } else if (p2Role === ROLE.helper) {
      p1Points += p2Points;
      p2Points = 0;
    }
  }

  return {p1Points, p2Points, p3Points};
};

export const getPointsPerTrick = (contract, trump) => {
  switch (contract) {
    case CONTRACT.six:
      switch (trump) {
        case TRUMP.spades:
          return 2;
        case TRUMP.clubs:
          return 3;
        case TRUMP.diamonds:
          return 4;
        case TRUMP.hearts:
          return 5;
        case TRUMP.noTrump:
          return 6;
        default:
          console.error('Unexpected trump value:', trump);
          return 1;
      }
    case CONTRACT.seven:
      return trump === TRUMP.noTrump ? 8 : 7;
    case CONTRACT.eight:
      return trump === TRUMP.noTrump ? 9 : 8;
    case CONTRACT.nine:
      return trump === TRUMP.noTrump ? 10 : 9;
    case CONTRACT.ten:
      return 10;
    default:
      console.error('Unexpected contract value:', contract);
      return 1;
  }
};

const getRoundResult = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
  contract,
) => {
  const bidderTricks = getBidderTricks(
    p1Tricks,
    p2Tricks,
    p3Tricks,
    p1Role,
    p2Role,
    p3Role,
  );

  const playersPlayed = getPlayersPlayed(p1Role, p2Role, p3Role);

  switch (contract) {
    case CONTRACT.six:
      return getRoundResultInSixContract(playersPlayed, bidderTricks);
    case CONTRACT.seven:
      return getRoundResultInSevenContract(playersPlayed, bidderTricks);
    case CONTRACT.eight:
      return getRoundResultInEightContract(playersPlayed, bidderTricks);
    case CONTRACT.nine:
      return getRoundResultInNineContract(playersPlayed, bidderTricks);
    case CONTRACT.ten:
      return getRoundResultInTenContract(playersPlayed, bidderTricks);
    default:
      console.error('Unexpected contract value:', contract);
      return ROUND_RESULT.allWin;
  }
};

const getRoundResultInSixContract = (playersPlayed, bidderTricks) => {
  switch (playersPlayed) {
    case PLAY_CHOICE.twoPlay:
      if (bidderTricks === 6) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 6) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 6) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.onePlay:
      if (bidderTricks >= 6 && bidderTricks <= 8) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 8) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 6) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.nonePlay:
      return ROUND_RESULT.allWin;
    default:
      console.error('Invalid playersPlayed:', playersPlayed);
      return ROUND_RESULT.allWin;
  }
};

const getRoundResultInSevenContract = (playersPlayed, bidderTricks) => {
  switch (playersPlayed) {
    case PLAY_CHOICE.twoPlay:
      if (bidderTricks === 7) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 7) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 7) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.onePlay:
      if (bidderTricks === 7 || bidderTricks === 8) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 8) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 7) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.nonePlay:
      return ROUND_RESULT.allWin;
    default:
      console.error('Invalid playersPlayed:', playersPlayed);
      return ROUND_RESULT.allWin;
  }
};

const getRoundResultInEightContract = (playersPlayed, bidderTricks) => {
  switch (playersPlayed) {
    case PLAY_CHOICE.twoPlay:
      if (bidderTricks === 8) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 8) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 8) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.onePlay:
      if (bidderTricks === 8 || bidderTricks === 9) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 9) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 8) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.nonePlay:
      return ROUND_RESULT.allWin;
    default:
      console.error('Invalid playersPlayed:', playersPlayed);
      return ROUND_RESULT.allWin;
  }
};

const getRoundResultInNineContract = (playersPlayed, bidderTricks) => {
  switch (playersPlayed) {
    case PLAY_CHOICE.twoPlay:
    case PLAY_CHOICE.onePlay:
      if (bidderTricks === 9) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks > 9) {
        return ROUND_RESULT.bidderWin;
      } else if (bidderTricks < 9) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.nonePlay:
      return ROUND_RESULT.allWin;
    default:
      console.error('Invalid playersPlayed:', playersPlayed);
      return ROUND_RESULT.allWin;
  }
};

const getRoundResultInTenContract = (playersPlayed, bidderTricks) => {
  switch (playersPlayed) {
    case PLAY_CHOICE.twoPlay:
    case PLAY_CHOICE.onePlay:
      if (bidderTricks === 10) {
        return ROUND_RESULT.allWin;
      } else if (bidderTricks < 10) {
        return ROUND_RESULT.playersWin;
      } else {
        console.error('Invalid bidderTricks:', bidderTricks);
        return ROUND_RESULT.allWin;
      }
    case PLAY_CHOICE.nonePlay:
      return ROUND_RESULT.allWin;
    default:
      console.error('Invalid playersPlayed:', playersPlayed);
      return ROUND_RESULT.allWin;
  }
};

const getBidderTricks = (
  p1Tricks,
  p2Tricks,
  p3Tricks,
  p1Role,
  p2Role,
  p3Role,
) => {
  if (p1Role === ROLE.bidder) {
    return p1Tricks;
  } else if (p2Role === ROLE.bidder) {
    return p2Tricks;
  } else if (p3Role === ROLE.bidder) {
    return p3Tricks;
  } else {
    console.error('No bidder specified.');
    return p1Tricks;
  }
};

const getPlayersPlayed = (p1Role, p2Role, p3Role) => {
  const roleArray = [p1Role, p2Role, p3Role];

  let playCount = 0;
  let bidCount = 0;
  let helpCount = 0;

  for (const role of roleArray) {
    switch (role) {
      case ROLE.player:
        playCount++;
        break;
      case ROLE.bidder:
        bidCount++;
        break;
      case ROLE.helper:
        helpCount++;
        break;
      case ROLE.pass:
        break;
      default:
        console.error('Unknown role:', role);
        break;
    }
  }

  if (bidCount !== 1) {
    console.error('Did not found one bidder. Roles:', p1Role, p2Role, p3Role);
    return PLAY_CHOICE.nonePlay;
  }

  if (playCount === 0) {
    return PLAY_CHOICE.nonePlay;
  } else if (playCount === 1 && helpCount === 0) {
    return PLAY_CHOICE.onePlay;
  } else if (playCount === 2 || (playCount === 1 && helpCount === 1)) {
    return PLAY_CHOICE.twoPlay;
  } else {
    console.error(
      'Unable to find number of players who played. Roles:',
      p1Role,
      p2Role,
      p3Role,
    );
    return PLAY_CHOICE.nonePlay;
  }
};
