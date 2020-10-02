import { Observable } from 'rxjs';
import { Item } from '../../model/item.model';
import { Component, Inject } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import { FormBuilder, Validators } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SubItem } from 'src/app/sub-item/model/subitem.model';
import { SubItemService } from 'src/app/sub-item/services/subitem.service';

@Component({
  selector: 'create-item-dialog',
  templateUrl: './create-item-dialog.html',
})
export class CreateItemDialog {
  formItem = this.formBuilder.group({
    nome: ['', Validators.required],
    subitem: [''],
  });

  displayedColumns: string[] = ['nome', 'actions'];
  subitens$: Observable<SubItem[]> = this.subItemProvider.getAll();
  options: SubItem[];
  filteredOptions: Observable<SubItem[]>;
  selectedSubItem: SubItem;
  selectedSubItens$: SubItem[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private subItemProvider: SubItemService,
    public dialogRef: MatDialogRef<CreateItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {
    this.subitens$.toPromise().then((list) => {
      this.options = list;
      this.loadFiltered();
    });
  }

  loadFiltered() {
    this.filteredOptions = this.formItem.get('subitem').valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nome)),
      map((nome) => (nome ? this._filter(nome) : this.options.slice()))
    );
  }

  displayFn(subItem: SubItem): string {
    return subItem && subItem.nome ? subItem.nome : '';
  }

  private _filter(nome: string): SubItem[] {
    const filterValue = nome.toLowerCase();

    return this.options.filter(
      (option) => option.nome.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSelectSubItem(event) {
    this.selectedSubItem = event.option.value;
  }

  addSubItem(): void {
    if (!this.selectedSubItem) return;
    if (this.selectedSubItens$.includes(this.selectedSubItem)) return;
    this.selectedSubItens$.push(this.selectedSubItem);
    this.formItem.get('subitem').setValue('');
  }

  removeSubItem(subitem): void {
    this.selectedSubItens$.splice(subitem, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get nome() {
    return this.formItem.get('nome');
  }

  create() {
    if (this.formItem.valid) {
      this.data.nome = this.formItem.get('nome').value;
      this.data.subitens = this.selectedSubItens$;
      this.dialogRef.close(this.data);
    }
  }
}
