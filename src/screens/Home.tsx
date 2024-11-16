import React, { useEffect } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";
import useFetchData from "../api/hooks/useFetchData";


type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Customer: undefined;
  Survey: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { user, logout } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="mr-5"><Button title="Sair" onPress={handleLogout} /></View>        
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    await logout();
    Alert.alert("Você saiu com sucesso!");
  };

  return (
    <View className="flex-1 justify-center items-center space-y-4 p-5 bg-slate-100">
      <Button 
        title="Ir para Customer" 
        onPress={() => navigation.navigate('Customer')} 
      />
      <Button 
        title="Ir para Vistoria" 
        onPress={() => navigation.navigate('Survey')} 
      />
    </View>
  );
};


