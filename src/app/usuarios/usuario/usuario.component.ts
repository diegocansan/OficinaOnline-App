import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from '../../shared/messages/notification.service'
import {Usuario} from './usuario.model'
import {UsuariosService} from '../usuarios.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import { DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'oo-usuario',
  templateUrl: './usuario.component.html',
  animations: [
    trigger('usuarioAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})

export class UsuarioComponent implements OnInit {

  usuarioState = 'ready'

  @Input() usuario: Usuario
  @Output() deletado: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private usuariosService: UsuariosService,
              private notificationService: NotificationService,
              private dialogService: DialogService) {}

  ngOnInit() {
  }

  remove(usuario: Usuario)
  {
    this.usuariosService.remover(usuario)
      .subscribe( (retorno: boolean) => {
        if(retorno){
          this.deletado.emit(null)
          this.notificationService.notify(`Usuario removido!`)
        }
        else
          this.notificationService.notify(`Erro ao remover usuario!`)

    })
  }
  showModal(usuario: Usuario) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Excluir Usuário!',
        message:`Deseja realmente excluir o usuário: ${usuario.login}?`})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.remove(usuario)
      });
    }

}
