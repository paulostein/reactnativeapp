import React from "react";
import { View, Text, Image } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { formatDate } from "../utils/formatDate";

type SurveyDetailsProps = NativeStackScreenProps<RootStackParamList, 'SurveyDetails'>;

export default function SurveyDetails({ route }: SurveyDetailsProps) {
  const { survey } = route.params;

  return (
    <View className="p-4">
      <Text>ID: {survey.id}</Text>
      <Text>Código da Área Vistoria Interna: {survey.areaVistoriaInterna_id}</Text>
      {survey.dataHora && <Text>Data: {formatDate(survey.dataHora)}</Text>}
      <Text>Contém Anomalia: {survey.contemAnomalia ? 'Sim' : 'Não'}</Text>
      {survey.anomalia && (
        <View>
          <Text>Anomalia ID: {survey.anomalia.id}</Text>
          <Text>Anomalia Nome: {survey.anomalia.nome}</Text>
        </View>
      )}
      {survey.tipo && (
        <View>
          <Text>Tipo Descrição: {survey.tipo.descricao}</Text>
          <Text>Tipo Enum: {survey.tipo.enum}</Text>
        </View>
      )}
      {survey.categoria && (
        <View>
          <Text>Categoria Prioridade: {survey.categoria.prioridade}</Text>
          <Text>Categoria Descrição: {survey.categoria.descricao}</Text>
          <Text>Categoria Enum: {survey.categoria.enum}</Text>
        </View>
      )}
      {survey.observacao && <Text>Observação: {survey.observacao}</Text>}
      {survey.fotos && survey.fotos.length > 0 && (
        <View>
          <Text>Fotos:</Text>
          {survey.fotos.map((foto, index) => (
            <Image key={index} source={{ uri: foto }} style={{ width: 100, height: 100, marginVertical: 5 }} />
          ))}
        </View>
      )}
    </View>
  );
};
