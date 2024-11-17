export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Customer: undefined;
  Survey: undefined;
  SurveyDetails: {
    survey: SurveyDetails
  };
  EditSurvey: {
    survey: SurveyDetails
  };
};

export type SurveyDetails = {
  id: number
  areaVistoriaInterna_id: string
  dataHora: string
  contemAnomalia: boolean
  anomalia: Partial<Anomalia>
  tipo: Partial<Tipo>
  categoria: Partial<Categoria>
  observacao: string | undefined
  fotos: string[]
}

export type Anomalia = {
  id: string
  nome: string
}

export type Tipo = {
  descricao: string
  enum: string
}

export type Categoria = {
  prioridade: number
  descricao: string
  enum: string
}

export type surveyToUpdate = {
  areaVistoriaInterna_id: string,
  dataHora: string,
  contemAnomalia: boolean,
  anomalia_id: string | undefined,
  tipo: string | undefined,
  observacao: string | undefined,
  categoria: string | undefined,
}