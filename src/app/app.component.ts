import {Component, OnInit , ViewChild , ElementRef} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import {MatIconRegistry} from "@angular/material/icon";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ls-8';
  opened = true;

  ngOnInit(): void {
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 599px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }
      });
    }

    constructor(
      private matIconRegistry: MatIconRegistry,
      private observer: BreakpointObserver,
  
      public authService: AuthService
    ) {
    }
}