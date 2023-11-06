import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, useWindowDimensions } from 'react-native';

const HomeScreen = props => {
  const dimensions = useWindowDimensions();
  const { theme } = props;
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const Destination = () => {
    const { navigation } = props;
    React.useEffect(() => {
      if (destination.length > 0) {
        navigation.replace(destination);
      }
    }, [navigation, destination]);
    return <></>;
  };

  const [destination, setDestination] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
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
            marginBottom: 20,
          }),
          dimensions.width
        )}
      >
        {Constants['email']}
      </Text>
      <Button
        onPress={() => {
          try {
            setGlobalVariableValue({
              key: 'idToken',
              value: '',
            });
            setGlobalVariableValue({
              key: 'email',
              value: '',
            });
            setDestination('LoginNavigator');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
            backgroundColor: theme.colors['Custom Color'],
          }),
          dimensions.width
        )}
        title={'Logout'}
      />
      <Utils.CustomCodeErrorBoundary>
        <Destination />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
