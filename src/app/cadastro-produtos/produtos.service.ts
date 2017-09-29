import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

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
      return this.http.get(`${REST_API}/produtos`, {params: {q: search}})
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

    produtoById(id: string): Observable<Produto>{
      return this.http.get(`${REST_API}/produtos/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError)
    }

}
