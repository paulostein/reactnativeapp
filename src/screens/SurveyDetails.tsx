import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { formatDate } from "../utils/formatDate";
import { launchImageLibrary } from "react-native-image-picker";
import useAddSurveyPhoto from "../api/hooks/useAddSurveyPhoto";

type SurveyDetailsProps = NativeStackScreenProps<RootStackParamList, 'SurveyDetails'>;

export default function SurveyDetails({ route, navigation }: SurveyDetailsProps) {
  const { survey } = route.params;
  const { addPhoto } = useAddSurveyPhoto();

  const handleAddPhoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const newPhotoUri = response.assets[0].uri;
          if (newPhotoUri) {
            addPhoto(survey.id, newPhotoUri)
          }
        }
      }
    );
  };

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
      <View className="mt-4 space-y-4">
        <Button title="Adicionar Foto" onPress={handleAddPhoto} />
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditSurvey', { survey })}
        />
      </View>
    </View>
  );
}
