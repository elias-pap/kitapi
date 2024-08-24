import React from 'react';
import {Heading, VStack, Radio} from 'native-base';
import {useAtom} from 'jotai';
import {appLanguageAtom, contractAtom} from '../other/state';
import {t} from '../util/otherUtil';
import {colors, CONTRACT} from '../other/constants';
import {ContractSelectRadioButton} from './ContractSelectRadioButton';

const ContractSelect = () => {
  const [contract, setContract] = useAtom(contractAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <VStack alignItems="center" py="8">
      <Heading size="xl" pb="3">
        {t('contract', appLanguage)}
      </Heading>
      <Radio.Group
        name="contractGroup"
        accessibilityLabel="Contract"
        colorScheme={colors.primary}
        value={contract}
        onChange={newContract => {
          setContract(newContract);
        }}>
        <ContractSelectRadioButton value={CONTRACT.six} text={6} />
        <ContractSelectRadioButton value={CONTRACT.seven} text={7} />
        <ContractSelectRadioButton value={CONTRACT.eight} text={8} />
        <ContractSelectRadioButton value={CONTRACT.nine} text={9} />
        <ContractSelectRadioButton value={CONTRACT.ten} text={10} />
        <ContractSelectRadioButton
          value={CONTRACT.allPass}
          text={t('allPass', appLanguage)}
        />
        <ContractSelectRadioButton
          value={CONTRACT.misere}
          text={t('misere', appLanguage)}
        />
      </Radio.Group>
    </VStack>
  );
};

export {ContractSelect};
