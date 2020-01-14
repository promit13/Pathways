import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Alert,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import moment from "moment";
import colors from "../style";
import OfflineNotice from "../components/OfflineNotice";

const styles = {
  viewBoxStyle: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    marginTop: 10
  },
  textBoxStyle: {
    fontSize: 20,
    color: colors.darkGrey
  },
  textHeaderStyle: {
    fontSize: 20,
    color: colors.darkGrey,
    marginTop: 10,
    fontWeight: "600"
  },
  statusText: {
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 25,
    textTransform: "uppercase"
  }
};
class Case extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };
  render() {
    const { caseDetails } = this.props.navigation.state.params;
    console.log(caseDetails);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {!this.props.isConnected.isConnected && <OfflineNotice />}
        <View style={{ flex: 1, padding: 20 }}>
          <Image
            source={require("../../assets/path-logo.png")}
            style={{
              alignSelf: "center",
              marginTop: 20,
              color: colors.accent,
              marginBottom: 20
            }}
          />
          <View>
            <View
              style={[
                styles.viewBoxStyle,
                {
                  backgroundColor: colors.darkGrey,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 0
                }
              ]}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "white"
                }}
              >
                CASE
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "white"
                }}
              >
                Started {moment(caseDetails.CreatedDate).format("DD MMM YYYY")}
              </Text>
            </View>
            <View style={styles.viewBoxStyle}>
              <Text style={styles.textBoxStyle}>
                {caseDetails.Referral__r.Name}
              </Text>
            </View>
            <View
              style={[
                styles.viewBoxStyle,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }
              ]}
            >
              <Text style={[styles.textBoxStyle, { flex: 4 }]}>
                {caseDetails.Referral__r.Phone ||
                  caseDetails.Referral__r.Mobile ||
                  caseDetails.Referral__r.MobilePhone}
              </Text>
              <Icon
                name="phone"
                type="font-awesome"
                size={30}
                onPress={() => {
                  if (Platform.OS === "android") {
                    phoneNumber = `tel:${caseDetails.Referral__r.Phone ||
                      caseDetails.Referral__r.MobilePhone}`;
                  } else {
                    phoneNumber = `telprompt:${caseDetails.Referral__r.Phone ||
                      caseDetails.Referral__r.MobilePhone}`;
                  }

                  Linking.openURL(phoneNumber);
                }}
                color={colors.darkGrey}
                iconStyle={{
                  flex: 1,
                  alignSelf: "flex-end",
                  justifySelf: "center",
                  justifySelf: "flex-end",
                  color: colors.darkGrey
                }}
              />
            </View>
            <Text style={styles.textHeaderStyle}>STATUS</Text>
          </View>
          <View
            style={[
              styles.viewBoxStyle,
              {
                backgroundColor: colors.accent,
                justifyContent: "center",
                borderWidth: 0
              }
            ]}
          >
            <Text style={styles.statusText}>
              {/* {caseDetails.Case_Status__c} */}
              {caseDetails.Case_Status__c === "Unable to Contact"
                ? "Unable to Contact"
                : caseDetails.Case_Status__c === "Contact Made"
                ? "Processing"
                : caseDetails.Case_Status__c === "Live" ||
                  caseDetails.Case_Status__c === "Completed"
                ? "Referred to Agency"
                : caseDetails.Case_Status__c === "Awaiting to be Contacted" ||
                  caseDetails.Case_Status__c === "Contacting"
                ? "Contacting"
                : caseDetails.Case_Status__c}
            </Text>
          </View>
          {caseDetails.Recovery_Pathway__r && (
            <View
              style={{
                marginTop: 20
              }}
            >
              <Text style={styles.textHeaderStyle}>RECOVERY PATHWAY</Text>
              <TouchableOpacity
                style={[
                  styles.viewBoxStyle,
                  {
                    backgroundColor: colors.accent,
                    justifyContent: "center",
                    borderWidth: 0
                  }
                ]}
              >
                <Text style={styles.statusText}>
                  {caseDetails.Recovery_Pathway__r.StageName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {caseDetails.Court_Injunction_url ? (
            <TouchableOpacity
              onPress={() => {
                if (!this.props.isConnected.isConnected) {
                  return Alert.alert("No internet connection");
                }
                this.props.navigation.navigate("PdfViewer", {
                  documentUrl: caseDetails.Court_Injunction_url
                });
              }}
              style={[
                styles.viewBoxStyle,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }
              ]}
            >
              <Text style={[styles.textBoxStyle, { flex: 4 }]}>
                DOCUMENTS
                {/* {status} */}
              </Text>
              <Icon
                name="angle-right"
                type="font-awesome"
                size={40}
                iconStyle={{
                  flex: 1,
                  alignSelf: "flex-end",
                  justifySelf: "center",
                  color: colors.darkGrey
                }}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.viewBoxStyle,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }
              ]}
            >
              <Text style={styles.textBoxStyle}>No Injunction Served</Text>
            </View>
          )}
        </View>
      </ScrollView>
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

export default connect(mapStateToProps)(Case);
