import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component'
import {CadastroClienteComponent} from './cadastro-cliente/cadastro-cliente.component'
import {CadastroVeiculoComponent} from './cadastro-veiculo/cadastro-veiculo.component'
import {CadastroServicosComponent} from './cadastro-servicos/cadastro-servicos.component'
import {CadastroProdutosComponent} from './cadastro-produtos/cadastro-produtos.component'
import {NovoProdutoComponent} from './novo-produto/novo-produto.component'


import {NotFoundComponent} from './not-found/not-found.component'

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},

  {path: 'usuarios', component: CadastroUsuarioComponent},
  {path: 'clientes', component: CadastroClienteComponent},
  {path: 'veiculos', component: CadastroVeiculoComponent},
  {path: 'servicos', component: CadastroServicosComponent},
  {path: 'produtos', component: CadastroProdutosComponent},
  {path: 'produtos/:id', component: CadastroProdutosComponent},
  {path: 'novoProduto', component: NovoProdutoComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
]
