import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import splashTimer from '../global-functions/splashTimer';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, useWindowDimensions } from 'react-native';

const SplashScreen = props => {
  const dimensions = useWindowDimensions();
  const { theme, navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const splashTimerResult = await splashTimer();
        navigation.navigate('LoginScreen');
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors['Custom Color_2'],
          justifyContent: 'center',
        },
        dimensions.width
      )}
    >
      <Text
        accessible={true}
        allowFontScaling={true}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
            alignSelf: 'center',
            color: theme.colors['Surface'],
            flex: 0,
          }),
          dimensions.width
        )}
      >
        {'TestApp'}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(SplashScreen);
