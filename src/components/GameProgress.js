import React from 'react';
import {Text, useColorModeValue, Progress, VStack} from 'native-base';
import {colors} from '../other/constants';
import {useAtom} from 'jotai';
import {
  appLanguageAtom,
  gamePointsAtom,
  isGameOverAtom,
  playersPointsSumAtom,
} from '../other/state';
import {t} from '../util/otherUtil';

const GameProgress = () => {
  const [gamePoints] = useAtom(gamePointsAtom);
  const [playersPointsSum] = useAtom(playersPointsSumAtom);
  const [isGameOver] = useAtom(isGameOverAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  const gameProgressText = isGameOver
    ? t('gameIsOver', appLanguage)
    : `${t('gameProgress', appLanguage)}: ${playersPointsSum}/${gamePoints}`;

  return (
    <VStack bg={useColorModeValue(colors.light, colors.dark)} height="12%">
      <Text alignSelf="center" fontSize="lg">
        {gameProgressText}
      </Text>
      <Progress
        testID="game-progress-bar"
        colorScheme={colors.primary}
        value={playersPointsSum}
        m="4"
        size="2xl"
        min={0}
        max={gamePoints}
      />
    </VStack>
  );
};

export {GameProgress};
