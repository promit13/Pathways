import React from 'react';
import { Text } from 'react-native';

const styles = {
  textStyle: {
    color: 'red',
    marginLeft: 40,
    fontSize: 10,
  },
};

export default ErrorMessage = ({ errorMessage }) => {
  return (
    <Text style={styles.textStyle}>
      {errorMessage}
    </Text>
  );
};