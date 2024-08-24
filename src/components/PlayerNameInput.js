import React from 'react';
import {useAtom} from 'jotai';
import {Input} from 'native-base';

const PlayerNameInput = ({
  playerDisplayNameAPIAtom,
  setPlayerTextInput,
  placeholder,
}) => {
  const [playerDisplayName] = useAtom(playerDisplayNameAPIAtom);

  return (
    <Input
      maxLength={30}
      placeholder={placeholder}
      mx="12"
      my="2"
      size="xl"
      onChangeText={playerTextInput =>
        setPlayerTextInput(playerTextInput.trim())
      }
      defaultValue={playerDisplayName}
    />
  );
};

export {PlayerNameInput};
