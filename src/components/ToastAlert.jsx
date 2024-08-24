import React from 'react';
import {VStack, HStack, Text, Alert} from 'native-base';

// Adjusted from https://docs.nativebase.io/toast#h3-status--variant-recipes
export const ToastAlert = ({title, status, description}) => {
  const iconAndTitleJSX = (
    <HStack space={2} alignItems="center">
      <Alert.Icon />
      <Text fontSize="xl" fontWeight="bold" color="darkText">
        {title}
      </Text>
    </HStack>
  );
  const descriptionJSX = description ? (
    <Text px="6" color="darkText" fontSize="lg">
      {description}
    </Text>
  ) : null;
  const alertJSX = (
    <VStack space={1} w="100%">
      {iconAndTitleJSX}
      {descriptionJSX}
    </VStack>
  );

  return (
    <Alert
      maxWidth="90%"
      alignSelf="center"
      flexDirection="row"
      status={status ?? 'info'}>
      {alertJSX}
    </Alert>
  );
};
