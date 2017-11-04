import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Produto} from '../../cadastro-produtos/produto/produto.model'
import {ProdutosService} from '../../cadastro-produtos/produtos.service'

export interface CadProdutoModalModel {
  title:string;
  message:string;
}

@Component({
  selector: 'cadProdutoModal',
  templateUrl: './produto-modal.component.html',
})
export class CadProdutoModalComponent extends DialogComponent<CadProdutoModalModel, Produto> implements CadProdutoModalModel, OnInit {
  title: string;
  message: string;
  produtoForm: FormGroup
  produto : Produto

  constructor(dialogService: DialogService,
              private produtosService: ProdutosService,
              private formBuilder: FormBuilder) {
    super(dialogService);
  }

  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      valor: this.formBuilder.control('', Validators.required)
    })
}

  confirm(produto: Produto) {
      this.produtosService.salvarProduto(produto)
        .subscribe( (retorno) => {
          this.result = retorno
      })
      this.close();
  }
  cancel() {
    this.result = null;
    this.close();
  }
}
