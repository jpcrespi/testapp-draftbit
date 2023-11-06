import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, useWindowDimensions } from 'react-native';

const SplashScreen = props => {
  const dimensions = useWindowDimensions();
  const { theme } = props;
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const Timer = async seconds => {
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms));
    await timer(seconds * 1000);
  };

  const Destination = () => {
    const { navigation } = props;
    React.useEffect(() => {
      if (destination.length > 0) {
        navigation.replace(destination);
      }
    }, [navigation, destination]);
    return <></>;
  };

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await Timer(3);
        if (Constants['idToken'] === '') {
          setDestination('LoginNavigator');
        } else {
          setDestination('HomeNavigator');
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);
  const [destination, setDestination] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
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
            color: theme.colors['Surface'],
            marginBottom: 15,
          }),
          dimensions.width
        )}
      >
        {'TestApp\n'}
      </Text>
      <ActivityIndicator
        animating={true}
        hidesWhenStopped={true}
        size={'small'}
        style={StyleSheet.applyWidth(
          GlobalStyles.ActivityIndicatorStyles(theme)['Activity Indicator'],
          dimensions.width
        )}
      />
      <Utils.CustomCodeErrorBoundary>
        <Destination />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(SplashScreen);
