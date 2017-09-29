import {Cliente} from '../cadastro-cliente/cliente.model';

class Veiculo {
  constructor(
    public placa: string,
    public modelo: string,
    public fabricante: string,
    public cor: string,
    public ano: number,
    public cliente: Cliente
  ){}
}

class OrderItem {
  constructor(public quantity: number, public menuId: string){}
}

export {Veiculo}
