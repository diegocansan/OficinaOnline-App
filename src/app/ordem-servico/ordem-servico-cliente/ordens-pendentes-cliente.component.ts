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

@Component({
  selector: 'oo-ordens-pendentes-clientes',
  templateUrl: './ordem-servico-cliente-lista.component.html'
})

export class OrdensPendentesClienteComponent implements OnInit {
  ordens: Ordem[] = []

  constructor(private ordemService: OrdemService) { }

  ngOnInit() {
    this.atualizar()
  }

  onDelete(){
    this.atualizar();
  }

  atualizar(){
    this.ordemService.buscarPorStatus('1')
      .subscribe(ordens => this.ordens = ordens)
  }
}
