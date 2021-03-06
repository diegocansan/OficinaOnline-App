import {Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

export class ErrorHandler {
  static handleError(error: Response | any){
    let errorMessage: string

    if (error instanceof Response){
      errorMessage = error.text()
    }else{
      errorMessage = error.message ? error.message : error.toString()
    }
    return Observable.throw(errorMessage)
  }
}
