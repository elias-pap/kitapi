import React from 'react';
import {Button, Text, useToast} from 'native-base';
import {useAtom} from 'jotai';
import {
  appLanguageAtom,
  deleteLastRoundAtomAPI,
  inAppNotificationsAtom,
  lastRoundNumberAtom,
  tabIndexAtom,
} from '../other/state';
import {colors, ROUNDS_TAB_INDEX} from '../other/constants';
import {showToast, t} from '../util/otherUtil';
import {ToastAlert} from './ToastAlert';

const ConfirmDeleteRoundButton = ({navigation}) => {
  const [, deleteRoundAPI] = useAtom(deleteLastRoundAtomAPI);
  const [lastRoundNumber] = useAtom(lastRoundNumberAtom);
  const [, setIndex] = useAtom(tabIndexAtom);
  const [inAppNotifications] = useAtom(inAppNotificationsAtom);
  const [appLanguage] = useAtom(appLanguageAtom);
  const toast = useToast();

  const onPress = () => {
    deleteRoundAPI();
    setIndex(ROUNDS_TAB_INDEX);
    navigation.goBack();
    showToast(
      toast,
      {
        duration: 4000,
        placement: 'top',
        render: () => (
          <ToastAlert
            title={`${t('deletedRound', appLanguage)} #${lastRoundNumber}`}
            status="success"
          />
        ),
      },
      inAppNotifications,
    );
  };

  return (
    <Button
      flex={1}
      colorScheme={colors.secondary}
      m="4"
      mb="1"
      size="lg"
      onPress={onPress}>
      <Text fontSize="lg">{t('delete', appLanguage)}</Text>
    </Button>
  );
};

export {ConfirmDeleteRoundButton};
