import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from '../../shared/messages/notification.service'
import {Cliente} from './cliente.model'
import {ClientesService} from '../clientes.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import { DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'oo-cliente',
  templateUrl: './cliente.component.html',
  animations: [
    trigger('clienteAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})

export class ClienteComponent implements OnInit {

  clienteState = 'ready'

  @Input() cliente: Cliente
  @Output() deletado: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private clientesService: ClientesService,
              private notificationService: NotificationService,
              private dialogService: DialogService) {}

  ngOnInit() {
  }


  remove(cliente: Cliente)
  {
    this.clientesService.remover(cliente)
      .subscribe( (retorno: boolean) => {
        if(retorno){
          this.deletado.emit(null)
          this.notificationService.notify(`Cliente removido!`)
        }
        else
          this.notificationService.notify(`Erro ao remover cliente!`)

    })
  }

  showModal(cliente: Cliente) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Excluir Cliente!',
        message:`Deseja realmente excluir o cliente: ${cliente.nome}?`})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.remove(cliente)
      });
    }

}
