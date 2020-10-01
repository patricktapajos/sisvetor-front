import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { ItemModule } from './item/item.module';
import { SubItemModule } from './sub-item/subitem.module';
import { ItemResolver } from './item/item.resolver';
import {
  CreateItemDialog,
  ItemListComponent,
  UpdateItemDialog,
} from './item/component/list/list.component';
import {
  CreateSubItemDialog,
  SubItemListComponent,
  UpdateSubItemDialog,
} from './sub-item/component/list/list.component';
import { SubItemResolver } from './sub-item/subitem.resolver';

const routes: Routes = [
  {
    path: 'itens',
    component: ItemListComponent,
    resolve: {
      itens: ItemResolver,
    },
  },
  {
    path: 'subitens',
    component: SubItemListComponent,
    resolve: {
      itens: SubItemResolver,
    },
  },
  // { path: '**', redirectTo: 'itens' },
];

@NgModule({
  declarations: [
    AppComponent,
    UpdateItemDialog,
    CreateItemDialog,
    CreateSubItemDialog,
    UpdateSubItemDialog,
  ],
  entryComponents: [
    UpdateItemDialog,
    CreateItemDialog,
    CreateSubItemDialog,
    UpdateSubItemDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ItemModule,
    SubItemModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [RouterModule],
  providers: [ItemResolver, SubItemResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
