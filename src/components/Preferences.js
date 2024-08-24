import React from 'react';
import {Heading, HStack, VStack, Text, Switch, Select} from 'native-base';
import {useAtom} from 'jotai';
import {appLanguageAtom, inAppNotificationsAtom} from '../other/state';
import {colors} from '../other/constants';
import {t} from '../util/otherUtil';

const Preferences = () => {
  const [inAppNotifications, setInAppNotifications] = useAtom(
    inAppNotificationsAtom,
  );
  const [appLanguage, setAppLanguage] = useAtom(appLanguageAtom);

  const selectItems = [
    <Select.Item key="en" label="  English" value="en" />,
    <Select.Item key="el" label="  Greek" value="el" />,
  ];

  const toggleInAppNotifications = () => {
    setInAppNotifications(inAppNotifications === 'true' ? 'false' : 'true');
  };

  return (
    <VStack alignItems="center" py="8">
      <Heading alignSelf="center" size="xl">
        {t('preferences', appLanguage)}
      </Heading>
      <HStack py="4">
        <Text pl="4" fontSize="xl">
          {t('inAppNotifications', appLanguage)}
        </Text>
        <Switch
          ml="8"
          mt="0.5"
          isChecked={inAppNotifications === 'true'}
          onToggle={toggleInAppNotifications}
          colorScheme={colors.primary}
        />
      </HStack>
      <HStack py="4" alignItems="center">
        <Text fontSize="xl">Language</Text>
        <Select
          selectedValue={appLanguage}
          fontSize="lg"
          _selectedItem={{
            bg: colors.diffPositiveRGB,
          }}
          w="120"
          mt="0.5"
          accessibilityLabel={'Application Language'}
          ml="6"
          onValueChange={language => setAppLanguage(language)}>
          {selectItems}
        </Select>
      </HStack>
    </VStack>
  );
};

export {Preferences};
