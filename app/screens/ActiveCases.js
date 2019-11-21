import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Switch,
  Alert
} from "react-native";
import { Button, Input, Icon, Avatar, Rating } from "react-native-elements";
import cases from "../../data/cases";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { withNavigation } from "react-navigation";
import logo from "../../assets/logo-shadow.png";
import UserDetails from "../components/UserDetails";
import colors from "../style";
import axios from "axios";
import { Dropdown } from "react-native-material-dropdown";
import BookingDetails from "../components/BookingDetails";
import SearchBarWrapper from "../components/SearchBar";
import LoadScreen from "../components/LoadScreen";

const titles = [
  "Awaiting to be Contacted",
  "Contacting",
  "Contact Made",
  "Live",
  "Completed",
  "Closed"
];
class ActiveCases extends React.Component {
  static navigationOptions = {
    // title: "Register",
    // headerTitleStyle: {
    //   fontWeight: "bold",
    //   fontSize: 20
    // }
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };
  state = {
    activeCases: [],
    activeCaseCheck: false,
    arrayTitle: "",
    searchKey: "",
    sevenDays: false,
    thirtyDays: false,
    sixtyDays: false,
    ninetyDays: false,
    allDays: false,
    myReferrals: false,
    myConstabulary: false,
    nationalReferrals: false,
    checkDays: null,
    loadScreen: true
  };

  componentDidMount() {
    if (this.props.navigation.state.params === undefined) {
      axios.get("http://localhost:8675/referrals").then(res => {
        console.log(res.data.records);
        this.setState({
          activeCases: res.data.records,
          activeCaseCheck: true,
          loadScreen: false
        });
      });
    } else {
      const {
        casesArray,
        activeCaseCheck,
        arrayTitle
      } = this.props.navigation.state.params;
      this.setState({
        activeCases: casesArray,
        activeCaseCheck,
        arrayTitle,
        loadScreen: false
      });
    }
  }

  buttonPress = i => {
    const {
      sevenDays,
      thirtyDays,
      sixtyDays,
      ninetyDays,
      allDays,
      myReferrals,
      myConstabulary,
      nationalReferrals
    } = this.state;
    this.setState({
      sevenDays: sevenDays || i === 0 ? !this.state.sevenDays : false,
      thirtyDays: thirtyDays || i === 1 ? !this.state.thirtyDays : false,
      sixtyDays: sixtyDays || i === 2 ? !this.state.sixtyDays : false,
      ninetyDays: ninetyDays || i === 3 ? !this.state.ninetyDays : false,
      allDays: allDays || i === 4 ? !this.state.allDays : false,
      myReferrals: myReferrals || i === 5 ? !this.state.myReferrals : false,
      myConstabulary:
        myConstabulary || i === 6 ? !this.state.myConstabulary : false,
      nationalReferrals:
        nationalReferrals || i === 7 ? !this.state.nationalReferrals : false
    });
  };

  render() {
    const {
      activeCases,
      activeCaseCheck,
      arrayTitle,
      sevenDays,
      thirtyDays,
      sixtyDays,
      ninetyDays,
      allDays,
      myReferrals,
      myConstabulary,
      nationalReferrals,
      checkDays,
      loadScreen
    } = this.state;
    let filteredArray = [];
    const todayDate = new Date();
    const toDate = moment(todayDate).subtract(checkDays, "d");
    const searchFilteredArray = activeCases.filter(item => {
      const isBetween = moment(item.CreatedDate).isBetween(toDate, todayDate);
      if (checkDays === null) {
        if (myReferrals) {
          return (
            item.Referral__r &&
            item.Referral__r.Unique_ID__c === "myUniqueId" &&
            item.Referral__r.Name.includes(this.state.searchKey)
          );
        }
        if (myConstabulary) {
          return (
            item.Referral__r &&
            item.Referral__r.Referrer_Organisation__c === "myConstabulary" &&
            item.Referral__r.Name.includes(this.state.searchKey)
          );
        }
        return (
          item.Referral__r &&
          item.Referral__r.Name.includes(this.state.searchKey)
        );
      }
      return (
        item.Referral__r &&
        isBetween &&
        item.Referral__r.Name.includes(this.state.searchKey) //startsWith
      );
    });
    if (activeCaseCheck) {
      titles.map(title => {
        const filteredTitle = searchFilteredArray.filter(caseDetails => {
          return caseDetails.Triage_Status__c === title;
        });
        const myReferrals = searchFilteredArray.filter(caseDetails => {
          return caseDetails.Triage_Status__c === title;
        });
        return filteredArray.push({ [title]: filteredTitle });
      });
    } else {
      filteredArray.push({ [arrayTitle]: searchFilteredArray });
    }
    if (loadScreen) return <LoadScreen text="Please wait" />;
    return (
      <ScrollView>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#F1F3F2",
            borderTopWidth: 2,
            borderTopColor: "#F1F3F2"
          }}
        >
          <View style={{ marginBottom: -30 }}>
            <SearchBarWrapper
              onSearchChange={searchKey => {
                this.setState({ searchKey });
                console.log(searchKey);
              }}
              sevenDaysPress={() => {
                this.setState({ checkDays: 7 });
                this.buttonPress(0);
              }}
              thirtyDaysPress={() => {
                this.setState({ checkDays: 30 });
                this.buttonPress(1);
              }}
              sixtyDaysPress={() => {
                this.setState({ checkDays: 60 });
                this.buttonPress(2);
              }}
              ninetyDaysPress={() => {
                this.setState({ checkDays: 90 });
                this.buttonPress(3);
              }}
              allDaysPress={() => {
                this.setState({ checkDays: null });
                this.buttonPress(4);
              }}
              myReferralsPress={() => {
                this.setState({ checkDays: null });
                this.buttonPress(5);
              }}
              myConstabularyPress={() => {
                this.setState({ checkDays: null });
                this.buttonPress(6);
              }}
              nationalReferralsPress={() => {
                this.setState({ checkDays: null });
                this.buttonPress(7);
              }}
              sevenDays={sevenDays}
              thirtyDays={thirtyDays}
              sixtyDays={sixtyDays}
              ninetyDays={ninetyDays}
              allDays={allDays}
              myReferrals={myReferrals}
              myConstabulary={myConstabulary}
              nationalReferrals={nationalReferrals}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "80%",
              justifyContent: "center",
              display: "flex"
            }}
          />
          {filteredArray.map(status => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 35,
                    borderTopWidth: 2,
                    borderTopColor: colors.lightGrey
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.grey,
                      width: "100%"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.darkGrey,
                        marginTop: 5,
                        color: "white",
                        marginLeft: 25,
                        textTransform: "uppercase"
                      }}
                    >
                      {Object.keys(status)}
                    </Text>
                  </View>
                </View>
                {Object.values(status)[0].map(caseDetails => {
                  return (
                    <BookingDetails
                      caseDetails={caseDetails}
                      onPress={() =>
                        this.props.navigation.navigate("Case", {
                          caseDetails
                        })
                      }
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
export default withNavigation(ActiveCases);
