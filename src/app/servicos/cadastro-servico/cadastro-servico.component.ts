import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router, ActivatedRoute} from '@angular/router'

import {Servico} from  '../servico/servico.model'
import {ServicosService} from  '../servicos.service'
import {NotificationService} from '../../shared/messages/notification.service'

@Component({
  selector: 'oo-cadastro-servico',
  templateUrl: './cadastro-servico.component.html'
})
export class CadastroServicoComponent implements OnInit {

  servicoForm: FormGroup
  servico : Servico

  constructor(private servicosService: ServicosService,
              private notificationService: NotificationService,
              private router: Router, private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.servicoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      valor: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
  }

    buscar(id:string){
    this.servicosService.byId(id)
      .subscribe( (retorno) => {
        this.servico = retorno
        this.servicoForm.controls['nome'].setValue(this.servico.nome)
        this.servicoForm.controls['valor'].setValue(this.servico.valor)
      })
    }

  btnSalvar(servico:Servico){
    if(this.servico)
      this.alterar(servico)
    else
      this.salvar(servico)
  }

  salvar(servico: Servico){
    this.servicosService.salvar(servico)
      .subscribe( (retorno) => {
        this.router.navigate(['/servicos'])
        this.notificationService.notify(`serviço adicionado!`)
    })
  }

  alterar(servico: Servico){
    this.servico.nome = servico.nome
    this.servico.valor = servico.valor

    this.servicosService.alterar(this.servico)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/servicos'])
        this.notificationService.notify(`serviço alterado!`)
    })
  }
}
