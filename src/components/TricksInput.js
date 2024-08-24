import React from 'react';
import {Button, HStack, Text, View} from 'native-base';
import {colors} from '../other/constants';
import {useAtom} from 'jotai';

const TricksInput = ({played, playerTricksAtom}) => {
  const [tricks, setTricks] = useAtom(playerTricksAtom);

  const onMinusPress = () => {
    if (tricks > 0) {
      setTricks(tricks - 1);
    }
  };

  const onPlusPress = () => {
    if (tricks < 10) {
      setTricks(tricks + 1);
    }
  };

  return (
    <HStack alignItems="center" w="140" ml="4">
      <Button
        isDisabled={!played || tricks === 0}
        colorScheme={played ? 'red' : colors.disabled}
        h="12"
        w="12"
        onPress={onMinusPress}>
        <Text fontSize="2xl" mt="-0.5">—</Text>
      </Button>
      <Text textAlign="center" width="10" fontSize="3xl">
        {tricks}
      </Text>
      <Button
        isDisabled={!played || tricks === 10}
        colorScheme={played ? colors.primary : colors.disabled}
        w="12"
        h="12"
        onPress={onPlusPress}>
        <Text fontSize="3xl" mt="-1.5">+</Text>
      </Button>
    </HStack>
  );
};

export {TricksInput};
