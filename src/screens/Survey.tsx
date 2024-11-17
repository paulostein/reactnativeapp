import React, { useState } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import useFetchSurvey from "../api/hooks/useFetchSurvey";
import { formatDate } from "../utils/formatDate";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackScreenProps } from "@react-navigation/stack";

type Survey = {
  id: number;
  anomalia: { id: number; nome: string };
  areaVistoriaInterna_id: number;
  dataHora: string;
};

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Customer: undefined;
  Survey: undefined;
  SurveyDetails: { survey: Survey };
  CreateSurvey: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Survey">;

export default function Survey({ navigation }: Props) {
  const { data, loading } = useFetchSurvey();
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((survey: Survey) =>
    survey.anomalia?.nome?.toLowerCase().includes(searchText.toLowerCase()) ||
    survey.areaVistoriaInterna_id.toString().includes(searchText) ||
    formatDate(survey.dataHora).toString().includes(searchText)
  );

  if (loading) {
    return <ActivityIndicator className="mt-10" />;
  }

  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center mb-4">
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
          placeholder="Buscar por código ou anomalia..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          className="ml-4 p-3 bg-blue-500 rounded-full"
          onPress={() => navigation.navigate("CreateSurvey")}
        >
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {filteredData.length === 0 ? (
        <Text className="text-center text-gray-500">Nenhuma vistoria encontrada</Text>
      ) : (
        <ScrollView>
          <View>
            <View className="flex-row items-center border-b-2 border-gray-300 pb-2 mb-4">
              <Text className="w-32 font-bold text-gray-700 text-center">Código da Área Vistoria Interna</Text>
              <Text className="w-32 font-bold text-gray-700 text-center">Anomalia</Text>
              <Text className="w-36 font-bold text-gray-700 text-center">Data</Text>
              <Text className="w-24 " />
            </View>
            {filteredData.map((survey: Survey) => (
              <View key={survey.id} className="flex-row border-b border-gray-200 py-3">
                <Text className="w-32 text-gray-600 text-center px-4">{survey.areaVistoriaInterna_id}</Text>
                <Text className="w-32 text-gray-600 text-center px-4">{survey.anomalia?.nome || "N/A"}</Text>
                <Text className="w-36 text-gray-600 text-center px-4">{formatDate(survey.dataHora)}</Text>
                <TouchableOpacity
                  className="w-24 flex items-center justify-center"
                  onPress={() => navigation.navigate("SurveyDetails", { survey })}
                >
                  <Icon name="chevron-right" size={28} color="#4A5568" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
