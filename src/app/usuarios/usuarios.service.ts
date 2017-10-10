import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {Usuario} from "./usuario/usuario.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class UsuariosService {

    constructor(private http: Http){}

    buscarTodos(search?: string): Observable<Usuario[]> {
      if(!search){
        return this.http.get(`${REST_API}/usuarios`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/usuarios/porlogin/${search.toString()}`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    byId(id: string): Observable<Usuario>{
      return this.http.get(`${REST_API}/usuarios/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    salvar(usuario: Usuario): Observable<string> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/usuarios/insere`,
                            JSON.stringify(usuario),
                            new RequestOptions({headers: headers}))
                      .map(response=> response.json())
                      .map(usuario => usuario.id)
    }

    alterar(usuario: Usuario):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/usuarios/altera/${usuario.id}`,
                            JSON.stringify(usuario),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
    }

    remover(usuario: Usuario):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/usuarios/delete/${usuario.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
    }
}
