import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Customer from "../screens/Customer";
import Survey from "../screens/Survey";
import SurveyDetails from "../screens/SurveyDetails";
import EditSurvey from "../screens/EditSurvey";
import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Customer" component={Customer} />
            <Stack.Screen name="Survey" component={Survey} />
            <Stack.Screen name="SurveyDetails" component={SurveyDetails} />
            <Stack.Screen name="EditSurvey" component={EditSurvey} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};