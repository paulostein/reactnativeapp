import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";

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
        <View className="mr-5">
          <Button title="Sair" onPress={handleLogout} />
        </View>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    await logout();
    Alert.alert("Você saiu com sucesso!");
  };

  return (
    <View className="flex-1 justify-center items-center space-y-6 p-5 bg-slate-100">
      <Text className="m-10 text-2xl font-bold">Bem-vindo, {user?.username}!</Text>

      <View className="m-4 space-y-4 w-full max-w-xs">
        <Button
          title="Clientes"
          onPress={() => navigation.navigate('Customer')}
        />
      </View>
      <View className="m-4 space-y-4 w-full max-w-xs">
        <Button
          title="Vistorias"
          onPress={() => navigation.navigate('Survey')}
        />
      </View>
    </View>
  );
};
