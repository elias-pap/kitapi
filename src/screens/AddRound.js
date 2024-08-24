import React from 'react';
import {
  useColorModeValue,
  VStack,
  HStack,
  ScrollView,
  Divider,
} from 'native-base';
import {colors} from '../other/constants';
import {CancelButton} from '../components/CancelButton';
import {ConfirmAddRoundButton} from '../components/ConfirmAddRoundButton';
import {ContractSelect} from '../components/ContractSelect';
import {TrumpSelect} from '../components/TrumpSelect';
import {RolesSelect} from '../components/RolesSelect';
import {ScoreSelect} from '../components/ScoreSelect';

const contentContainerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const AddRound = ({navigation}) => {
  return (
    <VStack flex={1}>
      <ScrollView
        bg={useColorModeValue(colors.light, colors.dark)}
        _contentContainerStyle={contentContainerStyle}>
        <ContractSelect />
        <Divider w="full" />
        <TrumpSelect />
        <Divider w="full" />
        <RolesSelect />
        <Divider w="full" />
        <ScoreSelect />
      </ScrollView>
      <HStack bg={useColorModeValue(colors.light, colors.dark)} pb="4">
        <CancelButton navigation={navigation} />
        <ConfirmAddRoundButton navigation={navigation} />
      </HStack>
    </VStack>
  );
};

export {AddRound};
