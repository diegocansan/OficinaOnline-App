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
  selector: 'oo-ordens-andamento',
  templateUrl: './ordens-andamento.component.html'
})

export class OrdensAndamentoComponent implements OnInit {
  ordens: Ordem[] = []
  totalItems = 1;
  currentPage =1;
  smallnumPages = 0;
  filter: string

  constructor(private ordemService: OrdemService) { }

  ngOnInit() {
    this.atualizar()
  }

  onDelete(){
    this.atualizar();
  }

  atualizar(){
    this.ordemService.buscarPorStatus('3')
      .subscribe(ordens => this.ordens = ordens)
    this.setPageNumber()
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  setPageNumber() {
    if(this.ordens && this.ordens.length > 0)
      this.totalItems = this.ordens.length
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
