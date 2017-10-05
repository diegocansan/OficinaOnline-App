import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {REST_API} from '../app.api'

import {Produto} from "./produto/produto.model"

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class ProdutosService {

    constructor(private http: Http){}

    produtos(search?: string): Observable<Produto[]> {
      if(!search){
        return this.http.get(`${REST_API}/produtos`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }else{
        return this.http.get(`${REST_API}/produtos/pornome/%${search.toString()}%`)
                        .map(response => response.json())
                        .catch(ErrorHandler.handleError)
      }
    }

    produtoById(id: string): Observable<Produto>{
      return this.http.get(`${REST_API}/produtos/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    salvarProduto(produto: Produto): Observable<string> {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.post(`${REST_API}/produtos/insere`,
                            JSON.stringify(produto),
                            new RequestOptions({headers: headers}))
                      .map(response=> response.json())
                      .map(produto => produto.id)
    }

    alterarProduto(produto: Produto):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.put(`${REST_API}/produtos/altera/${produto.id}`,
                            JSON.stringify(produto),
                            new RequestOptions({headers: headers}))
                      .map(response => response.ok)
    }

    removeProduto(produto: Produto):Observable<Boolean>{
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      return this.http.delete(`${REST_API}/produtos/delete/${produto.id}`,
                              new RequestOptions({headers: headers}))
                              .map(response => response.ok)
    }
}
