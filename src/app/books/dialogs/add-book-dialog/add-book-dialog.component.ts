import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IBook} from "../../../interfaces/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent implements OnInit {

  public books: IBook[] = [];

  public bookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    id: new FormControl(''),
  });

  public get name(): FormControl {
    return this.bookForm.get('name') as FormControl;
  }

  public get id(): FormControl {
    return this.bookForm.get('id') as FormControl;
  }

  public get author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IBook,
  ) {
  }
  
  public selectedMode = 'Добавить';

  public ngOnInit() {
    if (this.data) {
      this.name.setValue(this.data.id);
      this.name.setValue(this.data.name);
      this.author.setValue(this.data.author);
      this.selectedMode = 'Редактировать';
    }
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  public onAddClick() {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});

    let book = {
      id: this.id.value,
      name: this.name.value,
      author: this.author.value,
    } as IBook;

    console.log(book);

    this.dialogRef.close(book);
  }
  
}