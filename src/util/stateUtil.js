import {ROLE} from '../other/constants';
import {calculatePointsFromTricks} from './otherUtil';

export const addRound = (
  autoMode,
  lastRoundNumber,
  contract,
  trump,
  player1Role,
  player2Role,
  player3Role,
  player1Tricks,
  player2Tricks,
  player3Tricks,
  player1Points,
  player2Points,
  player3Points,
  addRoundAPI,
) => {
  const newRound = [
    {
      text: lastRoundNumber + 1,
      isFirstColumn: true,
    },
    {
      isSecondColumn: true,
      contract,
      trump,
    },
    {
      isThirdColumn: true,
    },
    {},
    {},
  ];

  if (autoMode) {
    const pointsFromTricks = calculatePointsFromTricks(
      player1Tricks,
      player2Tricks,
      player3Tricks,
      player1Role,
      player2Role,
      player3Role,
      contract,
      trump,
    );
    newRound[2].text = pointsFromTricks.p1Points;
    newRound[3].text = pointsFromTricks.p2Points;
    newRound[4].text = pointsFromTricks.p3Points;
  } else {
    newRound[2].text = player1Points;
    newRound[3].text = player2Points;
    newRound[4].text = player3Points;
  }

  if (player1Role === ROLE.bidder) {
    newRound[2].isBidder = true;
  } else if (player2Role === ROLE.bidder) {
    newRound[3].isBidder = true;
  } else if (player3Role === ROLE.bidder) {
    newRound[4].isBidder = true;
  }
  addRoundAPI(newRound);
};

export const getPlayerRank = (myName, playerRankings) => {
  const {name: firstPlayerName, score: firstPlayerScore} = playerRankings[0];
  const {name: secondPlayerName, score: secondPlayerScore} = playerRankings[1];
  const {name: thirdPlayerName, score: thirdPlayerScore} = playerRankings[2];

  if (
    firstPlayerScore === secondPlayerScore &&
    firstPlayerScore === thirdPlayerScore
  ) {
    return '1st (Tie)';
  }

  if (firstPlayerScore === secondPlayerScore) {
    if (myName === firstPlayerName || myName === secondPlayerName) {
      return '1st (Tie)';
    } else {
      return '2nd';
    }
  }

  if (secondPlayerScore === thirdPlayerScore) {
    if (myName === secondPlayerName || myName === thirdPlayerName) {
      return '2nd (Tie)';
    } else {
      return '1st';
    }
  }

  if (myName === firstPlayerName) {
    return '1st';
  } else if (myName === secondPlayerName) {
    return '2nd';
  } else {
    return '3rd';
  }
};
