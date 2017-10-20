import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from '../../shared/messages/notification.service'
import {Servico} from './servico.model'
import {ServicosService} from '../servicos.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'oo-servico',
  templateUrl: './servico.component.html',
  animations: [
    trigger('servicoAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class ServicoComponent implements OnInit {

  servicoState = 'ready'

  @Input() servico: Servico
  @Output() deletado: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private servicosService: ServicosService,
              private notificationService: NotificationService,
              private dialogService: DialogService) {}


  ngOnInit() {
  }

  remove(servico: Servico)
  {
    this.servicosService.remover(servico)
      .subscribe( (retorno: boolean) => {
        if(retorno){
          this.deletado.emit(null)
          this.notificationService.notify(`Serviço removido!`)
        }
        else
          this.notificationService.notify(`Erro ao remover serviço!`)

    })
  }

  showModal(servico: Servico) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Excluir Serviço!',
        message:`Deseja realmente excluir o serviço: ${servico.nome}?`})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.remove(servico)
      });
    }

}
