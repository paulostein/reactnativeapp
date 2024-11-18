import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const isSuccess = await login(username, password);

    if (isSuccess) {
      setErrorMessage("");
      Alert.alert("Login bem-sucedido!");
    } else {
      setErrorMessage("Credenciais inválidas. Tente novamente!");
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-blue-100">
      <Text className="text-2xl text-center font-semibold mb-6">Login</Text>

      <TextInput
        className="border border-gray-300 p-3 rounded mb-4"
        placeholder="Usuário"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          if (errorMessage) setErrorMessage("");
        }}
      />

      <TextInput
        className="border border-gray-300 p-3 rounded mb-4"
        placeholder="Senha"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errorMessage) setErrorMessage("");
        }}
        secureTextEntry
      />

      {errorMessage ? <Text className="text-red-500 text-center mb-4">{errorMessage}</Text> : null}

      <Button title="Entrar" onPress={handleLogin} />
      <Text className="text-xs text-right mt-6 color-red-500">*Para logar utilize Usuário:user Senha:1234</Text>
    </View>
  );
};
