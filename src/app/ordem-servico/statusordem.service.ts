import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {StatusOrdem} from "./ordem/status.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class StatusOrdemService {

    constructor(private http: Http){}

    buscarTodos(search?: string): Observable<StatusOrdem[]> {
      if(!search){
        return this.http.get(`${REST_API}/statusOrdem`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/statusOrdem/porstatus/${search.toString()}`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    byId(id: string): Observable<StatusOrdem>{
      return this.http.get(`${REST_API}/statusOrdem/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    salvar(status: StatusOrdem): Observable<StatusOrdem> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/statusOrdem/insere`,
                            JSON.stringify(status),
                            new RequestOptions({headers: headers}))
                        .map(response=> response.json() as StatusOrdem)
                        .catch(ErrorHandler.handleError)
    }

    alterar(status: StatusOrdem):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/statusOrdem/altera/${status.id}`,
                            JSON.stringify(status),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
                      .catch(ErrorHandler.handleError)
    }

    remover(status: StatusOrdem):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/statusOrdem/delete/${status.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
                              .catch(ErrorHandler.handleError)
    }
}
