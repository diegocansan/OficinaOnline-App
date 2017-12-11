import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import {Observable} from 'rxjs/Observable'

import {Ordem} from '../ordem/ordem.model'
import {OrdemService} from '../ordemservico.service'

import {Usuario} from '../../usuarios/usuario/usuario.model'

@Component({
  selector: 'oo-ordens-concluidas-cliente',
  templateUrl: './ordem-servico-cliente-lista.component.html'
})

export class OrdensConcluidasClienteComponent implements OnInit {
  ordens: Ordem[] = []
  usuario:Usuario

  constructor(private ordemService: OrdemService) { }

  ngOnInit() {
    this.atualizar()
  }

  onDelete(){
    this.atualizar();
  }

  atualizar(){
    if(localStorage.getItem('currentUser') != null){
      this.usuario = JSON.parse(localStorage.getItem('currentUser'))

    this.ordemService.buscarOrdemCliente(this.usuario.cliente.id,3)
      .subscribe(ordens => this.ordens = ordens)

    }
  }
}
