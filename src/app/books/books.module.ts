import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BooksRoutingModule} from './books-routing.module';
import {BooksComponent} from './books.component';
import {PipesModule} from "../pipes/pipes.module";
import {MatButtonModule} from "@angular/material/button";
import {AddBookDialogComponent} from './dialogs/add-book-dialog/add-book-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    BooksComponent,
    AddBookDialogComponent,
    
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    PipesModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class BooksModule {
}