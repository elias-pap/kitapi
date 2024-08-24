import React from 'react';
import {Heading} from 'native-base';
import {DeleteLastRoundButton} from './DeleteLastRoundButton';
import {NewGameButton} from './NewGameButton';
import {t} from '../util/otherUtil';
import {useAtom} from 'jotai';
import {appLanguageAtom} from '../other/state';

const GameControl = ({navigation}) => {
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <>
      <Heading alignSelf="center" size="xl">
        {t('gameControl', appLanguage)}
      </Heading>
      <NewGameButton navigation={navigation} />
      <DeleteLastRoundButton navigation={navigation} />
    </>
  );
};

export {GameControl};
