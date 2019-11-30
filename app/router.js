import React from "react";
import { View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
import colors from "./style";
import Preview from "./screens/Preview";
import Search from "./screens/Search";
import Login from "./screens/Login";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import Pathways from "./screens/Pathways";
import ActiveCases from "./screens/ActiveCases";
import NewCase from "./screens/NewCase";
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

const HomeStack = createStackNavigator(
  {
    Pathways,
    Preview,
    NewCase,
    Questions,
    ActiveCases,
    ProfileUpdate,
    CriticalPathway,
    CompletedReferrals,
    InjunctionServed,
    CasesFallen,
    ThankYou,
    Case,
    PdfViewer,
    RepeatReferrals
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const AddStack = createStackNavigator(
  {
    NewCase,
    Questions,
    RepeatReferrals,
    ThankYou,
    Preview
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search,
    // ActiveCases,
    Case,
    PdfViewer
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SignedOut = createStackNavigator(
  {
    Login
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
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
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);
const RegisterPin = createStackNavigator(
  {
    PinRegistration
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
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
      gesturesEnabled: false,
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
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                borderWidth: 1,
                borderColor: focused ? colors.accent : colors.grey,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Icon
                name="home"
                size={20}
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
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                borderWidth: 1,
                borderColor: focused ? colors.accent : colors.grey,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Icon
                name="plus"
                size={20}
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
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                borderWidth: 1,
                borderColor: focused ? colors.accent : colors.grey,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <Icon
                name="search"
                size={20}
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
      activeTintColor: "transparent",
      inactiveTintColor: "transparent",
      activeBackgroundColor: "transparent",
      inactiveBackgroundColor: "transparent",
      style: {
        height: 80,
        backgroundColor: "colors.grey",
        paddingVertical: 5,
        paddingHorizontal: 50
      },
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
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none",
    defaultNavigationOptions: ({ navigation }) => ({
      gesturesEnabled: false
    })
  }
);

export default createAppContainer(MainStackNavigator);
