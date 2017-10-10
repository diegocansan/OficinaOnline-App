import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router, ActivatedRoute} from '@angular/router'

import {Usuario} from  '../usuario/usuario.model'
import {UsuariosService} from  '../usuarios.service'
import {NotificationService} from '../../shared/messages/notification.service'

@Component({
  selector: 'oo-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html'
})
export class CadastroUsuarioComponent implements OnInit {

  usuarioForm: FormGroup
  usuario : Usuario

  constructor(private usuariosService: UsuariosService,
              private notificationService: NotificationService,
              private router: Router, private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      login: this.formBuilder.control('', Validators.required),
      senha: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
  }

    buscar(id:string){
    this.usuariosService.byId(id)
      .subscribe( (retorno) => {
        this.usuario = retorno
        this.usuarioForm.controls['login'].setValue(this.usuario.login)
        this.usuarioForm.controls['senha'].setValue(this.usuario.senha)
      })
    }

  btnSalvar(usuario:Usuario){
    if(this.usuario)
      this.alterar(usuario)
    else
      this.salvar(usuario)
  }

  salvar(usuario: Usuario){
    this.usuariosService.salvar(usuario)
      .subscribe( (retorno: string) => {
        this.router.navigate(['/usuarios'])
        this.notificationService.notify(`Usuário adicionado!`)
    })
  }

  alterar(usuario: Usuario){
    this.usuario.login = usuario.login
    this.usuario.senha = usuario.senha

    this.usuariosService.alterar(this.usuario)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/usuarios'])
        this.notificationService.notify(`Usuário alterado!`)
    })
  }
}
