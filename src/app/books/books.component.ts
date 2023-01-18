import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {AddBookDialogComponent} from "./dialogs/add-book-dialog/add-book-dialog.component";
import {IBook} from "../interfaces/book";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  constructor(
    public bookService: BookService,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.loadBooks();
  }

  public books: IBook[] = [];

  public addBook() {
    const dialogRef = this.dialog.open(AddBookDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.addBook(result).subscribe();
        this.loadBooks();
      };
    });
  }

  public generateBooks(): void {
    this.bookService.generateBooks(3).subscribe(_ => {
      this.loadBooks();
    })
  }
  
  public deleteBooks(): void {
    this.bookService.deleteBooks().subscribe(_ => {
      this.loadBooks();
    })
  }

  private loadBooks(): void {
    this.bookService.getList().subscribe(result => {
      this.books = result;
    })
  } 

  public editBook(book: IBook) {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      data: book,
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.editBook(result).subscribe();
        this.loadBooks();
      }
    });
  }
}
