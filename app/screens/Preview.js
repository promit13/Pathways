import React from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Icon } from "react-native-elements";
import colors from "../style";
import LoadScreen from "../components/LoadScreen";
import OfflineNotice from "../components/OfflineNotice";
import { date } from "yup";

const { width, height } = Dimensions.get("window");

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
  },
  iconStyle: {
    flex: 1,
    color: colors.accent,
    height: 50,
    width: 50
  }
};

let awaitingCasesArray = [];
let contactMadeCasesArray = [];
let unableToContactCasesArray = [];
let notReferredCasesArray = [];
let liveCasesArray = [];
let totalReferralArray = [];

class Preview extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    awaitingCasesArray: [],
    contactMadeCasesArray: [],
    liveCasesArray: [],
    unableToContactCasesArray: [],
    notReferredCasesArray: [],
    totalReferralArray: [],
    loadScreen: true,
    refresh: true,
    myId: "",
    organisationId: ""
  };

  componentDidMount() {
    this.getDataFromServer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.navigation.state.params === undefined) {
      return;
    } else {
      console.log(
        this.props.navigation.state.params.refresh,
        prevState.refresh,
        this.state.refresh
      );
      if (this.props.navigation.state.params.refresh === prevState.refresh) {
        this.getDataFromServer();
      }
    }
  }

  getDataFromServer = async () => {
    const contactData = await AsyncStorage.getItem("userDetails");
    const jsonObjectData = JSON.parse(contactData);
    const { AccountId, Id } = jsonObjectData;
    axios.get("http://167.99.90.138:8675/referrals").then(res => {
      //   axios
      //     .get("http://167.99.90.138:8675/convertedAccounts")
      //     .then(completedRecords => {
      const { records } = res.data;
      // liveCasesArray = completedRecords.data;
      if (records === undefined) {
        this.setState({
          myId: Id,
          refresh:
            this.props.navigation.state.params === undefined
              ? this.state.refresh
              : !this.state.refresh,
          organisationId: AccountId,
          loadScreen: false
        });
        return;
      }
      // totalReferralArray = records.concat(completedRecords.data);
      records.map((record, index) => {
        if (
          record.Case_Status__c === "Awaiting to be Contacted" ||
          record.Case_Status__c === "Contacting"
        ) {
          awaitingCasesArray.push(record);
        }
        if (record.Case_Status__c === "Unable to Contact") {
          unableToContactCasesArray.push(record);
        }
        if (record.Case_Status__c === "Contact Made") {
          contactMadeCasesArray.push(record);
        }
        if (
          record.Case_Status__c === "Live" ||
          record.Case_Status__c === "Completed"
        ) {
          liveCasesArray.push(record);
        }
        if (record.Case_Status__c === "Not Referred") {
          notReferredCasesArray.push(record);
        }
        if (index === records.length - 1) {
          this.setState({
            totalReferralArray: records,
            awaitingCasesArray,
            unableToContactCasesArray,
            contactMadeCasesArray,
            liveCasesArray,
            notReferredCasesArray,
            myId: Id,
            refresh:
              this.props.navigation.state.params === undefined
                ? this.state.refresh
                : !this.state.refresh,
            organisationId: AccountId,
            loadScreen: false
          });
          console.log(liveCasesArray);
          awaitingCasesArray = [];
          unableToContactCasesArray = [];
          contactMadeCasesArray = [];
          notReferredCasesArray = [];
          totalReferralArray = [];
          liveCasesArray = [];
        }
      });
    });
    // this.setState({
    //   activeCases: res.data.records
    // });
    //  });
  };

  render() {
    const {
      totalReferralArray,
      awaitingCasesArray,
      unableToContactCasesArray,
      contactMadeCasesArray,
      liveCasesArray,
      notReferredCasesArray,
      loadScreen,
      myId
    } = this.state;
    console.log(myId);
    if (loadScreen) return <LoadScreen text="Please wait" />;
    return (
      <SafeAreaView
        forceInset={{ bottom: "always", top: "never" }}
        style={{ flex: 1, paddingTop: 40 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        >
          {!this.props.isConnected.isConnected && (
            <View style={{ marginTop: 40 }}>
              <OfflineNotice />
            </View>
          )}
          <Image
            source={require("../../assets/path-logo.png")}
            style={{
              alignSelf: "center",
              marginTop: 40,
              color: colors.accent,
              marginBottom: 40
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("NewCase");
            }}
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
            <Icon name="plus" type="entypo" color={colors.accent} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("MyReferrals", {
                casesArray: totalReferralArray
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/myreferrals.png")}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.listItemTextStyle}>My Referrals</Text>
            <Text style={styles.listItemCountStyle}>
              {
                totalReferralArray.filter(item => {
                  return (
                    item.Referral__r &&
                    item.Referral__r.Referrer_Contact_Name__c === myId
                  );
                }).length
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("ActiveCases", {
                casesArray: awaitingCasesArray,
                arrayTitle: "Contacting"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/contacting.png")}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.listItemTextStyle}>Contacting</Text>
            <Text style={styles.listItemCountStyle}>
              {
                awaitingCasesArray.filter(item => {
                  return (
                    item.Referral__r &&
                    item.Referral__r.Referrer_Contact_Name__c === myId
                  );
                }).length
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("ActiveCases", {
                casesArray: unableToContactCasesArray,
                arrayTitle: "Unable to Contact"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/unable.png")}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.listItemTextStyle}>Unable to Contact</Text>
            <Text style={styles.listItemCountStyle}>
              {
                unableToContactCasesArray.filter(item => {
                  return (
                    item.Referral__r &&
                    item.Referral__r.Referrer_Contact_Name__c === myId
                  );
                }).length
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("ActiveCases", {
                casesArray: contactMadeCasesArray,
                arrayTitle: "Processing"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/processing.png")}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.listItemTextStyle}>Processing</Text>
            <Text style={styles.listItemCountStyle}>
              {
                contactMadeCasesArray.filter(item => {
                  return (
                    item.Referral__r &&
                    item.Referral__r.Referrer_Contact_Name__c === myId
                  );
                }).length
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("ActiveCases", {
                casesArray: liveCasesArray,
                arrayTitle: "Referred to Agency"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/referred.png")}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.listItemTextStyle}>Referred to Agency</Text>
            <Text style={styles.listItemCountStyle}>
              {
                liveCasesArray.filter(item => {
                  return (
                    item.Referral__r &&
                    item.Referral__r.Referrer_Contact_Name__c === myId
                  );
                }).length
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!this.props.isConnected.isConnected) {
                return Alert.alert("No internet connection");
              }
              this.props.navigation.navigate("ActiveCases", {
                casesArray: notReferredCasesArray,
                arrayTitle: "Not Referred"
              });
            }}
            style={styles.listItemContainerStyle}
          >
            <Image
              source={require("../../assets/notreferred.png")}
              resizeMode="contain"
              style={styles.iconStyle}
            />
            <Text style={styles.listItemTextStyle}>Not Referred</Text>
            <Text style={styles.listItemCountStyle}>
              {
                notReferredCasesArray.filter(item => {
                  return (
                    item.Referral__r &&
                    item.Referral__r.Referrer_Contact_Name__c === myId
                  );
                }).length
              }
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ checkNetworkStatus }) => {
  const { network } = checkNetworkStatus;
  console.log("NETWORK STATUS", network);
  return {
    isConnected: network
  };
};

export default connect(mapStateToProps)(Preview);
