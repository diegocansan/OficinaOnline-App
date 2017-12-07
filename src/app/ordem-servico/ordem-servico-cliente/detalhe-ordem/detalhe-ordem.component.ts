import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormsModule, FormGroup, FormBuilder,Validators, AbstractControl} from '@angular/forms'
import { DialogService } from "ng2-bootstrap-modal";
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {Router, ActivatedRoute} from '@angular/router'

import {Ordem} from '../../ordem/ordem.model'
import {OrdemService} from '../../ordemservico.service'

import {StatusOrdem} from '../../ordem/status.model'
import {StatusOrdemService} from '../../statusordem.service'

import {Cliente} from  '../../../clientes/cliente/cliente.model'
import {ClientesService} from  '../../../clientes/clientes.service'

import {Veiculo} from  '../../../veiculos/veiculo/veiculo.model'
import {VeiculosService} from '../../../veiculos/veiculos.service'

import {Produto} from '../../../cadastro-produtos/produto/produto.model'
import {ProdutosService} from '../../../cadastro-produtos/produtos.service'

import {Servico} from '../../../servicos/servico/servico.model'
import {ServicosService} from '../../../servicos/servicos.service'

import {NotificationService} from '../../../shared/messages/notification.service'
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component'
import {CadVeiculoModalComponent } from '../../../shared/veiculo-modal/veiculo-modal.component'
import {CadProdutoModalComponent } from '../../../shared/produto-modal/produto-modal.component'
import {CadServicoModalComponent } from '../../../shared/servico-modal/servico-modal.component'

@Component({
  selector: 'oo-detalhe-ordem',
  templateUrl: './detalhe-ordem.component.html'
})
export class DetalheOrdemComponent implements OnInit {

  ordemForm: FormGroup
  ordem: Ordem
  statusOrdem: StatusOrdem []
  statusSelected: StatusOrdem

  nomeClienteSelecionado: String;
  clienteTypeaheadLoading: boolean;
  clienteTypeaheadNoResults: boolean;
  dataSourceClientes: Observable<Cliente[]>;

  dataSourceVeiculos: Observable<Veiculo[]>;
  veiculoSelecionado: String;
  veiculoTypeaheadLoading: boolean;
  veiculoTypeaheadNoResults: boolean;

  nomeProdutoSelecionado: String;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSourceProdutos: Observable<Produto[]>;

  nomeServicoSelecionado: String;
  servicostypeaheadLoading: boolean;
  servicostypeaheadNoResults: boolean;
  dataSourceServicos: Observable<Servico[]>;

  disableInput: boolean;

  constructor(private ordemService: OrdemService,
              private StatusOrdemService: StatusOrdemService,
              private clientesService: ClientesService,
              private veiculosService: VeiculosService,
              private produtosService: ProdutosService,
              private servicosService: ServicosService,
              private notificationService: NotificationService,
              private router: Router,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialogService:DialogService) {


      this.dataSourceClientes = Observable.create((observer: any) => {
        observer.next(this.nomeClienteSelecionado);
      }).mergeMap((token: string) => this.getClientesAsObservable(token));

      this.dataSourceVeiculos = Observable.create((observer: any) => {
        observer.next(this.veiculoSelecionado);
      }).mergeMap((token: string) => this.getVeiculosAsObservable(token));

      this.dataSourceProdutos = Observable.create((observer: any) => {
        observer.next(this.nomeProdutoSelecionado);
      }).mergeMap((token: string) => this.getProdutosAsObservable(token));

      this.dataSourceServicos = Observable.create((observer: any) => {
        observer.next(this.nomeServicoSelecionado);
      }).mergeMap((token: string) => this.getServicosAsObservable(token));


    }

    ngOnInit() {
      this.ordem = {id:null,data:"", status:{id:"",status:""}, cliente:{id:null,nome:"",cpf:"",email:"",telefone:null,veiculos:[]}, veiculo:{id:null,placa:"",modelo:"",fabricante:"",ano:"",cor:""},produtos:[],servicos:[]}

      this.disableInput = true;

      this.ordemForm = this.formBuilder.group({
        nome: this.formBuilder.control(this.ordem.cliente.nome, Validators.required),
        cpf: this.formBuilder.control(this.ordem.cliente.cpf,Validators.required),
        email: this.formBuilder.control(this.ordem.cliente.email),
        telefone: this.formBuilder.control(this.ordem.cliente.telefone),
        placa: this.formBuilder.control(this.ordem.veiculo.placa, Validators.required),
        modelo: this.formBuilder.control(this.ordem.veiculo.modelo),
        fabricante: this.formBuilder.control(this.ordem.veiculo.fabricante)
      })

      let id = this.route.snapshot.paramMap.get("id")
      if(id)
        this.buscar(id)
    }

    ngAfterViewInit(){
      this.carregaStatus()
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

      if(this.ordem.id != null)
        this.alterar(this.ordem)
      else{
        this.ordem.data = new Date().toJSON()
        this.salvar(this.ordem)
      }

    }

