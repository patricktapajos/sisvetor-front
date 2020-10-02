import { Item } from './../model/item.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubItemEffects } from 'src/app/sub-item/store/subitem.effects';

@Injectable()
export class ItemService {
  baseURL = 'http://localhost:3000';
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseURL + '/itens');
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseURL + '/itens', item);
  }

  delete(itemId: string): Observable<any> {
    return this.http.delete(this.baseURL + '/itens/' + itemId);
  }

  update(itemId: string | number, changes: Partial<Item>): Observable<any> {
    return this.http.put(
      this.baseURL + '/itens/' + itemId + '?_embed=subitens',
      changes
    );
  }
}
