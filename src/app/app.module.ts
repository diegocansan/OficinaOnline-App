import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';


import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { ProdutoComponent } from './cadastro-produtos/produto/produto.component';
import { NovoProdutoComponent } from './cadastro-produtos/novo-produto/novo-produto.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ServicoComponent } from './servicos/servico/servico.component';
import { CadastroServicoComponent } from './servicos/cadastro-servico/cadastro-servico.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { CadastroUsuarioComponent } from './usuarios/cadastro-usuario/cadastro-usuario.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { VeiculoComponent } from './veiculos/veiculo/veiculo.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { CadastroClienteComponent } from './clientes/cadastro-cliente/cadastro-cliente.component';
import { CadastroVeiculoComponent } from './veiculos/cadastro-veiculo/cadastro-veiculo.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { OrdemComponent } from './ordem-servico/ordem/ordem.component';
import { OrdensPendentesComponent } from './ordem-servico/ordens-pendentes/ordens-pendentes.component';
import { OrdensAprovadasComponent } from './ordem-servico/ordens-aprovadas/ordens-aprovadas.component';
import { OrdensAndamentoComponent } from './ordem-servico/ordens-andamento/ordens-andamento.component';
import { OrdensConcluidasComponent } from './ordem-servico/ordens-concluidas/ordens-concluidas.component';
import { CadastroOrdemServicoComponent } from './ordem-servico/cadastro-ordem-servico/cadastro-ordem-servico.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    CadastroProdutosComponent,
    ProdutoComponent,
    NovoProdutoComponent,
    ServicosComponent,
    ServicoComponent,
    CadastroServicoComponent,
    UsuariosComponent,
    UsuarioComponent,
    CadastroUsuarioComponent,
    ClientesComponent,
    VeiculosComponent,
    VeiculoComponent,
    ClienteComponent,
    CadastroClienteComponent,
    CadastroVeiculoComponent,
    OrdemServicoComponent,
    OrdemComponent,
    OrdensPendentesComponent,
    OrdensAprovadasComponent,
    OrdensAndamentoComponent,
    OrdensConcluidasComponent,
    CadastroOrdemServicoComponent

   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    BootstrapModalModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES,{preloadingStrategy: PreloadAllModules}),
    TypeaheadModule.forRoot()
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
