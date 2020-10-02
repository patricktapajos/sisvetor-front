import { Item } from '../../model/item.model';
import { Component, OnInit, Inject } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Update } from '@ngrx/entity';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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
