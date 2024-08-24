import React from 'react';
import {Text, HStack} from 'native-base';
import {useAtom} from 'jotai';
import {autoModeAtom} from '../other/state';
import {TricksInput} from './TricksInput';
import {PointsInput} from './PointsInput';

const PlayerScoreSelect = ({
  playerDisplayNameAtom,
  playerPlayedAtom,
  playerTricksAtom,
  playerPointsAtom,
  playerPointsInputAtom,
}) => {
  const [displayName] = useAtom(playerDisplayNameAtom);
  const [played] = useAtom(playerPlayedAtom);
  const [, setPoints] = useAtom(playerPointsAtom);
  const [pointsInput, setPointsInput] = useAtom(playerPointsInputAtom);
  const [autoMode] = useAtom(autoModeAtom);

  const isPointsInputValid = points => {
    if (Number.isNaN(points)) {
      return false;
    }
    const pointsInt = Number.parseInt(points, 10);
    if (!Number.isInteger(pointsInt) || Math.abs(points) > 1000) {
      return false;
    }
    return true;
  };

  const validateAndSetPointsInput = points => {
    setPointsInput(points);
    if (isPointsInputValid(points)) {
      setPoints(Number.parseInt(points, 10));
    } else {
      setPoints(0);
    }
  };

  let scoreInput;

  if (autoMode) {
    scoreInput = (
      <TricksInput played={played} playerTricksAtom={playerTricksAtom} />
    );
  } else {
    scoreInput = (
      <PointsInput
        played={played}
        pointsInput={pointsInput}
        validateAndSetPointsInput={validateAndSetPointsInput}
      />
    );
  }

  return (
    <HStack my="2" alignItems="center" justifyContent="space-between">
      <Text fontSize="2xl" width="50%" textAlign="center" flexGrow={1}>
        {displayName}
      </Text>
      {scoreInput}
    </HStack>
  );
};

export {PlayerScoreSelect};
