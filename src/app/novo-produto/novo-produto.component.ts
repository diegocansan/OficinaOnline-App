import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router, ActivatedRoute} from '@angular/router'

import { Produto } from  '../cadastro-produtos/produto/produto.model'
import { ProdutosService } from  '../cadastro-produtos/produtos.service'
import {NotificationService} from '../shared/messages/notification.service'

@Component({
  selector: 'oo-novo-produto',
  templateUrl: './novo-produto.component.html'
})
export class NovoProdutoComponent implements OnInit {

  produtoForm: FormGroup
  produto : Produto

  constructor(private produtosService: ProdutosService,
              private notificationService: NotificationService,
              private router: Router, private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      valor: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
  }

    buscar(id:string){
    this.produtosService.produtoById(id)
      .subscribe( (retorno) => {
        this.produto = retorno
        this.produtoForm.controls['nome'].setValue(this.produto.nome)
        this.produtoForm.controls['valor'].setValue(this.produto.valor)
      })
    }

  btnSalvar(produto:Produto){
    if(this.produto)
      this.alterar(produto)
    else
      this.salvar(produto)
  }

  salvar(produto: Produto){
    this.produtosService.salvarProduto(produto)
      .subscribe( (retorno: string) => {
        this.router.navigate(['/produtos'])
        this.notificationService.notify(`Produto adicionado!`)
    })
  }

  alterar(produto: Produto){
    this.produto.nome = produto.nome
    this.produto.valor = produto.valor

    this.produtosService.alterarProduto(this.produto)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/produtos'])
        this.notificationService.notify(`Produto alterado!`)
    })
  }
}
