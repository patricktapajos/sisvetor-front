import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SubItemService } from './services/subitem.service';
import { SubItemEffects } from './store/subitem.effects';
import { subItemReducer } from './store/subitem.reducers';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SubItemListComponent } from './component/list/list.component';

@NgModule({
  declarations: [SubItemListComponent],
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
    StoreModule.forFeature('subitens', subItemReducer),
    EffectsModule.forFeature([SubItemEffects]),
  ],
  providers: [SubItemService],
  exports: [SubItemListComponent],
})
export class SubItemModule {}
