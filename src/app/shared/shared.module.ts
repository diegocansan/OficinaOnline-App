import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component'
import {CadVeiculoModalComponent } from './veiculo-modal/veiculo-modal.component'
import {InputComponent} from './input/input.component'
import {RadioComponent} from './radio/radio.component'

import {ProdutosService} from '../cadastro-produtos/produtos.service'
import {ServicosService} from '../servicos/servicos.service'
import {UsuariosService} from '../usuarios/usuarios.service'
import {ClientesService} from '../clientes/clientes.service'
import {VeiculosService} from '../veiculos/veiculos.service'
import {SnackbarComponent} from './messages/snackbar/snackbar.component';
import {NotificationService} from './messages/notification.service';


@NgModule({
  declarations: [InputComponent, RadioComponent, SnackbarComponent, ConfirmModalComponent, CadVeiculoModalComponent],
  entryComponents: [ConfirmModalComponent,CadVeiculoModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent,SnackbarComponent,CommonModule,FormsModule, ReactiveFormsModule, ConfirmModalComponent,CadVeiculoModalComponent ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule:SharedModule,
      providers:[ProdutosService,ServicosService,UsuariosService,ClientesService,VeiculosService,NotificationService],
        }
  }
}
