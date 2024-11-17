import React, { useState } from "react";
import { View, Text, TextInput, Switch, Button, Alert, ScrollView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Anomalia, Categoria, RootStackParamList, Tipo } from "../types";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from "../utils/formatDate";
import useUpdateSurvey from "../api/hooks/useUpdateSurvey"
import useFetchType from "../api/hooks/useFetchTipoAnomalia";
import useFetchAnomaly from "../api/hooks/useFetchAnomaly";
import useFetchCategory from "../api/hooks/useFetchCategoriaPrioridade";
import { Picker } from '@react-native-picker/picker';

type EditSurveyProps = NativeStackScreenProps<RootStackParamList, 'EditSurvey'>;

export default function EditSurvey({ route, navigation }: EditSurveyProps) {
  const { survey } = route.params;
  const [areaVistoriaInternaId, setAreaVistoriaInternaId] = useState(survey.areaVistoriaInterna_id);
  const [dataHora, setDataHora] = useState(survey.dataHora);
  const [contemAnomalia, setContemAnomalia] = useState(survey.contemAnomalia);
  const [anomaliaId, setAnomaliaId] = useState(survey.anomalia?.id);
  const [tipo, setTipo] = useState(survey.tipo?.enum);
  const [categoria, setCategoria] = useState(survey.categoria?.enum);
  const [observacao, setObservacao] = useState(survey.observacao);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { updateData, error, success } = useUpdateSurvey();
  const anomalies = useFetchAnomaly();
  const types = useFetchType();
  const categories = useFetchCategory();

  const handleSave = async () => {
    const updatedSurvey = {
      areaVistoriaInterna_id: areaVistoriaInternaId,
      dataHora,
      contemAnomalia,
      anomalia_id: anomaliaId,
      tipo,
      observacao,
      categoria,
    };

    const response = await updateData(survey.id, updatedSurvey);
    Alert.alert(response);
    navigation.navigate('Survey')
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false)

    if (selectedDate) {
      setDataHora(selectedDate.toISOString());
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text>ID: {survey.id}</Text>
      <Text>Código da Área Vistoria Interna:</Text>
      <TextInput
        value={areaVistoriaInternaId}
        onChangeText={setAreaVistoriaInternaId}
        keyboardType='numeric'
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Data e Hora:</Text>
      <TextInput
        value={formatDate(dataHora)}
        onPress={() => setShowDatePicker(true)}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        editable={false}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dataHora ? new Date(dataHora) : new Date()}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text>Contém Anomalia:</Text>
        <Switch value={contemAnomalia} onValueChange={setContemAnomalia} />
      </View>
      {contemAnomalia &&
        <>
          <Text>Anomalia:</Text>
          <View className="border-b border-gray-300 mb-4">
            <Picker
              selectedValue={anomaliaId}
              onValueChange={(itemValue) => setAnomaliaId(itemValue)}
              className="text-lg"
            >
              <Picker.Item label="Selecione uma opção" value="" />
              {anomalies.map((item: Anomalia) => (
                <Picker.Item
                  key={item.id}
                  label={item.nome}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>
        </>
      }
      <Text>Tipo:</Text>
      <View className="border-b border-gray-300 mb-4">
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          className="text-lg"
        >
          <Picker.Item label="Selecione uma opção" value="" />
          {types.map((item: Tipo) => (
            <Picker.Item
              key={item.enum}
              label={item.descricao}
              value={item.enum}
            />
          ))}
        </Picker>
      </View>
      <Text>Categoria:</Text>
      <View className="border-b border-gray-300 mb-4">
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          className="text-lg"
        >
          <Picker.Item label="Selecione uma opção" value="" />
          {categories.map((item: Categoria) => (
            <Picker.Item
              key={item.prioridade}
              label={item.descricao}
              value={item.enum}
            />
          ))}
        </Picker>
      </View>
      <Text>Observação:</Text>
      <TextInput
        value={observacao}
        onChangeText={setObservacao}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Salvar" onPress={handleSave} />
    </ScrollView>
  );
}
