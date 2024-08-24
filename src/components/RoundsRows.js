import React from 'react';
import {FlatList, useColorModeValue, Flex, Text, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../other/constants';
import {useAtom} from 'jotai';
import {appLanguageAtom, roundsAtomAPI} from '../other/state';
import {ROUND_TABLE_COLUMNS} from '../other/constants';
import {t} from '../util/otherUtil';

const Cell = ({
  text,
  isHeader,
  isFirstColumn,
  isSecondRow,
  isSecondColumn,
  isThirdColumn,
  contract,
  trump,
  isBidder,
}) => {
  const [appLanguage] = useAtom(appLanguageAtom);

  const flexAttrs = {
    flex: 1,
    align: 'center',
    borderRightColor: colors.primaryRGB,
  };
  if (isHeader) {
    flexAttrs.borderBottomWidth = '2';
    flexAttrs.borderColor = colors.primaryRGB;
    flexAttrs.py = '2';
    flexAttrs.pb = '2.5';
    flexAttrs.borderRightWidth = '0';
  }
  if (isFirstColumn) {
    flexAttrs.mr = '-8';
    flexAttrs.ml = '-4';
  }
  if (isSecondColumn && !isHeader) {
    flexAttrs.borderRightWidth = '2';
  }
  if (isSecondRow) {
    flexAttrs.pt = '2';
  }
  if (isThirdColumn) {
    flexAttrs.pl = '5';
  }

  const textAttrs = {
    fontSize: 'lg',
  };
  if (isHeader) {
    textAttrs.fontWeight = 'bold';
  }
  if (isBidder) {
    textAttrs.fontWeight = 'bold';
  }
  if (!isHeader && !isFirstColumn && !isSecondColumn) {
    textAttrs.fontStyle = 'italic';
  }

  const contractDisplayMap = {
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    allpass: t('allPassInitials', appLanguage),
    misere: t('misereInitial', appLanguage),
  };

  if (isSecondColumn && contract) {
    text = contractDisplayMap[contract];
  }

  const trumpDisplayMap = {
    S: <Icon name="cards-spade" size={25} color={colors.spadesSymbol} />,
    C: <Icon name="cards-club" size={25} color={colors.clubsSymbol} />,
    D: <Icon name="cards-diamond" size={25} color={colors.diamondsSymbol} />,
    H: <Icon name="cards-heart" size={25} color={colors.heartsSymbol} />,
    NT: <Icon name="diameter-variant" size={25} color={colors.noTrumpSymbol} />,
    none: <></>,
  };

  return (
    <Flex {...flexAttrs}>
      <HStack>
        <Text {...textAttrs}>{text}</Text>
        {trumpDisplayMap[trump]}
      </HStack>
    </Flex>
  );
};

const RoundsRows = () => {
  const [data] = useAtom(roundsAtomAPI);

  const renderItem = ({item}) => <Cell {...item} />;
  const keyExtractor = (item, i) => i;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={ROUND_TABLE_COLUMNS}
      m={5}
      bg={useColorModeValue(colors.light, colors.dark)}
      initialNumToRender={25}
    />
  );
};

export {RoundsRows};
