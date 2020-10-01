import { SubItem } from '../model/subitem.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SubItemService {
  baseURL = 'http://localhost:3000';
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<SubItem[]> {
    return this.http.get<SubItem[]>(this.baseURL + '/subitens');
  }

  create(SubItem: SubItem): Observable<SubItem> {
    return this.http.post<SubItem>(this.baseURL + '/subitens', SubItem);
  }

  delete(itemId: string): Observable<any> {
    return this.http.delete(this.baseURL + '/subitens/' + itemId);
  }

  update(itemId: string | number, changes: Partial<SubItem>): Observable<any> {
    return this.http.put(this.baseURL + '/subitens/' + itemId, changes);
  }
}
