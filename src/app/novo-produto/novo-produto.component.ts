import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router} from '@angular/router'

import { Produto } from  '../cadastro-produtos/produto/produto.model'
import { ProdutosService } from  '../cadastro-produtos/produtos.service'
import {NotificationService} from '../shared/messages/notification.service'

@Component({
  selector: 'oo-novo-produto',
  templateUrl: './novo-produto.component.html'
})
export class NovoProdutoComponent implements OnInit {

  produtoForm: FormGroup

  constructor(private produtosService: ProdutosService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      valor: this.formBuilder.control('', Validators.required)
    })
  }

  salvar(produto: Produto){
    this.produtosService.salvarProduto(produto)
      .subscribe( (retorno: string) => {
        this.router.navigate(['/produtos'])
        this.notificationService.notify(`Produto adicionado!`)
    })
  }

}
