import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'

import {CadastroProdutosComponent} from './cadastro-produtos/cadastro-produtos.component'
import {NovoProdutoComponent} from './cadastro-produtos/novo-produto/novo-produto.component'

import {ServicosComponent} from './servicos/servicos.component'
import {CadastroServicoComponent} from './servicos/cadastro-servico/cadastro-servico.component'

import {UsuariosComponent} from './usuarios/usuarios.component'
import {CadastroUsuarioComponent} from './usuarios/cadastro-usuario/cadastro-usuario.component'

import {ClientesComponent} from './clientes/clientes.component'
import {CadastroClienteComponent} from './clientes/cadastro-cliente/cadastro-cliente.component'

import {VeiculosComponent} from './veiculos/veiculos.component'
import {CadastroVeiculoComponent} from './veiculos/cadastro-veiculo/cadastro-veiculo.component'

import {OrdemServicoComponent} from './ordem-servico/ordem-servico.component'
import {OrdensAndamentoComponent} from './ordem-servico/ordens-andamento/ordens-andamento.component'
import {OrdensPendentesComponent} from './ordem-servico/ordens-pendentes/ordens-pendentes.component'
import {OrdensConcluidasComponent} from './ordem-servico/ordens-concluidas/ordens-concluidas.component'
import {OrdensAprovadasComponent} from './ordem-servico/ordens-aprovadas/ordens-aprovadas.component'
import {CadastroOrdemServicoComponent} from './ordem-servico/cadastro-ordem-servico/cadastro-ordem-servico.component'

import {NotFoundComponent} from './not-found/not-found.component'



export const ROUTES: Routes = [
  {path: '', component: HomeComponent},

  {path: 'ordemServico', component: OrdemServicoComponent,
    children: [
    {path: '', redirectTo: 'pendentes', pathMatch: 'full'},
    {path: 'pendentes', component: OrdensPendentesComponent},
    {path: 'aprovadas', component: OrdensAprovadasComponent},
    {path: 'andamento', component: OrdensAndamentoComponent},
    {path: 'concluidas', component: OrdensConcluidasComponent}
    ]
  },
  {path: 'mantemOrdem', component: CadastroOrdemServicoComponent},
  {path: 'mantemOrdem/:id', component: CadastroOrdemServicoComponent},


  {path: 'usuarios', component: UsuariosComponent},
  {path: 'mantemUsuario', component: CadastroUsuarioComponent},
  {path: 'mantemUsuario/:id', component: CadastroUsuarioComponent},

  {path: 'produtos', component: CadastroProdutosComponent},
  {path: 'novoProduto/:id', component: NovoProdutoComponent},
  {path: 'novoProduto', component: NovoProdutoComponent},

  {path: 'servicos', component: ServicosComponent},
  {path: 'mantemServico', component: CadastroServicoComponent},
  {path: 'mantemServico/:id', component: CadastroServicoComponent},

  {path: 'clientes', component: ClientesComponent},
  {path: 'mantemCliente', component: CadastroClienteComponent},
  {path: 'mantemCliente/:id', component: CadastroClienteComponent},

  {path: 'veiculos', component: VeiculosComponent},
  {path: 'mantemVeiculo', component: CadastroVeiculoComponent},
  {path: 'mantemVeiculo/:id', component: CadastroVeiculoComponent},

  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
]
