export interface Personagem {
  codigo: string;
  nome: string;
  companhia: string;
  habilidades: [
    {habilidade: {
      codigo: string,
      nome: string
    }}
  ];
}
