import React from 'react';
import {Heading} from 'native-base';
import {SendUsAMessageButton} from './SendUsAMessageButton';
import {t} from '../util/otherUtil';
import {useAtom} from 'jotai';
import {appLanguageAtom} from '../other/state';
import {RateUsButton} from './RateUsButton';

const Application = () => {
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <>
      <Heading alignSelf="center" size="xl">
        {t('application', appLanguage)}
      </Heading>
      <SendUsAMessageButton />
      <RateUsButton />
    </>
  );
};

export {Application};
