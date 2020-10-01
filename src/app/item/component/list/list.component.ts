import { getAllItens } from '../../store/item.selectors';
import { itemActionTypes } from '../../store/item.actions';
import { AppState } from '../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-item-list',
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html',
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'actions'];

  itens$: Observable<Item[]>;

  itemToBeUpdated: Item;

  isUpdateActivated = false;

  constructor(
    private itemService: ItemService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.itens$ = this.store.select(getAllItens);
  }

  deleteItem(itemId: string) {
    this.store.dispatch(itemActionTypes.deleteItem({ itemId }));
  }

  showUpdateForm(item: Item) {
    this.itemToBeUpdated = { ...item };
    this.isUpdateActivated = true;
  }

  updateItem(updateForm) {
    const update: Update<Item> = {
      id: this.itemToBeUpdated.id,
      changes: {
        ...this.itemToBeUpdated,
        ...updateForm.value,
      },
    };

    this.store.dispatch(itemActionTypes.updateItem({ update }));

    this.isUpdateActivated = false;
    this.itemToBeUpdated = null;
  }
}
