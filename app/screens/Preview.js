import React from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from "react-native";
import axios from "axios";
import { Icon } from "react-native-elements";
import colors from "../style";
import LoadScreen from "../components/LoadScreen";

const { width, height } = Dimensions.get("window");

const itemListName = [
  "Active Cases",
  "Contact Made",
  "Live",
  "Completed",
  "Closed"
];

const imageList = [
  "../../assets/user.png",
  "../../assets/tick.png",
  "../../assets/injunction.png",
  "../../assets/logo-circle.png",
  "../../assets/cross.png"
];

const styles = {
  listItemContainerStyle: {
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    borderColor: colors.grey,
    borderWidth: 2,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  listItemTextStyle: {
    color: colors.darkGrey,
    fontSize: 21,
    flex: 5,
    marginLeft: 10
  },
  listItemCountStyle: {
    fontSize: 40,
    color: colors.darkGrey,
    textAlign: "center"
  }
};

let awaitingCasesArray = [];
let contactingCasesArray = [];
let contactMadeCasesArray = [];
let liveCasesArray = [];
let completedCasesArray = [];

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    awaitingCasesArray: [],
    contactingCasesArray: [],
    contactMadeCasesArray: [],
    liveCasesArray: [],
    completedCasesArray: [],
    loadScreen: true
  };

  componentDidMount() {
    axios.get("http://167.71.142.150:8675/referrals").then(res => {
      console.log(res.data.records);
      const { records } = res.data;
      records.map((record, index) => {
        if (record.Triage_Status__c === "Awaiting to be Contacted") {
          awaitingCasesArray.push(record);
        }
        if (record.Triage_Status__c === "Contacting") {
          contactingCasesArray.push(record);
        }
        if (record.Triage_Status__c === "Contact Made") {
          contactMadeCasesArray.push(record);
        }
        if (record.Triage_Status__c === "Live") {
          liveCasesArray.push(record);
        }
        if (record.Triage_Status__c === "Completed") {
          completedCasesArray.push(record);
        }
        if (index === records.length - 1) {
          this.setState({
            awaitingCasesArray,
            contactingCasesArray,
            contactMadeCasesArray,
            liveCasesArray,
            completedCasesArray,
            loadScreen: false
          });
          awaitingCasesArray = [];
          contactingCasesArray = [];
          contactMadeCasesArray = [];
          liveCasesArray = [];
          completedCasesArray = [];
        }
      });
      // this.setState({
      //   activeCases: res.data.records
      // });
    });
  }

  render() {
    const {
      awaitingCasesArray,
      contactingCasesArray,
      contactMadeCasesArray,
      liveCasesArray,
      completedCasesArray,
      loadScreen
    } = this.state;
    if (loadScreen) return <LoadScreen text="Please wait" />;
    return (
      <SafeAreaView
        forceInset={{ bottom: "always", top: "never" }}
        style={{ flex: 1, marginTop: 80 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("../../assets/path-logo.png")}
            style={{
              alignSelf: "center",
              marginTop: 20,
              color: colors.accent,
              marginBottom: 40
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewCase")}
            style={{
              width: width - 40,
              display: "flex",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: colors.grey,
              alignSelf: "center",
              marginBottom: 30,
              marginHorizontal: 20,
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                display: "flex",
                justifyContent: "center"
              }}
            >
              Start a new referral
            </Text>
            {/* <Image
              source={require("../../assets/plus.png")}
              resizeMode="contain"
              style={{
                display: "flex",
                flex: 1,
                alignSelf: "center",
                height: 25,
                width: 25
              }}
            /> */}
            <Icon name="plus" type="entypo" color={colors.accent} size={40} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: awaitingCasesArray,
                arrayTitle: "Awaiting to be contacted"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/user.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>
              Awaiting to be contacted
            </Text>
            <Text style={styles.listItemCountStyle}>
              {awaitingCasesArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: contactingCasesArray,
                arrayTitle: "Contacting"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/tick.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Contacting</Text>
            <Text style={styles.listItemCountStyle}>
              {contactingCasesArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: liveCasesArray,
                arrayTitle: "Live"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/injunction.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Live</Text>
            <Text style={styles.listItemCountStyle}>
              {liveCasesArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: contactMadeCasesArray,
                arrayTitle: "Contact made"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/logo-circle.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Contact made</Text>
            <Text style={styles.listItemCountStyle}>
              {contactMadeCasesArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: completedCasesArray,
                arrayTitle: "Completed"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/cross.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Completed</Text>
            <Text style={styles.listItemCountStyle}>
              {completedCasesArray.length}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
