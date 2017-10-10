import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

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
    CadastroUsuarioComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES,{preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
