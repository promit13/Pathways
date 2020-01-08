import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    color: "white",
    alignSelf: "center",
    paddingBottom: moderateScale(10),
    fontSize: moderateScale(16)
  }
};

export default LoadScreen = ({ text }) => {
  console.log(text);
  return (
    <View style={styles.container}>
      {/* <StatusBar
        hidden
      /> */}
      <Text style={styles.text}>{text}</Text>
      <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }} />
    </View>
  );
};

export const ModalLoading = ({ text }) => {
  return (
    <Modal
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      isVisible={true}
      coverScreen
      hasBackdrop
      backdropColor="black"
      backdropOpacity={0.9}
    >
      <Text style={styles.text}>{text}</Text>
      <ActivityIndicator size="large" color="gray" style={{ marginTop: 20 }} />
    </Modal>
  );
};
