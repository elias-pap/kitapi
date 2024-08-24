import React, {useState} from 'react';
import {
  useColorModeValue,
  VStack,
  HStack,
  Heading,
  Radio,
  ScrollView,
} from 'native-base';
import {colors} from '../other/constants';
import {CancelButton} from '../components/CancelButton';
import {ConfirmNewGameButton} from '../components/ConfirmNewGameButton';
import {useAtom} from 'jotai';
import {
  appLanguageAtom,
  gamePointsAtom,
  player1DisplayNameAtom,
  player2DisplayNameAtom,
  player3DisplayNameAtom,
} from '../other/state';
import {PlayerNameInput} from '../components/PlayerNameInput';
import {t} from '../util/otherUtil';
import {NewGamePointsSelectRadioButton} from '../components/NewGamePointsSelectRadioButton';

const NewGame = ({navigation}) => {
  const [player1DisplayName] = useAtom(player1DisplayNameAtom);
  const [player2DisplayName] = useAtom(player2DisplayNameAtom);
  const [player3DisplayName] = useAtom(player3DisplayNameAtom);
  const [player1TextInput, setPlayer1TextInput] = useState(player1DisplayName);
  const [player2TextInput, setPlayer2TextInput] = useState(player2DisplayName);
  const [player3TextInput, setPlayer3TextInput] = useState(player3DisplayName);
  const [gamePoints] = useAtom(gamePointsAtom);
  const [gamePointsInput, setGamePointsInput] = useState(gamePoints);
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <VStack flex={1} bg={useColorModeValue(colors.light, colors.dark)}>
      <VStack flex={1} direction="row" alignItems="flex-end">
        <ScrollView>
          <Heading alignSelf="center" p="4" size="xl">
            {t('playerNames', appLanguage)}
          </Heading>
          <PlayerNameInput
            playerDisplayNameAPIAtom={player1DisplayNameAtom}
            setPlayerTextInput={setPlayer1TextInput}
            placeholder={t('player1', appLanguage)}
          />
          <PlayerNameInput
            playerDisplayNameAPIAtom={player2DisplayNameAtom}
            setPlayerTextInput={setPlayer2TextInput}
            placeholder={t('player2', appLanguage)}
          />
          <PlayerNameInput
            playerDisplayNameAPIAtom={player3DisplayNameAtom}
            setPlayerTextInput={setPlayer3TextInput}
            placeholder={t('player3', appLanguage)}
          />
          <Heading alignSelf="center" p="4" pt="8" size="xl">
            {t('gamePoints', appLanguage)}
          </Heading>
          <VStack alignItems="center" pb="4">
            <Radio.Group
              name="gamePointsGroup"
              accessibilityLabel="Game Points"
              defaultValue={gamePoints}
              colorScheme={colors.primary}
              onChange={points => {
                setGamePointsInput(points);
              }}>
              <NewGamePointsSelectRadioButton value={'300'} text={300} />
              <NewGamePointsSelectRadioButton value={'600'} text={600} />
              <NewGamePointsSelectRadioButton value={'900'} text={900} />
              <NewGamePointsSelectRadioButton value={'1200'} text={1200} />
              <NewGamePointsSelectRadioButton value={'1500'} text={1500} />
            </Radio.Group>
          </VStack>
        </ScrollView>
      </VStack>
      <HStack bg={useColorModeValue(colors.light, colors.dark)} pb="4">
        <CancelButton navigation={navigation} />
        <ConfirmNewGameButton
          navigation={navigation}
          player1TextInput={player1TextInput}
          player2TextInput={player2TextInput}
          player3TextInput={player3TextInput}
          gamePointsInput={gamePointsInput}
        />
      </HStack>
    </VStack>
  );
};

export {NewGame};
