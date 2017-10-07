import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {Servico} from "./servico/servico.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class ServicosService {

    constructor(private http: Http){}

    buscarTodos(search?: string): Observable<Servico[]> {
      if(!search){
        return this.http.get(`${REST_API}/servicos`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/servicos/pornome/${search.toString()}`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    byId(id: string): Observable<Servico>{
      return this.http.get(`${REST_API}/servicos/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    salvar(servico: Servico): Observable<string> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/servicos/insere`,
                            JSON.stringify(servico),
                            new RequestOptions({headers: headers}))
                      .map(response=> response.json())
                      .map(servico => servico.id)
    }

    alterar(servico: Servico):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/servicos/altera/${servico.id}`,
                            JSON.stringify(servico),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
    }

    remover(servico: Servico):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/servicos/delete/${servico.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
    }
}
