import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component'
import {CadVeiculoModalComponent } from './veiculo-modal/veiculo-modal.component'
import {CadProdutoModalComponent } from './produto-modal/produto-modal.component';
import {CadServicoModalComponent } from './servico-modal/servico-modal.component';
import {InputComponent} from './input/input.component'
import {RadioComponent} from './radio/radio.component'

import {OrdemService} from '../ordem-servico/ordemservico.service'
import {StatusOrdemService} from '../ordem-servico/statusordem.service'
import {ProdutosService} from '../cadastro-produtos/produtos.service'
import {ServicosService} from '../servicos/servicos.service'
import {UsuariosService} from '../usuarios/usuarios.service'
import {ClientesService} from '../clientes/clientes.service'
import {VeiculosService} from '../veiculos/veiculos.service'
import {SnackbarComponent} from './messages/snackbar/snackbar.component';
import {NotificationService} from './messages/notification.service';


@NgModule({
  declarations: [InputComponent, RadioComponent, SnackbarComponent, ConfirmModalComponent, CadVeiculoModalComponent, CadProdutoModalComponent, CadServicoModalComponent],
  entryComponents: [ConfirmModalComponent, CadVeiculoModalComponent, CadProdutoModalComponent, CadServicoModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent,SnackbarComponent,CommonModule,FormsModule, ReactiveFormsModule, ConfirmModalComponent,CadVeiculoModalComponent, CadProdutoModalComponent,CadServicoModalComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule:SharedModule,
      providers:[OrdemService,StatusOrdemService,ProdutosService,ServicosService,UsuariosService,ClientesService,VeiculosService,NotificationService],
        }
  }
}
