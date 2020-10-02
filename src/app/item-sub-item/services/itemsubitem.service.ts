import { ItemSubItem } from '../model/itemsubitem.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ItemSubItemService {
  baseURL = 'http://localhost:3000';
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<ItemSubItem[]> {
    return this.http.get<ItemSubItem[]>(this.baseURL + '/itemsubitens');
  }

  create(itens: ItemSubItem[]): Observable<ItemSubItem> {
    return this.http.post<ItemSubItem>(this.baseURL + '/itemsubitens', itens);
  }

  delete(itemId: string): Observable<any> {
    return this.http.delete(this.baseURL + '/itemsubitens/' + itemId);
  }
}
