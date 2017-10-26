import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {Veiculo} from "./veiculo/veiculo.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class VeiculosService {

    constructor(private http: Http){}

    buscarTodos(search?: string): Observable<Veiculo[]> {
      if(!search){
        return this.http.get(`${REST_API}/veiculos`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/veiculos/placa/${search.toString()}`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    byId(id: string): Observable<Veiculo>{
      return this.http.get(`${REST_API}/veiculos/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    placa(placa: string): Observable<Veiculo>{
      return this.http.get(`${REST_API}/veiculos/placa/${placa}`)
                      .map(response => response.json() as Veiculo)
                      .catch(ErrorHandler.handleError)
    }

    salvar(veiculo: Veiculo): Observable<string> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/veiculos/insere`,
                            JSON.stringify(veiculo),
                            new RequestOptions({headers: headers}))
                      .map(response=> response.json())
                      .map(veiculo => veiculo.id)
    }

    alterar(veiculo: Veiculo):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/veiculos/altera/${veiculo.id}`,
                            JSON.stringify(veiculo),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
    }

    remover(veiculo: Veiculo):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/veiculos/delete/${veiculo.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
    }
}
