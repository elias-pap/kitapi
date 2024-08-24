import React from 'react';
import {Button} from 'native-base';
import {Linking} from 'react-native';
import {ButtonTextAndIcon} from './ButtonTextAndIcon';

const SendUsAMessageButton = () => {
  const onPress = () => {
    Linking.openURL(
      'mailto:eliaspap.apps+kitapi@pm.me?subject=Feedback for Kitapi',
    );
  };

  return (
    <Button
      m="4"
      colorScheme="violet"
      mb="1"
      size="lg"
      onPress={onPress}>
      <ButtonTextAndIcon
        buttonTitle="sendUsAMessage"
        iconTitle="email"
        iconColor="white"
      />
    </Button>
  );
};

export {SendUsAMessageButton};
