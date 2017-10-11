import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {Cliente} from "./cliente/cliente.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class ClientesService {

    constructor(private http: Http){}

    buscarTodos(search?: string): Observable<Cliente[]> {
      if(!search){
        return this.http.get(`${REST_API}/clientes`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/clientes/pornome/${search.toString()}`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    byId(id: string): Observable<Cliente>{
      return this.http.get(`${REST_API}/clientes/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    salvar(cliente: Cliente): Observable<string> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/clientes/insere`,
                            JSON.stringify(cliente),
                            new RequestOptions({headers: headers}))
                      .map(response=> response.json())
                      .map(cliente => cliente.id)
    }

    alterar(cliente: Cliente):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/clientes/altera/${cliente.id}`,
                            JSON.stringify(cliente),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
    }

    remover(cliente: Cliente):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/clientes/delete/${cliente.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
    }
}
