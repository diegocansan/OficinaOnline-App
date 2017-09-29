import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import {Produto} from './produto.model'

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

  constructor() { }

  ngOnInit() {
  }

}
