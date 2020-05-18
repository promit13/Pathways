import React from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import colors from '../style';
import ErrorMessage from '../components/Error';
import OfflineNotice from '../components/OfflineNotice';
class NewCase extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent,
    },
    headerTintColor: '#fff',
    gesturesEnabled: false,
  };

  state = {
    checkBoxChecked: true,
    showError: false,
    errorMessage: '',
  };

  onContinue = (values) => {
    console.log(values);
    if (!this.state.checkBoxChecked) {
      this.setState({
        showError: true,
        errorMessage:
          'In order to proceed, please get consent from the victim.',
      });
      return;
    }
    this.props.navigation.navigate('Questions', {
      userDetails: { ...values, clientConsent: 'Yes' },
    });
  };

  render() {
    const { checkBoxChecked, showError, errorMessage } = this.state;
    console.log(checkBoxChecked);
    return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        {!this.props.isConnected.isConnected && <OfflineNotice />}
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Image
            source={require('../../assets/path-logo.png')}
            style={{
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: '300',
              marginHorizontal: 40,
              marginBottom: 20,
            }}
          >
            Please complete all required fields in order to make a successful
            referral.
          </Text>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              dob: '',
              phone: '',
              safeContactNumber: '',
              safeEmail: '',
              message: '',
            }}
            onSubmit={(values) => {
              console.log(values);
              if (!this.props.isConnected.isConnected) {
                return Alert.alert('No internet connection');
              }
              this.onContinue(values);
              // this.props.navigation.navigate("Questions");
            }}
            validationSchema={yup.object().shape({
              firstName: yup
                .string()
                .required('Please enter first name of the victim'),
              lastName: yup
                .string()
                .required('Please enter last name of the victim'),
              dob: yup.string().required('Please enter a date of birth'),
              phone: yup.number().required('Please enter a contact number'),
              // safeContactNumber: yup
              //   .number()
              //   .required("Please enter a safe contact number")
              safeEmail: yup
                .string()
                .label('Safe email')
                .email()
                .required('Please enter a safe email address'),
              // message: yup.string().required("Please enter messages/notes")
              // checkbox: yup.boolean().required("Must accept conditions")
            })}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder="FIRST NAME"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth:
                        touched.firstName && errors.firstName ? 2 : 0,
                    },
                  ]}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.textErrorStyle}>{errors.firstName}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder="LAST NAME"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth:
                        touched.lastName && errors.lastName ? 2 : 0,
                    },
                  ]}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.textErrorStyle}>{errors.lastName}</Text>
                )}
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  placeholderTextColor={colors.darkGrey}
                  placeholder="DATE OF BIRTH ( DD/MM/YYYY )"
                  onChangeText={handleChange('dob')}
                  onBlur={handleBlur('dob')}
                  value={values.dob}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth: touched.dob && errors.dob ? 2 : 0,
                    },
                  ]}
                />
                {touched.dob && errors.dob && (
                  <Text style={styles.textErrorStyle}>{errors.dob}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('phone')}
                  keyboardType="phone-pad"
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder="VICTIM CONTACT NUMBER"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth: touched.phone && errors.phone ? 2 : 0,
                    },
                  ]}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.textErrorStyle}>{errors.phone}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('safeContactNumber')}
                  onBlur={handleBlur('safeContactNumber')}
                  keyboardType="phone-pad"
                  value={values.safeContactNumber}
                  placeholder="SAFE CONTACT NUMBER"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth:
                        touched.safeContactNumber && errors.safeContactNumber
                          ? 2
                          : 0,
                    },
                  ]}
                />
                {touched.safeContactNumber && errors.safeContactNumber && (
                  <Text style={styles.textErrorStyle}>
                    {errors.safeContactNumber}
                  </Text>
                )}
                <TextInput
                  onChangeText={handleChange('safeEmail')}
                  onBlur={handleBlur('safeEmail')}
                  value={values.safeEmail}
                  keyboardType="email-address"
                  placeholder="SAFE EMAIL ADDRESS"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    {
                      borderBottomWidth:
                        touched.safeEmail && errors.safeEmail ? 2 : 0,
                    },
                  ]}
                />
                {touched.safeEmail && errors.safeEmail && (
                  <Text style={styles.textErrorStyle}>{errors.safeEmail}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values.message}
                  placeholder="MESSAGE/NOTES"
                  placeholderTextColor={colors.darkGrey}
                  style={[
                    styles.container,
                    { borderBottomWidth: 2, height: 100 },
                  ]}
                  multiline={true}
                />
                {touched.message && errors.message && (
                  <Text style={styles.textErrorStyle}>{errors.message}</Text>
                )}
                <CheckBox
                  title="THE VICTIM HAS GIVEN CONSENT TO BE REFERRED"
                  checked={this.state.checkBoxChecked}
                  containerStyle={{
                    marginTop: 20,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    marginLeft: 32,
                    paddingRight: 20,
                  }}
                  checkedColor={colors.accent}
                  onPress={() =>
                    this.setState({
                      checkBoxChecked: !checkBoxChecked,
                      showError: false,
                      errorMessage: '',
                    })
                  }
                />
                {showError && (
                  <ErrorMessage errorMessage={errorMessage} marginLeft={20} />
                )}
                <Button
                  onPress={handleSubmit}
                  // onPress={() => this.onContinue()}
                  title="Contiue"
                  buttonStyle={{
                    marginHorizontal: 40,
                    marginVertical: 20,
                    color: 'white',
                    height: 45,
                    backgroundColor: colors.accent,
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.darkGrey,
    width: '80%',
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
  },
  textErrorStyle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: 'red',
    marginLeft: 45,
  },
});
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log('NETWORK STATUS', network);
  return {
    isConnected: network,
  };
};

export default connect(mapStateToProps)(NewCase);
