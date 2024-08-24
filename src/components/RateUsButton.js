import React from 'react';
import {Button} from 'native-base';
import {colors} from '../other/constants';
import {Linking} from 'react-native';
import {ButtonTextAndIcon} from './ButtonTextAndIcon';

const RateUsButton = () => {
  const onPress = () => {
    Linking.openURL('market://details?id=me.eliaspap.kitapi');
  };

  return (
    <Button
      m="4"
      colorScheme="lightBlue"
      mb="1"
      size="lg"
      onPress={onPress}>
      <ButtonTextAndIcon
        buttonTitle="rateUs"
        iconTitle="cards-heart"
        iconColor={colors.heartsSymbol}
      />
    </Button>
  );
};

export {RateUsButton};
