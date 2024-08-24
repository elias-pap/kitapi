import React from 'react';
import {Radio} from 'native-base';

export const TrumpSelectRadioButton = ({value, icon, disabled}) => {
  return (
    <Radio mx="2" my="1.5" value={value} size="lg" isDisabled={disabled}>
      {icon}
    </Radio>
  );
};
