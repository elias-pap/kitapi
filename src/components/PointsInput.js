import React from 'react';
import {Input} from 'native-base';
import {useAtom} from 'jotai';
import {t} from '../util/otherUtil';
import {appLanguageAtom} from '../other/state';

const PointsInput = ({played, pointsInput, validateAndSetPointsInput}) => {
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <Input
      maxLength={5}
      isDisabled={!played}
      variant="filled"
      size="lg"
      placeholder={t('points', appLanguage)}
      w="140"
      h="12"
      ml="4"
      value={pointsInput}
      onChangeText={points => validateAndSetPointsInput(points.trim())}
      keyboardType="numeric"
    />
  );
};

export {PointsInput};
