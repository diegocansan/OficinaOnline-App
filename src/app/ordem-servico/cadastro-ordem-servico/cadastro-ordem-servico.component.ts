import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { DialogService } from "ng2-bootstrap-modal";

import {Router, ActivatedRoute} from '@angular/router'

import {Ordem} from '../ordem/ordem.model'
import {OrdemService} from '../ordemservico.service'

import {Cliente} from  '../../clientes/cliente/cliente.model'
import {ClientesService} from  '../../clientes/clientes.service'

import {Veiculo} from  '../../veiculos/veiculo/veiculo.model'
import {VeiculosService} from '../../veiculos/veiculos.service'

import {Produto} from '../../cadastro-produtos/produto/produto.model'
import {ProdutosService} from '../../cadastro-produtos/produtos.service'

import {Servico} from '../../servicos/servico/servico.model'
import {ServicosService} from '../../servicos/servicos.service'

import {NotificationService} from '../../shared/messages/notification.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import {CadVeiculoModalComponent } from '../../shared/veiculo-modal/veiculo-modal.component'
import {CadProdutoModalComponent } from '../../shared/produto-modal/produto-modal.component'
import {CadServicoModalComponent } from '../../shared/servico-modal/servico-modal.component'



@Component({
  selector: 'oo-cadastro-ordem-servico',
  templateUrl: './cadastro-ordem-servico.component.html'
})
export class CadastroOrdemServicoComponent implements OnInit {

  ordemForm: FormGroup
  placa: String
  cpf: String
  ordem: Ordem


  constructor(private ordemService: OrdemService,
              private clientesService: ClientesService,
              private VeiculosService: VeiculosService,
              private notificationService: NotificationService,
              private router: Router,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialogService:DialogService) { }

  ngOnInit() {

    this.ordemForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      cpf: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      telefone: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
    else
      if(!this.ordem)
        this.ordem = {id:null,data:"", status:null, cliente:null, veiculo:null,produtos:[],servicos:[]}
  }

    buscar(id:string){
    this.ordemService.byId(id)
      .subscribe( (retorno) => {
        this.ordem = retorno
        this.ordemForm.controls['nome'].setValue(this.ordem.cliente.nome)
        this.ordemForm.controls['cpf'].setValue(this.ordem.cliente.cpf)
        this.ordemForm.controls['email'].setValue(this.ordem.cliente.email)
        this.ordemForm.controls['telefone'].setValue(this.ordem.cliente.telefone)
      })
    }

  btnSalvar(ordem: Ordem){

    ordem.cliente = this.ordem.cliente
    ordem.veiculo = this.ordem.veiculo
    ordem.produtos = this.ordem.produtos
    ordem.servicos = this.ordem.servicos

    if(this.ordem.id != null)
      this.alterar(ordem)
    else
      this.salvar(ordem)
  }

  salvar(ordem: Ordem){
    this.ordemService.salvar(ordem)
      .subscribe( (retorno: any) => {
        this.router.navigate(['/ordemServico'])
        this.notificationService.notify(`Ordem de Serviço adicionada!`)
    })
  }

  alterar(ordem: Ordem){
    this.ordem.cliente = ordem.cliente
    this.ordem.veiculo = ordem.veiculo
    this.ordem.servicos = ordem.servicos
    this.ordem.produtos = ordem.produtos

    this.ordemService.alterar(this.ordem)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/ordemServico'])
        this.notificationService.notify(`Ordem de Serviço alterada!`)
    })
  }

 /* ------------ CLIENTE ---------------- */
  addCliente(){
    if(this.cpf != undefined && this.cpf.toString() != ""){
      this.clientesService.byId(this.cpf.toString())
      .subscribe((cliente: Cliente) => {
        this.addClienteOrdem(cliente)
      })
    }
    else
      this.notificationService.notify(`Informe um CPF!`)
  }

  addClienteOrdem(cliente: Cliente){
    if (cliente)
      this.ordem.cliente = cliente
  }
  /* --------------------- FIM CLIENTE -----------------------*/



  /*--------------------- VEICULO -------------------------*/
  showModalCadVeiculo() {
    this.dialogService.addDialog(CadVeiculoModalComponent, {
      title:'Cadastro de Veículo',
      message:'Cadastro de veículo'})
      .subscribe((isConfirmed)=>{
          if(isConfirmed)
           this.addVeiculoOrdem(isConfirmed)
    });
  }

  addVeiculoOrdem(veiculo: Veiculo){
    if (veiculo)
      this.ordem.veiculo = veiculo
  }

  addVeiculo(){
    if(this.placa != undefined && this.placa.toString() != ""){
      this.VeiculosService.placa(this.placa.toString())
      .subscribe((veiculo: Veiculo) => {
        this.addVeiculoOrdem(veiculo)
      })
    }
    else
      this.notificationService.notify(`Informe uma placa!`)
  }
  /*----------------FIM VEICULO --------------------------*/

/* ------------------ PRODUTOS ------------------- */
  showModalCadProduto() {
      this.dialogService.addDialog(CadProdutoModalComponent, {
        title:'Cadastro de Produto',
        message:'Cadastro de Produto'})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
             this.addProdutoOrdem(isConfirmed)
      });
  }
  showModalProduto(produto: Produto) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Produto',
        message:'Deseja realmente remover este produto?'})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.ordem.produtos.splice(this.ordem.produtos.indexOf(produto),1)
      });
    }
    addProdutoOrdem(produto: Produto){
      if (produto){
        if(this.ordem.produtos.find(produtoDoArray => produtoDoArray.id == produto.id))
          this.notificationService.notify(`Produto já adicionado!`)
        else
          this.ordem.produtos.push(produto)
      }
      else
        this.notificationService.notify(`Produto não encontrado!`)
    }
    /* ------------ FIM PRODUTOS ------------------- */



    /* ------------ SERVIÇOS ------------------------ */
    showModalCadServico() {
        this.dialogService.addDialog(CadServicoModalComponent, {
          title:'Cadastro de Serviço',
          message:'Cadastro de Serviço'})
          .subscribe((isConfirmed)=>{
              if(isConfirmed)
               this.addServicoOrdem(isConfirmed)
        });
    }
    showModalServico(servico: Servico) {
        this.dialogService.addDialog(ConfirmModalComponent, {
          title:'Serviço',
          message:'Deseja realmente remover este serviço?'})
          .subscribe((isConfirmed)=>{
              if(isConfirmed)
                this.ordem.servicos.splice(this.ordem.servicos.indexOf(servico),1)
        });
    }
    addServicoOrdem(servico: Servico){
      if (servico){
        if(this.ordem.servicos.find(servicoDoArray => servicoDoArray.id == servico.id))
          this.notificationService.notify(`Serviço já adicionado!`)
        else
          this.ordem.produtos.push(servico)
      }
      else
        this.notificationService.notify(`Serviço não encontrado!`)
    }

    /*--------- FIM SERVIÇOS -----------*/

}
