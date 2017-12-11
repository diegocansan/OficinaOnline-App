import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {Ordem} from "./ordem/ordem.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class OrdemService {

    constructor(private http: Http){}

    buscarTodos(search?: string): Observable<Ordem[]> {
      if(!search){
        return this.http.get(`${REST_API}/ordemServicos`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/ordemServicos/status/${search.toString()}`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    buscarPorStatus(id: string): Observable<Ordem[]>{
      return this.http.get(`${REST_API}/ordemServicos/status/${id.toString()}`)
                      .map(response => response.json())
                      .catch(ErrorHandler.handleError)
    }

    byId(id: string): Observable<Ordem>{
      return this.http.get(`${REST_API}/ordemServicos/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    salvar(ordem: Ordem): Observable<Ordem> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/ordemServicos/insere`,
                            JSON.stringify(ordem),
                            new RequestOptions({headers: headers}))
                        .map(response=> response.json() as Ordem)
                        .catch(ErrorHandler.handleError)
    }

    alterar(ordem: Ordem):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/ordemServicos/altera/${ordem.id}`,
                            JSON.stringify(ordem),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
                      .catch(ErrorHandler.handleError)
    }

    remover(ordem: Ordem):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/ordemServicos/delete/${ordem.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
                              .catch(ErrorHandler.handleError)
    }


    /* BUSCA ORDEM SERVICO VISAO CLIENTE */
    buscarOrdemCliente(clienteId: string, statusIndex: number): Observable<Ordem[]>{
      let status: string[] = ["pendentes","aprovadas","emandamento","concluidas"]
      
      return this.http.get(`${REST_API}/ordemServicos/${status[statusIndex].toString()}/cliente/${clienteId.toString()}`)
                      .map(response => response.json())
                      .catch(ErrorHandler.handleError)
    }


}
