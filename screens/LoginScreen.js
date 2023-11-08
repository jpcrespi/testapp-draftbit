import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as FirebaseApi from '../apis/FirebaseApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import { Button, ScreenContainer, TextInput, withTheme } from '@draftbit/ui';
import {
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const LoginScreen = props => {
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

  const firebaseAuthLoginPOST = FirebaseApi.useAuthLoginPOST();

  const [destination, setDestination] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [textInput2Value, setTextInput2Value] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          alignItems: { minWidth: Breakpoints.Tablet, value: 'center' },
          backgroundColor: theme.colors['Custom Color_2'],
          justifyContent: { minWidth: Breakpoints.Tablet, value: 'center' },
        },
        dimensions.width
      )}
    >
      {/* FormView */}
      <>
        {!(loading === false) ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors['Custom Color_3'],
                borderRadius: 10,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                width: { minWidth: Breakpoints.Tablet, value: 400 },
              },
              dimensions.width
            )}
          >
            {/* EmailText */}
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Background'],
                  marginBottom: 15,
                }),
                dimensions.width
              )}
            >
              {'Email Address'}
            </Text>
            {/* EmailTextInput */}
            <TextInput
              allowFontScaling={true}
              autoCapitalize={'none'}
              changeTextDelay={500}
              onChangeText={newEmailTextInputValue => {
                const textInputValue = newEmailTextInputValue;
                try {
                  setTextInputValue(newEmailTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              placeholder={'Enter email'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Input'],
                  {
                    backgroundColor: theme.colors['Custom Color_4'],
                    borderColor: 'rgba(0, 0, 0, 0)',
                  }
                ),
                dimensions.width
              )}
              value={textInputValue}
            />
            {/* PasswordText */}
            <Text
              accessible={true}
              allowFontScaling={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: theme.colors['Surface'],
                  marginBottom: 15,
                  marginTop: 15,
                }),
                dimensions.width
              )}
            >
              {'Password'}
            </Text>
            {/* PasswordTextInput */}
            <TextInput
              allowFontScaling={true}
              autoCapitalize={'none'}
              changeTextDelay={500}
              onChangeText={newPasswordTextInputValue => {
                const textInputValue = newPasswordTextInputValue;
                try {
                  setTextInput2Value(newPasswordTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              placeholder={'Enter password'}
              secureTextEntry={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Input'],
                  {
                    backgroundColor: theme.colors['Custom Color_4'],
                    borderColor: 'rgba(0, 0, 0, 0)',
                  }
                ),
                dimensions.width
              )}
              value={textInput2Value}
            />
            {/* LoginButton */}
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    setLoading(true);
                    const authResponse = (
                      await firebaseAuthLoginPOST.mutateAsync({
                        email: textInputValue,
                        password: textInput2Value,
                      })
                    )?.json;
                    setLoading(false);
                    if (authResponse?.error) {
                      showAlertUtil({
                        title: 'Login Error',
                        message: authResponse?.error.message,
                        buttonText: 'Ok',
                      });
                    } else {
                      setGlobalVariableValue({
                        key: 'idToken',
                        value: authResponse?.idToken,
                      });
                      setGlobalVariableValue({
                        key: 'email',
                        value: authResponse?.email,
                      });
                      setDestination('HomeNavigator');
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                  backgroundColor: theme.colors['Custom Color'],
                  marginBottom: 10,
                  marginTop: 20,
                }),
                dimensions.width
              )}
              title={'Login\n'}
            />
            {/* RegisterButton */}
            <Button
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'], {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  color: theme.colors['Custom Color'],
                }),
                dimensions.width
              )}
              title={'Create a new user'}
            />
          </View>
        )}
      </>
      {/* LoadingView */}
      <>
        {!(loading === true) ? null : (
          <View
            style={StyleSheet.applyWidth(
              { alignSelf: 'center', flex: 1, justifyContent: 'center' },
              dimensions.width
            )}
          >
            <ActivityIndicator
              animating={true}
              hidesWhenStopped={true}
              size={'small'}
              style={StyleSheet.applyWidth(
                GlobalStyles.ActivityIndicatorStyles(theme)[
                  'Activity Indicator'
                ],
                dimensions.width
              )}
            />
          </View>
        )}
      </>
      <Utils.CustomCodeErrorBoundary>
        <Destination />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
