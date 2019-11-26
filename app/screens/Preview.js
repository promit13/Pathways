import React from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import colors from "../style";
import LoadScreen from "../components/LoadScreen";

const styles = {
  listItemContainerStyle: {
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 80,
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

let completedCasesArray = [];
let injunctionServedArray = [];
let criticalPathwayArray = [];
let casesFallenArray = [];

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    activeCasesArray: [],
    completedCasesArray: [],
    injunctionServedArray: [],
    criticalPathwayArray: [],
    casesFallenArray: [],
    loadScreen: true
  };

  componentDidMount() {
    axios.get("http://localhost:8675/referrals").then(res => {
      console.log(res.data.records);
      const { records } = res.data;
      records.map((record, index) => {
        if (record.Triage_Status__c === "Completed") {
          completedCasesArray.push(record);
        }
        if (record.Triage_Status__c === "Served") {
          injunctionServedArray.push(record);
        }
        if (record.Triage_Status__c === "Critical") {
          criticalPathwayArray.push(record);
        }
        if (record.Triage_Status__c === "Fallen") {
          casesFallenArray.push(record);
        }
        if (index === records.length - 1) {
          this.setState({
            completedCasesArray,
            injunctionServedArray,
            criticalPathwayArray,
            casesFallenArray,
            activeCasesArray: records,
            loadScreen: false
          });
          completedCasesArray = [];
          injunctionServedArray = [];
          criticalPathwayArray = [];
          casesFallenArray = [];
        }
      });
      // this.setState({
      //   activeCases: res.data.records
      // });
    });
  }

  render() {
    const {
      activeCasesArray,
      completedCasesArray,
      injunctionServedArray,
      criticalPathwayArray,
      casesFallenArray,
      loadScreen
    } = this.state;
    if (loadScreen) return <LoadScreen text="Please wait" />;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginTop: 80 }}>
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
              height: 60,
              display: "flex",
              flexDirection: "row",
              borderWidth: 2,
              borderColor: colors.grey,
              alignSelf: "center",
              marginBottom: 30,
              marginHorizontal: 20,
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                flex: 4,
                display: "flex",
                marginTop: 16,
                justifyContent: "center",
                marginLeft: 20
              }}
            >
              Start a new referral
            </Text>
            <Image
              source={require("../../assets/plus.png")}
              resizeMode="contain"
              style={{
                display: "flex",
                flex: 1,
                alignSelf: "center",
                height: 25,
                width: 25
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: activeCasesArray,
                activeCaseCheck: true
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/user.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Active cases</Text>
            <Text style={styles.listItemCountStyle}>
              {activeCasesArray.length}
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
              source={require("../../assets/tick.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Contact Made</Text>
            <Text style={styles.listItemCountStyle}>
              {completedCasesArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: injunctionServedArray,
                arrayTitle: "Injunction Served"
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
              {injunctionServedArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: criticalPathwayArray,
                arrayTitle: "Critical Pathway"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/logo-circle.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Completed</Text>
            <Text style={styles.listItemCountStyle}>
              {criticalPathwayArray.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ActiveCases", {
                casesArray: casesFallenArray,
                arrayTitle: "Cases Fallen"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/cross.png")}
              resizeMode="contain"
              style={{ flex: 1, color: colors.accent }}
            />
            <Text style={styles.listItemTextStyle}>Closed</Text>
            <Text style={styles.listItemCountStyle}>
              {casesFallenArray.length}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
