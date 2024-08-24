import React from 'react';
import {Heading, HStack, Switch, VStack, Text} from 'native-base';
import {PlayerScoreSelect} from './PlayerScoreSelect';
import {
  player1DisplayNameAtom,
  player1PlayedAPIAtom,
  player1TricksAPIAtom,
  player2DisplayNameAtom,
  player2PlayedAPIAtom,
  player2TricksAPIAtom,
  player3DisplayNameAtom,
  player3PlayedAPIAtom,
  player3TricksAPIAtom,
  autoModeAtom,
  player1PointsAPIAtom,
  player2PointsAPIAtom,
  player3PointsAPIAtom,
  player1PointsInputAPIAtom,
  player2PointsInputAPIAtom,
  player3PointsInputAPIAtom,
  appLanguageAtom,
} from '../other/state';
import {useAtom} from 'jotai';
import {t} from '../util/otherUtil';
import {colors} from '../other/constants';

const ScoreSelect = () => {
  const [autoMode, setAutoMode] = useAtom(autoModeAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
  }

  return (
    <VStack alignItems="center" py="8">
      <Heading size="xl">
        {autoMode ? t('tricks', appLanguage) : t('points', appLanguage)}
      </Heading>
      <HStack pb="4">
        <Text pl="4" fontSize="lg">
          {t('auto', appLanguage)}
        </Text>
        <Switch
          pt="1"
          isChecked={autoMode}
          onToggle={toggleAutoMode}
          colorScheme={colors.primary}
        />
      </HStack>
      <VStack>
        <PlayerScoreSelect
          playerDisplayNameAtom={player1DisplayNameAtom}
          playerPlayedAtom={player1PlayedAPIAtom}
          playerTricksAtom={player1TricksAPIAtom}
          playerPointsAtom={player1PointsAPIAtom}
          playerPointsInputAtom={player1PointsInputAPIAtom}
        />
        <PlayerScoreSelect
          playerDisplayNameAtom={player2DisplayNameAtom}
          playerPlayedAtom={player2PlayedAPIAtom}
          playerTricksAtom={player2TricksAPIAtom}
          playerPointsAtom={player2PointsAPIAtom}
          playerPointsInputAtom={player2PointsInputAPIAtom}
        />
        <PlayerScoreSelect
          playerDisplayNameAtom={player3DisplayNameAtom}
          playerPlayedAtom={player3PlayedAPIAtom}
          playerTricksAtom={player3TricksAPIAtom}
          playerPointsAtom={player3PointsAPIAtom}
          playerPointsInputAtom={player3PointsInputAPIAtom}
        />
      </VStack>
    </VStack>
  );
};

export {ScoreSelect};
