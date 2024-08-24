import {useAtom} from 'jotai';
import {HStack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {appLanguageAtom} from '../other/state';
import {t} from '../util/otherUtil';

export const ButtonTextAndIcon = ({buttonTitle, iconTitle, iconColor}) => {
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <HStack>
      <Text fontSize="xl" paddingTop={0.5}>
        {t(buttonTitle, appLanguage)}
      </Text>
      <Text>{'   '}</Text>
      <Icon name={iconTitle} size={30} color={iconColor} />
    </HStack>
  );
};
