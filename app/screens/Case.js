import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import moment from "moment";
import colors from "../style";

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
  }
};
export default class Case extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: colors.accent
    },
    headerTintColor: "#fff"
  };
  render() {
    const { caseDetails } = this.props.navigation.state.params;
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
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
                backgroundColor: colors.grey,
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
              {caseDetails.Referral__r.Phone}
            </Text>
            <Icon
              name="phone"
              type="font-awesome"
              size={30}
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
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "white",
              fontSize: 25,
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
            <Text style={styles.textHeaderStyle}>RECOVERY PATHWAY</Text>
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
        <Text style={styles.textHeaderStyle}>DOCUMENTS</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("PdfViewer")}
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
            Test
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
      </ScrollView>
    );
  }
}
