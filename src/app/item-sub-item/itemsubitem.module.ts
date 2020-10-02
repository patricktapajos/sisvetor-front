import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ItemSubItemService } from './services/itemsubitem.service';
import { ItemSubItemEffects } from './store/itemsubitem.effects';
import { itemSubItemReducer } from './store/itemsubitem.reducers';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [],
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
    MatAutocompleteModule,
    StoreModule.forFeature('itemsubitens', itemSubItemReducer),
    EffectsModule.forFeature([ItemSubItemEffects]),
  ],
  providers: [ItemSubItemService],
})
export class ItemSubItemModule {}
