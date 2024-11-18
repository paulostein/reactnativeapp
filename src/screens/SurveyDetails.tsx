import React from "react";
import { View, Text, Image, Button } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { formatDate } from "../utils/formatDate";
import useAddSurveyPhoto from "../api/hooks/useAddSurveyPhoto";
import * as ImagePicker from 'expo-image-picker';

type SurveyDetailsProps = NativeStackScreenProps<RootStackParamList, 'SurveyDetails'>;

export default function SurveyDetails({ route, navigation }: SurveyDetailsProps) {
  const { survey } = route.params;
  const { addPhoto } = useAddSurveyPhoto();

  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permissão para acessar a biblioteca de mídia é necessária.');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const newPhotoUri = pickerResult.assets[0].uri;
      if (newPhotoUri) {
        const response = await addPhoto(survey.id, newPhotoUri);
        alert(response);
        navigation.navigate('Survey');
      }
    }
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
          <View className="flex-row flex-wrap">
            {survey.fotos.map((foto, index) => (
              <Image key={index} source={{ uri: foto }} style={{ width: 100, height: 100, marginVertical: 5, margin: 3 }} />
            ))}
          </View>
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
