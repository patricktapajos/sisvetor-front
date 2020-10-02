import { getAllSubItens } from '../../store/subitem.selectors';
import { subItemActionTypes } from '../../store/subitem.actions';
import { AppState } from '../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubItem } from '../../model/subitem.model';
import { SubItemService } from '../../services/subitem.service';
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
  selector: 'app-subItem-list',
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html',
})
export class SubItemListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'actions'];

  itens$: Observable<SubItem[]>;

  subItemToBeUpdated: SubItem;
  subItemCreated: SubItem;

  isUpdateActivated = false;

  constructor(
    public dialog: MatDialog,
    private subItemService: SubItemService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.itens$ = this.store.select(getAllSubItens);
  }

  deleteSubItem(subItemId: string) {
    this.store.dispatch(subItemActionTypes.deleteSubItem({ subItemId }));
  }

  showUpdateForm(subItem: SubItem) {
    this.subItemToBeUpdated = { ...subItem };
    const dialogRef = this.dialog.open(UpdateSubItemDialog, {
      width: '300px',
      data: { ...subItem },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result === undefined) return;
      this.subItemToBeUpdated = result;
      this.updateSubItem();
    });
  }

  showCreateForm() {
    const dialogRef = this.dialog.open(CreateSubItemDialog, {
      width: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || result === undefined) return;
      this.subItemCreated = result;
      this.createSubItem();
    });
  }

  createSubItem() {
    const subItem: SubItem = this.subItemCreated;
    this.store.dispatch(subItemActionTypes.createSubItem({ subItem }));
    this.subItemCreated = null;
  }

  updateSubItem() {
    const update: Update<SubItem> = {
      id: this.subItemToBeUpdated.id,
      changes: {
        ...this.subItemToBeUpdated,
      },
    };

    this.store.dispatch(subItemActionTypes.updateSubItem({ update }));
    this.subItemToBeUpdated = null;
  }
}

@Component({
  selector: 'update-subitem-dialog',
  templateUrl: './update-subitem-dialog.html',
})
export class UpdateSubItemDialog {
  formSubItem = new FormGroup({
    nome: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateSubItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SubItem
  ) {
    this.formSubItem.get('nome').setValue(data.nome);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.data.nome = this.formSubItem.get('nome').value;
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'create-subitem-dialog',
  templateUrl: './create-subitem-dialog.html',
})
export class CreateSubItemDialog {
  formSubItem = new FormGroup({
    nome: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateSubItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SubItem
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    this.data.nome = this.formSubItem.get('nome').value;
    this.dialogRef.close(this.data);
  }
}
