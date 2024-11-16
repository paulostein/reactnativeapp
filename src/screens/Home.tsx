import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { user, logout } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Sair" onPress={handleLogout} />
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    await logout();
    Alert.alert("Você saiu com sucesso!");
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-semibold mb-4">
        Bem-vindo, {user?.username}!
      </Text>
    </View>
  );
};


