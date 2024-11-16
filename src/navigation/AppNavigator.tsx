import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Customer from "../screens/Customer";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Customer: undefined;
  Survey: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator(){
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Customer" component={Customer} />
          </>          
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};