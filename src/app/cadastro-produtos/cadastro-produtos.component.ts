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

import {Produto} from './produto/produto.model'
import {ProdutosService} from './produtos.service'


import { DialogService } from "ng2-bootstrap-modal";
import {CadProdutoModalComponent } from '../shared/produto-modal/produto-modal.component'

@Component({
  selector: 'oo-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
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

export class CadastroProdutosComponent implements OnInit {

  searchBarState = 'hidden'
  produtos: Produto[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private produtosService: ProdutosService,
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

    this.produtosService
      .produtos(searchTerm)
      .catch(error=>Observable.from([])))
      .subscribe(produtos => this.produtos = produtos)

    this.atualizaProdutos()
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

  onDelete(){
    this.atualizaProdutos();
  }

  atualizaProdutos(){
    this.produtosService.produtos()
      .subscribe(produtos => this.produtos = produtos)
  }

  showModal() {
      this.dialogService.addDialog(CadProdutoModalComponent, {
        title:'Cadastro de Produto',
        message:'Cadastro de Produto'})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
             this.produtos.push(isConfirmed)
            else
              console.log('CANCELADO')
      });
    }


}
