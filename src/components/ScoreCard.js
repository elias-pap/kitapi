import React from 'react';
import {Text, useColorModeValue, Badge, VStack, HStack} from 'native-base';
import {DiffSign} from './DiffSign';
import {colors} from '../other/constants';
import {isGameOverAtom} from '../other/state';
import {useAtom} from 'jotai';

const ScoreCard = ({playerName, score, diff, rank}) => {
  const [isGameOver] = useAtom(isGameOverAtom);

  const badge = isGameOver ? (
    <Badge colorScheme="success" mb={-6}>
      {rank}
    </Badge>
  ) : null;

  const scoreAttrs = {
    fontSize: '5xl',
  };
  if (score !== 0) {
    scoreAttrs.color = score > 0 ? colors.scorePositive : colors.scoreNegative;
  }

  const diffAttrs = {
    fontSize: '3xl',
    pt: '3.5',
  };
  if (diff !== 0) {
    diffAttrs.color = diff > 0 ? colors.diffPositive : colors.diffNegative;
  }

  return (
    <HStack
      bg={useColorModeValue(colors.light, colors.dark)}
      alignItems="center" justifyContent="space-evenly">
      <VStack width="60%" alignItems="center">
        <Text fontSize="4xl" textAlign="center">
          {playerName}
        </Text>
        {badge}
      </VStack>
      <HStack width="40%" justifyContent="center">
        <Text testID={`${playerName}-score`} {...scoreAttrs}>{score}</Text>
        <Text fontSize="4xl">{'  '}</Text>
        {diff !== 0 ? <DiffSign isDiffPositive={diff > 0} /> : null}
        <Text testID={`${playerName}-diff`} {...diffAttrs}>{`${Math.abs(diff)}`}</Text>
      </HStack>
    </HStack>
  );
};

export {ScoreCard};
