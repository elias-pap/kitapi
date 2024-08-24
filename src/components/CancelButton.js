import React from 'react';
import {Button, Text} from 'native-base';
import {useAtom} from 'jotai';
import {appLanguageAtom} from '../other/state';
import {t} from '../util/otherUtil';

const CancelButton = ({navigation}) => {
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <Button
      flex={1}
      colorScheme="gray"
      m="4"
      mb="1"
      size="lg"
      onPress={() => navigation.goBack()}>
      <Text fontSize="lg">{t('cancel', appLanguage)}</Text>
    </Button>
  );
};

export {CancelButton};
