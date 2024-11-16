export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Customer: undefined;
  Survey: undefined;
  SurveyDetails: {
    survey: Partial<SurveyDetails>
  };
};

export type SurveyDetails = {
  id: number
  areaVistoriaInterna_id: number
  dataHora: string
  contemAnomalia: boolean
  anomalia: Anomalia
  tipo: Tipo
  categoria: Categoria
  observacao: string
  fotos: string[]
}

export type Anomalia = {
  id: number
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
