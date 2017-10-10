import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'

import {CadastroProdutosComponent} from './cadastro-produtos/cadastro-produtos.component'
import {NovoProdutoComponent} from './cadastro-produtos/novo-produto/novo-produto.component'

import {ServicosComponent} from './servicos/servicos.component'
import {CadastroServicoComponent} from './servicos/cadastro-servico/cadastro-servico.component'

import {UsuariosComponent} from './usuarios/usuarios.component'
import {CadastroUsuarioComponent} from './usuarios/cadastro-usuario/cadastro-usuario.component'

import {NotFoundComponent} from './not-found/not-found.component'



export const ROUTES: Routes = [
  {path: '', component: HomeComponent},

  {path: 'usuarios', component: UsuariosComponent},
  {path: 'mantemUsuario', component: CadastroUsuarioComponent},
  {path: 'mantemUsuario/:id', component: CadastroUsuarioComponent},

  {path: 'produtos', component: CadastroProdutosComponent},
  {path: 'novoProduto/:id', component: NovoProdutoComponent},
  {path: 'novoProduto', component: NovoProdutoComponent},

  {path: 'servicos', component: ServicosComponent},
  {path: 'mantemServico', component: CadastroServicoComponent},
  {path: 'mantemServico/:id', component: CadastroServicoComponent},

  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
]
