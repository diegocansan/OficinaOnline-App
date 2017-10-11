import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router, ActivatedRoute} from '@angular/router'

import {Cliente} from  '../cliente/cliente.model'
import {ClientesService} from  '../clientes.service'
import {NotificationService} from '../../shared/messages/notification.service'

@Component({
  selector: 'oo-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html'
})
export class CadastroClienteComponent implements OnInit {

  clienteForm: FormGroup
  cliente : Cliente

  constructor(private clientesService: ClientesService,
              private notificationService: NotificationService,
              private router: Router, private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

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
    if(this.cliente)
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
}
