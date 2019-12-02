import React from "react";
import { View, Dimensions, Text } from "react-native";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import colors from "../style";

const { height, width } = Dimensions.get("window");

const styles = {
  viewStyle: {
    backgroundColor: "white",
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    textAlign: "center"
  },
  text: {
    color: colors.darkGrey,
    fontSize: 20
  },
  button: {
    width: width - 20,
    backgroundColor: colors.accent,
    marginTop: 30
  }
};
export default ModalMessage = ({
  text,
  isVisible,
  showTwoButtons,
  backDropPress,
  onContinuePress
}) => {
  return (
    <Modal
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      isVisible={isVisible}
      coverScreen
      hasBackdrop
      backdropColor="black"
      backdropOpacity={0.9}
      onBackdropPress={backDropPress}
    >
      <View style={styles.viewStyle}>
        <Text style={styles.text}>{text}</Text>
        <Button
          title="Continue"
          buttonStyle={styles.button}
          onPress={onContinuePress}
        />
        {showTwoButtons ? (
          <Button
            title="Cancel"
            titleStyle={{ color: colors.darkGrey }}
            onPress={backDropPress}
            buttonStyle={[
              styles.button,
              {
                backgroundColor: colors.grey,
                marginTop: 10
              }
            ]}
          />
        ) : null}
      </View>
    </Modal>
  );
};
