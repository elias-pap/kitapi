import React from 'react';
import {Radio, Text} from 'native-base';

export const NewGamePointsSelectRadioButton = ({value, text}) => {
  return (
    <Radio mr="2" my="1.5" value={value} size="lg">
      <Text fontSize="2xl">{text}</Text>
    </Radio>
  );
};
