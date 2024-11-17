import React, { useState } from "react";
import { View, Text, TextInput, Switch, Button, Platform } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from "../utils/formatDate";
import useUpdateSurvey from "../api/hooks/useUpdateSurvey"

type EditSurveyProps = NativeStackScreenProps<RootStackParamList, 'EditSurvey'>;

export default function EditSurvey({ route, navigation }: EditSurveyProps) {
  const { survey } = route.params;
  console.log(survey);

  const [areaVistoriaInternaId, setAreaVistoriaInternaId] = useState(survey.areaVistoriaInterna_id);
  const [dataHora, setDataHora] = useState(survey.dataHora);
  const [contemAnomalia, setContemAnomalia] = useState(survey.contemAnomalia);
  const [anomaliaId, setAnomaliaId] = useState(survey.anomalia?.id);
  const [tipo, setTipo] = useState(survey.tipo?.enum);
  const [categoria, setCategoria] = useState(survey.categoria?.enum);
  const [observacao, setObservacao] = useState(survey.observacao);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { updateData } = useUpdateSurvey();

  const handleSave = () => {
    const updatedSurvey = {
      areaVistoriaInterna_id: areaVistoriaInternaId,
      dataHora,
      contemAnomalia,
      anomalia_id: anomaliaId,
      tipo,
      observacao,
      categoria,
    };

    updateData(survey.id, updatedSurvey);
    navigation.navigate('Survey')
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false)

    if (selectedDate) {
      setDataHora(selectedDate.toISOString());
    }
  };

  return (
    <View className="p-4">
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
          <Text>Id Anomalia:</Text>
          <TextInput
            value={anomaliaId}
            onChangeText={setAnomaliaId}
            keyboardType='numeric'
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
        </>
      }
      <Text>Tipo:</Text>
      <TextInput
        value={tipo}
        onChangeText={setTipo}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Categoria:</Text>
      <TextInput
        value={categoria}
        onChangeText={setCategoria}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Observação:</Text>
      <TextInput
        value={observacao}
        onChangeText={setObservacao}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
