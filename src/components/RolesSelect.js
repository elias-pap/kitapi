import React from 'react';
import {Heading, VStack} from 'native-base';
import {PlayerRoleSelect} from './PlayerRoleSelect';
import {
  player1DisplayNameAtom,
  player2DisplayNameAtom,
  player3DisplayNameAtom,
  player1RoleAPIAtom,
  player2RoleAPIAtom,
  player3RoleAPIAtom,
  appLanguageAtom,
} from '../other/state';
import {t} from '../util/otherUtil';
import {useAtom} from 'jotai';

const RolesSelect = () => {
  const [appLanguage] = useAtom(appLanguageAtom);

  return (
    <VStack alignItems="center" py="8">
      <Heading pb="3" size="xl">
        {t('roles', appLanguage)}
      </Heading>
      <VStack>
        <PlayerRoleSelect
          playerDisplayNameAtom={player1DisplayNameAtom}
          playerRoleAtom={player1RoleAPIAtom}
        />
        <PlayerRoleSelect
          playerDisplayNameAtom={player2DisplayNameAtom}
          playerRoleAtom={player2RoleAPIAtom}
        />
        <PlayerRoleSelect
          playerDisplayNameAtom={player3DisplayNameAtom}
          playerRoleAtom={player3RoleAPIAtom}
        />
      </VStack>
    </VStack>
  );
};

export {RolesSelect};
