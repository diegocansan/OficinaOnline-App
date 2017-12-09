import {Cliente} from '../../clientes/cliente/cliente.model'

export interface Usuario {

  id: string
  login: string
  senha: string
  cliente: Cliente

}
