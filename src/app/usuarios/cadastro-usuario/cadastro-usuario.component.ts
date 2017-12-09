import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import {Router, ActivatedRoute} from '@angular/router'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import {DialogService } from "ng2-bootstrap-modal";
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {Usuario} from  '../usuario/usuario.model'
import {UsuariosService} from  '../usuarios.service'
import {NotificationService} from '../../shared/messages/notification.service'

import {Cliente} from  '../../clientes/cliente/cliente.model'
import {ClientesService} from  '../../clientes/clientes.service'

@Component({
  selector: 'oo-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html'
})
export class CadastroUsuarioComponent implements OnInit {

  usuarioForm: FormGroup
  usuario : Usuario

  nomeClienteSelecionado: String;
  clienteTypeaheadLoading: boolean;
  clienteTypeaheadNoResults: boolean;
  dataSourceClientes: Observable<Cliente[]>;

  constructor(private usuariosService: UsuariosService,
              private clientesService: ClientesService,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private router: Router, private route : ActivatedRoute,
              private formBuilder: FormBuilder) {

              this.dataSourceClientes = Observable.create((observer: any) => {
                  observer.next(this.nomeClienteSelecionado);
              }).mergeMap((token: string) => this.getClientesAsObservable(token));
  }


  ngOnInit() {
    this.usuario = {id:null,login:"", senha:"", cliente:null}

    this.usuarioForm = this.formBuilder.group({
      login: this.formBuilder.control('', Validators.required),
      senha: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
  }

    buscar(id:string){
    this.usuariosService.byId(id)
      .subscribe( (retorno) => {
        this.usuario = retorno
        this.usuarioForm.controls['login'].setValue(this.usuario.login)
        this.usuarioForm.controls['senha'].setValue(this.usuario.senha)

      })
    }

  btnSalvar(usuario:Usuario){
    if(this.usuario.id != null)
      this.alterar(usuario)
    else
      this.salvar(usuario)
  }

  salvar(usuario: Usuario){
    usuario.cliente = this.usuario.cliente

    this.usuariosService.salvar(usuario)
      .subscribe( (retorno: string) => {
        this.router.navigate(['/usuarios'])
        this.notificationService.notify(`Usuário adicionado!`)
    })
  }

  alterar(usuario: Usuario){

    this.usuario.login = usuario.login
    this.usuario.senha = usuario.senha

    this.usuariosService.alterar(this.usuario)
    .subscribe( (retorno: boolean) => {
        this.router.navigate(['/usuarios'])
        this.notificationService.notify(`Usuário alterado!`)
    })
  }

  /* VINCULAR CLIENTE AO LOGIN */
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
    this.addClienteLogin(e.item)
    this.nomeClienteSelecionado = ""
  }

  addClienteLogin(cliente: Cliente){
    if (cliente)
      this.usuario.cliente = cliente
    else
      this.notificationService.notify(`Cliente não encontrado!`)
  }

  showModal() {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Remover cliente do login!',
        message:`Deseja realmente remover o cliente do login?`})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.usuario.cliente = null
      });
  }

  /* FIM VINCULAR CLIENTE AO LOGIN */




}
