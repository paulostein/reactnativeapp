import React, { useState } from "react";
import { View, Text, TextInput, Switch, Button, Platform, Alert, ScrollView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Anomalia, Categoria, RootStackParamList, Tipo } from "../types";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from "../utils/formatDate";
import useCreateSurvey from "../api/hooks/useCreateSurvey"; // Alterar para hook de criar pesquisa
import useFetchType from "../api/hooks/useFetchTipoAnomalia";
import useFetchAnomaly from "../api/hooks/useFetchAnomaly";
import useFetchCategory from "../api/hooks/useFetchCategoriaPrioridade";
import { Picker } from '@react-native-picker/picker';

type CreateSurveyProps = NativeStackScreenProps<RootStackParamList, 'CreateSurvey'>;

export default function CreateSurvey({ navigation }: CreateSurveyProps) {
  const [areaVistoriaInternaId, setAreaVistoriaInternaId] = useState('');
  const [dataHora, setDataHora] = useState(new Date().toISOString());
  const [contemAnomalia, setContemAnomalia] = useState(false);
  const [anomaliaId, setAnomaliaId] = useState<string | undefined>(undefined);
  const [tipo, setTipo] = useState<string | undefined>(undefined);
  const [categoria, setCategoria] = useState<string | undefined>(undefined);
  const [observacao, setObservacao] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { createData } = useCreateSurvey();
  const anomalies = useFetchAnomaly();
  const types = useFetchType();
  const categories = useFetchCategory();

  const handleSave = async () => {
    const newSurvey = {
      areaVistoriaInterna_id: areaVistoriaInternaId,
      dataHora,
      contemAnomalia,
      anomalia_id: anomaliaId,
      tipo,
      observacao,
      categoria,
    };

    const response = await createData(newSurvey);

    if (response.success) {
      Alert.alert("Vistoria criada com sucesso!");
    } else {
      Alert.alert("Erro ao criar Vistoria", response.message);
    }

    navigation.navigate('Survey')
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataHora(selectedDate.toISOString());
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
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
