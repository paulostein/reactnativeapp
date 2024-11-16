import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import useFetchData from "../api/hooks/useFetchData";

type Customer = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
};

export default function Customer() {
  const { data, loading } = useFetchData();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<"all" | "withEmail" | "withPhone">("all");

  if (loading) {
    return <ActivityIndicator className="mt-10" />;
  }

  const isPhoneValid = (phone: string) => /^\d+$/.test(phone);

  const isEmailValid = (email: string) => email.includes("@");

  const filteredData = data
    .filter((customer: Customer) => {
      if (filterType === "withEmail") return isEmailValid(customer.email);
      if (filterType === "withPhone") return isPhoneValid(customer.telefone);
      return true;
    })
    .filter((customer: Customer) =>
      customer.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.telefone.includes(searchText)
    );

  return (
    <View className="p-4">
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4"
        placeholder="Buscar por nome, email ou telefone"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          onPress={() => setFilterType("all")}
          className={`w-1/4 px-4 py-2 rounded-md ${filterType === "all" ? "bg-blue-500" : "bg-gray-300"}`}
        >
          <Text className={`text-center ${filterType === "all" ? "text-white" : "text-black"}`}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterType("withEmail")}
          className={`px-4 py-2 rounded-md ${filterType === "withEmail" ? "bg-blue-500" : "bg-gray-300"}`}
        >
          <Text className={`${filterType === "withEmail" ? "text-white" : "text-black"}`}>Com Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterType("withPhone")}
          className={`px-4 py-2 rounded-md ${filterType === "withPhone" ? "bg-blue-500" : "bg-gray-300"}`}
        >
          <Text className={`${filterType === "withPhone" ? "text-white" : "text-black"}`}>Com Telefone</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        {filteredData.length === 0 ? (
          <Text className="text-center text-gray-500">Nenhum cliente encontrado</Text>
        ) : (
          <View>
            <View className="flex-row border-b-2 border-gray-300 pb-2 mb-4">
              <Text className="w-16 font-bold text-gray-700 text-center">ID</Text>
              <Text className="w-40 font-bold text-gray-700 text-left">Nome</Text>
              <Text className="w-60 font-bold text-gray-700 text-left">Email</Text>
              <Text className="w-40 font-bold text-gray-700 text-left">Telefone</Text>
            </View>
            {filteredData.map((customer: Customer) => (
              <View key={customer.id} className="flex-row border-b border-gray-200 py-3">
                <Text className="w-16 text-gray-600 text-center px-4">{customer.id}</Text>
                <Text className="w-40 text-gray-600 text-left px-4">{customer.nome}</Text>
                <Text className="w-60 text-gray-600 text-left px-4">{customer.email}</Text>
                <Text className="w-40 text-gray-600 text-left px-4">{customer.telefone}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
