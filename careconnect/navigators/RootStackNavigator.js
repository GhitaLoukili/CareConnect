import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeStackNavigator from "./WelcomeStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import NewAccountStackNavigator from "./NewAccountStackNavigator";
import VisitorStackNavigator from "./VisitorStackNavigator";
import UserStackNavigator from "./UserStackNavigator";
import NannyHiringVisitorStackNavigator from "./NannyHiringVisitorStackNavigator";
import NannyHiringUserStackNavigator from "./NannyHiringUserStackNavigator";

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
      initialRouteName="Welcome"
    >
      <RootStack.Screen name="WelcomeScreen" component={WelcomeStackNavigator} />
      <RootStack.Screen name="AuthScreen" component={AuthStackNavigator} />
      <RootStack.Screen name="NewAccount" component={NewAccountStackNavigator} />
      <RootStack.Screen name="Visitor" component={VisitorStackNavigator} />
      <RootStack.Screen name="User" component={UserStackNavigator} />
      <RootStack.Screen name="NannyHiringVisitor" component={NannyHiringVisitorStackNavigator} />
      <RootStack.Screen name="NannyHiringUser" component={NannyHiringUserStackNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
