import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'

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

import { OrdemServicoClienteComponent } from './ordem-servico/ordem-servico-cliente/ordem-servico-cliente.component';
import { OrdensAndamentoClienteComponent } from './ordem-servico/ordem-servico-cliente/ordens-andamento-cliente.component';
import { OrdensAprovadasClienteComponent } from './ordem-servico/ordem-servico-cliente/ordens-aprovadas-cliente.component';
import { OrdensConcluidasClienteComponent } from './ordem-servico/ordem-servico-cliente/ordens-concluidas-cliente.component';
import { OrdensPendentesClienteComponent } from './ordem-servico/ordem-servico-cliente/ordens-pendentes-cliente.component';
import { DetalheOrdemComponent } from './ordem-servico/ordem-servico-cliente/detalhe-ordem/detalhe-ordem.component';



import {NotFoundComponent} from './not-found/not-found.component'

import { AuthGuard } from './_guards/index';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},

  {path: 'login', component: LoginComponent },

  {path: 'ordemServico', component: OrdemServicoComponent, canActivate:[AuthGuard],
    children: [
    {path: '', redirectTo: 'pendentes', pathMatch: 'full'},
    {path: 'pendentes', component: OrdensPendentesComponent, canActivate:[AuthGuard]},
    {path: 'aprovadas', component: OrdensAprovadasComponent, canActivate:[AuthGuard]},
    {path: 'andamento', component: OrdensAndamentoComponent, canActivate:[AuthGuard]},
    {path: 'concluidas', component: OrdensConcluidasComponent, canActivate:[AuthGuard]}
    ]
  },
  {path: 'mantemOrdem', component: CadastroOrdemServicoComponent, canActivate:[AuthGuard]},
  {path: 'mantemOrdem/:id', component: CadastroOrdemServicoComponent, canActivate:[AuthGuard]},


  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'mantemUsuario', component: CadastroUsuarioComponent, canActivate:[AuthGuard]},
  {path: 'mantemUsuario/:id', component: CadastroUsuarioComponent, canActivate:[AuthGuard]},

  {path: 'produtos', component: CadastroProdutosComponent, canActivate:[AuthGuard]},
  {path: 'novoProduto/:id', component: NovoProdutoComponent, canActivate:[AuthGuard]},
  {path: 'novoProduto', component: NovoProdutoComponent, canActivate:[AuthGuard]},

  {path: 'servicos', component: ServicosComponent, canActivate:[AuthGuard]},
  {path: 'mantemServico', component: CadastroServicoComponent, canActivate:[AuthGuard]},
  {path: 'mantemServico/:id', component: CadastroServicoComponent, canActivate:[AuthGuard]},

  {path: 'clientes', component: ClientesComponent, canActivate:[AuthGuard]},
  {path: 'mantemCliente', component: CadastroClienteComponent, canActivate:[AuthGuard]},
  {path: 'mantemCliente/:id', component: CadastroClienteComponent, canActivate:[AuthGuard]},

  {path: 'veiculos', component: VeiculosComponent, canActivate:[AuthGuard]},
  {path: 'mantemVeiculo', component: CadastroVeiculoComponent, canActivate:[AuthGuard]},
  {path: 'mantemVeiculo/:id', component: CadastroVeiculoComponent, canActivate:[AuthGuard]},

  {path: 'ordemServicoCliente', component: OrdemServicoClienteComponent, canActivate:[AuthGuard],
    children: [
    {path: '', redirectTo: 'pendentes', pathMatch: 'full'},
    {path: 'pendentes', component: OrdensPendentesClienteComponent, canActivate:[AuthGuard]},
    {path: 'aprovadas', component: OrdensAprovadasClienteComponent, canActivate:[AuthGuard]},
    {path: 'andamento', component: OrdensAndamentoClienteComponent, canActivate:[AuthGuard]},
    {path: 'concluidas', component: OrdensConcluidasClienteComponent, canActivate:[AuthGuard]}
    ]
  },

  {path: 'detalheOrdem/:id', component: DetalheOrdemComponent, canActivate:[AuthGuard]},



  {path: 'about', loadChildren: './about/about.module#AboutModule', canActivate:[AuthGuard]},

  {path: '**', component: NotFoundComponent}
]
