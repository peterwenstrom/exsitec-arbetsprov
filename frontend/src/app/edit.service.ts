import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Shipment } from './shipment';

@Injectable()
export class EditService {

  constructor(private http: Http) {}

  postShipment(shipment: Shipment): Observable<Shipment> {
    const url = 'http://127.0.0.1:5000/api/leveranser';
    let data = {'vara': shipment.vara, 'stad': shipment.stad, 'antal': shipment.antal};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options)
      .catch(this.handleError)
  }

  private handleError (error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
