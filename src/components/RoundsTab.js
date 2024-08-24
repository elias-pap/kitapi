import React, {useEffect} from 'react';
import {useColorModeValue, useToast, VStack} from 'native-base';
import {colors} from '../other/constants';
import {RoundsRows} from './RoundsRows';
import {AddRoundButton} from './AddRoundButton';
import {
  shouldShowGameOverMessageAtom,
  isGameOverAtom,
  inAppNotificationsAtom,
  appLanguageAtom,
} from '../other/state';
import {useAtom} from 'jotai';
import {showToast, t} from '../util/otherUtil';
import {ToastAlert} from './ToastAlert';

const RoundsTab = ({navigation}) => {
  const [shouldShowGameOverMessage, setShouldShowGameOverMessage] = useAtom(
    shouldShowGameOverMessageAtom,
  );
  const [isGameOver] = useAtom(isGameOverAtom);
  const [inAppNotifications] = useAtom(inAppNotificationsAtom);
  const [appLanguage] = useAtom(appLanguageAtom);
  const toast = useToast();

  useEffect(() => {
    if (isGameOver && shouldShowGameOverMessage === 'true') {
      showToast(
        toast,
        {
          duration: 5000,
          placement: 'top',
          render: () => (
            <ToastAlert
              title={t('gameIsOver', appLanguage)}
              description={t('congratulations', appLanguage)}
            />
          ),
        },
        inAppNotifications,
      );
      setShouldShowGameOverMessage('false');
    }
  });

  return (
    <VStack flex={1} bg={useColorModeValue(colors.light, colors.dark)}>
      <RoundsRows />
      <AddRoundButton navigation={navigation} />
    </VStack>
  );
};

export {RoundsTab};