    salvar(ordem: Ordem){
      this.ordemService.salvar(ordem)
      .subscribe( (retorno: any) => {
        this.router.navigate(['/ordemServico'])
        this.notificationService.notify(`Ordem de Serviço adicionada!`)
      })
    }

    alterar(ordem: Ordem){

      this.ordem.data   =  new Date(String(this.ordem.data).replace("dez","dec").replace("out","oct").replace("ago","aug").replace("fev","feb")
                                                           .replace("abr","apr").replace("mai","may").replace("set","sep")).toJSON()
      this.ordem.cliente = ordem.cliente
      this.ordem.servicos = ordem.servicos
      this.ordem.produtos = ordem.produtos

      this.ordemService.alterar(this.ordem)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/ordemServico'])
        this.notificationService.notify(`Ordem de Serviço alterada!`)
      })
    }

    /* ------------- STATUS ------------------ */
    carregaStatus(){
      this.StatusOrdemService.buscarTodos()
        .subscribe( (retorno) => {
          this.statusOrdem = retorno
          this.statusSelected = this.statusOrdem.find((noArray)=> noArray.id == this.ordem.status.id)
        })
    }

    setStatus(status: StatusOrdem){
        this.ordem.status = status
    }
    /* -------------- FIM STATUS ------------- */



    /* ------------ CLIENTE ---------------- */
    getClientesAsObservable(token: string): Observable<Cliente[]> {
      return this.clientesService
      .buscarTodos(token)
      .catch(error=>Observable.from([]))
    }

    changeClienteTypeaheadLoading(e: boolean): void {
      this.clienteTypeaheadLoading = e;
    }

    changeClienteTypeaheadNoResults(e: boolean): void {
      this.clienteTypeaheadNoResults = e;
    }

    typeaheadClienteOnSelect(e: TypeaheadMatch): void {
      this.addClienteOrdem(e.item)
      this.nomeClienteSelecionado = ""
      this.ordem.veiculo = {id:null,placa:"",modelo:"",fabricante:"",ano:"",cor:""}
    }

    addClienteOrdem(cliente: Cliente){
      if (cliente)
        this.ordem.cliente = cliente
      else
        this.notificationService.notify(`Cliente não encontrado!`)
    }
    /* --------------------- FIM CLIENTE -----------------------*/



    /*--------------------- VEICULO -------------------------*/
    showModalCadVeiculo() {
      this.dialogService.addDialog(CadVeiculoModalComponent, {
        title:'Cadastro de Veículo',
        message:'Cadastro de veículo'})
        .subscribe((veiculo)=>{
          if(veiculo)
            this.addVeiculoOrdem(veiculo)
        });
      }

      getVeiculosAsObservable(token: string): Observable<Veiculo[]> {

        let query = new RegExp(token,"gi")
        return Observable.of(this.ordem.cliente.veiculos.filter((veiculoDoArray) => {
            return query.test(veiculoDoArray.placa);
          }))
      }

      changeVeiculoTypeaheadLoading(e: boolean): void {
        this.veiculoTypeaheadLoading = e;
      }

      changeVeiculoTypeaheadNoResults(e: boolean): void {
        this.veiculoTypeaheadNoResults = e;
      }

      typeaheadVeiculoOnSelect(e: TypeaheadMatch): void {
        this.addVeiculoOrdem(e.item)
        this.veiculoSelecionado = ""
      }

      addVeiculoOrdem(veiculo: Veiculo){
        if (veiculo)
          this.ordem.veiculo = veiculo
        else
          this.notificationService.notify(`Veículo não encontrado!`)
      }
      /*----------------FIM VEICULO --------------------------*/



      /* ------------------ PRODUTOS ------------------- */
      getProdutosAsObservable(token: string): Observable<Produto[]> {
        return this.produtosService
        .produtos(token)
        .catch(error=>Observable.from([]))
      }

      changeProdutoTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
      }

      changeProdutoTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
      }

      typeaheadProdutoOnSelect(e: TypeaheadMatch): void {
        this.addProdutoOrdem(e.item)
        this.nomeProdutoSelecionado = ""
      }
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
          getServicosAsObservable(token: string): Observable<Servico[]>{
            return this.servicosService
            .buscarTodos(token)
            .catch(error=>Observable.from([]))
          }

          typeaheadServicoLoading(e: boolean): void {
            this.servicostypeaheadLoading = e;
          }

          typeaheadServicoNoResults(e: boolean): void {
            this.servicostypeaheadNoResults = e;
          }

          typeaheadServicoOnSelect(e: TypeaheadMatch): void {
            this.addServicoOrdem(e.item)
            this.nomeServicoSelecionado = ""
          }

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
                  this.ordem.servicos.push(servico)
                }
                else
                this.notificationService.notify(`Serviço não encontrado!`)
              }

              /*--------- FIM SERVIÇOS -----------*/
            }
