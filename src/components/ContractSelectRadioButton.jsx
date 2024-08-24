import React from 'react';
import {Radio, Text} from 'native-base';

export const ContractSelectRadioButton = ({value, text}) => {
  return (
    <Radio ml="4" mr="2" my="1.5" value={value} size="lg">
      <Text fontSize="2xl">{text}</Text>
    </Radio>
  );
};
