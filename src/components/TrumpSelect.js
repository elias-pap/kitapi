import React from 'react';
import {Heading, VStack, Radio} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAtom} from 'jotai';
import {
  trumpAPIAtom,
  allPassOrMisereContractAtom,
  appLanguageAtom,
} from '../other/state';
import {colors, TRUMP} from '../other/constants';
import {t} from '../util/otherUtil';
import {TrumpSelectRadioButton} from './TrumpSelectRadioButton';

export const TrumpSelect = () => {
  const [trump, setTrump] = useAtom(trumpAPIAtom);
  const [disabled] = useAtom(allPassOrMisereContractAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <VStack alignItems="center" py="8">
      <Heading size="xl" pb="3">
        {t('trump', appLanguage)}
      </Heading>
      <Radio.Group
        isDisabled={disabled}
        name="trumpGroup"
        accessibilityLabel="Trump"
        value={trump}
        colorScheme={colors.primary}
        onChange={newTrump => {
          setTrump(newTrump);
        }}>
        <TrumpSelectRadioButton
          value={TRUMP.spades}
          disabled={disabled}
          icon={
            <Icon name="cards-spade" size={33} color={colors.spadesSymbol} />
          }
        />
        <TrumpSelectRadioButton
          value={TRUMP.clubs}
          disabled={disabled}
          icon={<Icon name="cards-club" size={33} color={colors.clubsSymbol} />}
        />
        <TrumpSelectRadioButton
          value={TRUMP.diamonds}
          disabled={disabled}
          icon={
            <Icon
              name="cards-diamond"
              size={36}
              color={colors.diamondsSymbol}
            />
          }
        />
        <TrumpSelectRadioButton
          value={TRUMP.hearts}
          disabled={disabled}
          icon={
            <Icon name="cards-heart" size={33} color={colors.heartsSymbol} />
          }
        />
        <TrumpSelectRadioButton
          value={TRUMP.noTrump}
          disabled={disabled}
          icon={
            <Icon
              name="diameter-variant"
              size={33}
              color={colors.noTrumpSymbol}
            />
          }
        />
      </Radio.Group>
    </VStack>
  );
};
