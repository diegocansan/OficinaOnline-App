import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {InputComponent} from './input/input.component'
import {RadioComponent} from './radio/radio.component'


import {ProdutosService} from '../cadastro-produtos/produtos.service'
import {ServicosService} from '../servicos/servicos.service'
import {UsuariosService} from '../usuarios/usuarios.service'
import {ClientesService} from '../clientes/clientes.service'
import {SnackbarComponent} from './messages/snackbar/snackbar.component';
import {NotificationService} from './messages/notification.service'

@NgModule({
  declarations: [InputComponent, RadioComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent,SnackbarComponent,CommonModule,FormsModule, ReactiveFormsModule ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:[ProdutosService,ServicosService,UsuariosService,ClientesService,NotificationService]
    }
  }
}
