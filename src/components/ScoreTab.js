import React from 'react';
import {useColorModeValue, VStack} from 'native-base';
import {ScoreCard} from './ScoreCard';
import {useAtom} from 'jotai';
import {
  player1DisplayNameAtom,
  player2DisplayNameAtom,
  player3DisplayNameAtom,
  player1TotalScoreAtom,
  player2TotalScoreAtom,
  player3TotalScoreAtom,
  player1LastScoreAtom,
  player2LastScoreAtom,
  player3LastScoreAtom,
  player1ScoreStatusAtom,
  player2ScoreStatusAtom,
  player3ScoreStatusAtom,
} from '../other/state';
import {GameProgress} from './GameProgress';
import {colors} from '../other/constants';

const ScoreTab = () => {
  const [player1DisplayName] = useAtom(player1DisplayNameAtom);
  const [player2DisplayName] = useAtom(player2DisplayNameAtom);
  const [player3DisplayName] = useAtom(player3DisplayNameAtom);
  const [player1TotalScore] = useAtom(player1TotalScoreAtom);
  const [player2TotalScore] = useAtom(player2TotalScoreAtom);
  const [player3TotalScore] = useAtom(player3TotalScoreAtom);
  const [player1LastScore] = useAtom(player1LastScoreAtom);
  const [player2LastScore] = useAtom(player2LastScoreAtom);
  const [player3LastScore] = useAtom(player3LastScoreAtom);
  const [player1ScoreStatus] = useAtom(player1ScoreStatusAtom);
  const [player2ScoreStatus] = useAtom(player2ScoreStatusAtom);
  const [player3ScoreStatus] = useAtom(player3ScoreStatusAtom);

  return (
    <VStack
      height="100%"
      justifyContent="space-between"
      bg={useColorModeValue(colors.light, colors.dark)}>
      <GameProgress />
      <VStack height="88%" justifyContent="space-evenly">
        <ScoreCard
          playerName={player1DisplayName}
          score={player1TotalScore}
          diff={player1LastScore}
          rank={player1ScoreStatus}
        />
        <ScoreCard
          playerName={player2DisplayName}
          score={player2TotalScore}
          diff={player2LastScore}
          rank={player2ScoreStatus}
        />
        <ScoreCard
          playerName={player3DisplayName}
          score={player3TotalScore}
          diff={player3LastScore}
          rank={player3ScoreStatus}
        />
      </VStack>
    </VStack>
  );
};

export {ScoreTab};
