import { getAllItens } from '../../store/item.selectors';
import { itemActionTypes } from '../../store/item.actions';
import { AppState } from '../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { MatIconModule } from '@angular/material/icon';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-item-list',
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html',
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'actions'];

  itens$: Observable<Item[]>;

  itemToBeUpdated: Item;
  itemCreated: Item;

  isUpdateActivated = false;

  constructor(
    public dialog: MatDialog,
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
    const item: Item = this.itemCreated;
    this.store.dispatch(itemActionTypes.createItem({ item }));
    this.itemCreated = null;
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

@Component({
  selector: 'update-item-dialog',
  templateUrl: './update-item-dialog.html',
})
export class UpdateItemDialog {
  formItem = new FormGroup({
    nome: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {
    this.formItem.get('nome').setValue(data.nome);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.data.nome = this.formItem.get('nome').value;
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'create-item-dialog',
  templateUrl: './create-item-dialog.html',
})
export class CreateItemDialog {
  formItem = new FormGroup({
    nome: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    this.data.nome = this.formItem.get('nome').value;
    this.dialogRef.close(this.data);
  }
}
