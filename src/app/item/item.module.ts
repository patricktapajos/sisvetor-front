import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { ItemService } from './services/item.service';
import { ItemEffects } from './store/item.effects';
import { itemReducer } from './store/item.reducers';
import { MatTableModule } from '@angular/material/table';

import { ItemListComponent } from './component/list/list.component';

@NgModule({
  declarations: [ItemListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    StoreModule.forFeature('itens', itemReducer),
    EffectsModule.forFeature([ItemEffects]),
  ],
  providers: [ItemService],
  exports: [ItemListComponent],
})
export class ItemModule {}
