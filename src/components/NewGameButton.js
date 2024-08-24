import React from 'react';
import {Button} from 'native-base';
import {colors} from '../other/constants';
import {ButtonTextAndIcon} from './ButtonTextAndIcon';

const NewGameButton = ({navigation}) => {
  return (
    <Button
      m="4"
      colorScheme={colors.primary}
      mb="1"
      size="lg"
      onPress={() => navigation.navigate('NewGame')}>
      <ButtonTextAndIcon
        buttonTitle="newGame"
        iconTitle="cards"
        iconColor="white"
      />
    </Button>
  );
};

export {NewGameButton};
