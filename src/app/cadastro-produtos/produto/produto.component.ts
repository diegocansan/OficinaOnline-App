import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from '../../shared/messages/notification.service'
import {Produto} from './produto.model'
import {ProdutosService} from '../produtos.service'

@Component({
  selector: 'oo-produto',
  templateUrl: './produto.component.html',
  animations: [
    trigger('produtoAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class ProdutoComponent implements OnInit {

  produtoState = 'ready'

  @Input() produto: Produto
  @Output() deletado: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private produtosService: ProdutosService,
              private notificationService: NotificationService) {}


  ngOnInit() {
  }

  removeProduto(produto: Produto)
  {
    this.produtosService.removeProduto(produto)
      .subscribe( (retorno: boolean) => {
        if(retorno){
          this.deletado.emit(null)
          this.notificationService.notify(`Produto removido com sucesso!`)
        }
        else
          this.notificationService.notify(`Erro ao remover produto!`)

    })
  }

}
