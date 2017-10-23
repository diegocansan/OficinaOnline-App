import {Veiculo} from '../../veiculos/Veiculo/Veiculo.model';

export interface Cliente {

  id: string
  nome: string
  cpf: string
  email: string
  telefone:number

  veiculos: Veiculo[]

}
