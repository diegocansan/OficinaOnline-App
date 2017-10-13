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

import {Veiculo} from './veiculo/veiculo.model'
import {VeiculosService} from './veiculos.service'

@Component({
  selector: 'oo-veiculos',
  templateUrl: './veiculos.component.html',
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

export class VeiculosComponent implements OnInit {

  searchBarState = 'hidden'
  veiculos: Veiculo[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private veiculosService: VeiculosService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm =>

    this.veiculosService
      .buscarTodos(searchTerm)
      .catch(error=>Observable.from([])))
      .subscribe(veiculos => this.veiculos = veiculos)

    this.atualizaVeiculos()
  }

  onDelete(){
    this.atualizaVeiculos();
  }

  atualizaVeiculos(){
    this.veiculosService.buscarTodos()
      .subscribe(veiculos => this.veiculos = veiculos)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
