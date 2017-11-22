import {Cliente} from '../../clientes/cliente/cliente.model'
import {Veiculo} from '../../veiculos/veiculo/veiculo.model'
import {Servico} from '../../servicos/servico/servico.model'
import {Produto} from '../../cadastro-produtos/produto/produto.model'
import {StatusOrdem} from './status.model'

export class Ordem {
  id: string
  data: string
  status: StatusOrdem
  cliente: Cliente
  veiculo: Veiculo
  servicos: Servico []
  produtos: Produto []
}
