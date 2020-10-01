import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ItemService } from './services/item.service';
import { ItemEffects } from './store/item.effects';
import { itemReducer } from './store/item.reducers';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ItemListComponent } from './component/list/list.component';

@NgModule({
  declarations: [ItemListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature('itens', itemReducer),
    EffectsModule.forFeature([ItemEffects]),
  ],
  providers: [ItemService],
  exports: [ItemListComponent],
})
export class ItemModule {}
