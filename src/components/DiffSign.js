import React from 'react';
import {Box} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../other/constants';

const DiffSign = ({isDiffPositive}) => {
  const getDiffColor = () => {
    return isDiffPositive ? colors.diffPositiveRGB : colors.diffNegativeRGB;
  };

  const getRotationDegrees = () => {
    return isDiffPositive > 0 ? '0deg' : '180deg';
  };

  const getTopPadding = () => {
    return isDiffPositive > 0 ? '7' : '5';
  };

  return (
    <Box
      pt={getTopPadding()}
      mr="1"
      style={{
        transform: [{rotate: getRotationDegrees()}],
      }}>
      <Icon name="triangle" size={15} color={getDiffColor()} />
    </Box>
  );
};

export {DiffSign};
