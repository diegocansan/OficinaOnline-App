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

import {Servico} from './servico/servico.model'
import {ServicosService} from './servicos.service'

import { DialogService } from "ng2-bootstrap-modal";
import {CadServicoModalComponent } from '../shared/servico-modal/servico-modal.component'


@Component({
  selector: 'oo-servicos',
  templateUrl: './servicos.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class ServicosComponent implements OnInit {

  searchBarState = 'hidden'
  servicos: Servico[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private servicosService: ServicosService,
              private fb: FormBuilder,
            private dialogService:DialogService) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm =>

    this.servicosService
      .buscarTodos(searchTerm)
      .catch(error=>Observable.from([])))
      .subscribe(servicos => this.servicos = servicos)

    this.atualizaServicos()
  }

  onDelete(){
    this.atualizaServicos();
  }

  atualizaServicos(){
    this.servicosService.buscarTodos()
      .subscribe(servicos => this.servicos = servicos)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

  showModal() {
      this.dialogService.addDialog(CadServicoModalComponent, {
        title:'Cadastro de Servico',
        message:'Cadastro de Servico'})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
             this.servicos.push(isConfirmed)
            else
              console.log('CANCELADO')
      });
    }



}
