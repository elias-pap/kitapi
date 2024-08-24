import React from 'react';
import {useColorModeValue, VStack, HStack, Text} from 'native-base';
import {colors} from '../other/constants';
import {CancelButton} from '../components/CancelButton';
import {ConfirmDeleteRoundButton} from '../components/ConfirmDeleteRoundButton';
import {useAtom} from 'jotai';
import {appLanguageAtom, lastRoundNumberAtom} from '../other/state';
import {t} from '../util/otherUtil';

const contentContainerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const DeleteRound = ({navigation}) => {
  const [lastRoundNumber] = useAtom(lastRoundNumberAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <VStack
      flex={1}
      bg={useColorModeValue(colors.light, colors.dark)}
      _contentContainerStyle={contentContainerStyle}>
      <VStack flex={1} alignItems="center" justifyContent="center" p="8">
        <Text fontSize="2xl">
          {t('deleteRound', appLanguage)} #{lastRoundNumber} ?
        </Text>
      </VStack>
      <HStack bg={useColorModeValue(colors.light, colors.dark)} pb="4">
        <CancelButton navigation={navigation} />
        <ConfirmDeleteRoundButton navigation={navigation} />
      </HStack>
    </VStack>
  );
};

export {DeleteRound};
