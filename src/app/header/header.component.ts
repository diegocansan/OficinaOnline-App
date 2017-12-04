import { Component, OnInit } from '@angular/core';
import {Usuario} from '../usuarios/usuario/usuario.model'
import {AuthenticationService } from '../_services/index'


@Component({
  selector: 'oo-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  usuario: Usuario

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  usuarioAdminsitrador(): boolean
  {
      if(localStorage.getItem('currentUser') != null){
        this.usuario = JSON.parse(localStorage.getItem('currentUser'))
        return this.usuario.id == "2"
      }
      return false
  }

  usuarioCliente(): boolean
  {
      if(localStorage.getItem('currentUser') != null){
        this.usuario = JSON.parse(localStorage.getItem('currentUser'))
        return this.usuario.id == "3"
      }
      return false
  }

  logOut(){
    this.authenticationService.logout()
  }

}
