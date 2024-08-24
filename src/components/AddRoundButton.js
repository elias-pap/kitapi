import React from 'react';
import {Button} from 'native-base';
import {colors} from '../other/constants';
import {useAtom} from 'jotai';
import {isGameOverAtom} from '../other/state';
import {ButtonTextAndIcon} from './ButtonTextAndIcon';

const AddRoundButton = ({navigation}) => {
  const [isGameOver] = useAtom(isGameOverAtom);

  return (
    <Button
      m="4"
      colorScheme={colors.primary}
      mb="1"
      size="lg"
      isDisabled={isGameOver}
      onPress={() => navigation.navigate('AddRound')}>
      <ButtonTextAndIcon
        buttonTitle="addRound"
        iconTitle="plus-box"
        iconColor="white"
      />
    </Button>
  );
};

export {AddRoundButton};
