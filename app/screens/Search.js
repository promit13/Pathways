import React from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import moment from "moment";
import colors from "../style";
import axios from "axios";
import { connect } from "react-redux";
import CaseDetails from "../components/CaseDetails";
import SearchBarWrapper from "../components/SearchBar";
import LoadScreen from "../components/LoadScreen";
import OfflineNotice from "../components/OfflineNotice";

const allTitles = [
  "Awaiting to be Contacted",
  "Contacting",
  "Contact Made",
  "Live",
  "Completed",
  "Unable to Contact",
  "Not Referred"
];

const titlesToShowArray = [
  "Contacting",
  "Unable to Contact",
  "Processing",
  "Referred to Agency",
  "Not Referred"
];

let contactingCasesArray = [];
let contactMadeCasesArray = [];
let liveCasesArray = [];
let unableToContactCasesArray = [];
let notReferredCasesArray = [];
class Search extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };
  state = {
    activeCases: [],
    arrayTitle: "",
    searchKey: "",
    sevenDays: true,
    thirtyDays: false,
    sixtyDays: false,
    ninetyDays: false,
    allDays: false,
    myReferrals: true,
    myConstabulary: false,
    nationalReferrals: false,
    checkDays: null,
    loadScreen: true,
    accountId: "",
    myId: "",
    completedRecords: []
  };

  componentDidMount = async () => {
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    const { AccountId, Id } = jsonObjectData;
    if (!this.props.isConnected.isConnected) {
      this.setState({ loadScreen: false });
      return;
    }
    axios.get("http://167.99.90.138:8675/referrals").then(res => {
      const { records } = res.data;
      if (records === undefined) {
        this.setState({
          loadScreen: false,
          accountId: AccountId,
          myId: Id
        });
        return;
      }
      // axios
      //   .get("http://167.99.90.138:8675/convertedAccounts")
      //   .then(completedRecords => {
      // const mergedArray = res.data.records.concat(completedRecords.data);
      const sortedCasesArray = _.reverse(_.sortBy(records, o => o.CreatedDate));
      this.setState({
        activeCases: sortedCasesArray,
        loadScreen: false,
        accountId: AccountId,
        myId: Id
      });
    });
    //});
  };

  // buttonPress = i => {
  //   const {
  //     sevenDays,
  //     thirtyDays,
  //     sixtyDays,
  //     ninetyDays,
  //     allDays,
  //     myReferrals,
  //     myConstabulary,
  //     nationalReferrals
  //   } = this.state;
  //   this.setState({
  //     sevenDays: sevenDays || i === 0 ? !this.state.sevenDays : false,
  //     thirtyDays: thirtyDays || i === 1 ? !this.state.thirtyDays : false,
  //     sixtyDays: sixtyDays || i === 2 ? !this.state.sixtyDays : false,
  //     ninetyDays: ninetyDays || i === 3 ? !this.state.ninetyDays : false,
  //     allDays: allDays || i === 4 ? !this.state.allDays : false,
  //     myReferrals: myReferrals || i === 5 ? !this.state.myReferrals : false,
  //     myConstabulary:
  //       myConstabulary || i === 6 ? !this.state.myConstabulary : false,
  //     nationalReferrals:
  //       nationalReferrals || i === 7 ? !this.state.nationalReferrals : false
  //   });
  // };

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
      sevenDays:
        i === 1 || i === 2 || i === 3 || i === 4
          ? false
          : sevenDays || i === 5 || i === 6 || i === 7
          ? sevenDays
          : !this.state.sevenDays,
      thirtyDays:
        i === 0 || i === 2 || i === 3 || i === 4
          ? false
          : thirtyDays || i === 5 || i === 6 || i === 7
          ? thirtyDays
          : !this.state.thirtyDays,
      sixtyDays:
        i === 0 || i === 1 || i === 3 || i === 4
          ? false
          : sixtyDays || i === 5 || i === 6 || i === 7
          ? sixtyDays
          : !this.state.sixtyDays,
      ninetyDays:
        i === 0 || i === 1 || i === 2 || i === 4
          ? false
          : ninetyDays || i === 5 || i === 6 || i === 7
          ? ninetyDays
          : !this.state.ninetyDays,
      allDays:
        i === 0 || i === 1 || i === 2 || i === 3
          ? false
          : allDays || i === 5 || i === 6 || i === 7
          ? allDays
          : !this.state.allDays,
      myReferrals:
        i === 6 || i === 7
          ? false
          : myReferrals || i === 0 || i === 1 || i === 2 || i === 3 || i === 4
          ? myReferrals
          : !this.state.myReferrals,
      myConstabulary:
        i === 5 || i === 7
          ? false
          : myConstabulary ||
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4
          ? myConstabulary
          : !this.state.myConstabulary,
      nationalReferrals:
        i === 5 || i === 6
          ? false
          : nationalReferrals ||
            i === 0 ||
            i === 1 ||
            i === 2 ||
            i === 3 ||
            i === 4
          ? nationalReferrals
          : !this.state.nationalReferrals
    });
  };

  renderContent = status => {
    console.log(status.length, status[1]);
    const mergedArray =
      status[1] !== undefined ? status[0].concat(status[1]) : status[0];
    const casesList = mergedArray.map(caseDetails => {
      return (
        <CaseDetails
          caseDetails={caseDetails}
          onPress={() => {
            if (!this.props.isConnected.isConnected) {
              return Alert.alert("No internet connection");
            }
            this.props.navigation.navigate("Case", {
              caseDetails
            });
          }}
        />
      );
    });
    return casesList;
  };

  render() {
    const {
      activeCases,
      sevenDays,
      thirtyDays,
      sixtyDays,
      ninetyDays,
      allDays,
      myReferrals,
      myConstabulary,
      nationalReferrals,
      loadScreen,
      accountId,
      myId
    } = this.state;
    const checkDays = sevenDays ? 7 : thirtyDays ? 30 : sixtyDays ? 60 : 90;
    let filteredArray = [];
    const todayDate = new Date();
    const toDate = moment(todayDate).subtract(checkDays, "d");
    const searchFilteredArray = activeCases.filter(item => {
      const isBetween = allDays
        ? true
        : moment(item.CreatedDate).isBetween(toDate, todayDate);
      if (myReferrals) {
        return (
          item.Referral__r &&
          item.Referral__r.Referrer_Contact_Name__c === myId &&
          isBetween &&
          item.Referral__r.Name.includes(this.state.searchKey)
        );
      }
      if (myConstabulary) {
        return (
          item.Referral__r &&
          item.Referral__r.Referrer_Organisation__c === accountId &&
          isBetween &&
          item.Referral__r.Name.includes(this.state.searchKey)
        );
      }
      return (
        item.Referral__r &&
        isBetween &&
        item.Referral__r.Name.includes(this.state.searchKey)
      );
    });

    allTitles.map(title => {
      const filteredTitle = searchFilteredArray.filter(caseDetails => {
        return caseDetails.Case_Status__c === title;
      });
      if (filteredTitle.length !== 0) {
        if (title === "Awaiting to be Contacted" || title === "Contacting") {
          return contactingCasesArray.push(filteredTitle);
        }
        if (title === "Contact Made") {
          return contactMadeCasesArray.push(filteredTitle);
        }
        if (title === "Live" || title === "Completed") {
          return liveCasesArray.push(filteredTitle);
        }
        if (title === "Unable to Contact") {
          return unableToContactCasesArray.push(filteredTitle);
        }
        if (title === "Not Referred") {
          return notReferredCasesArray.push(filteredTitle);
        }
      }
    });

    titlesToShowArray.map((title, index) => {
      if (title === "Contacting") {
        filteredArray.push({ [title]: contactingCasesArray });
      }
      if (title === "Unable to Contact") {
        filteredArray.push({ [title]: unableToContactCasesArray });
      }
      if (title === "Processing") {
        filteredArray.push({ [title]: contactMadeCasesArray });
      }
      if (title === "Referred to Agency") {
        filteredArray.push({ [title]: liveCasesArray });
      }
      if (title === "Not Referred") {
        filteredArray.push({ [title]: notReferredCasesArray });
      }
      if (index === titlesToShowArray.length - 1) {
        contactingCasesArray = [];
        unableToContactCasesArray = [];
        contactMadeCasesArray = [];
        liveCasesArray = [];
        notReferredCasesArray = [];
      }
    });

    if (loadScreen) return <LoadScreen text="Please wait" />;
    console.log(filteredArray);
    return (
      <KeyboardAvoidingView
        behavior="padding"
        behavior={Platform.OS === "android" ? "" : "padding"}
        style={{
          flex: 1
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {!this.props.isConnected.isConnected && <OfflineNotice />}
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SearchBarWrapper
              showDownBar={true}
              onSearchChange={searchKey => {
                this.setState({ searchKey });
              }}
              sevenDaysPress={() => {
                this.buttonPress(0);
              }}
              thirtyDaysPress={() => {
                this.buttonPress(1);
              }}
              sixtyDaysPress={() => {
                this.buttonPress(2);
              }}
              ninetyDaysPress={() => {
                this.buttonPress(3);
              }}
              allDaysPress={() => {
                this.buttonPress(4);
              }}
              myReferralsPress={() => {
                this.buttonPress(5);
              }}
              myConstabularyPress={() => {
                this.buttonPress(6);
              }}
              nationalReferralsPress={() => {
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
            <View
              style={{
                height: 20
              }}
            />
            {filteredArray.map(status => {
              const headerTitle = Object.keys(status)[0];
              const arrayList = Object.values(status)[0];
              console.log(arrayList, arrayList.length);
              return (
                <View>
                  <View
                    style={{
                      backgroundColor: colors.darkGrey,
                      width: "100%",
                      borderTopWidth: 2,
                      borderTopColor: colors.grey,
                      paddingVertical: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.darkGrey,
                        color: "white",
                        marginLeft: 25,
                        textTransform: "uppercase"
                      }}
                    >
                      {headerTitle}
                    </Text>
                  </View>
                  {arrayList.length === 0
                    ? null
                    : this.renderContent(arrayList)}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
// export default withNavigation(Search);
const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log("NETWORK STATUS", network);
  return {
    isConnected: network
  };
};

export default connect(mapStateToProps)(Search);
