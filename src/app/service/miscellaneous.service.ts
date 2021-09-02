import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface ResponseDB {
  offers: Offer[];
}

export interface Offer {
  id: number;
  name: string;
  description: number;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class MiscellaneousService {
  constructor(private http: HttpClient) {}

  getOffersData() {
    return this.http.get<ResponseDB>('assets/database/productDB.json').pipe(
      map((resp) => {
        return [...resp.offers];
      })
    );
  }
}
