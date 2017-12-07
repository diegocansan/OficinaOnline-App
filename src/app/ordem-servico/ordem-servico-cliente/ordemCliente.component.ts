import { Component, OnInit, Input,LOCALE_ID } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {Ordem} from '../ordem/ordem.model'
import {OrdemService} from '../ordemservico.service'
import {Usuario} from '../../usuarios/usuario/usuario.model'


@Component({
  selector: 'oo-ordem-cliente',
  templateUrl: './ordemCliente.component.html',
  animations: [
    trigger('ordemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})

export class OrdemClienteComponent implements OnInit {

  ordemState = 'ready'
  usuario: Usuario

  @Input() ordem: Ordem

  constructor(private router: Router,
              private ordemService: OrdemService) {}

  ngOnInit() {
  }

  stringAsDate(dateStr) {
    dateStr = String(dateStr).replace("dez","dec").replace("out","oct").replace("ago","aug").replace("fev","feb").replace("abr","apr").replace("mai","may").replace("set","sep")
    return new Date(dateStr).toJSON()
  }

  usuarioAdminsitrador(): boolean
  {
      if(localStorage.getItem('currentUser') != null){
        this.usuario = JSON.parse(localStorage.getItem('currentUser'))
        return this.usuario.id == "5"
      }
      return false
  }
}
