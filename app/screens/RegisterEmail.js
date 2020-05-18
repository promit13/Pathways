import React, { Component, Fragment } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import colors from '../style';
import { ModalLoading } from '../components/LoadScreen';
import ModalMessage from '../components/ModalMessage';
import OfflineNotice from '../components/OfflineNotice';

const thankYouText =
  'Thank you for registering. We will send you an email once we verify your email address.';

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    height: 40,
    color: 'black',
    fontSize: 18,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    alignContent: 'center',
  },
  textErrorStyle: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: colors.accent,
    paddingTop: 12,
    fontSize: 17,
    height: 45,
  },
});

class RegisterEmail extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent,
    },
    headerTintColor: '#fff',
  };

  state = {
    showError: false,
    errorMessage: '',
    loading: false,
    showModalMessage: false,
  };

  componentDidMount = async () => {
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  };

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };

  registerUser = () => {
    this.setState({ showModalMessage: false });
    this.props.navigation.navigate('Login');
  };

  render() {
    const { showModalMessage, loading } = this.state;
    return (
      <KeyboardAwareScrollView>
        {!this.props.isConnected.isConnected && (
          <View style={{ marginTop: 40 }}>
            <OfflineNotice />
          </View>
        )}
        <View style={{ flex: 1, padding: 40 }}>
          <Formik
            initialValues={{ code: '' }}
            onSubmit={(values) => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert('No internet connection');
              }
              this.setState({ loading: true });
              setTimeout(() => {
                this.setState({ loading: false, showModalMessage: true });
              }, 2000);
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .required('Email must be a valid email'),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <Fragment>
                <Image
                  source={require('../../assets/path-logo.png')}
                  style={{
                    alignSelf: 'center',
                    marginVertical: 20,
                    color: colors.accent,
                  }}
                />
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 20,
                    marginBottom: 20,
                  }}
                >
                  Please enter your email address.
                </Text>
                <TextInput
                  style={styles.textInputStyle}
                  value={values.email}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.textErrorStyle}>{errors.email}</Text>
                )}
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={handleSubmit}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {loading && <ModalLoading text="Please wait" />}
                <ModalMessage
                  text={thankYouText}
                  firstButtonText="Close"
                  isVisible={showModalMessage}
                  showTwoButtons={false}
                  backDropPress={this.registerUser}
                  onContinuePress={this.registerUser}
                />
              </Fragment>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log('NETWORK STATUS', network);
  return {
    isConnected: network,
  };
};

export default connect(mapStateToProps)(RegisterEmail);
