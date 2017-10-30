import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { DialogService } from "ng2-bootstrap-modal";

import {Router, ActivatedRoute} from '@angular/router'

import {Cliente} from  '../cliente/cliente.model'
import {ClientesService} from  '../clientes.service'

import {VeiculosService} from '../../veiculos/veiculos.service'

import {NotificationService} from '../../shared/messages/notification.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import {CadVeiculoModalComponent } from '../../shared/veiculo-modal/veiculo-modal.component'

import {Veiculo} from  '../../veiculos/veiculo/veiculo.model'

@Component({
  selector: 'oo-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html'
})
export class CadastroClienteComponent implements OnInit {

  clienteForm: FormGroup
  placa: String
  cliente: Cliente

  constructor(private clientesService: ClientesService,
              private VeiculosService: VeiculosService,
              private notificationService: NotificationService,
              private router: Router,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialogService:DialogService) { }

  ngOnInit() {

    this.clienteForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      cpf: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      telefone: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
    else
      if(!this.cliente)
        this.cliente = {id:null,nome:"",cpf:"",veiculos:[],email:"", telefone:null}
  }

    buscar(id:string){
    this.clientesService.byId(id)
      .subscribe( (retorno) => {
        this.cliente = retorno
        this.clienteForm.controls['nome'].setValue(this.cliente.nome)
        this.clienteForm.controls['cpf'].setValue(this.cliente.cpf)
        this.clienteForm.controls['email'].setValue(this.cliente.email)
        this.clienteForm.controls['telefone'].setValue(this.cliente.telefone)
      })
    }

  btnSalvar(cliente: Cliente){

    console.log(this.cliente.veiculos)

    cliente.veiculos = this.cliente.veiculos

    if(this.cliente.id != null)
      this.alterar(cliente)
    else
      this.salvar(cliente)
  }

  salvar(cliente: Cliente){
    this.clientesService.salvar(cliente)
      .subscribe( (retorno: string) => {
        this.router.navigate(['/clientes'])
        this.notificationService.notify(`Cliente adicionado!`)
    })
  }

  alterar(cliente: Cliente){
    this.cliente.nome = cliente.nome
    this.cliente.cpf = cliente.cpf
    this.cliente.email = cliente.email
    this.cliente.telefone = cliente.telefone

    this.clientesService.alterar(this.cliente)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/clientes'])
        this.notificationService.notify(`Cliente alterado!`)
    })
  }

  addVeiculoLista(){
    if(this.placa != undefined && this.placa.toString() != ""){
      this.VeiculosService.placa(this.placa.toString())
      .subscribe((veiculo: Veiculo) => {
        this.addVeiculoListaCliente(veiculo)
      })
    }
    else
      this.notificationService.notify(`Informe uma placa!`)
  }

  showModalVeiculo(veiculo: Veiculo) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Veículo',
        message:'Deseja realmente desvincular este veículo?'})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.cliente.veiculos.splice(this.cliente.veiculos.indexOf(veiculo),1)
      });
    }
    showModal() {
        this.dialogService.addDialog(CadVeiculoModalComponent, {
          title:'Cadastro de Veículo',
          message:'Cadastro de veiculo'})
          .subscribe((isConfirmed)=>{
              if(isConfirmed)
               this.addVeiculoListaCliente(isConfirmed)
              else
                console.log('CANCELADO')
        });
      }

      addVeiculoListaCliente(veiculo: Veiculo){
        if (veiculo){
          if(this.cliente.veiculos.find(veiculoDoArray => veiculoDoArray.id == veiculo.id))
            this.notificationService.notify(`Veículo já adicionado!`)
          else
            this.cliente.veiculos.push(veiculo)
        }
        else
          this.notificationService.notify(`Veículo não encontrado!`)
      }

}
