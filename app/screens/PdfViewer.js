import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import colors from "../style";
import LoadScreen, { ModalLoading } from "../components/LoadScreen";

const { width, height } = Dimensions.get("window");

export default class PdfViewer extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };
  state = {
    loading: true,
    source: {}
  };
  componentDidMount() {
    // 'http://samples.leanpub.com/thereactnativebook-sample.pdf'
    const { documentUrl } = this.props.navigation.state.params;
    console.log(documentUrl);
    const source = {
      uri: documentUrl,
      cache: true
    };
    this.setState({ loading: false, source });
  }
  render() {
    const { loading, source } = this.state;
    if (loading) return <LoadScreen text="Please wait" />;
    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25
  },
  pdf: {
    flex: 1,
    width,
    height
  }
});
