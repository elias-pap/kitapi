import React from 'react';
import {Button, Text, useToast} from 'native-base';
import {useAtom} from 'jotai';
import {colors, ROUNDS_TAB_INDEX} from '../other/constants';
import {
  player1DisplayNameAtom,
  player2DisplayNameAtom,
  player3DisplayNameAtom,
  initRoundsAtom,
  gamePointsAtom,
  tabIndexAtom,
  shouldShowGameOverMessageAtom,
  inAppNotificationsAtom,
  appLanguageAtom,
} from '../other/state';
import {showToast, t} from '../util/otherUtil';
import {ToastAlert} from './ToastAlert';

const ConfirmNewGameButton = ({
  navigation,
  player1TextInput,
  player2TextInput,
  player3TextInput,
  gamePointsInput,
}) => {
  const [, setPlayer1DisplayName] = useAtom(player1DisplayNameAtom);
  const [, setPlayer2DisplayName] = useAtom(player2DisplayNameAtom);
  const [, setPlayer3DisplayName] = useAtom(player3DisplayNameAtom);
  const [, setGamePoints] = useAtom(gamePointsAtom);
  const [, initRounds] = useAtom(initRoundsAtom);
  const [, setIndex] = useAtom(tabIndexAtom);
  const [, setShouldShowGameOverMessage] = useAtom(
    shouldShowGameOverMessageAtom,
  );
  const [inAppNotifications] = useAtom(inAppNotificationsAtom);
  const [appLanguage] = useAtom(appLanguageAtom);
  const toast = useToast();

  const newGame = () => {
    setPlayer1DisplayName(player1TextInput);
    setPlayer2DisplayName(player2TextInput);
    setPlayer3DisplayName(player3TextInput);
    setGamePoints(gamePointsInput);
    initRounds();
  };

  const onPress = () => {
    newGame();
    setIndex(ROUNDS_TAB_INDEX);
    navigation.goBack();
    setShouldShowGameOverMessage('true');
    showToast(
      toast,
      {
        duration: 4000,
        placement: 'top',
        render: () => (
          <ToastAlert
            title={`${t('startedANewGame', appLanguage)} (${gamePointsInput})`}
            description={`${t('goodLuckAndHaveFun', appLanguage)}`}
          />
        ),
      },
      inAppNotifications,
    );
  };

  const isDisabled = () =>
    !player1TextInput ||
    !player2TextInput ||
    !player3TextInput ||
    player1TextInput === player2TextInput ||
    player1TextInput === player3TextInput ||
    player2TextInput === player3TextInput;

  return (
    <Button
      flex={1}
      colorScheme={colors.primary}
      m="4"
      mb="1"
      size="lg"
      isDisabled={isDisabled()}
      onPress={onPress}>
      <Text fontSize="lg">{t('start', appLanguage)}</Text>
    </Button>
  );
};

export {ConfirmNewGameButton};
