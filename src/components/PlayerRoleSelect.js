import React from 'react';
import {Select, HStack, Text} from 'native-base';
import {useAtom} from 'jotai';
import {
  allPassContractAtom,
  appLanguageAtom,
  misereContractAtom,
} from '../other/state';
import {colors, ROLE} from '../other/constants';
import {t} from '../util/otherUtil';

const PlayerRoleSelect = ({playerDisplayNameAtom, playerRoleAtom}) => {
  const [displayName] = useAtom(playerDisplayNameAtom);
  const [allPassContract] = useAtom(allPassContractAtom);
  const [misereContract] = useAtom(misereContractAtom);
  const [role, setRole] = useAtom(playerRoleAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  const selectItems = [
    <Select.Item
      key={ROLE.player}
      label={'  ' + t(ROLE.player, appLanguage)}
      value={ROLE.player}
    />,
  ];

  if (!allPassContract) {
    selectItems.push(
      <Select.Item
        key={ROLE.bidder}
        label={'  ' + t(ROLE.bidder, appLanguage)}
        value={ROLE.bidder}
      />,
    );
    if (!misereContract) {
      selectItems.push(
        <Select.Item
          key={ROLE.helper}
          label={'  ' + t(ROLE.helper, appLanguage)}
          value={ROLE.helper}
        />,
      );
      selectItems.push(
        <Select.Item
          key={ROLE.pass}
          label={'  ' + t(ROLE.pass, appLanguage)}
          value={ROLE.pass}
        />,
      );
    }
  }

  return (
    <HStack my="2" alignItems="center" justifyContent="space-between">
      <Text fontSize="2xl" width="50%" textAlign="center" flexGrow={1}>{displayName}</Text>
      <Select
        isDisabled={allPassContract}
        selectedValue={role}
        fontSize="lg"
        _selectedItem={{
          bg: colors.diffPositiveRGB,
        }}
        w="160"
        accessibilityLabel={displayName + ' role'}
        placeholder="Role"
        ml="4"
        onValueChange={newRole => setRole(newRole)}>
        {selectItems}
      </Select>
    </HStack>
  );
};

export {PlayerRoleSelect};
