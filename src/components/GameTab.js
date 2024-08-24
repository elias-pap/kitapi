import React from 'react';
import {useColorModeValue, VStack, ScrollView} from 'native-base';
import {colors} from '../other/constants';
import {GameControl} from './GameControl';
import {Preferences} from './Preferences';
import {Application} from './Application';

const GameTab = ({navigation}) => {
  return (
    <VStack
      flex={1}
      direction="row"
      pt={7}
      alignItems="flex-start"
      bg={useColorModeValue(colors.light, colors.dark)}>
      <ScrollView>
        <GameControl navigation={navigation} />
        <Preferences />
        <Application />
      </ScrollView>
    </VStack>
  );
};

export {GameTab};
