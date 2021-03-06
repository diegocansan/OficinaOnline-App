import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {NotificationService} from '../../shared/messages/notification.service'
import {Veiculo} from './veiculo.model'
import {VeiculosService} from '../veiculos.service'
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component'
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'oo-veiculo',
  templateUrl: './veiculo.component.html',
  animations: [
    trigger('veiculoAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class VeiculoComponent implements OnInit {

  veiculoState = 'ready'

  @Input() veiculo: Veiculo
  @Output() deletado: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private veiculosService: VeiculosService,
              private notificationService: NotificationService,
              private dialogService: DialogService) {}

  ngOnInit() {
  }

  remove(veiculo: Veiculo)
  {
    this.veiculosService.remover(veiculo)
      .subscribe( (retorno: boolean) => {
        if(retorno){
          this.deletado.emit(null)
          this.notificationService.notify(`Veículo removido!`)
        }
        else
          this.notificationService.notify(`Erro ao remover veículo!`)

    })
  }

  showModal(veiculo: Veiculo) {
      this.dialogService.addDialog(ConfirmModalComponent, {
        title:'Excluir Veículo!',
        message:`Deseja realmente excluir o veículo com placa: ${veiculo.placa}?`})
        .subscribe((isConfirmed)=>{
            if(isConfirmed)
              this.remove(veiculo)
      });
    }

}
