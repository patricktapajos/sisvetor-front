import { getAllItens } from '../../store/item.selectors';
import { getAllItemSubItens } from '../../../item-sub-item/store/itemsubitem.selectors';
import { itemActionTypes } from '../../store/item.actions';
import { AppState } from '../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Update } from '@ngrx/entity';
import { ofType, Actions } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemDialog } from '../create/create-item.component';
import { UpdateItemDialog } from '../update/update-item.component';
import { itemSubItemActionTypes } from 'src/app/item-sub-item/store/itemsubitem.actions';
import { ItemSubItem } from 'src/app/item-sub-item/model/itemsubitem.model';

@Component({
  selector: 'app-item-list',
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html',
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'actions'];

  itens$: Observable<Item[]>;

  itemToBeUpdated: Item;
  subitens = null;
  itemCreated: Item;

  isUpdateActivated = false;

  constructor(
    public dialog: MatDialog,
    private itemService: ItemService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.loadItens();
    //this.subscribeToItem();
  }

  loadItens() {
    this.itens$ = this.store.select(getAllItens);
  }

  subscribeToItem() {
    this.actions$
      .pipe(ofType(itemActionTypes.createItem))
      .subscribe((action) => {
        let itemsubitens: ItemSubItem[] = [];
        const itemSubItem: ItemSubItem = {} as ItemSubItem;
        this.subitens.forEach((element) => {
          itemSubItem.item_id = action.item.id;
          itemSubItem.sub_item_id = element.id;
          itemsubitens.push(itemSubItem);
        });
        this.store.dispatch(
          itemSubItemActionTypes.createItemSubItem({ itemsubitens })
        );
      });
  }

  deleteItem(itemId: string) {
    this.store.dispatch(itemActionTypes.deleteItem({ itemId }));
  }

  showUpdateForm(item: Item) {
    this.itemToBeUpdated = { ...item };
    const dialogRef = this.dialog.open(UpdateItemDialog, {
      width: '300px',
      data: { ...item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result === undefined) return;
      this.itemToBeUpdated = result;
      this.updateItem();
    });
  }

  showCreateForm() {
    const dialogRef = this.dialog.open(CreateItemDialog, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result === undefined) return;
      this.itemCreated = result;
      this.createItem();
    });
  }

  createItem() {
    this.subitens = this.itemCreated.subitens;
    delete this.itemCreated.subitens;
    const item: Item = this.itemCreated;
    this.store.dispatch(itemActionTypes.createItem({ item }));
    this.itemCreated = null;
    itemActionTypes.loadItens();
  }

  updateItem() {
    const update: Update<Item> = {
      id: this.itemToBeUpdated.id,
      changes: {
        ...this.itemToBeUpdated,
      },
    };

    this.store.dispatch(itemActionTypes.updateItem({ update }));
    this.itemToBeUpdated = null;
  }
}
