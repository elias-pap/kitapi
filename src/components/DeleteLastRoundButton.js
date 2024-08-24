import React from 'react';
import {Button} from 'native-base';
import {useAtom} from 'jotai';
import {lastRoundNumberAtom} from '../other/state';
import {colors} from '../other/constants';
import {ButtonTextAndIcon} from './ButtonTextAndIcon';

const DeleteLastRoundButton = ({navigation}) => {
  const [lastRoundNumber] = useAtom(lastRoundNumberAtom);

  return (
    <Button
      isDisabled={lastRoundNumber < 1}
      m="4"
      colorScheme={colors.secondary}
      mb="1"
      size="lg"
      onPress={() => navigation.navigate('DeleteRound')}>
      <ButtonTextAndIcon
        buttonTitle="deleteLastRound"
        iconTitle="delete"
        iconColor="white"
      />
    </Button>
  );
};

export {DeleteLastRoundButton};
