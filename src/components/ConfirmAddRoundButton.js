import React from 'react';
import {Button, Text, useToast} from 'native-base';
import {colors} from '../other/constants';
import {useAtom} from 'jotai';
import {
  addRoundAtomAPI,
  autoModeAtom,
  contractAtom,
  lastRoundNumberAtom,
  player1PointsAPIAtom,
  player1PointsInputAPIAtom,
  player1TricksAPIAtom,
  player1RoleAPIAtom,
  player2PointsAPIAtom,
  player2PointsInputAPIAtom,
  player2TricksAPIAtom,
  player2RoleAPIAtom,
  player3PointsAPIAtom,
  player3PointsInputAPIAtom,
  player3TricksAPIAtom,
  player3RoleAPIAtom,
  trumpAPIAtom,
  inAppNotificationsAtom,
  appLanguageAtom,
} from '../other/state';
import {addRound} from '../util/stateUtil';
import {contractRoleCheck, isInputValid, showToast, t} from '../util/otherUtil';
import {ToastAlert} from './ToastAlert';

const ConfirmAddRoundButton = ({navigation}) => {
  const [player1Role] = useAtom(player1RoleAPIAtom);
  const [player2Role] = useAtom(player2RoleAPIAtom);
  const [player3Role] = useAtom(player3RoleAPIAtom);
  const [player1Tricks] = useAtom(player1TricksAPIAtom);
  const [player2Tricks] = useAtom(player2TricksAPIAtom);
  const [player3Tricks] = useAtom(player3TricksAPIAtom);
  const [player1Points] = useAtom(player1PointsAPIAtom);
  const [player2Points] = useAtom(player2PointsAPIAtom);
  const [player3Points] = useAtom(player3PointsAPIAtom);
  const [player1PointsInput] = useAtom(player1PointsInputAPIAtom);
  const [player2PointsInput] = useAtom(player2PointsInputAPIAtom);
  const [player3PointsInput] = useAtom(player3PointsInputAPIAtom);
  const [, addRoundAPI] = useAtom(addRoundAtomAPI);
  const [autoMode] = useAtom(autoModeAtom);
  const [lastRoundNumber] = useAtom(lastRoundNumberAtom);
  const [contract] = useAtom(contractAtom);
  const [trump] = useAtom(trumpAPIAtom);
  const [inAppNotifications] = useAtom(inAppNotificationsAtom);
  const [appLanguage] = useAtom(appLanguageAtom);
  const toast = useToast();

  const isPlayerTricksInputValid = () =>
    isInputValid(
      player1Tricks,
      player2Tricks,
      player3Tricks,
      player1Role,
      player2Role,
      player3Role,
      contract,
      trump,
    );

  const isPlayerPointsInputValid = () => {
    if (
      player1Points.toString() !== player1PointsInput.trim() ||
      player2Points.toString() !== player2PointsInput.trim() ||
      player3Points.toString() !== player3PointsInput.trim()
    ) {
      return false;
    }
    return contractRoleCheck(contract, player1Role, player2Role, player3Role);
  };

  const isDisabled = autoMode
    ? !isPlayerTricksInputValid()
    : !isPlayerPointsInputValid();

  const onPress = () => {
    addRound(
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
    );
    navigation.goBack();
    showToast(
      toast,
      {
        duration: 4000,
        placement: 'top',
        render: () => (
          <ToastAlert
            title={`${t('addedRound', appLanguage)} #${lastRoundNumber + 1}`}
            status="success"
          />
        ),
      },
      inAppNotifications,
    );
  };

  return (
    <Button
      isDisabled={isDisabled}
      flex={1}
      colorScheme={colors.primary}
      m="4"
      mb="1"
      size="lg"
      onPress={onPress}>
      <Text fontSize="lg">{t('add', appLanguage)}</Text>
    </Button>
  );
};

export {ConfirmAddRoundButton};
