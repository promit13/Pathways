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

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import logo from "../../assets/logo-shadow.png";
import UserDetails from "../components/UserDetails";
import colors from "../style";
import { Dropdown } from "react-native-material-dropdown";
import StepIndicator from "react-native-step-indicator";

export default class Case extends React.Component {
  render() {
    const labels = [
      "No Contact",
      "Contact Made",
      "Injuction applied for",
      "Injunction Granted",
      "Injunction Denied"
    ];
    this.state = {
      currentPosition: 0
    };

    const { caseDetails } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Image
          source={require("../../assets/path-logo.png")}
          style={{
            alignSelf: "center",
            marginTop: 20,
            color: colors.accent,
            marginBottom: 20
          }}
        />
        <View
          style={{
            height: 160
          }}
        >
          <View
            style={{
              backgroundColor: colors.grey,
              paddingBottom: 5,
              height: 40,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                paddingRight: 20,
                fontSize: 20,
                color: "white",
                marginTop: 8
              }}
            >
              CASE
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                marginLeft: 100,
                color: colors.darkGrey
              }}
            >
              Started {moment(caseDetails.CreatedDate).format("DD MMM YYYY")}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: "white",
              marginHorizontal: 20,
              borderWidth: 1,
              marginTop: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                marginLeft: 20,
                marginTop: 10
              }}
            >
              {caseDetails.Referral__r.Name}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: "white",
              borderWidth: 1,
              marginHorizontal: 20,
              marginTop: 10,
              display: "flex"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                marginLeft: 20,
                marginTop: 9
              }}
            >
              {caseDetails.Referral__r.Phone}
            </Text>
            <Icon
              name="phone"
              type="font-awesome"
              size={30}
              color={colors.darkGrey}
              iconStyle={{
                position: "absolute",
                bottom: -7,
                right: 20,
                color: colors.darkGrey
              }}
            />
          </View>
          <View
            style={{
              marginLeft: -10,
              marginTop: 20,
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                marginLeft: 30,
                marginTop: 10,
                fontWeight: "600"
              }}
            >
              STATUS
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 70,
            marginHorizontal: 20,
            height: 60,
            backgroundColor: colors.accent
          }}
        >
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "white",

              fontSize: 25,
              marginTop: 14,
              textTransform: "uppercase"
            }}
          >
            {caseDetails.Triage_Status__c}
          </Text>
        </View>
        {caseDetails.Recovery_Pathway__r && (
          <View
            style={{
              height: 105,
              marginTop: 20
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.darkGrey,
                marginLeft: 30,
                marginTop: 10,
                fontWeight: "600"
              }}
            >
              RECOVERY PATHWAY
            </Text>
            <TouchableOpacity
              style={{
                alignContent: "center",
                alignItems: "center",
                marginTop: 10,
                height: 60,
                marginHorizontal: 20,
                backgroundColor: colors.accent
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  color: "white",

                  fontSize: 25,
                  marginTop: 14,
                  textTransform: "uppercase"
                }}
              >
                {caseDetails.Recovery_Pathway__r.StageName}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            height: 95,
            marginTop: 20
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.darkGrey,
              marginLeft: 30,
              marginTop: 10,
              fontWeight: "600"
            }}
          >
            DOCUMENTS
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("PdfViewer")}
            style={{
              height: 50,
              marginHorizontal: 20,
              backgroundColor: "white",
              marginTop: 10,
              borderWidth: 1
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.accent,
                marginLeft: 20,
                marginTop: 13
              }}
            >
              {/* {status} */}
            </Text>
            <Icon
              name="angle-right"
              type="font-awesome"
              size={40}
              iconStyle={{
                position: "absolute",
                bottom: -15,
                right: 20,
                color: colors.darkGrey
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
