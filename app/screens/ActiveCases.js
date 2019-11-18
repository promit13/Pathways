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
import logo from "../../assets/logo-shadow.png";
import UserDetails from "../components/UserDetails";
import colors from "../style";
import axios from "axios";
import { Dropdown } from "react-native-material-dropdown";
import BookingDetails from "../components/BookingDetails";
import SearchBarWrapper from "../components/SearchBar";

export default class ActiveCases extends React.Component {
  state = {
    activeCases: []
  };

  componentDidMount() {
    axios.get("http://localhost:8675/referrals").then(res => {
      console.log(res.data.records);
      this.setState({
        activeCases: res.data.records
      });
    });
  }

  render() {
    let titles = [
      "Awaiting to be Contacted",
      "Contacting",
      "Contact Made",
      "Live",
      "Completed",
      "Closed"
    ];
    const { activeCases } = this.state;

    const filteredArray = [];

    titles.map(title => {
      const filteredTitle = activeCases.filter(caseDetails => {
        return caseDetails.Triage_Status__c === title;
      });
      const myReferrals = activeCases.filter(caseDetails => {
        return caseDetails.Triage_Status__c === title;
      });
      return filteredArray.push({ [title]: filteredTitle });
    });

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
            <SearchBarWrapper />
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "80%",
              justifyContent: "center",
              display: "flex"
            }}
          ></View>

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
