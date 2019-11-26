import React from "react";
import {
  Image,
  Text,
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  SafeAreaView,
  createDrawerNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
import colors from "./style";
import Preview from "./screens/Preview";
import Login from "./screens/Login";
import Pathway from "../assets/pathway.png";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import Pathways from "./screens/Pathways";
import logoText from "../assets/logo-text.png";
import ActiveCases from "./screens/ActiveCases";
import NewCase from "./screens/NewCase";
import firebase from "react-native-firebase";
var { height, width } = Dimensions.get("window");
import ThankYou from "./screens/ThankYou";
import CriticalPathway from "./screens/CriticalPathway";
import RepeatReferrals from "./screens/RepeatReferral";
import Case from "./screens/Case";
import ProfileUpdate from "./screens/ProfileUpdate";
import VerfifyMobile from "./screens/VerifyMobile";
import ActivateDevice from "./screens/ActivateDevice";
import PinRegistration from "./screens/PinRegistration";
import Questions from "./screens/Questions";
import CompletedReferrals from "./screens/CompletedReferrals";
import InjunctionServed from "./screens/InjunctionServed";
import CasesFallen from "./screens/CasesFallen";
import PdfViewer from "./screens/PdfViewer";

const home = require("../assets/home.png");
const add = require("../assets/add.png");
const search = require("../assets/search2.png");

const HomeStack = createStackNavigator({
  Pathways,
  Preview,
  ActiveCases,
  ProfileUpdate,
  CriticalPathway,
  CompletedReferrals,
  InjunctionServed,
  CasesFallen,
  ThankYou,
  Case,
  PdfViewer,
  RepeatReferrals,
  ThankYou
});

const AddStack = createStackNavigator({
  NewCase,
  Questions,
  RepeatReferrals,
  ThankYou,
  Preview
});

const SearchStack = createStackNavigator({
  ActiveCases
});

const SignedOut = createStackNavigator(
  {
    Login
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const RegisterMobile = createStackNavigator(
  {
    VerfifyMobile,
    ActivateDevice
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
const RegisterPin = createStackNavigator(
  {
    PinRegistration
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
// const Stack1 = ({ navigation }) => <MapStack navigation={navigation} screenProps={{ rootNavigation: navigation.user }} />;
// Stack1.router = MapStack.router;

const SignedIn = createBottomTabNavigator(
  {
    Home: HomeStack,
    Add: AddStack,
    Search: SearchStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // tabBarLabel: navigation.state.routeName,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return (
            // <Image
            //   source={home}
            //   style={{
            //     height: moderateScale(30),
            //     width: moderateScale(30),
            //     tintColor
            //   }}
            // />
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                borderWidth: 1,
                borderColor: focused ? colors.accent : colors.grey,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Icon
                name="home"
                type="entypo"
                color={focused ? colors.accent : colors.grey}
              />
            </View>
          );
        }
        if (routeName === "Add") {
          return (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                borderWidth: 1,
                borderColor: focused ? colors.accent : colors.grey,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Icon
                name="plus"
                type="entypo"
                color={focused ? colors.accent : colors.grey}
              />
            </View>
          );
        }
        if (routeName === "Search") {
          return (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                borderWidth: 1,
                borderColor: focused ? colors.accent : colors.grey,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Icon
                name="search"
                type="evilicon"
                color={focused ? colors.accent : colors.grey}
              />
            </View>
          );
        }
      }
    }),
    tabBarOptions: {
      header: null,
      activeTintColor: colors.accent,
      inactiveTintColor: colors.grey,
      activeBackgroundColor: "transparent",
      inactiveBackgroundColor: "transparent",
      style: {
        height: 80,
        backgroundColor: "colors.grey",
        paddingVertical: 5
      }, // set to 65 for ios
      tabStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      labelStyle: {
        marginLeft: 0,
        marginTop: moderateScale(4),
        fontSize: 0
      },
      safeAreaInset: { bottom: "never" }
    }
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index === 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const MainStackNavigator = createStackNavigator(
  {
    RegisterMobile,
    SignedOut,
    RegisterPin,
    SignedIn,
    AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none"
  }
);

export default createAppContainer(MainStackNavigator);
