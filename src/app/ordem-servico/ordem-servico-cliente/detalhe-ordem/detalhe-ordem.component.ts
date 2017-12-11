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
              private notificationService: NotificationService,
              private router: Router,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder) {
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
      this.ordem.status.id = "2"

      this.ordemService.alterar(this.ordem)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/ordemServicoCliente'])
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

}
