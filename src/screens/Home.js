import React from 'react';
import {useWindowDimensions} from 'react-native';
import {useAtom} from 'jotai';
import {useColorModeValue, StatusBar, VStack} from 'native-base';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {ScoreTab} from '../components/ScoreTab';
import {RoundsTab} from '../components/RoundsTab';
import {GameTab} from '../components/GameTab';
import {colors} from '../other/constants';
import {appLanguageAtom, tabIndexAtom} from '../other/state';
import {t} from '../util/otherUtil';

const Home = ({navigation}) => {
  const [index, setIndex] = useAtom(tabIndexAtom);
  const [appLanguage] = useAtom(appLanguageAtom);

  const FirstRoute = () => <ScoreTab />;
  const SecondRoute = () => <RoundsTab navigation={navigation} />;
  const ThirdRoute = () => <GameTab navigation={navigation} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();

  const routes = [
    {
      key: 'first',
      title: t('score', appLanguage),
      accessibilityLabel: 'score tab button',
      testID: 'score-tab-button',
    },
    {
      key: 'second',
      title: t('rounds', appLanguage),
      accessibilityLabel: 'rounds tab button',
      testID: 'rounds-tab-button',
    },
    {
      key: 'third',
      title: t('game', appLanguage),
      accessibilityLabel: 'game tab button',
      testID: 'game-tab-button',
    },
  ];

  const useTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: useColorModeValue(colors.darkRGB, colors.lightRGB),
      }}
      style={{
        backgroundColor: useColorModeValue(colors.lightRGB, colors.darkRGB),
      }}
    />
  );

  return (
    <VStack flex={1}>
      <StatusBar
        backgroundColor={useColorModeValue(colors.lightRGB, colors.darkRGB)}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={useTabBar}
        tabBarPosition="bottom"
      />
    </VStack>
  );
};

export {Home};
