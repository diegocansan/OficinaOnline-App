import { Component, OnInit, Input, Output, EventEmitter, LOCALE_ID } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from '../../shared/messages/notification.service'
import {Ordem} from './ordem.model'
import {OrdemService} from '../ordemservico.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import { DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'oo-ordem',
  templateUrl: './ordem.component.html',
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

export class OrdemComponent implements OnInit {

  ordemState = 'ready'

  @Input() ordem: Ordem
  @Output() deletado: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private ordemService: OrdemService,
              private notificationService: NotificationService,
              private dialogService: DialogService) {}

  ngOnInit() {
  }

  remove(ordem: Ordem)
  {
    this.ordemService.remover(ordem)
      .subscribe( (retorno: boolean) => {
        if(retorno){
          this.deletado.emit(null)
          this.notificationService.notify(`Ordem de serviço removida!`)
        }
        else
          this.notificationService.notify(`Erro ao remover ordem de serviço!`)

    })
  }

  showModal(ordem: Ordem) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Excluir Ordem Serviço!',
        message:`Deseja realmente excluir a ordem: ${ordem.id}?`})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.remove(ordem)
      });
    }

    stringAsDate(dateStr) {
      dateStr = String(dateStr).replace("dez","dec").replace("out","oct").replace("ago","aug").replace("fev","feb").replace("abr","apr").replace("mai","may").replace("set","sep")
      return new Date(dateStr).toJSON()
    }

}
