import {Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import {Observable } from 'rxjs/Observable';
import {REST_API} from '../app.api'
import {Usuario} from '../usuarios/usuario/usuario.model'
import {ErrorHandler} from '../app.error-handler'

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    usuario:Usuario

    constructor(private http: Http) { }

    login(username: string, password: string) {
        this.usuario = {id:null,login:username,senha:password,token:""}

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${REST_API}/usuarios/auth`,
                              JSON.stringify(this.usuario),
                              new RequestOptions({headers: headers}))
                        .map(response=> response.json() as Usuario)
                        .map(usuario => localStorage.setItem('currentUser', JSON.stringify(usuario)))
                        .catch(error => ErrorHandler.handleError(error))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
