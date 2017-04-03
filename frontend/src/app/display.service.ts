import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Stock } from './stock';

@Injectable()
export class DisplayService {

  constructor(private http: Http) {}

  getStock(): Observable<Stock[]> {
    const stockUrl = 'http://127.0.0.1:5000/api/lagersaldon';
    return this.http.get(stockUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return (body.objects || { });
  }

  private handleError (error: Response | any) {
    const errorMsg = "oooops";

    console.log(errorMsg);
    return Observable.throw(errorMsg);
  }
}
